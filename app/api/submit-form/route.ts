import { NextResponse } from "next/server";
import { initializeApp, getApps } from "firebase/app";
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { getFirestore, collection, addDoc } from "firebase/firestore";

// Log environment variables
console.log("Environment Variables:", {
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET
});

// Firebase Configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

console.log("Firebase Config:", firebaseConfig);

// Initialize Firebase only if no apps exist
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const storage = getStorage(app);
const db = getFirestore(app);

// Configure API Route
export const config = {
  api: {
    bodyParser: false,
    responseLimit: "250mb"
  }
};

// Handle POST Request
export async function POST(request: Request) {
  console.log("[Submit-Form] Starting form submission");
  
  try {
    const formData = await request.formData();
    const video = formData.get("video") as File | null;
    
    console.log("[Submit-Form] Form data received:", {
      hasVideo: !!video,
      videoSize: video ? `${(video.size / (1024 * 1024)).toFixed(2)}MB` : 'N/A',
      videoType: video?.type
    });

    let videoUrl = "";

    if (video) {
      try {
        const fileName = `videos/${Date.now()}-${video.name}`;
        const storageRef = ref(storage, fileName);
        
        console.log("[Submit-Form] Starting video upload:", {
          fileName,
          contentType: video.type
        });

        // Stream upload
        const buffer = Buffer.from(await video.arrayBuffer());
        const uploadTask = uploadBytesResumable(storageRef, buffer, {
          contentType: video.type
        });

        // Wait for upload completion
        await new Promise<void>((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log("[Submit-Form] Upload progress:", progress.toFixed(2) + "%");
            },
            (error) => reject(error),
            () => resolve()
          );
        });

        videoUrl = await getDownloadURL(storageRef);
        console.log("[Submit-Form] Video uploaded successfully:", videoUrl);
      } catch (error) {
        console.error("[Submit-Form] Video upload error:", error);
        throw error;
      }
    }

    // Save form data to Firestore
    const docRef = await addDoc(collection(db, "inquiries"), {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      service: formData.get("service"),
      size: formData.get("size"),
      details: formData.get("details"),
      videoUrl,
      timestamp: new Date().toISOString(),
      status: "new"
    });

    console.log("[Submit-Form] Form data saved to Firestore:", docRef.id);

    return NextResponse.json({
      success: true,
      message: "Form submitted successfully",
      id: docRef.id,
      videoUrl
    });
  } catch (error) {
    console.error("[Submit-Form] Error processing form:", {
      error,
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined
    });
    
    return NextResponse.json(
      { error: "Failed to process form submission" },
      { status: 500 }
    );
  }
}

// Handle GET Request (Not Allowed)
export async function GET() {
  return NextResponse.json(
    { error: "Method not allowed" },
    { status: 405 }
  );
}

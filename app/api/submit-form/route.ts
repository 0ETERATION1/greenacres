import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { NextResponse } from "next/server";
import { FirebaseError } from "firebase/app"; // FirebaseError comes from firebase/app

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

// Initialize Firebase Services
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);

// Define a TypeScript interface for Firebase Errors
interface StorageError extends FirebaseError {
  status_?: number;
}

// Configure API Route
export const config = {
  api: {
    bodyParser: false,
    responseLimit: "150mb" // Increased to handle larger files
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
        console.log("Processing video:", {
          name: video.name,
          type: video.type,
          size: video.size,
          storageBucket: storage.app.options.storageBucket
        });

        const buffer = Buffer.from(await video.arrayBuffer());
        const fileName = `videos/${Date.now()}-${video.name}`;
        const storageRef = ref(storage, fileName);

        // Log the full storage reference
        console.log("Storage Reference:", {
          fullPath: storageRef.fullPath,
          bucket: storageRef.bucket,
          name: storageRef.name
        });

        const uploadTask = uploadBytesResumable(storageRef, buffer, {
          contentType: video.type
        });

        // Await the upload process
        await new Promise<void>((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log("Upload progress:", progress + "%");
            },
            (error: unknown) => {
              if (error instanceof FirebaseError) {
                console.error("Upload error:", {
                  code: error.code,
                  message: error.message,
                  serverResponse: (error as StorageError).customData?.serverResponse,
                  status: (error as StorageError).status_
                });
              } else {
                console.error("Unknown Upload error:", error);
              }
              reject(error);
            },
            () => resolve()
          );
        });

        // Retrieve the download URL
        videoUrl = await getDownloadURL(storageRef);
        console.log("File available at:", videoUrl);
      } catch (error: unknown) {
        if (error instanceof FirebaseError) {
          console.error("Upload Error:", {
            code: error.code,
            message: error.message,
            serverResponse: (error as StorageError).customData?.serverResponse,
            status: (error as StorageError).status_
          });
        } else {
          console.error("Unexpected Upload Error:", error);
        }
        throw error;
      }
    }

    // Save form data & video URL to Firestore
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

    return NextResponse.json({
      success: true,
      message: "Form submitted successfully",
      id: docRef.id,
      videoUrl
    });
  } catch (error: unknown) {
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

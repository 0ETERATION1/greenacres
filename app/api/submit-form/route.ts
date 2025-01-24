import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { NextResponse } from "next/server";

// Define a type for the form data
// type CustomFormData = FormData & {
//   append(name: string, value: string | Blob, fileName?: string): void;
// };

export const config = {
  api: {
    bodyParser: false,
    responseLimit: '150mb',  // Increased to handle larger files
  },
};

export async function POST(request: Request) {
  try {
    console.log("API Route: Starting form submission...");
    
    // Debug: Log environment variables (remove this in production)
    console.log("Environment Variables:", {
      apiKey: process.env.FIREBASE_API_KEY,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      // ... other env vars
    });

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

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const storage = getStorage(app);
    const db = getFirestore(app);

    const formData = await request.formData();
    
    // Log received data
    console.log("API Route: Form data received:", {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      service: formData.get("service"),
      size: formData.get("size"),
      details: formData.get("details"),
      hasVideo: formData.has("video")
    });

    // Log Firebase config (without sensitive data)
    console.log("API Route: Firebase config check:", {
      hasApiKey: !!process.env.FIREBASE_API_KEY,
      hasProjectId: !!process.env.FIREBASE_PROJECT_ID,
      hasStorageBucket: !!process.env.FIREBASE_STORAGE_BUCKET
    });

    // Extract form data
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const service = formData.get("service") as string;
    const size = formData.get("size") as string;
    const details = formData.get("details") as string;
    const video = formData.get("video") as File | null;

    let videoUrl = "";

    // Upload video if it exists
    if (video) {
      const videoRef = ref(storage, `videos/${Date.now()}-${video.name}`);
      await uploadBytes(videoRef, video);
      videoUrl = await getDownloadURL(videoRef);
    }

    // Save form data to Firestore
    const docRef = await addDoc(collection(db, "inquiries"), {
      name,
      email,
      phone,
      service,
      size,
      details,
      videoUrl,
      timestamp: new Date().toISOString(),
      status: "new" // You can use this to track inquiry status
    });

    console.log("Form data saved with ID:", docRef.id);

    return NextResponse.json({ 
      success: true,
      message: "Form submitted successfully",
      id: docRef.id
    });

  } catch (error) {
    console.error("API Route: Detailed error:", {
      error,
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });

    return NextResponse.json(
      { 
        error: "Failed to submit form",
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Optionally, handle other methods
export async function GET() {
  return NextResponse.json(
    { error: "Method not allowed" },
    { status: 405 }
  );
}

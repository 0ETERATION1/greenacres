import { NextResponse } from "next/server";
import { initializeApp, getApps } from "firebase/app";
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
const db = getFirestore(app);

// Configure API Route
export const config = {
  api: {
    bodyParser: false,
    responseLimit: "250mb"
  }
};

// Handle POST Request (NO VIDEO UPLOAD HERE)
export async function POST(request: Request) {
  console.log("[Submit-Form] Starting form submission");
  
  // Add CORS headers
  const headers = new Headers({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  });

  // Handle CORS preflight requests
  if (request.method === "OPTIONS") {
    return new NextResponse(null, { status: 204, headers });
  }
  
  try {
    const formData = await request.formData();
    const isDeclined = formData.get("status") === "declined";
    const collectionName = isDeclined ? "declinedInquiries" : "inquiries";

    console.log(`[Submit-Form] Form data received for ${collectionName}:`, {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      service: formData.get("service"),
      status: formData.get("status")
    });

    // Save to appropriate collection
    const docRef = await addDoc(collection(db, collectionName), {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      service: formData.get("service"),
      size: formData.get("size"),
      details: formData.get("details"),
      videoUrl: formData.get("videoUrl"),
      timestamp: new Date().toISOString(),
      status: isDeclined ? "declined" : "new"
    });

    console.log(`[Submit-Form] Data saved to ${collectionName}:`, docRef.id);

    return NextResponse.json(
      {
        success: true,
        message: `Form submitted successfully to ${collectionName}`,
        id: docRef.id
      },
      { headers }
    );
  } catch (error) {
    console.error("[Submit-Form] Error processing form:", {
      error,
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined
    });
    
    return NextResponse.json(
      { error: "Failed to process form submission" },
      { status: 500, headers }
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

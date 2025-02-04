import { NextResponse } from "next/server";
import { initializeApp, getApps } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

// Log environment variables

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
    const collectionName = formData.get("collection")?.toString() || "mowingOtherLeads";

    // console.log("[Submit-Form] Received collection name:", collectionName);
    // console.log("[Submit-Form] Form data:", Object.fromEntries(formData.entries()));

    const docRef = await addDoc(collection(db, collectionName), {
      name: formData.get("name")?.toString() || "",
      email: formData.get("email")?.toString() || "",
      phone: formData.get("phone")?.toString() || "",
      service: formData.get("service")?.toString() || "",
      size: formData.get("size")?.toString() || "",
      details: formData.get("details")?.toString() || "",
      videoUrl: formData.get("videoUrl")?.toString() || "",
      timestamp: new Date().toISOString(),
      status: formData.get("status")?.toString() || "new"
    });

    // console.log(`[Submit-Form] Successfully saved to ${collectionName}:`, docRef.id);

    return NextResponse.json(
      {
        success: true,
        message: `Form submitted successfully to ${collectionName}`,
        id: docRef.id
      },
      { headers }
    );
  } catch (error) {
    // console.error("[Submit-Form] Error:", error);
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : "Failed to process form submission",
        details: error
      }, 
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

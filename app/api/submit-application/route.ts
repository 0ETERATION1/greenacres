import { NextResponse } from "next/server";
import { initializeApp, getApps } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

const corsHeaders = new Headers({
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
});

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    // Honeypot anti-spam: real users never fill this hidden field.
    // If it has any value, silently pretend success so bots don't retry.
    const honeypot = formData.get("website")?.toString().trim();
    if (honeypot) {
      return NextResponse.json(
        { success: true, message: "Application received." },
        { headers: corsHeaders }
      );
    }

    const application = {
      name: formData.get("name")?.toString() || "",
      email: formData.get("email")?.toString().toLowerCase().trim() || "",
      phone: formData.get("phone")?.toString() || "",
      experience: formData.get("experience")?.toString() || "",
      driversLicense: formData.get("driversLicense")?.toString() || "",
      ownTransportation: formData.get("ownTransportation")?.toString() || "",
      languages: formData.get("languages")?.toString() || "",
      startDate: formData.get("startDate")?.toString() || "",
      message: formData.get("message")?.toString() || "",
      status: "new",
      timestamp: serverTimestamp(),
      readableTimestamp: new Date().toLocaleString("en-US", {
        timeZone: "America/New_York",
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
      }),
    };

    const docRef = await addDoc(
      collection(db, "careersApplications"),
      application
    );

    // Fire-and-forget Zapier webhook (if configured).
    // Failures here do NOT block the user response — Firestore is the source of truth.
    const zapierUrl = process.env.CAREERS_ZAPIER_WEBHOOK_URL;
    if (zapierUrl) {
      fetch(zapierUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: docRef.id, ...application, timestamp: undefined }),
      }).catch((err) => {
        console.error("[submit-application] Zapier webhook failed:", err);
      });
    }

    return NextResponse.json(
      {
        success: true,
        message: "Application submitted successfully.",
        id: docRef.id,
      },
      { headers: corsHeaders }
    );
  } catch (error) {
    console.error("[submit-application] Error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to process application",
      },
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: "Method not allowed" },
    { status: 405 }
  );
}

import { NextResponse } from "next/server";
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const chunk = formData.get("chunk") as File;
    const fileName = formData.get("fileName") as string;
    const chunkIndex = parseInt(formData.get("chunkIndex") as string);
    const totalChunks = parseInt(formData.get("totalChunks") as string);

    // Upload directly to videos folder
    const chunkRef = ref(storage, `videos/${fileName}-${chunkIndex}`);
    await uploadBytes(chunkRef, await chunk.arrayBuffer());

    // If this is the last chunk, combine all chunks
    if (chunkIndex === totalChunks - 1) {
      // Logic to combine chunks will go here
      // For now, just return success
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Chunk upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload chunk" },
      { status: 500 }
    );
  }
}

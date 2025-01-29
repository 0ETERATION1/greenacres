import { NextResponse } from "next/server";
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { FirebaseError } from 'firebase/app';

interface StorageError extends FirebaseError {
  serverResponse?: string;
}

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

console.log("[Upload-Chunk] Initializing with config:", {
  projectId: firebaseConfig.projectId,
  storageBucket: firebaseConfig.storageBucket
});

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export async function POST(request: Request) {
  try {
    console.log("[Upload-Chunk] Starting chunk upload");
    const formData = await request.formData();
    const chunk = formData.get("chunk") as File;
    const fileName = formData.get("fileName") as string;
    const chunkIndex = parseInt(formData.get("chunkIndex") as string);
    const totalChunks = parseInt(formData.get("totalChunks") as string);

    if (!chunk || !fileName) {
      console.error("[Upload-Chunk] Missing required fields:", { chunk: !!chunk, fileName: !!fileName });
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    console.log("[Upload-Chunk] Processing chunk:", {
      fileName,
      chunkIndex,
      totalChunks,
      chunkSize: chunk.size,
      type: chunk.type
    });

    const chunkRef = ref(storage, `videos/${fileName}-${chunkIndex}`);
    
    try {
      const buffer = await chunk.arrayBuffer();
      console.log("[Upload-Chunk] Starting Firebase upload:", chunkRef.fullPath);
      await uploadBytes(chunkRef, buffer, {
        contentType: chunk.type
      });
      console.log("[Upload-Chunk] Upload successful");
    } catch (error: unknown) {
      const uploadError = error as StorageError;
      console.error("[Upload-Chunk] Firebase upload error:", {
        message: uploadError.message,
        code: uploadError.code,
        serverResponse: uploadError.serverResponse,
        stack: uploadError.stack
      });
      throw uploadError;
    }

    return NextResponse.json({ 
      success: true,
      message: `Chunk ${chunkIndex + 1} of ${totalChunks} uploaded successfully`
    });
  } catch (error) {
    console.error("[Upload-Chunk] Detailed error:", {
      error,
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined
    });
    
    return NextResponse.json(
      { 
        error: "Failed to upload chunk",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}

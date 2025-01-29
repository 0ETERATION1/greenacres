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

console.log("Storage bucket:", process.env.FIREBASE_STORAGE_BUCKET);

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const chunk = formData.get("chunk") as File;
    const fileName = formData.get("fileName") as string;
    const chunkIndex = parseInt(formData.get("chunkIndex") as string);
    const totalChunks = parseInt(formData.get("totalChunks") as string);

    console.log("Processing chunk:", {
      fileName,
      chunkIndex,
      totalChunks,
      chunkSize: chunk.size,
      type: chunk.type
    });

    // Upload directly to videos folder
    const chunkRef = ref(storage, `videos/${fileName}-${chunkIndex}`);
    
    try {
      const buffer = await chunk.arrayBuffer();
      console.log("Uploading chunk to Firebase:", chunkRef.fullPath);
      await uploadBytes(chunkRef, buffer, {
        contentType: chunk.type
      });
      console.log("Chunk uploaded successfully");
    } catch (error: unknown) {
      const uploadError = error as StorageError;
      console.error("Firebase upload error:", {
        error: uploadError,
        message: uploadError.message,
        code: uploadError.code,
        serverResponse: uploadError.serverResponse
      });
      throw uploadError;
    }

    return NextResponse.json({ 
      success: true,
      message: `Chunk ${chunkIndex + 1} of ${totalChunks} uploaded successfully`
    });
  } catch (error) {
    console.error("Detailed chunk upload error:", {
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

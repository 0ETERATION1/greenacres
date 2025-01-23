import { NextResponse } from "next/server";

// Define a type for the form data
// type CustomFormData = FormData & {
//   append(name: string, value: string | Blob, fileName?: string): void;
// };

export async function POST(request: Request) {
  const FORMSPREE_ENDPOINT = process.env.FORMSPREE_ENDPOINT;

  if (!FORMSPREE_ENDPOINT) {
    return NextResponse.json(
      { error: "Formspree endpoint not configured" },
      { status: 500 }
    );
  }

  try {
    const formData = await request.formData();
    const service = formData.get("service");
    const size = formData.get("size");
    const details = formData.get("details");
    const video = formData.get("video");

    // Create new FormData for Formspree
    const formspreeData = new FormData();
    formspreeData.append("service", service as string);
    formspreeData.append("size", size as string);
    formspreeData.append("details", details as string);
    
    if (video) {
      formspreeData.append("video", video as Blob);
    }

    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      body: formspreeData,
    });

    if (!response.ok) {
      throw new Error("Formspree request failed");
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error submitting form:", error);
    return NextResponse.json(
      { error: "Failed to submit form" },
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

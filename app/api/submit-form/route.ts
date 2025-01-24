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
  const FORMSPREE_ENDPOINT = process.env.FORMSPREE_ENDPOINT;

  if (!FORMSPREE_ENDPOINT) {
    console.error("Formspree endpoint not configured");
    return NextResponse.json(
      { error: "Formspree endpoint not configured" },
      { status: 500 }
    );
  }

  try {
    const formData = await request.formData();
    
    // Log the received data
    console.log("Form data received:", {
      service: formData.get("service"),
      size: formData.get("size"),
      details: formData.get("details"),
      hasVideo: formData.has("video")
    });

    // Send directly to Formspree without recreating FormData
    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      body: formData,
      headers: {
        'Accept': 'application/json',
        // Remove Content-Type header to let the browser set it with the boundary
      },
    });

    const responseText = await response.text();
    let responseJson;
    try {
      responseJson = JSON.parse(responseText);
    } catch (e) {
      console.error("Failed to parse Formspree response as JSON:", responseText);
    }

    if (!response.ok) {
      return NextResponse.json(
        { 
          error: "Failed to submit form", 
          details: responseJson?.errors || responseText || `Formspree error: ${response.status} ${response.statusText}`
        },
        { status: response.status }
      );
    }

    return NextResponse.json({ 
      success: true,
      message: "Form submitted successfully"
    });

  } catch (error) {
    console.error("Error in form submission:", error);
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

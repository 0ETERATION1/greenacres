// src/pages/api/submit-form.ts
import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import { createReadStream } from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

// Define a type for the form data
type CustomFormData = FormData & {
  append(name: string, value: string | Blob, fileName?: string): void;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const FORMSPREE_ENDPOINT = process.env.FORMSPREE_ENDPOINT;

  if (!FORMSPREE_ENDPOINT) {
    return res.status(500).json({ error: "Formspree endpoint not configured" });
  }

  try {
    const form = formidable({});
    const [fields, files] = await form.parse(req);

    // Create FormData compatible with Node.js
    const formData = new FormData() as CustomFormData;
    formData.append("service", fields.service?.[0] || "");
    formData.append("size", fields.size?.[0] || "");
    formData.append("details", fields.details?.[0] || "");

    if (files.video) {
      const videoFile = files.video[0];
      const fileStream = createReadStream(videoFile.filepath);
      const chunks: Buffer[] = [];
      
      // Read the file data
      for await (const chunk of fileStream) {
        chunks.push(Buffer.from(chunk));
      }
      
      const fileData = Buffer.concat(chunks);
      const blob = new Blob([fileData], { type: videoFile.mimetype || "video/*" });
      
      // Append as Blob
      formData.append("video", blob, videoFile.originalFilename || "video");
    }

    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Formspree request failed");
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error submitting form:", error);
    res.status(500).json({ error: "Failed to submit form" });
  }
}
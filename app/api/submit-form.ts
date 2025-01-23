import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const form = formidable({});
    const [fields, files] = await form.parse(req);

    const formData = new FormData();
    formData.append("service", fields.service?.[0] || "");
    formData.append("size", fields.size?.[0] || "");
    formData.append("details", fields.details?.[0] || "");
    
    if (files.video) {
      formData.append("video", files.video[0]);
    }

    // Use your Formspree endpoint here
    const FORMSPREE_ENDPOINT = process.env.FORMSPREE_ENDPOINT;
    const response = await fetch(FORMSPREE_ENDPOINT!, {
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
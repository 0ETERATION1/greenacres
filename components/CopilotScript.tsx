"use client";

import { useEffect } from "react";

export default function CopilotScript() {
  useEffect(() => {
    const loadCopilot = () => {
      const script = document.createElement("script");
      script.src =
        "https://secure.copilotcrm.com/widget/lp-requests_access_grant_0x.js";
      script.type = "text/javascript";
      script.setAttribute("lp_company", "7b18f385-61fa-4a26-bb55-bea4198a6257");

      script.onload = () => {
        console.log("Copilot script loaded successfully");
      };

      script.onerror = (error) => {
        console.error("Error loading Copilot script:", error);
      };

      document.body.appendChild(script);
    };

    loadCopilot();
  }, []);

  return null;
}

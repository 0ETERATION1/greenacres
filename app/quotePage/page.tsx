"use client";

import { useEffect } from "react";

// Define the Copilot interface
interface CopilotWindow extends Window {
  Copilot?: {
    openRequestForm: (id: string) => void;
  };
}

export default function QuotePage() {
  useEffect(() => {
    // Try to show the form when this page loads
    if (typeof window !== "undefined") {
      const element = document.getElementById(
        "7b18f385-61fa-4a26-bb55-bea4198a6257"
      );
      if (element) {
        element.style.display = "block";
      }

      // If Copilot is loaded, try to open the form
      const win = window as CopilotWindow;
      if (win.Copilot) {
        win.Copilot.openRequestForm("7b18f385-61fa-4a26-bb55-bea4198a6257");
      }
    }
  }, []);

  return (
    <div className="quote-page">
      <h1>Request a Quote</h1>
      <div
        id="7b18f385-61fa-4a26-bb55-bea4198a6257"
        className="copilot-request-container copilot-preview-loader"
      />
    </div>
  );
}

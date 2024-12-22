"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface CopilotWindow extends Window {
  Copilot?: {
    openRequestForm: (id: string) => void;
  };
}

export default function QuotePage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    // Check if the script is already loaded

    if (
      !document.querySelector(
        'script[src="https://secure.copilotcrm.com/widget/lp-requests_access_grant_0x.js"]'
      )
    ) {
      const script = document.createElement("script");

      script.src =
        "https://secure.copilotcrm.com/widget/lp-requests_access_grant_0x.js";

      script.type = "text/javascript";

      script.setAttribute("lp_company", "7b18f385-61fa-4a26-bb55-bea4198a6257");

      script.onload = () => {
        const win = window as CopilotWindow;

        if (win.Copilot) {
          win.Copilot.openRequestForm("7b18f385-61fa-4a26-bb55-bea4198a6257");
        }
      };

      document.body.appendChild(script);
    } else {
      // If script is already loaded, just open the form

      const win = window as CopilotWindow;

      if (win.Copilot) {
        win.Copilot.openRequestForm("7b18f385-61fa-4a26-bb55-bea4198a6257");
      }
    }

    // Cleanup function to avoid duplicate scripts if component is unmounted

    return () => {
      const existingScript = document.querySelector(
        'script[src="https://secure.copilotcrm.com/widget/lp-requests_access_grant_0x.js"]'
      );

      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  if (!isMounted) {
    return (
      <div className="quote-page">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="quote-page">
      <div className="text-center py-5">
        <Link
          href="/"
          className="
                inline-block px-4 py-2
                bg-gradient-to-r from-green-600 to-green-700
                text-white
                rounded-md
                transition-transform duration-300 ease-in-out
                hover:-translate-y-0.5
                shadow-md
                whitespace-nowrap
                w-[140px]
                text-center
                
              "
          style={{ fontWeight: 500 }}
        >
          Return home 🏠
          {/* <span>Free Quote!</span> <span className="text-lg">🌳</span> */}
        </Link>
      </div>

      <div
        id="7b18f385-61fa-4a26-bb55-bea4198a6257"
        className="copilot-request-container copilot-preview-loader"
      />
    </div>
  );
}

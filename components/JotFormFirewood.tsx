"use client";
import { useEffect } from "react";

export default function JotFormFirewood() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://form.jotform.com/jsform/213034589821053";
    script.type = "text/javascript";
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return <div id="jotform-container" className="px-4 py-8 md:px-8 lg:px-16" />;
}

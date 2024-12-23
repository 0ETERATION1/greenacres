"use client";
import { useEffect, useRef } from "react";

export default function JotFormFirewood() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Store the current ref value
    const containerElement = containerRef.current;

    // Create and append the script to the container
    const script = document.createElement("script");
    script.src = "https://form.jotform.com/jsform/213034589821053";
    script.type = "text/javascript";
    script.async = true;

    if (containerElement) {
      containerElement.appendChild(script);
    }

    return () => {
      // Cleanup: remove all JotForm elements within the container
      if (containerElement) {
        containerElement.innerHTML = "";
      }
    };
  }, []);

  return (
    <div
      id="jotform-container"
      className="px-4 py-8 md:px-8 lg:px-16"
      ref={containerRef}
    />
  );
}

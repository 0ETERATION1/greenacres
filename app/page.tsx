// app/page.tsx
"use client"; // Add this directive at the very top

import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import MainBanner from "@/components/MainBanner";
import PropertySection from "@/components/PropertySection";
import FirewoodSection from "@/components/FirewoodSection";
import Footer from "@/components/Footer";

export default function Home() {
  useEffect(() => {
    // Remove all JotForm elements
    document
      .querySelectorAll('iframe[src*="213034589821053"]')
      .forEach((e) => e.remove());
    document
      .querySelectorAll('form[action*="jotform"]')
      .forEach((e) => e.remove());
    document
      .querySelectorAll('style[id*="jotform"]')
      .forEach((e) => e.remove());
    document.querySelectorAll('[id*="jotform"]').forEach((e) => e.remove());
  }, []);

  return (
    <>
      <Navbar />
      <MainBanner />
      <PropertySection />
      <FirewoodSection />
      <Footer />
    </>
  );
}

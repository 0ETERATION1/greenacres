"use client";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const JotFormFirewood = dynamic(() => import("@/components/JotFormFirewood"), {
  ssr: false,
});

export default function FirewoodPage() {
  useEffect(() => {
    // Additional logic if needed
  }, []);

  return (
    <>
      <Navbar />
      <JotFormFirewood />
      <Footer />
    </>
  );
}

"use client";

// Remove the Image import
// import Image from "next/image";
import { useRouter } from "next/navigation";

export default function MainBanner() {
  const router = useRouter();

  return (
    <section className="main-banner">
      <img
        src="/assets/images/bg/pattern/beautifulTurf.jpg"
        alt="Beautiful lawn"
        className="banner-background absolute inset-0 w-full h-full object-cover"
      />
      <div className="banner-overlay" />
      <div className="banner-content">
        <h1 className="banner-title">
          We Make Lawn
          <br />
          Care Easy.
        </h1>
        <h2 className="banner-subtitle">
          Mowing, Fertilizer and Weed Control. We&apos;ve got you covered.
        </h2>
        <button
          onClick={() => router.push("/quotePage")}
          className="cta-button"
        >
          Get a free quote! 🌳
        </button>
      </div>
    </section>
  );
}

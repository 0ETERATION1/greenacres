"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function MainBanner() {
  const router = useRouter();

  return (
    <section className="main-banner">
      <Image
        src="/assets/images/bg/pattern/beautifulTurf.jpg"
        alt="Beautiful lawn"
        fill
        priority
        quality={100}
        className="banner-background"
      />
      <div className="banner-overlay" />
      <div className="banner-content">
        <h1 className="banner-title">
          We Make Lawn
          <br />
          Care Easy.
        </h1>
        <h2 className="banner-subtitle">
          From mowing and lawn treatments to landscaping and hardscaping.
          We&apos;ve got you covered.
        </h2>
        <button
          onClick={() => router.push("/quotePage")}
          className="cta-button"
        >
          Get a Free Quote Today! 🌳
        </button>
      </div>
    </section>
  );
}

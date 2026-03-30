"use client";

// Remove the Image import
// import Image from "next/image";
import { useRouter } from "next/navigation";
import BannerSocialProof from "./BannerSocialProof";

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
      <div className="hero-banner-inner">
        <h1 className="banner-title">
          <span className="banner-title-line1">Family Owned Lawn Care</span>
          <br />
          You Can Count On.
        </h1>
        <h2 className="banner-subtitle">
          <span className="banner-subtitle-desktop">
            Always on schedule. Easy to work with. Serving North Potomac,
            Rockville, and nearby Montgomery County neighborhoods for over 30
            years.
          </span>
          <span className="banner-subtitle-mobile">
            Reliable, easy to work with. 30+ years in Montgomery County.
          </span>
        </h2>
        {/* Social proof style: "minimal" | "scorecard" | "stripe" | "glass" */}
        <BannerSocialProof variant="minimal" />
        <button
          onClick={() => router.push("/quotePage")}
          className="cta-button"
        >
          Get a free quote! 🌳
        </button>
      </div>

      {/* Scroll indicator — desktop only; hidden on tablet/phone */}
      <div className="hero-scroll-indicator" aria-hidden>
        <span className="hero-scroll-label">Scroll</span>
        <svg
          className="hero-scroll-arrow"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </section>
  );
}

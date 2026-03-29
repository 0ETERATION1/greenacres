"use client";

// Remove the Image import
// import Image from "next/image";
import { useRouter } from "next/navigation";
import BannerSocialProof from "./BannerSocialProof";

const googleReviewsUrl = process.env.NEXT_PUBLIC_GOOGLE_REVIEWS_URL;

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
          <span className="banner-title-line1">Family Owned Lawn Care</span>
          <br />
          You Can Count On.
        </h1>
        <h2 className="banner-subtitle">
          Always on schedule. Easy to work with. Serving North Potomac,
          Rockville, and nearby Montgomery County neighborhoods for over 30
          years.
        </h2>
        {/* Social proof style: "minimal" | "scorecard" | "stripe" | "glass" */}
        <BannerSocialProof googleReviewsUrl={googleReviewsUrl} variant="minimal" />
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

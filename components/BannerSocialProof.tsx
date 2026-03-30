"use client";

import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import { GOOGLE_REVIEWS_URL } from "@/lib/constants";

/** Short excerpts from real customer feedback (CRM). Rotate for variety. */
const FEATURED_REVIEWS: { quote: string; attribution: string }[] = [
  {
    quote:
      "Bradley was responsive and easy to communicate with. The crew came just as promised—great job, thorough, and fast.",
    attribution: "David",
  },
  {
    quote: "Great work and efficient",
    attribution: "Honey",
  },

  {
    quote:
      "This is our 3rd landscaping company and you are the best. You solved our clover problem in one summer.",
    attribution: "Tomi",
  },
  {
    quote:
      "We have been a long time customer of Green Acres. Very reliable service—customer service excellent.",
    attribution: "Scott",
  },
  {
    quote:
      "The team at Green Acres does an excellent job. Highly recommend them to help you with your yard efforts.",
    attribution: "Scott S.",
  },
  {
    quote: "Very happy with you service.",
    attribution: "Mani",
  },
  {
    quote:
      "Great crew who delivered the firewood and stacked it very well. This is the third winter I have bought firewood from Green Acres and am happy with their service. They are always friendly and responsive.",
    attribution: "Geoffry",
  },
  {
    quote:
      "We have been a long time customer of Green Acres, previously known as Adrian Lawn services. Very reliable service, customer service is excellent.",
    attribution: "Gordon",
  },
  {
    quote: "Very good, on time for mowing, excellent service.",
    attribution: "Art",
  },
  {
    quote:
      "I am a brand new customer and I can say that Green Acres is truly 5 Stars! They take pride in their work and customer service.",
    attribution: "David",
  },
  {
    quote: "Always a pleasure to see them again each year.",
    attribution: "Jeff",
  },
];

export type BannerSocialProofVariant =
  | "minimal" // Airy: no box, stars + quote inline
  | "scorecard" // Bold 4.9 + stars + quote block
  | "stripe" // Left accent bar, soft panel
  | "glass"; // Frosted card (original)

type BannerSocialProofProps = {
  /** Try: minimal | scorecard | stripe | glass */
  variant?: BannerSocialProofVariant;
};

function StarRow({ className }: { className?: string }) {
  return (
    <div className={className} aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className="banner-sp-star"
          fill="currentColor"
          strokeWidth={0}
          size={22}
        />
      ))}
    </div>
  );
}

/** Clarifies rotating quotes are from CRM, not Google (avoids cross-reference confusion). */
function CrmSourceNote({ className }: { className?: string }) {
  return (
    <p className={className} role="note">
      Copilot CRM feedback—not Google reviews.
    </p>
  );
}

function TrustMeta({ className }: { className?: string }) {
  return (
    <p className={className}>
      100+{" "}
      <a
        href={GOOGLE_REVIEWS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="banner-trust-line-link"
      >
        Google Reviews
      </a>{" "}
      • 4.9 Stars • Family-Owned • Licensed & Insured
    </p>
  );
}

export default function BannerSocialProof({
  variant = "minimal",
}: BannerSocialProofProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % FEATURED_REVIEWS.length);
    }, 8000);
    return () => window.clearInterval(id);
  }, []);

  const current = FEATURED_REVIEWS[index];
  const rootClass = `banner-social-proof banner-social-proof--${variant}`;

  if (variant === "scorecard") {
    return (
      <div className={rootClass}>
        <div className="banner-sp-scorecard-top">
          <span className="banner-sp-big-num">4.9</span>
          <StarRow className="banner-sp-stars banner-sp-stars--amber" />
          <span className="banner-sp-on-google">customer-rated on Google</span>
        </div>
        <blockquote className="banner-sp-blockquote">
          <p key={index} className="banner-sp-quote-text banner-sp-quote-slot">
            &ldquo;{current.quote}&rdquo;
          </p>
          <footer className="banner-sp-attrib">— {current.attribution}</footer>
        </blockquote>
        <CrmSourceNote className="banner-sp-crm-note banner-sp-crm-note--scorecard" />
        <TrustMeta className="banner-trust-meta banner-trust-meta--scorecard" />
      </div>
    );
  }

  if (variant === "minimal") {
    return (
      <div className={rootClass}>
        <div className="banner-sp-minimal-row">
          <StarRow className="banner-sp-stars banner-sp-stars--minimal" />
          <blockquote className="banner-sp-blockquote banner-sp-blockquote--minimal">
            <p
              key={index}
              className="banner-sp-quote-text banner-sp-quote-text--minimal banner-sp-quote-slot"
            >
              &ldquo;{current.quote}&rdquo;
            </p>
            <footer className="banner-sp-attrib banner-sp-attrib--minimal">
              — {current.attribution}
            </footer>
          </blockquote>
          <CrmSourceNote className="banner-sp-crm-note banner-sp-crm-note--minimal" />
        </div>
        <TrustMeta className="banner-trust-meta banner-trust-meta--minimal" />
      </div>
    );
  }

  if (variant === "stripe") {
    return (
      <div className={rootClass}>
        <div className="banner-sp-stripe-inner">
          <StarRow className="banner-sp-stars banner-sp-stars--stripe" />
          <blockquote className="banner-sp-blockquote">
            <p
              key={index}
              className="banner-sp-quote-text banner-sp-quote-slot"
            >
              &ldquo;{current.quote}&rdquo;
            </p>
            <footer className="banner-sp-attrib">
              — {current.attribution}
            </footer>
          </blockquote>
          <CrmSourceNote className="banner-sp-crm-note banner-sp-crm-note--stripe" />
        </div>
        <TrustMeta className="banner-trust-meta" />
      </div>
    );
  }

  /* glass */
  return (
    <div className={rootClass}>
      <div className="banner-sp-glass-row">
        <StarRow className="banner-sp-stars banner-sp-stars--glass" />
        <blockquote className="banner-sp-blockquote">
          <p key={index} className="banner-sp-quote-text banner-sp-quote-slot">
            &ldquo;{current.quote}&rdquo;
          </p>
          <footer className="banner-sp-attrib">— {current.attribution}</footer>
        </blockquote>
        <CrmSourceNote className="banner-sp-crm-note banner-sp-crm-note--glass" />
      </div>
      <TrustMeta className="banner-trust-meta" />
    </div>
  );
}

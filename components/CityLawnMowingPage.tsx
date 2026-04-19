"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { GOOGLE_REVIEWS_URL } from "@/lib/constants";

interface CityLawnMowingPageProps {
  city: string;
}

const photos: { src: string; alt: string }[] = [
  {
    src: "/assets/images/portfolio/lawn/lawn1.jpg",
    alt: "Freshly mowed residential lawn",
  },
  {
    src: "/assets/images/portfolio/lawn/lawn2.jpg",
    alt: "Well-maintained front yard after mowing service",
  },
  {
    src: "/assets/images/portfolio/lawn/landscaping1.jpg",
    alt: "Landscaped property maintained by Green Acres",
  },
  {
    src: "/assets/images/port/LawnMaintenance/Nick mowing a larger property we maintain_.jpg",
    alt: "Green Acres team member mowing a larger property",
  },
  {
    src: "/assets/images/port/dadMowing.jpg",
    alt: "Green Acres owner mowing a neighborhood lawn",
  },
];

const reviews: { quote: string; name: string }[] = [
  {
    quote:
      "They've mowed our yard every week like clockwork. Easy to work with and the lawn always looks great.",
    name: "Lisa P.",
  },
  {
    quote:
      "Signed up once and haven't had to think about it since. Good communication when weather moves the schedule.",
    name: "Mark R.",
  },
  {
    quote:
      "Family-owned, responsive, and fair pricing. We've recommended them to neighbors.",
    name: "Jen K.",
  },
];

export default function CityLawnMowingPage({ city }: CityLawnMowingPageProps) {
  const mapsEmbedKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY;
  const mapSrc = mapsEmbedKey
    ? `https://www.google.com/maps/embed/v1/place?key=${mapsEmbedKey}&q=${encodeURIComponent(
        `${city}, MD`
      )}&zoom=12`
    : null;

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="pt-24 pb-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6 text-[#0cabba]">
              Weekly Lawn Mowing in {city}
            </h1>
            <p className="text-xl leading-relaxed text-gray-700 mb-6">
              Green Acres provides recurring lawn mowing and seasonal lawn care
              for homeowners in {city} and nearby Montgomery County
              neighborhoods. We are a family-owned company known for consistent
              service, easy communication, and easy setup.
            </p>
            <p className="text-sm font-semibold text-gray-600 tracking-wide">
              100+{" "}
              <a
                href={GOOGLE_REVIEWS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0cabba] underline underline-offset-2 hover:opacity-80 transition-opacity"
              >
                Google Reviews
              </a>{" "}
              • 4.9 Stars • Family-Owned • Licensed &amp; Insured
            </p>
          </div>
        </div>
      </section>

      {/* 3 bullets */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6 text-center">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold mb-2 text-[#0cabba]">
                Always on schedule
              </h3>
              <p className="text-gray-600 text-sm">
                Recurring service that shows up the same day each week.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold mb-2 text-[#0cabba]">
                Clear weather updates
              </h3>
              <p className="text-gray-600 text-sm">
                Simple communication when rain or storms move the schedule.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold mb-2 text-[#0cabba]">
                Real local service
              </h3>
              <p className="text-gray-600 text-sm">
                A family-owned company working in the neighborhoods we know.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Photos */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8 text-[#0cabba]">
              Recent Work
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {photos.map((photo) => (
                <div
                  key={photo.src}
                  className="relative w-full aspect-[4/3] overflow-hidden rounded-lg shadow"
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    loading="lazy"
                    decoding="async"
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Service Area Map */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-3 text-[#0cabba]">
              Where We Serve
            </h2>
            <p className="text-center text-gray-600 mb-8">
              {city} and the surrounding Montgomery County neighborhoods.
            </p>

            {mapSrc ? (
              <div className="relative w-full aspect-video overflow-hidden rounded-lg shadow border border-gray-200">
                <iframe
                  title={`Map of ${city}, MD`}
                  src={mapSrc}
                  className="absolute inset-0 w-full h-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="rounded-lg border border-dashed border-gray-300 bg-white p-8 text-center text-gray-500">
                <p className="mb-1 font-medium text-gray-700">
                  Interactive map coming soon
                </p>
                <p className="text-sm">
                  We service {city} and nearby Montgomery County neighborhoods.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8 text-[#0cabba]">
              What Neighbors Say
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {reviews.map((review) => (
                <div
                  key={review.name}
                  className="bg-white rounded-lg shadow p-6 flex flex-col"
                >
                  <p className="text-gray-700 italic mb-4">
                    &ldquo;{review.quote}&rdquo;
                  </p>
                  <p className="text-sm font-semibold text-gray-600 mt-auto">
                    — {review.name}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-center text-sm text-gray-500 mt-6">
              Read all of our reviews on{" "}
              <a
                href={GOOGLE_REVIEWS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0cabba] underline underline-offset-2 hover:opacity-80 transition-opacity"
              >
                Google
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-[#0cabba]">
            Ready for easy, reliable lawn care in {city}?
          </h2>
          <Link href="/quotePage" className="cta-button">
            Get a Free Quote 🌳
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}

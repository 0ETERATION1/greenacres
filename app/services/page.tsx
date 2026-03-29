"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface ServiceCardProps {
  title: string;
  description: string;
  imagePath: string;
  isVideo?: boolean;
  note?: string;
}

export default function ServicesPage() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-white">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold text-center mb-4 text-[#0cabba]">
            Our Services
          </h1>

          {/* Trust line */}
          <p className="text-center text-sm font-semibold text-gray-600 mb-6 tracking-wide">
            100+{" "}
            {process.env.NEXT_PUBLIC_GOOGLE_REVIEWS_URL ? (
              <a
                href={process.env.NEXT_PUBLIC_GOOGLE_REVIEWS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-[#0cabba] transition-colors"
              >
                Google Reviews
              </a>
            ) : (
              "Google Reviews"
            )}{" "}
            • 4.9 Stars • Family-Owned • Licensed &amp; Insured
          </p>

          <p className="text-xl text-center max-w-3xl mx-auto text-gray-700">
            Simple, dependable services for Montgomery County homeowners. We
            focus on recurring mowing, turf care, mulch, cleanup, trimming, and
            seasonal property maintenance.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid gap-12">
            <ServiceCard
              title="Lawn Maintenance"
              description="Our recurring lawn maintenance service is built for maintained residential properties. We mow maintained turf, trim around normal obstacles, edge where included, and blow hard surfaces clean at the end of service. We show up consistently and keep the process simple."
              note="Service details can vary by property size, layout, and condition. If a lawn is unusually overgrown or requires extra corrective work, we will explain that clearly before the visit."
              imagePath="/assets/images/portfolio/lawn/lawn1.jpg"
            />

            <ServiceCard
              title="6-Step Weed Control & Fertilizer Program for Montgomery County Lawns"
              description="Our turf program is designed for Montgomery County lawns, with a strong focus on tall fescue. We use seasonally timed applications to improve color, density, weed control, and overall lawn health while following local regulations."
              imagePath="/assets/images/port/weed1.jpg"
            />

            <ServiceCard
              title="Mulch Installation"
              description="Fresh mulch improves the appearance of your beds and helps retain moisture and suppress weeds. We install mulch with clean preparation and a neat finished look."
              imagePath="/assets/images/port/mulchInstallation.jpg"
            />

            <ServiceCard
              title="Hand Weeding for Mulch Beds"
              description="We remove weeds from mulch beds by hand to keep landscaped areas clean and maintained without unnecessary damage to surrounding plants."
              imagePath="/assets/images/port/weedpulling.jpg"
            />

            <ServiceCard
              title="Bush Trimming"
              description="We trim shrubs and hedges to keep them neat, healthy, and in scale with the property. Our goal is a clean look without overcutting or forcing unnatural shapes."
              imagePath="/assets/images/port/bushTrimming2.jpg"
            />

            <ServiceCard
              title="Plant & Small Tree Installation"
              description="We install plants and small trees that fit the property, the space, and the maintenance goals. We focus on practical choices that look good and establish well over time."
              imagePath="/assets/images/port/plantInstall3.jpg"
            />

            <ServiceCard
              title="Sod Installation"
              description="Our Sod Installation Service provides a quick and effective solution for achieving a lush, green lawn. From site preparation to laying fresh, high-quality sod, we handle every step with precision and care to ensure proper rooting and long-lasting results. Whether you're starting fresh or repairing damaged areas, our service transforms your outdoor space into a vibrant, healthy lawn with minimal downtime, delivering instant curb appeal and a durable foundation for future growth."
              imagePath="/assets/images/port/sod/Property where large sections of the front lawn were replaced with fresh sod 2.jpg"
            />

            <ServiceCard
              title="Leaf Removal"
              description="Our Fall Leaf Removal Service ensures your property remains clean and well-maintained as the seasons change. We efficiently remove leaves from your lawn, garden beds, and hard surfaces, preventing unsightly buildup and potential damage to your grass. Using professional equipment, we leave your property spotless, allowing your outdoor spaces to thrive through the cooler months while enhancing the overall appearance of your landscape."
              imagePath="/assets/images/port/leafRemoval.mp4"
              isVideo={true}
            />

            {/* Add remaining services... */}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

function ServiceCard({
  title,
  description,
  imagePath,
  isVideo = false,
  note,
}: ServiceCardProps) {
  return (
    <div className="flex flex-col md:flex-row gap-8 items-start bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="w-full md:w-1/3 h-[300px] relative">
        {isVideo ? (
          <video
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            controls
          >
            <source src={imagePath} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <img
            src={imagePath}
            alt={title}
            className="object-cover w-full h-full"
            loading="lazy"
            decoding="async"
          />
        )}
      </div>
      <div className="w-full md:w-2/3 p-8">
        <h2 className="text-2xl font-bold mb-4 text-[#0cabba]">{title}</h2>
        <p className="text-gray-700 leading-relaxed">{description}</p>
        {note && (
          <p className="mt-4 text-sm text-gray-500 italic border-t border-gray-100 pt-3">
            {note}
          </p>
        )}
      </div>
    </div>
  );
}

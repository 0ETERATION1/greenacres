"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";

interface ServiceCardProps {
  title: string;
  description: string;
  imagePath: string;
}

export default function ServicesPage() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-white">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold text-center mb-8 text-[#0cabba]">
            Our Services
          </h1>
          <p className="text-xl text-center max-w-3xl mx-auto text-gray-700">
            From comprehensive lawn care to landscape transformations, we
            provide professional services tailored to Montgomery County&apos;s
            unique environment.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid gap-12">
            <ServiceCard
              title="6-Step Weed Control & Fertilizer Program"
              description="Our 6-step weed control and fertilizer program is designed to enhance the health and beauty of all grass types commonly found in Montgomery County, Maryland, with a particular focus on optimizing tall fescue grass. This program combines precision weed control and balanced fertilizers tailored to promote robust growth, vivid color, and resilience against weeds. Following all Montgomery County regulations, our program provides environmentally responsible care, ensuring a lush, thriving lawn while protecting our local ecosystem."
              imagePath="/assets/images/services/fertilizer.jpg"
            />

            <ServiceCard
              title="Weekly Lawn Maintenance Service"
              description="Our Weekly Lawn Maintenance Service is designed to keep your lawn in Montgomery County looking lush, neat, and vibrant throughout the season. Using professional-grade mowers with sharp blades, we deliver a clean, precise cut that promotes healthier grass growth. We also string-trim hard-to-reach areas, expertly edge flower beds, and use a metal blade edger for sharp, defined borders along walkways and driveways. After carefully mowing and edging, we blow away all grass clippings from hard surfaces, leaving your property spotless."
              imagePath="/assets/images/services/mowing.jpg"
            />

            {/* Add remaining services... */}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

function ServiceCard({ title, description, imagePath }: ServiceCardProps) {
  return (
    <div className="flex flex-col md:flex-row gap-8 items-start bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="md:w-1/3 relative h-[300px]">
        <Image src={imagePath} alt={title} fill className="object-cover" />
      </div>
      <div className="md:w-2/3 p-8">
        <h2 className="text-2xl font-bold mb-4 text-[#0cabba]">{title}</h2>
        <p className="text-gray-700 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

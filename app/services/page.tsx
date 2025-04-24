"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface ServiceCardProps {
  title: string;
  description: string;
  imagePath: string;
  isVideo?: boolean;
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
              title="Lawn Maintenance"
              description="Our lawn maintenance service ensures your lawn in Montgomery County stays pristine, healthy, and vibrant all season long. With professional-grade mowers and razor-sharp blades, we provide a precise cut that encourages robust grass growth. Hard-to-reach areas are meticulously trimmed, flower beds expertly edged, and walkways and driveways bordered with a clean, defined finish using a metal blade edger. To complete the service, we thoroughly clear all grass clippings from hard surfaces, leaving your property polished and immaculate."
              imagePath="/assets/images/portfolio/lawn/lawn1.jpg"
            />

            <ServiceCard
              title="6-Step Weed Control & Fertilizer Program for Montgomery County Lawns"
              description="Our 6-step weed control and fertilizer program is designed to enhance the health and beauty of all grass types commonly found in Montgomery County, Maryland, with a particular focus on optimizing tall fescue grass. This program combines precision weed control and balanced fertilizers tailored to promote robust growth, vivid color, and resilience against weeds.

Following all Montgomery County regulations, our program provides environmentally responsible care, ensuring a lush, thriving lawn while protecting our local ecosystem. Whether you have tall fescue or another grass type, trust us to help your lawn reach its full potential.
"
              imagePath="/assets/images/port/weed1.jpg"
            />

            <ServiceCard
              title="Mulch Installation"
              description="Our Mulch Installation Service enhances the beauty and health of your landscaping by providing a fresh, professional layer of mulch to your garden beds. Mulch not only improves the visual appeal of your outdoor spaces but also helps retain soil moisture, regulate temperature, and suppress weed growth. We carefully prepare the area, ensuring even distribution and clean edges for a polished, finished look that protects and enriches your plants while adding a touch of elegance to your property."
              imagePath="/assets/images/port/mulchInstallation.jpg"
            />

            <ServiceCard
              title="Precise Hand Weeding for Mulch Beds"
              description="Our meticulous hand weeding service for mulch beds is tailored to maintain the health and aesthetics of your landscaped areas. By carefully removing weeds at the root, we ensure a clean, polished look while protecting the integrity of your mulch beds. This eco-friendly approach promotes healthier plants and a well-maintained garden without the use of harsh chemicals, providing a sustainable solution that enhances the beauty of your outdoor spaces."
              imagePath="/assets/images/port/weedpulling.jpg"
            />

            <ServiceCard
              title="Bush Trimming"
              description="Our Bush Trimming Service is designed to keep your shrubs and hedges looking neat, healthy, and well-maintained. We carefully shape and prune each bush to promote natural growth, enhance aesthetics, and prevent overgrowth. Using professional-grade tools, we ensure clean, precise cuts that improve the overall appearance of your landscaping while supporting the long-term health and vitality of your plants."
              imagePath="/assets/images/port/bushTrimming2.jpg"
            />

            <ServiceCard
              title="Plant & Small Tree Installation"
              description="Our Fall Leaf Removal Service ensures your property remains clean and well-maintained as the seasons change. We efficiently remove leaves from your lawn, garden beds, and hard surfaces, preventing unsightly buildup and potential damage to your grass. Using professional equipment, we leave your property spotless, allowing your outdoor spaces to thrive through the cooler months while enhancing the overall appearance of your landscape."
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
      </div>
    </div>
  );
}

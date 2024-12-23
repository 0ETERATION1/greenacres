"use client";

import React from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6 text-[#0cabba]">
              Its about family
            </h1>
            <p className="text-xl leading-relaxed mb-8">
              For over three decades, Green Acres has been a true family
              business, passed down from father to son. Our deep roots in
              Montgomery County mean we treat every property as if it were our
              own. Whether we&apos;re maintaining your garden or transforming
              your landscape, our family brings the same dedication and
              attention to detail that we&apos;ve maintained since 1990. We
              believe that creating beautiful outdoor spaces isn&apos;t just
              about expertise – it&apos;s about caring for our community, one
              yard at a time.
            </p>
          </div>
        </div>
      </section>

      {/* Hero Image */}
      <section className="relative h-[45vh]">
        <div className="w-full h-full relative">
          <Image
            src="/assets/images/port/startsFamily.jpg"
            alt="Family working together"
            fill
            className="object-cover"
            priority
          />
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-xl text-gray-700 leading-relaxed">
              To provide exceptional landscaping services while nurturing the
              beauty of nature and exceeding our customers&apos; expectations
              through dedication, integrity, and expertise.
            </p>
          </div>
        </div>
      </section>

      {/* History Timeline */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Our Journey</h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid gap-12">
              <TimelineItem
                year="1990"
                title="Where It All Began"
                description="Green Acres was founded with a single truck and a passion for creating beautiful outdoor spaces."
              />
              <TimelineItem
                year="2000"
                title="Growing Strong"
                description="Expanded our services to include commercial landscaping and began serving the entire Montgomery County."
              />
              <TimelineItem
                year="2022"
                title="Innovation in Service"
                description="Introduced eco-friendly practices and sustainable landscaping solutions."
              />
              <TimelineItem
                year="2023"
                title="Looking Forward"
                description="Continuing our commitment to excellence while embracing new technologies and sustainable practices."
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <ValueCard
              title="Excellence"
              description="We strive for excellence in every project, no matter the size."
              icon="🌟"
            />
            <ValueCard
              title="Integrity"
              description="We conduct our business with honesty and transparency."
              icon="🤝"
            />
            <ValueCard
              title="Sustainability"
              description="We're committed to environmental stewardship in all our practices."
              icon="🌱"
            />
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

// Component for Timeline Items
function TimelineItem({
  year,
  title,
  description,
}: {
  year: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-8">
      <div className="text-2xl font-bold text-green-700 w-24">{year}</div>
      <div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-700">{description}</p>
      </div>
    </div>
  );
}

// Component for Value Cards
function ValueCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: string;
}) {
  return (
    <div className="text-center p-6 rounded-lg shadow-lg bg-white">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-700">{description}</p>
    </div>
  );
}

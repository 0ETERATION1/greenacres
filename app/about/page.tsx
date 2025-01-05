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
              A Legacy of Excellence
            </h1>
            <p className="text-xl leading-relaxed mb-8">
              At Green Acres Landscaping, we embody a legacy of exceptional
              service deeply rooted in North Potomac. Founded by Adrian Guerra,
              whose inspiring journey from Guatemala exemplifies the American
              dream, our company stands as a testament to unwavering dedication
              and craftsmanship. Today, under the leadership of Bradley and
              Nicholas Guerra, we continue our father&apos;s vision of
              excellence. Having grown up on Travilah Road and attended local
              schools, our connection to this community runs deep. We bring not
              only professional expertise but an intimate understanding of our
              region&apos;s unique landscaping needs. This blend of local
              knowledge, family values, and professional excellence has
              established Green Acres as a trusted name in Montgomery County for
              over three decades.
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
            <h2 className="text-3xl font-bold mb-6 text-[#0cabba]">
              Our Mission
            </h2>
            <p className="text-xl leading-relaxed">
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
          <h2 className="text-3xl font-bold text-center mb-16 text-[#0cabba]">
            Our Journey
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid gap-12">
              <TimelineItem
                year="1985"
                title="A Dream Takes Root"
                description="Adrian Guerra arrived in North Potomac from Guatemala, carrying with him a vision and an unwavering work ethic that would later become the foundation of Green Acres Landscaping."
              />
              <TimelineItem
                year="1990"
                title="Green Acres is Born"
                description="Adrian Guerra established Green Acres Landscaping with a single truck and an unshakeable commitment to quality service. His dedication to the North Potomac community laid the groundwork for what would become a trusted local institution."
              />
              <TimelineItem
                year="2000-2010"
                title="Growing Deep Community Roots"
                description="As Bradley and Nicholas Guerra grew up on Travilah Road and attended Stone Mill Elementary, the business flourished alongside the family's deep connection to the community. Our understanding of local landscapes and climate became second nature."
              />
              <TimelineItem
                year="2015"
                title="The Next Generation"
                description="The Guerra brothers, Bradley and Nicholas, began taking on leadership roles, bringing fresh perspectives while maintaining their father's commitment to excellence and community service."
              />
              <TimelineItem
                year="2020"
                title="Expanding Our Legacy"
                description="Under the Guerra brothers' leadership, we expanded our services while staying true to our father's vision. Our intimate knowledge of North Potomac's unique landscaping needs has helped us better serve our neighbors."
              />
              <TimelineItem
                year="Present Day"
                title="Continuing the Tradition"
                description="Today, we proudly carry forward our father's legacy, combining decades of experience with modern sustainable practices. Our family's journey from Guatemala to establishing a trusted name in Montgomery County continues to inspire our dedication to excellence."
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
              title="Reliability"
              description="We provide consistent and dependable lawn care services. Our team never misses a mow, delivering reliable landscaping maintenance that homeowners and businesses can trust. With professional communication and attention to detail, we ensure your lawn stays in pristine condition year-round."
              icon="✅"
            />

            <ValueCard
              title="Quality"
              description="Our experienced landscaping crew specializes in delivering high-quality lawn care. From perfectly manicured lawns to expertly trimmed hedges, we never cut corners. With a focus on sustainable practices, we use top-tier equipment and techniques to achieve beautiful, eco-friendly results that enhance your property’s curb appeal."
              icon="🌟"
            />

            <ValueCard
              title="Integrity"
              description="At Green Acres Landscaping we operate with honesty and transparency in all our landscaping and lawn care services. Clients trust us to provide clear communication, reliable service, and environmentally conscious practices that align with their values. From pricing to performance, integrity is at the heart of what we do."
              icon="🤝"
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
    <div className="flex gap-8 items-start">
      <div className="text-2xl font-bold text-[#0f8c20] w-32 flex-shrink-0">
        {year}
      </div>
      <div className="flex-1">
        <h3 className="text-2xl font-bold mb-3">{title}</h3>
        <p className="text-gray-700 text-lg leading-relaxed">{description}</p>
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

"use client";

import React from "react";
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
              At Green Acres Landscaping, we proudly carry forward a legacy of
              dedication, resilience, and exceptional service rooted in the
              heart of North Potomac. Founded by Adrian Guerra, whose journey
              from Guatemala to the United States embodies the spirit of
              perseverance and the American dream, Green Acres stands as a
              testament to the values of hard work and integrity. Now led by his
              sons, Bradley and Nicholas Guerra, the company combines decades of
              experience with modern sustainable practices. Our deep connection
              to the community, paired with an intimate understanding of its
              unique landscaping needs, allows us to deliver services that
              reflect both professionalism and care. For over 30 years, Green
              Acres Landscaping has remained a trusted partner to Montgomery
              County, transforming outdoor spaces while staying true to the
              values that shaped its foundation.
            </p>
          </div>
        </div>
      </section>

      {/* Hero Image */}
      <section className="relative h-[60vh]">
        <div className="w-full h-full relative">
          <img
            src="/assets/images/port/startsFamily.jpg"
            alt="Family working together"
            className="object-cover w-full h-full"
            loading="lazy"
            decoding="async"
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
                description="At just 20 years old, Adrian Guerra arrived in the United States from a small, rural town in Guatemala with no money, no knowledge of English, and a vision fueled by an unshakable work ethic. Despite coming from one of the poorest regions in his country, he carried with him the determination to build a better future—an ambition that would later become the foundation of Green Acres Landscaping."
              />
              <TimelineItem
                year="1990"
                title="Green Acres is Born"
                description="After five challenging years of mastering the landscaping trade and learning English, Adrian Guerra and his wife, Dora Chinchilla, planted the seeds of their future in North Potomac. They founded Green Acres Landscaping with a single truck and an unwavering commitment to delivering quality service. At the same time, they began building their family on Travilah Road, creating strong roots in the community. Their hard work and dedication laid the foundation for what would grow into a trusted local business.

"
              />
              <TimelineItem
                year="2000-2010"
                title="Growing Deep Community Roots"
                description="Adrian Guerra wasn't just a business owner in the community—he was part of it. His three children, Adriana, Bradley, and Nicholas, attended local schools, which gave Adrian an even deeper connection to the community he served. His involvement extended beyond work, as he became personally invested in taking care of the place his family called home. 


Bradley fondly recalls the time Adrian picked him up from elementary school on his lawn mower, a moment that perfectly captured both his love for his children and his passion for his work."
              />
              <TimelineItem
                year="2010-2020"
                title="The Next Generation"
                description="From a young age, Adrian Guerra instilled in his children the values that had guided his own journey: hard work, resilience, and unwavering dedication. He believed that success wasn't just about effort but about doing things the right way, with care and integrity. Whether it was helping with small tasks around the house or assisting with the family business, Adrian taught his children that giving anything less than their best was never an option. He led by example, showing them the importance of perseverance and pride in their work, lessons that continue to shape their lives and values today.

Bradley and Nicholas naturally began aligning their education and efforts with the goal of continuing their father's legacy. While Nicholas was finishing high school and working alongside Adrian after school, Bradley took his passion a step further by enrolling at Montgomery College to study horticulture and turfgrass management. In addition to his studies, Bradley spent every spare moment in the field, gaining invaluable hands-on experience with his father. Their combined efforts and dedication reflected a shared commitment to honoring and advancing the foundation Adrian had built.
"
              />
              {/* <TimelineItem
                year="2020"
                title="Expanding Our Legacy"
                description="Under the Guerra brothers' leadership, we expanded our services while staying true to our father's vision. Our intimate knowledge of North Potomac's unique landscaping needs has helped us better serve our neighbors."
              /> */}
              <TimelineItem
                year="2020-Present Day"
                title="Expanding Our Legacy"
                description="Passing the torch to his sons, the Guerra brothers took over the family business, building on decades of experience while incorporating modern sustainable practices. Their commitment to work is driven by the deep love they have for their family, their neighbors, and the community they proudly call home. With every project, they honor their father's principles of hard work, integrity, and dedication, ensuring that Green Acres Landscaping continues to thrive as a trusted name in Montgomery County. "
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
              description="Our experienced landscaping crew specializes in delivering high-quality lawn care. From perfectly manicured lawns to expertly trimmed hedges, we never cut corners. With a focus on sustainable practices, we use top-tier equipment and techniques to achieve beautiful, eco-friendly results that enhance your property's curb appeal."
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

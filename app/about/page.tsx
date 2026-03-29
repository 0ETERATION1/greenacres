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
              A Family-Owned Company Built on Consistency
            </h1>
            <p className="text-xl leading-relaxed mb-6 text-gray-700">
              Green Acres Landscaping has served Montgomery County for over 30
              years. Founded by Adrian Guerra and now led by Bradley and Nicholas
              Guerra, the company has grown through consistent service, long-term
              customer relationships, and a family-oriented approach to every
              project. We are proud to be a family-owned business rooted in North
              Potomac and trusted by homeowners across the surrounding area.
            </p>
            <p className="text-xl leading-relaxed text-gray-700">
              Our goal is simple: make lawn care easy, show up consistently, and
              take care of properties the right way.
            </p>
          </div>
        </div>
      </section>

      {/* Hero Image */}
      <section className="relative h-[50vh]">
        <img
          src="/assets/images/port/startsFamily.jpg"
          alt="The Guerra family — Green Acres Landscaping"
          className="object-cover w-full h-full"
          loading="lazy"
          decoding="async"
        />
      </section>

      {/* Company snapshot */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-[#0cabba] text-center">
              About Green Acres
            </h2>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="text-3xl font-bold text-[#0cabba] mb-2">30+</div>
                <p className="text-gray-600 text-sm font-medium">Years serving Montgomery County</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="text-3xl font-bold text-[#0cabba] mb-2">100+</div>
                <p className="text-gray-600 text-sm font-medium">Google reviews • 4.9 stars</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="text-3xl font-bold text-[#0cabba] mb-2">Family</div>
                <p className="text-gray-600 text-sm font-medium">Owned & operated — North Potomac</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* History — condensed */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto space-y-8">
            <h2 className="text-3xl font-bold text-center text-[#0cabba]">
              How We Got Here
            </h2>

            <div className="border-l-4 border-[#0cabba] pl-6 space-y-6 text-gray-700 text-lg leading-relaxed">
              <p>
                Adrian Guerra founded the company in North Potomac after building
                his landscaping skills over several years. Starting with a single
                truck, he grew a route-based business focused on recurring service
                and reliable results.
              </p>
              <p>
                Bradley and Nicholas grew up in the business, working alongside
                their father and learning the trade firsthand. Bradley studied
                horticulture and turfgrass management at Montgomery College.
                Nicholas focused on operations. Both took over day-to-day
                management as the next generation of the company.
              </p>
              <p>
                Today Green Acres focuses on what it has always done well:
                recurring mowing, turf care, seasonal maintenance, and dependable
                service for homeowners across Montgomery County.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Three values — short */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-10 text-[#0cabba]">
              What We Stand For
            </h2>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="text-3xl mb-3">✅</div>
                <h3 className="text-lg font-bold mb-2">Reliable</h3>
                <p className="text-gray-600 text-sm">
                  We show up on schedule and communicate clearly when something
                  changes.
                </p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="text-3xl mb-3">🌿</div>
                <h3 className="text-lg font-bold mb-2">Straightforward</h3>
                <p className="text-gray-600 text-sm">
                  Simple pricing, honest scopes, and no surprises on the day of
                  service.
                </p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="text-3xl mb-3">🤝</div>
                <h3 className="text-lg font-bold mb-2">Local</h3>
                <p className="text-gray-600 text-sm">
                  Family-owned and based in North Potomac. We work in the
                  neighborhoods we know.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

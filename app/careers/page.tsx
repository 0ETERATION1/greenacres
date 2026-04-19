"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function CareersPage() {
  return (
    <>
      <Navbar />

      <section className="pt-24 pb-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6 text-[#0cabba]">Careers</h1>
            <p className="text-xl leading-relaxed text-gray-700">
              We are always looking for dependable team members who care about
              quality service and take pride in their work.
            </p>
          </div>
        </div>
      </section>

      <section className="pt-10 pb-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white rounded-lg border border-gray-200 shadow-sm p-8 sm:p-10 text-gray-700 space-y-4">
            <h2 className="text-2xl font-bold text-[#0cabba]">Join Our Team</h2>
            <p>
              Green Acres has served Montgomery County for over 30 years, and we
              are proud to remain a family-owned company.
            </p>
            <p>
              If you are interested in future opportunities, email us at{" "}
              <a
                href="mailto:info@greenacresdmv.com"
                className="text-[#0cabba] underline underline-offset-2 hover:opacity-80 transition-opacity"
              >
                info@greenacresdmv.com
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

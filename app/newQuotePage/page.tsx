"use client";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { useState } from "react";

export default function QuotePage() {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="pt-24 pb-16 bg-white">
          <div className="container mx-auto px-4">
            <h1 className="text-5xl font-bold text-center mb-8 text-[#0cabba]">
              Get a Quote
            </h1>
            <p className="text-xl text-center max-w-3xl mx-auto text-gray-700">
              Choose your service below and let us help you transform your
              outdoor space into something extraordinary.
            </p>
          </div>
        </section>

        {/* Service Selection Section */}
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h2 className="text-2xl text-center font-semibold mb-4 bg-green-600 text-white shadow-lg p-4 rounded-t-lg">
                Select your Service
              </h2>
              {/* <p className="text-lg text-white bg-[#557A46] p-4 -mt-4">
              select service(s) below
            </p> */}

              {/* Service Selection Boxes */}
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                {/* Mowing Service Box */}
                <div
                  className={`
                  p-6 border rounded-lg cursor-pointer transition-all
                  hover:shadow-lg
                  ${
                    selectedService === "mowing"
                      ? "border-[#557A46] shadow-lg"
                      : "border-gray-200"
                  }
                `}
                  onClick={() => setSelectedService("mowing")}
                >
                  <h3 className="text-xl mb-4 text-center">
                    Mowing Service (Instant Price)
                  </h3>
                  <div className="flex justify-center">
                    <Image
                      src="/assets/images/port/LawnMaintenance /Nick mowing a larger property we maintain_.jpg"
                      alt="Mowing Service"
                      width={200}
                      height={200}
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* Landscaping Service Box */}
                <div
                  className={`
                  p-6 border rounded-lg cursor-pointer transition-all
                  hover:shadow-lg
                  ${
                    selectedService === "landscaping"
                      ? "border-[#557A46] shadow-lg"
                      : "border-gray-200"
                  }
                `}
                  onClick={() => setSelectedService("landscaping")}
                >
                  <h3 className="text-xl mb-4 text-center">
                    Landscaping/ Property Cleanup/ Other
                  </h3>
                  <div className="flex justify-center">
                    <Image
                      src="/assets/images/leaf-man.png"
                      alt="Landscaping Service"
                      width={200}
                      height={200}
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

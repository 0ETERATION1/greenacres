"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Define a type for portfolio items
interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  imagePath: string;
  category: "lawn" | "landscaping" | "hardscape" | "maintenance";
}

// Portfolio data - Add all your actual projects here
const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: "Professional Lawn Care",
    description:
      "Weekly mowing and maintenance keeping this property looking pristine year-round.",
    imagePath: "/assets/images/portfolio/lawn1.jpg",
    category: "lawn",
  },
  {
    id: 2,
    title: "Landscape Design",
    description:
      "Custom landscape design featuring native plants and seasonal colors.",
    imagePath: "/assets/images/portfolio/landscaping1.jpg",
    category: "landscaping",
  },
  {
    id: 3,
    title: "Spring Garden Makeover",
    description:
      "Complete garden transformation with seasonal flowers and shrubs.",
    imagePath: "/assets/images/portfolio/landscaping2.jpg",
    category: "landscaping",
  },
  {
    id: 4,
    title: "Stone Pathway Installation",
    description: "Custom stone pathway with natural materials and lighting.",
    imagePath: "/assets/images/portfolio/hardscape1.jpg",
    category: "hardscape",
  },
  {
    id: 5,
    title: "Commercial Lawn Maintenance",
    description: "Year-round maintenance for business complex.",
    imagePath: "/assets/images/portfolio/maintenance1.jpg",
    category: "maintenance",
  },
  // Add more items here...
];

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredItems =
    selectedCategory === "all"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === selectedCategory);

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <h1 className="text-4xl font-bold text-center text-[#0cabba] mb-4">
          Our Work
        </h1>
        <p className="text-xl text-center mb-8">
          Browse through our collection of completed projects
        </p>

        {/* Category Filter */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
              selectedCategory === "all"
                ? "bg-green-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setSelectedCategory("lawn")}
            className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
              selectedCategory === "lawn"
                ? "bg-green-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Lawn Care
          </button>
          <button
            onClick={() => setSelectedCategory("landscaping")}
            className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
              selectedCategory === "landscaping"
                ? "bg-green-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Landscaping
          </button>
          <button
            onClick={() => setSelectedCategory("hardscape")}
            className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
              selectedCategory === "hardscape"
                ? "bg-green-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Hardscape
          </button>
          <button
            onClick={() => setSelectedCategory("maintenance")}
            className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
              selectedCategory === "maintenance"
                ? "bg-green-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Maintenance
          </button>
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4"
        >
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={item.id}
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="relative h-64">
                  <Image
                    src={item.imagePath}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
      <Footer />
    </>
  );
}

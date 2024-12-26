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

// Add a Modal component for full-screen view
const ImageModal = ({
  image,
  title,
  isOpen,
  onClose,
}: {
  image: string;
  title: string;
  isOpen: boolean;
  onClose: () => void;
}) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
    >
      <div className="relative w-full max-w-6xl max-h-[90vh] aspect-video">
        <Image
          src={image}
          alt={title}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
        />
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </motion.div>
  );
};

// Portfolio data - Add all your actual projects here
const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: "Professional Lawn Care",
    description:
      "Weekly mowing and maintenance keeping this property looking pristine year-round.",
    imagePath: "/assets/images/portfolio/lawn/lawn1.jpg",
    category: "lawn",
  },
  {
    id: 2,
    title: "Professional Lawn Care",
    description:
      "Weekly mowing and maintenance keeping this property looking pristine year-round.",
    imagePath: "/assets/images/portfolio/lawn/lawn2.jpg",
    category: "lawn",
  },
  {
    id: 3,
    title: "Professional Lawn Care",
    description:
      "Weekly mowing and maintenance keeping this property looking pristine year-round.",
    imagePath: "/assets/images/portfolio/lawn/lawn3.jpg",
    category: "lawn",
  },
  {
    id: 4,
    title: "Spring Garden Makeover",
    description:
      "Complete garden transformation with seasonal flowers and shrubs.",
    imagePath: "/assets/images/portfolio/landscaping2.jpg",
    category: "landscaping",
  },
  {
    id: 5,
    title: "Stone Pathway Installation",
    description: "Custom stone pathway with natural materials and lighting.",
    imagePath: "/assets/images/portfolio/hardscape1.jpg",
    category: "hardscape",
  },
  {
    id: 6,
    title: "Commercial Lawn Maintenance",
    description: "Year-round maintenance for business complex.",
    imagePath: "/assets/images/portfolio/maintenance1.jpg",
    category: "maintenance",
  },
  // Add more items here...
];

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedImage, setSelectedImage] = useState<PortfolioItem | null>(
    null
  );

  const filteredItems =
    selectedCategory === "all"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === selectedCategory);

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">
          Our Work
        </h1>
        <p className="text-xl text-center text-gray-600 mb-8">
          Browse through our collection of completed projects
        </p>

        {/* Updated Category Filter with horizontal scroll on mobile */}
        <div className="overflow-x-auto pb-4 mb-8">
          <div className="flex justify-start md:justify-center gap-2 md:gap-4 min-w-min px-4">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`whitespace-nowrap px-4 py-2 rounded-lg transition-colors duration-300 ${
                selectedCategory === "all"
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setSelectedCategory("lawn")}
              className={`whitespace-nowrap px-4 py-2 rounded-lg transition-colors duration-300 ${
                selectedCategory === "lawn"
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Lawn Care
            </button>
            <button
              onClick={() => setSelectedCategory("landscaping")}
              className={`whitespace-nowrap px-4 py-2 rounded-lg transition-colors duration-300 ${
                selectedCategory === "landscaping"
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Landscaping
            </button>
            <button
              onClick={() => setSelectedCategory("hardscape")}
              className={`whitespace-nowrap px-4 py-2 rounded-lg transition-colors duration-300 ${
                selectedCategory === "hardscape"
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Hardscape
            </button>
            <button
              onClick={() => setSelectedCategory("maintenance")}
              className={`whitespace-nowrap px-4 py-2 rounded-lg transition-colors duration-300 ${
                selectedCategory === "maintenance"
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Maintenance
            </button>
          </div>
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
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:-translate-y-2 transition-transform duration-300 cursor-pointer group"
                onClick={() => setSelectedImage(item)}
              >
                <div className="relative h-64">
                  <Image
                    src={item.imagePath}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-black bg-opacity-50 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5"
                      />
                    </svg>
                  </div>
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

      {/* Modal */}
      <AnimatePresence>
        {selectedImage && (
          <ImageModal
            image={selectedImage.imagePath}
            title={selectedImage.title}
            isOpen={!!selectedImage}
            onClose={() => setSelectedImage(null)}
          />
        )}
      </AnimatePresence>

      <Footer />
    </>
  );
}

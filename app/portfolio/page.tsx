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

  description: React.ReactNode;

  imagePath: string;

  category: Exclude<CategoryType, "all">[];

  isVideo?: boolean;
}

// Define the category type to ensure consistency

type CategoryType =
  | "lawn-maintenance"
  | "weed-control"
  | "mulch"
  | "hand-weeding"
  | "bush-trimming"
  | "plant-installation"
  | "sod-installation"
  | "leaf-removal"
  | "all";

// Add a Modal component for full-screen view

const ImageModal = ({
  image,

  title,

  isVideo,

  isOpen,

  onClose,
}: {
  image: string;

  title: string;

  isVideo?: boolean;

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
      <div
        className={`relative ${
          isVideo
            ? "w-auto h-[90vh]"
            : "w-full max-w-6xl max-h-[90vh] aspect-video"
        }`}
      >
        {isVideo ? (
          <video
            className="h-full w-auto max-w-full object-contain"
            controls
            autoPlay
            muted
            loop
          >
            <source src={image} type="video/mp4" />
            Your browser does not support video playback.
          </video>
        ) : (
          <Image
            src={image}
            alt={title}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
          />
        )}

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

    description: (
      <>
        Weekly <span className="highlight-animation">lawn maintenance</span> and{" "}
        <span className="highlight-animation">weed control</span> keeping this
        property looking pristine year-round.
      </>
    ),

    imagePath: "/assets/images/portfolio/lawn/lawn1.jpg",

    category: ["lawn-maintenance", "weed-control"],
  },

  {
    id: 2,

    title: "Professional Lawn Care",

    description: (
      <>
        <span className="highlight-animation">Lawn maintenance</span>,{" "}
        <span className="highlight-animation">weed control</span> and
        fertilizing maintenance keeping this property looking pristine
        year-round.
      </>
    ),

    imagePath: "/assets/images/portfolio/lawn/lawn2.jpg",

    category: ["lawn-maintenance", "weed-control"],
  },

  {
    id: 3,

    title: "Professional Lawn Care",

    description: (
      <>
        Backyard <span className="highlight-animation">lawn maintenance</span>,{" "}
        <span className="highlight-animation">weed control</span> and
        fertilizing maintenance.
      </>
    ),

    imagePath: "/assets/images/portfolio/lawn/lawn3.jpg",

    category: ["lawn-maintenance", "weed-control"],
  },

  {
    id: 4,

    title: "Spring Garden Makeover",

    description: (
      <>
        Complete garden transformation with seasonal flowers and{" "}
        <span className="highlight-animation">plant installation</span>.
      </>
    ),

    imagePath: "/assets/images/portfolio/lawn/landscaping1.jpg",

    category: ["plant-installation"],
  },

  {
    id: 5,

    title: "Sod Installation",

    description: (
      <>
        Lawn preparation and soil conditioning prior to{" "}
        <span className="highlight-animation">sod installation</span>.
      </>
    ),

    imagePath:
      "/assets/images/port/sod/Prep work before a sod installation_.jpg",

    category: ["sod-installation"],
  },

  {
    id: 6,

    title: "Sod Installation",

    description: (
      <>
        Professional{" "}
        <span className="highlight-animation">sod installation</span> creating a
        seamless, pristine lawn.
      </>
    ),

    imagePath:
      "/assets/images/port/sod/Prep work before a sod installation. Completed_.jpg",

    category: ["sod-installation"],
  },

  {
    id: 7,

    title: "Sod Installation",

    description: (
      <>
        Large-scale{" "}
        <span className="highlight-animation">sod installation</span>{" "}
        transforming this property&apos;s front lawn with premium turf.
      </>
    ),

    imagePath:
      "/assets/images/port/sod/Property where large sections of the front lawn were replaced with fresh sod 2.jpg",

    category: ["sod-installation"],
  },

  {
    id: 8,

    title: "Sod Installation",

    description: (
      <>
        Major front lawn transformation through professional{" "}
        <span className="highlight-animation">sod installation</span>, creating
        a lush, healthy landscape.
      </>
    ),

    imagePath:
      "/assets/images/port/sod/Property where large sections of the front lawn were replaced with fresh sod.jpg",

    category: ["sod-installation"],
  },

  {
    id: 9,

    title: "Sod Installation",

    description: (
      <>
        Complete yard transformation through expert{" "}
        <span className="highlight-animation">sod installation</span>. Our team
        regraded the terrain and installed premium sod, implementing proper
        drainage solutions to ensure lasting lawn health and prevent water
        accumulation.
      </>
    ),

    imagePath: "/assets/images/port/sod/sod3.jpg",

    category: ["sod-installation"],
  },

  {
    id: 10,
    title: "Plant Install",
    description: (
      <>
        Complete garden transformation featuring removal of overgrown vegetation
        and <span className="highlight-animation">plant installation</span>,
        revitalizing the property&apos;s curb appeal.
      </>
    ),
    imagePath:
      "/assets/images/port/PlantInstall/Complete renovation of front garden. We ripped out the old and overgrown plants and installed new plants.jpg",
    category: ["plant-installation"],
  },

  {
    id: 11,

    title: "Plant Install",

    description: (
      <>
        Custom landscape design featuring strategic{" "}
        <span className="highlight-animation">plant installation</span>{" "}
        complemented by decorative river rock, creating a low-maintenance,
        visually striking garden bed.
      </>
    ),

    imagePath:
      "/assets/images/port/PlantInstall/Plant install, we installed the plants and the river rock 2.jpg",

    category: ["plant-installation"],
  },

  {
    id: 12,

    title: "Plant Install",

    description: (
      <>
        Complete garden bed transformation featuring expert{" "}
        <span className="highlight-animation">plant installation</span> and
        river rock installation, balancing beauty with functionality.
      </>
    ),

    imagePath:
      "/assets/images/port/PlantInstall/Plant install, we installed the plants and the river rock.jpg",

    category: ["plant-installation"],
  },

  {
    id: 13,

    title: "Large Plant Delivery",

    description: (
      <>
        Skilled operation of specialized equipment for safe and efficient tree
        transportation during our{" "}
        <span className="highlight-animation">plant installation</span> process.
      </>
    ),

    imagePath: "/assets/images/port/PlantInstall/plantVideo.mp4",

    category: ["plant-installation"],

    isVideo: true,
  },

  {
    id: 14,

    title: "Mulch Installation (Before)",

    description: "Before image of a small clean-up and mulch install",

    imagePath:
      "/assets/images/port/Mulch install/Before and After of a mulch installation /goodBefore.jpg",

    category: ["mulch", "hand-weeding"],
  },

  {
    id: 15,

    title: "Mulch Installation (After)",

    description: "After image of a small clean-up and mulch install",

    imagePath:
      "/assets/images/port/Mulch install/Before and After of a mulch installation /goodAfter.jpg",

    category: ["mulch", "hand-weeding"],
  },

  {
    id: 16,

    title: "Mulch Installation",

    description:
      "Comprehensive garden bed transformation: We trimmed bushes, pulled weeds, edged beds, and installed mulch to create a pristine, low-maintenance landscape.",

    imagePath:
      "/assets/images/port/Mulch install/Larger spring clean-up we completed. We trimmed bushes, pulled weeds, edged beds, and installed mulch /20240318_132941.jpg",

    category: ["mulch", "hand-weeding"],
  },

  {
    id: 17,

    title: "Mulch Installation",

    description:
      "Thorough landscape enhancement including strategic bush trimming, detailed weed removal, precise bed edging, and fresh mulch application.",

    imagePath:
      "/assets/images/port/Mulch install/Larger spring clean-up we completed. We trimmed bushes, pulled weeds, edged beds, and installed mulch /20240318_133000.jpg",

    category: ["mulch", "hand-weeding", "bush-trimming"],
  },

  {
    id: 18,

    title: "Mulch Installation (Before)",

    description:
      "Overgrown bushes and weeds before mulch installation and cleanup.",

    imagePath:
      "/assets/images/port/Mulch install/Major clean up we completed/Before photo of major clean up we completed.jpg",

    category: ["mulch", "hand-weeding", "bush-trimming"],
  },

  {
    id: 19,

    title: "Mulch Installation (After)",

    description: (
      <>
        Complete garden bed rejuvenation featuring{" "}
        <span className="highlight-animation">bush trimming</span>,
        <span className="highlight-animation"> weed removal</span>, crisp edge
        definition, and
        <span className="highlight-animation"> premium mulch installation</span>
        .
      </>
    ),

    imagePath:
      "/assets/images/port/Mulch install/Major clean up we completed/Before photo of major clean up we completed. Frontyard 2.jpg",

    category: ["mulch", "hand-weeding", "bush-trimming"],
  },

  {
    id: 20,

    title: "Mulch Installation",

    description:
      "Freshly installed mulch adds a clean, vibrant touch to your garden beds, enhancing curb appeal instantly.",

    imagePath:
      "/assets/images/port/Mulch install/Mulch install/20240420_152433.jpg",

    category: ["mulch", "hand-weeding"],
  },

  {
    id: 21,

    title: "Mulch Installation With Plant Installation",

    description:
      "Professional landscape installation combining carefully selected plants for a refined, sustainable design.",

    imagePath:
      "/assets/images/port/Mulch install/Mulch install/20240420_152614.jpg",

    category: ["mulch", "hand-weeding", "plant-installation"],
  },

  {
    id: 22,

    title: "Loading Fresh Mulch",

    description:
      "Efficient bulk mulch preparation and handling for large-scale landscape projects.",

    imagePath:
      "/assets/images/port/Mulch install/Loading fresh mulch to install for our customers_.mp4",

    category: ["mulch"],

    isVideo: true,
  },

  {
    id: 23,

    title: "Mulch Installation",

    description:
      "We carefully removed debris, reshaped the bushes for a polished look, and refreshed the mulch beds to keep them weed-free and healthy.",

    imagePath:
      "/assets/images/port/Mulch install/Spring Clean-Up for a beautiful home. We keep these bushes shaped up year round and keep the mulch beds weed free/20240406_173002.jpg",

    category: ["mulch", "hand-weeding", "bush-trimming"],
  },

  {
    id: 24,

    title: "Mulch Installation",

    description:
      "We tackled overgrowth, reshaped the hedges, and revitalized the mulch beds, ensuring this yard stays beautiful and low-maintenance year-round.",

    imagePath:
      "/assets/images/port/Mulch install/Spring Clean-Up for a beautiful home. We keep these bushes shaped up year round and keep the mulch beds weed free/20240406_173019.jpg",

    category: ["mulch", "hand-weeding", "bush-trimming"],
  },

  {
    id: 25,

    title: "Mulch Installation",

    description:
      "A complete Spring Clean-Up: Bushes were trimmed, weeds pulled, and mulch refreshed to bring new life to this home’s exterior.",

    imagePath:
      "/assets/images/port/Mulch install/Spring Clean-Up for a beautiful home. We keep these bushes shaped up year round and keep the mulch beds weed free/20240406_173055.jpg",

    category: ["mulch", "hand-weeding", "bush-trimming"],
  },

  {
    id: 26,

    title: "Mulch Installation",

    description:
      "This Spring Clean-Up included bush trimming, meticulous weed removal, clean flower bed edging, and a layer of vibrant mulch.",

    imagePath:
      "/assets/images/port/Mulch install/Small Spring Clean-up we completed. We trimmed bushes, pulled weeds, edged flower beds and installed mulch/20240307_114828.jpg",

    category: ["mulch", "hand-weeding", "bush-trimming"],
  },

  {
    id: 27,

    title: "Mulch Installation",

    description:
      "We gave this yard a seasonal refresh with trimmed greenery, weed-free beds, precise edging, and new mulch to tie it all together.",

    imagePath:
      "/assets/images/port/Mulch install/Small Spring Clean-up we completed. We trimmed bushes, pulled weeds, edged flower beds and installed mulch/20240307_114835.jpg",

    category: ["mulch", "hand-weeding", "bush-trimming"],
  },

  {
    id: 28,

    title: "Mulch Installation",

    description:
      "We tackled this backyard with a thorough clean-up, including weed removal, bed edging, and a fresh layer of mulch to complete the look.",

    imagePath:
      "/assets/images/port/Mulch install/Small Spring Clean-up we completed. We trimmed bushes, pulled weeds, edged flower beds and installed mulch/20240307_114916.jpg",

    category: ["mulch", "hand-weeding"],
  },

  {
    id: 29,

    title: "Mulch Installation",

    description:
      "Special attention was given to the area around the air conditioning units, with precision mulch installation to maintain functionality and aesthetics.",

    imagePath:
      "/assets/images/port/Mulch install/Small Spring Clean-up we completed. We trimmed bushes, pulled weeds, edged flower beds and installed mulch/20240307_114923.jpg",

    category: ["mulch", "hand-weeding", "bush-trimming"],
  },

  {
    id: 30,

    title: "Mulch Installation",

    description:
      "A stunning transformation for these expansive mulch beds: We pulled weeds, trimmed bushes, edged the flower beds, and installed fresh mulch for a polished finish.",

    imagePath:
      "/assets/images/port/Mulch install/Mulch installation for a customer with very large mulch beds. We pulled weeds, trimmed bushes, edged flower beds and installed mulch/20240306_105526.jpg",

    category: ["mulch", "hand-weeding", "bush-trimming"],
  },

  {
    id: 31,

    title: "Mulch Installation",

    description:
      "Big mulch beds, big results: We meticulously trimmed, weeded, edged, and mulched to create a vibrant, well-maintained landscape.",

    imagePath:
      "/assets/images/port/Mulch install/Mulch installation for a customer with very large mulch beds. We pulled weeds, trimmed bushes, edged flower beds and installed mulch/20240306_105623.jpg",

    category: ["mulch", "hand-weeding", "bush-trimming"],
  },

  {
    id: 32,

    title: "Mulch Installation",

    description:
      "Bringing order to large mulch beds with seamless mulch installation and a focus on creating a tidy, professional finish.",

    imagePath:
      "/assets/images/port/Mulch install/Mulch installation for a customer with very large mulch beds. We pulled weeds, trimmed bushes, edged flower beds and installed mulch/20240306_105636.jpg",

    category: ["mulch", "hand-weeding", "bush-trimming"],
  },

  // Add more items here...
];

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>("all");

  const [selectedImage, setSelectedImage] = useState<PortfolioItem | null>(
    null
  );

  const filteredItems =
    selectedCategory === "all"
      ? portfolioItems
      : portfolioItems.filter((item) =>
          item.category.includes(
            selectedCategory as Exclude<CategoryType, "all">
          )
        );

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

        {/* Updated Category Filter with horizontal scroll on mobile */}

        <div className="overflow-x-auto pb-4 mb-8">
          <div className="flex justify-start md:justify-center gap-2 md:gap-4 min-w-min px-4">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`whitespace-nowrap px-4 py-2 rounded-lg transition-colors duration-300 ${
                selectedCategory === "all"
                  ? "bg-green-600 text-white shadow-lg scale-105"
                  : "bg-gray-200 text-gray-600 hover:bg-gray-200"
              }`}
            >
              All
            </button>

            <button
              onClick={() => setSelectedCategory("lawn-maintenance")}
              className={`whitespace-nowrap px-4 py-2 rounded-lg transition-colors duration-300 ${
                selectedCategory === "lawn-maintenance"
                  ? "bg-green-600 text-white shadow-lg scale-105"
                  : "bg-gray-200 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Lawn Maintenance
            </button>

            <button
              onClick={() => setSelectedCategory("weed-control")}
              className={`whitespace-nowrap px-4 py-2 rounded-lg transition-colors duration-300 ${
                selectedCategory === "weed-control"
                  ? "bg-green-600 text-white shadow-lg scale-105"
                  : "bg-gray-200 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Weed Control & Fertilizer
            </button>

            <button
              onClick={() => setSelectedCategory("mulch")}
              className={`whitespace-nowrap px-4 py-2 rounded-lg transition-colors duration-300 ${
                selectedCategory === "mulch"
                  ? "bg-green-600 text-white shadow-lg scale-105"
                  : "bg-gray-200 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Mulch Installation
            </button>

            <button
              onClick={() => setSelectedCategory("hand-weeding")}
              className={`whitespace-nowrap px-4 py-2 rounded-lg transition-colors duration-300 ${
                selectedCategory === "hand-weeding"
                  ? "bg-green-600 text-white shadow-lg scale-105"
                  : "bg-gray-200 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Hand Weeding
            </button>

            <button
              onClick={() => setSelectedCategory("bush-trimming")}
              className={`whitespace-nowrap px-4 py-2 rounded-lg transition-colors duration-300 ${
                selectedCategory === "bush-trimming"
                  ? "bg-green-600 text-white shadow-lg scale-105"
                  : "bg-gray-200 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Bush Trimming
            </button>

            <button
              onClick={() => setSelectedCategory("plant-installation")}
              className={`whitespace-nowrap px-4 py-2 rounded-lg transition-colors duration-300 ${
                selectedCategory === "plant-installation"
                  ? "bg-green-600 text-white shadow-lg scale-105"
                  : "bg-gray-200 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Plant Installation
            </button>

            <button
              onClick={() => setSelectedCategory("sod-installation")}
              className={`whitespace-nowrap px-4 py-2 rounded-lg transition-colors duration-300 ${
                selectedCategory === "sod-installation"
                  ? "bg-green-600 text-white shadow-lg scale-105"
                  : "bg-gray-200 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Sod Installation
            </button>

            <button
              onClick={() => setSelectedCategory("leaf-removal")}
              className={`whitespace-nowrap px-4 py-2 rounded-lg transition-colors duration-300 ${
                selectedCategory === "leaf-removal"
                  ? "bg-green-600 text-white shadow-lg scale-105"
                  : "bg-gray-200 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Leaf Removal
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
                  {item.isVideo ? (
                    <div className="w-full h-full flex justify-center bg-black">
                      <video
                        className="h-full w-auto object-contain"
                        autoPlay
                        muted
                        loop
                        playsInline
                      >
                        <source src={item.imagePath} type="video/mp4" />
                        Your browser does not support video playback.
                      </video>
                    </div>
                  ) : (
                    <Image
                      src={item.imagePath}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  )}

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
            isVideo={selectedImage.isVideo}
            isOpen={!!selectedImage}
            onClose={() => setSelectedImage(null)}
          />
        )}
      </AnimatePresence>

      <Footer />
    </>
  );
}

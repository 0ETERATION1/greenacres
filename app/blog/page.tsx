"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  imagePath: string;
  author: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Spring Lawn Care Tips",
    excerpt:
      "Essential tips for maintaining a healthy lawn this spring season.",
    content: `Spring is the perfect time to revitalize your lawn after the winter months. 
    Here are some essential steps to ensure your lawn thrives:

    1. Clean up winter debris
    2. Test your soil pH
    3. Apply pre-emergent herbicide
    4. Begin regular mowing
    5. Start a consistent watering schedule

    Taking these steps early in the season will help ensure a lush, healthy lawn throughout the year...`,
    date: "2024-03-15",
    imagePath: "/assets/images/blog/spring-lawn.jpg",
    author: "John Smith",
  },
  // Add more blog posts here
];

export default function Blog() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">
        Our Blog
      </h1>
      <p className="text-xl text-center text-gray-600 mb-12">
        Insights and tips from our landscaping experts
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {blogPosts.map((post) => (
          <motion.div
            key={post.id}
            layout
            onClick={() =>
              setSelectedPost(selectedPost?.id === post.id ? null : post)
            }
            className={`cursor-pointer rounded-lg overflow-hidden shadow-lg bg-white 
              ${
                selectedPost?.id === post.id
                  ? "lg:col-span-4 md:col-span-2"
                  : ""
              }`}
          >
            <div
              className={`relative ${
                selectedPost?.id === post.id ? "h-[400px]" : "h-48"
              }`}
            >
              <Image
                src={post.imagePath}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-500">{post.date}</span>
                <span className="text-sm text-gray-500">{post.author}</span>
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {post.title}
              </h2>

              <AnimatePresence>
                {selectedPost?.id === post.id ? (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-gray-600 whitespace-pre-line">
                      {post.content}
                    </p>
                  </motion.div>
                ) : (
                  <p className="text-gray-600 line-clamp-2">{post.excerpt}</p>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

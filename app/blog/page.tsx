"use client";

import { useState, useEffect, Suspense, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  imagePath: string;
  author: string;
  category: "lawn-care" | "landscaping" | "maintenance" | "tips" | "seasonal";
}

// Add ShareButtons component
const ShareButtons = ({ post }: { post: BlogPost }) => {
  // Get the base URL of your website
  const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
  // Create a unique URL for this blog post
  const shareUrl = `${baseUrl}/blog?post=${post.id}`;

  const shareData = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      shareUrl
    )}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      shareUrl
    )}&text=${encodeURIComponent(post.title)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      shareUrl
    )}`,
    email: `mailto:?subject=${encodeURIComponent(
      post.title
    )}&body=${encodeURIComponent(`Check out this article: ${shareUrl}`)}`,
  };

  return (
    <div className="flex items-center gap-4 mt-6 pt-6 border-t border-gray-200">
      <span className="text-gray-600">Share:</span>
      {/* Facebook */}
      <button
        onClick={() => window.open(shareData.facebook, "_blank")}
        className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
        aria-label="Share on Facebook"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z" />
        </svg>
      </button>

      {/* Twitter/X */}
      <button
        onClick={() => window.open(shareData.twitter, "_blank")}
        className="p-2 rounded-full bg-black text-white hover:bg-gray-800 transition-colors"
        aria-label="Share on Twitter/X"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </button>

      {/* LinkedIn */}
      <button
        onClick={() => window.open(shareData.linkedin, "_blank")}
        className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors"
        aria-label="Share on LinkedIn"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      </button>

      {/* Email */}
      <button
        onClick={() => (window.location.href = shareData.email)}
        className="p-2 rounded-full bg-gray-600 text-white hover:bg-gray-700 transition-colors"
        aria-label="Share via Email"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      </button>
    </div>
  );
};

// Add a Modal component for full-screen view
const BlogModal = ({
  post,
  isOpen,
  onClose,
}: {
  post: BlogPost;
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
      className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-start justify-center overflow-y-auto p-4 sm:p-6"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white rounded-lg w-full max-w-4xl my-8"
      >
        <div className="max-h-[90vh] overflow-y-auto">
          <div className="relative aspect-video">
            <Image
              src={post.imagePath}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
              priority
            />
          </div>
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-gray-500">{post.date}</span>
              <span className="text-sm text-gray-500">{post.author}</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              {post.title}
            </h2>
            <div className="prose max-w-none">
              <p className="text-gray-600 whitespace-pre-line">
                {post.content}
              </p>
            </div>
            <ShareButtons post={post} />
          </div>
        </div>
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
      </motion.div>
    </motion.div>
  );
};

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
    date: "12/29/2024",
    imagePath: "/assets/images/port/BradOnTacoma.JPG",
    author: "Bradley Guerra",
    category: "lawn-care",
  },
  // Add more blog posts here
];

function BlogContent() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const router = useRouter();
  const searchParams = useSearchParams();

  // Filter and sort posts
  const filteredAndSortedPosts = useMemo(() => {
    let posts = [...blogPosts];

    // Apply category filter
    if (selectedCategory !== "all") {
      posts = posts.filter((post) => post.category === selectedCategory);
    }

    // Apply sort
    posts.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });

    return posts;
  }, [selectedCategory, sortOrder]);

  useEffect(() => {
    const postId = searchParams.get("post");
    if (postId) {
      const post = blogPosts.find((p) => p.id === parseInt(postId));
      if (post) {
        setSelectedPost(post);
      }
    }
  }, [searchParams]);

  const handlePostSelect = (post: BlogPost | null) => {
    if (post) {
      router.push(`/blog?post=${post.id}`);
    } else {
      router.push("/blog");
    }
    setSelectedPost(post);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-4xl font-bold text-center text-[#0cabba] mb-4">
        Our Blog
      </h1>
      <p className="text-xl text-center mb-8">
        Insights and tips from our landscaping experts
      </p>

      {/* Filters Section - Updated to match portfolio styling */}
      <div className="mb-12">
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-6 py-2 rounded-lg transition-all duration-300 ${
              selectedCategory === "all"
                ? "bg-[#0cabba] text-white shadow-lg scale-105"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setSelectedCategory("lawn-care")}
            className={`px-6 py-2 rounded-lg transition-all duration-300 ${
              selectedCategory === "lawn-care"
                ? "bg-[#0cabba] text-white shadow-lg scale-105"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Lawn Care
          </button>
          <button
            onClick={() => setSelectedCategory("landscaping")}
            className={`px-6 py-2 rounded-lg transition-all duration-300 ${
              selectedCategory === "landscaping"
                ? "bg-[#0cabba] text-white shadow-lg scale-105"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Landscaping
          </button>
          <button
            onClick={() => setSelectedCategory("maintenance")}
            className={`px-6 py-2 rounded-lg transition-all duration-300 ${
              selectedCategory === "maintenance"
                ? "bg-[#0cabba] text-white shadow-lg scale-105"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Maintenance
          </button>
          <button
            onClick={() => setSelectedCategory("tips")}
            className={`px-6 py-2 rounded-lg transition-all duration-300 ${
              selectedCategory === "tips"
                ? "bg-[#0cabba] text-white shadow-lg scale-105"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Tips & Tricks
          </button>
          <button
            onClick={() => setSelectedCategory("seasonal")}
            className={`px-6 py-2 rounded-lg transition-all duration-300 ${
              selectedCategory === "seasonal"
                ? "bg-[#0cabba] text-white shadow-lg scale-105"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Seasonal
          </button>
        </div>

        {/* Sort Order - Styled to match */}
        <div className="flex justify-center items-center gap-2">
          <select
            value={sortOrder}
            onChange={(e) =>
              setSortOrder(e.target.value as "newest" | "oldest")
            }
            className="px-6 py-2 rounded-lg border border-gray-200 bg-gray-100 text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#0cabba] transition-all duration-300"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredAndSortedPosts.map((post) => (
          <motion.div
            key={post.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg overflow-hidden shadow-lg hover:-translate-y-2 transition-transform duration-300 cursor-pointer group"
            onClick={() => handlePostSelect(post)}
          >
            <div className="relative h-48">
              <Image
                src={post.imagePath}
                alt={post.title}
                fill
                className="object-cover"
              />
              {/* Expand Icon */}
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
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-500">{post.date}</span>
                <span className="text-sm text-gray-500">{post.author}</span>
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {post.title}
              </h2>
              <p className="text-gray-600 line-clamp-2">{post.excerpt}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Show message if no posts match filters */}
      {filteredAndSortedPosts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">
            No blog posts found for the selected category.
          </p>
        </div>
      )}

      <AnimatePresence>
        {selectedPost && (
          <BlogModal
            post={selectedPost}
            isOpen={!!selectedPost}
            onClose={() => handlePostSelect(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// Loading component
function BlogLoading() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="animate-pulse">
        <div className="h-10 bg-gray-200 rounded w-1/2 mx-auto mb-4"></div>
        <div className="h-6 bg-gray-200 rounded w-1/3 mx-auto mb-12"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-gray-200 rounded-lg h-80"></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Blog() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<BlogLoading />}>
        <BlogContent />
      </Suspense>
      <Footer />
    </>
  );
}

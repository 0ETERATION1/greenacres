"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SubmissionSuccess() {
  const router = useRouter();

  // Increase redirect timeout to 10 seconds
  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push("/");
    }, 10000);

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-white p-8 rounded-lg shadow-md border border-[#0cabba]">
          <div className="mb-4 text-[#0cabba]">
            <svg
              className="mx-auto h-12 w-12"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Submission Successful!
          </h2>
          <p className="text-gray-600 mb-6">
            Thank you for your submission. We will contact you within 24 hours.
          </p>
          <div className="space-y-3">
            <Link
              href="/"
              className="block w-full bg-[#0cabba] text-white py-2 px-4 rounded-lg hover:bg-[#0b9aa7] transition-colors"
            >
              Return to Home
            </Link>
            <p className="text-sm text-gray-500">
              Automatically redirecting in 10 seconds...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

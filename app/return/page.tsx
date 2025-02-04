"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function ReturnPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const session_id = searchParams.get("session_id");
    if (session_id) {
      const timeout = setTimeout(() => {
        router.push("/submission-success");
      }, 10000);

      return () => clearTimeout(timeout);
    }
  }, [router, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0cabba] mx-auto"></div>
        <p className="mt-4 text-gray-600">Processing your payment...</p>
        <p className="mt-2 text-sm text-gray-500">
          Redirecting in 10 seconds...
        </p>
      </div>
    </div>
  );
}

export default function ReturnPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0cabba] mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        </div>
      }
    >
      <ReturnPageContent />
    </Suspense>
  );
}

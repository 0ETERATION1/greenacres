import Link from "next/link";

import JotFormFirewood from "@/components/JotFormFirewood";

export default function FirewoodPage() {
  return (
    <>
      <div className="text-center py-5">
        <Link
          href="/"
          className="
                inline-block px-4 py-2
                bg-gradient-to-r from-green-600 to-green-700
                text-white
                rounded-md
                transition-transform duration-300 ease-in-out
                hover:-translate-y-0.5
                shadow-md
                whitespace-nowrap
                w-[140px]
                text-center
                
              "
          style={{ fontWeight: 500 }}
        >
          Return home 🏠
          {/* <span>Free Quote!</span> <span className="text-lg">🌳</span> */}
        </Link>
      </div>
      <JotFormFirewood />
    </>
  );
}

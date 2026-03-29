import Link from "next/link";

export default function FirewoodSection() {
  return (
    <section className="firewood-section">
      <div className="firewood-banner" id="firewoodAD" style={{ justifyContent: "center" }}>
        {/* Centered inner wrapper — max-width matches rest of page */}
        <div className="w-full max-w-3xl mx-auto px-4 text-center flex flex-col items-center">
          <h3 className="text-xl font-semibold text-white mb-2">
            Get seasoned hardwood firewood delivered to your door!
          </h3>
          <p className="text-white/90 mb-4">
            We deliver a 1/4 of a cord and up. Smaller quantities are available for pickup!
          </p>
          <Link href="/firewood" className="fire-order-button">
            Order now! 🔥🪵
          </Link>
        </div>
      </div>
    </section>
  );
}

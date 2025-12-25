import Link from "next/link";

export default function FirewoodSection() {
  return (
    <section className="firewood-section">
      <div className="firewood-banner" id="firewoodAD">
        <div className="banner-content">
          <h3>Get seasoned hardwood firewood delivered to your door!</h3>
          <p>
            We deliver a 1/4 of a cord and up. Smaller quantities are available
            for pickup!
          </p>
          <br></br>
          <div className="">
            <Link href="/firewood" className="fire-order-button">
              Order now! 🔥🪵
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

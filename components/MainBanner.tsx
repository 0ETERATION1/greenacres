import Image from "next/image";
import Link from "next/link";

export default function MainBanner() {
  return (
    <section className="main-banner">
      <Image
        src="/assets/images/bg/pattern/beautifulTurf.jpg"
        alt="Beautiful lawn"
        fill
        priority
        quality={100}
        className="banner-background"
      />
      <div className="banner-overlay" />
      <div className="banner-content">
        <h1 className="banner-title">
          We Make Lawn
          <br />
          Care Easy.
        </h1>
        <h2 className="banner-subtitle">
          Mowing, Fertilizer & Weed control. We got you covered.
        </h2>
        <Link href="/contact" className="cta-button">
          Get a Free Quote Today! 🌳
        </Link>
      </div>
    </section>
  );
}

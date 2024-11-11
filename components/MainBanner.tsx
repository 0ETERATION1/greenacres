import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
// Import additional Swiper styles if needed
import "swiper/css/effect-fade";

export default function MainBanner() {
  return (
    <section className="main-banner">
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
          Get a Free Quote!
        </Link>
      </div>
    </section>
  );
}

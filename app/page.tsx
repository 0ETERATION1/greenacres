// Move from components/page.tsx to app/page.tsx
//import Image from "next/image";
// import MainBanner from "@/components/MainBanner";
// import AboutUs from "@/components/AboutUs";
// import LawnPrograms from "@/components/LawnPrograms";
// import FirewoodCTA from "@/components/FirewoodCTA";
// import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import MainBanner from "@/components/MainBanner";

export default function Home() {
  return (
    <>
      {/* <div className="preloader">
        <Image
          src="/assets/images/preloader.svg"
          alt="Pre-loader"
          width={100}
          height={100}
        />
      </div> */}

      <Navbar />
      <MainBanner />
      {/* <AboutUs />
      <LawnPrograms />
      <FirewoodCTA />
      <Footer /> */}
    </>
  );
}

// Move from components/page.tsx to app/page.tsx
//import Image from "next/image";
// import MainBanner from "@/components/MainBanner";
// import AboutUs from "@/components/AboutUs";
// import LawnPrograms from "@/components/LawnPrograms";
// import FirewoodCTA from "@/components/FirewoodCTA";
// import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import MainBanner from "@/components/MainBanner";
import PropertySection from "@/components/PropertySection";
// import PackageSection from "@/components/PackageSection";
import FirewoodSection from "@/components/FirewoodSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <MainBanner />
      <PropertySection />
      {/* <PackageSection /> */}
      <FirewoodSection />
      <Footer />

      {/* <AboutUs />
      <LawnPrograms />
      <FirewoodCTA />
      <Footer /> */}
    </>
  );
}

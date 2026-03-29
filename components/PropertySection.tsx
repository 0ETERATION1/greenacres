// import Image from "next/image";
import Link from "next/link";
import styles from "../styles/PropertySection.module.css";

export default function PropertySection() {
  return (
    <section className={`py-10 ${styles.mobileSection}`}>
      <div className="container mx-auto">
        {/* First Image and Text */}
        <div className="flex items-center mb-10">
          <div
            className={`w-1/2 place-items-end px-5 ${styles.imageContainer}`}
          >
            <img
              src="/assets/images/port/bradleyAndDad.JPG"
              alt="Dad mowing Lawn and leaving stripes in Montgomery County Maryland"
              className="rounded-image custom-image w-[300px] h-[400px] object-cover"
            />
          </div>
          <div className={`w-1/2 pl-6 ${styles.textContainer}`}>
            <div className="w-full max-w-xl">
              <h1 className="text-3xl md:text-4xl font-bold text-[#0cabba] mb-4">
                Why Homeowners Choose Green Acres
              </h1>
              <p>
                Green Acres is a family-owned lawn care and landscaping company
                based in Montgomery County. Customers know us for showing up
                consistently, making lawn care easy, and taking a
                family-oriented approach to every project. We focus on recurring
                mowing, turf care, and seasonal property maintenance for
                homeowners who want dependable service from a real local
                company.
              </p>
              <br></br>
              <div className="flex justify-center">
                <Link
                  href="/about"
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
                  Our story 📖
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Second Image and Text */}
        <div className="flex items-center mb-10">
          <div
            className={`w-1/2 pr-6 flex justify-end ${styles.textContainer}`}
          >
            <div className="w-full max-w-xl">
              <h1 className="text-3xl md:text-4xl font-bold text-[#0cabba] mb-4">
                Recurring Mowing and Turf Care
              </h1>
              <p>
                We focus on weekly mowing, seasonal lawn care, and turf
                treatments that keep properties clean, healthy, and easy to
                maintain. Our goal is dependable service and results that match
                the property.
              </p>
              <br></br>
              <div className="flex justify-center">
                <Link
                  href="/services"
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
                  Services 🛠️
                </Link>
              </div>
            </div>
          </div>
          <div
            className={`w-1/2 place-items-start px-5 ${styles.imageContainer}`}
          >
            <img
              src="/assets/images/port/dadMowing.jpg"
              alt="Description of the second image"
              className="rounded-image custom-image w-[300px] h-[400px] object-cover"
            />
          </div>
        </div>

        {/* Third Image and Text */}
        <div className="flex items-center">
          <div
            className={`w-1/2 place-items-end px-5 ${styles.imageContainer}`}
          >
            <img
              src="/assets/images/port/Houseblossom.jpg"
              alt="Description of the third image"
              className="rounded-image custom-image w-[300px] h-[400px] object-cover"
            />
          </div>
          <div className={`w-1/2 pl-6 ${styles.textContainer}`}>
            <div className="w-full max-w-xl">
              <h1 className="text-3xl md:text-4xl font-bold text-[#0cabba] mb-4">
                See Real Local Results
              </h1>
              <p>
                Browse recent Green Acres projects across Montgomery County,
                including mowing, mulch, seasonal cleanup, and turf work.
              </p>
              <br></br>
              <div className="flex justify-center">
                <Link
                  href="/gallery"
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
                  Gallery 🖼️
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

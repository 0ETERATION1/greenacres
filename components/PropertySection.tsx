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
            <div className="max-w-[340px]">
              <h1 className="text-3xl md:text-4xl font-bold text-[#0cabba] mb-4">
                What we bring to the table
              </h1>
              <p>
                With over three decades of experience in Montgomery County, we
                bring expertise, dedication, and a family-oriented approach to
                every project. Our commitment to quality and attention to detail
                ensures your outdoor space receives the care it deserves.
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
            <div className="max-w-[340px]">
              <h1 className="text-3xl md:text-4xl font-bold text-[#0cabba] mb-4">
                Our Skillset
              </h1>
              <p>
                From precision mowing and seasonal maintenance to comprehensive
                lawn care, our Turf Program delivers year-round solutions that
                keep your property healthy, vibrant, and beautiful in every
                season.
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
            <div className="max-w-[340px]">
              <h1 className="text-3xl md:text-4xl font-bold text-[#0cabba] mb-4">
                See your house blossom
              </h1>
              <p>
                Transform your outdoor space into a stunning landscape that
                enhances your property&apos;s beauty and value. Browse our
                portfolio to see how we&apos;ve helped countless homeowners
                create their dream gardens and landscapes.
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

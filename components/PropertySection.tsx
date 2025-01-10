import Image from "next/image";
import Link from "next/link";

export default function PropertySection() {
  return (
    <section className="py-10">
      <div className="container mx-auto">
        {/* First Section */}
        <div className="flex flex-col md:items-center md:flex-row mb-10">
          <div className="w-full md:w-1/2 px-5 md:px-0 md:pr-2 order-3 md:order-none">
            <Image
              src="/assets/images/port/bradleyAndDad.JPG"
              alt="Dad mowing Lawn and leaving stripes in Montgomery County Maryland"
              width={300}
              height={400}
              className="rounded-image custom-image mx-auto md:ml-auto"
            />
            <div className="flex justify-center mt-4 md:hidden">
              <Link
                href="/about"
                className="inline-block px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-md transition-transform duration-300 ease-in-out hover:-translate-y-0.5 shadow-md whitespace-nowrap w-[140px] text-center"
                style={{ fontWeight: 500 }}
              >
                Our story 📖
              </Link>
            </div>
          </div>
          <div className="w-full md:w-1/2 pl-6 md:pl-4 order-1 md:order-none">
            <h1 className="text-3xl md:text-4xl font-bold text-[#0cabba] mb-4 text-center md:text-left">
              What we bring to the table
            </h1>
            <p className="text-center md:text-left mb-6 md:mb-4">
              With over three decades of experience in Montgomery County, we
              bring expertise, dedication, and a family-oriented approach to
              every project. Our commitment to quality and attention to detail
              ensures your outdoor space receives the care it deserves.
            </p>
            <div className="hidden md:block">
              <Link
                href="/about"
                className="inline-block px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-md transition-transform duration-300 ease-in-out hover:-translate-y-0.5 shadow-md whitespace-nowrap w-[140px] text-center"
                style={{ fontWeight: 500 }}
              >
                Our story 📖
              </Link>
            </div>
          </div>
        </div>

        {/* Second Section */}
        <div className="flex flex-col md:items-center md:flex-row mb-10">
          <div className="w-full md:w-1/2 pl-6 md:pl-4 order-1 md:order-none">
            <h1 className="text-3xl md:text-4xl font-bold text-[#0cabba] mb-4 text-center md:text-right">
              Our Skillset
            </h1>
            <p className="text-center md:text-right mb-6 md:mb-4">
              From precision mowing and seasonal maintenance to comprehensive
              lawn care, our Turf Program delivers year-round solutions that
              keep your property healthy, vibrant, and beautiful in every
              season.
            </p>
            <div className="hidden md:block md:text-right">
              <Link
                href="/services"
                className="inline-block px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-md transition-transform duration-300 ease-in-out hover:-translate-y-0.5 shadow-md whitespace-nowrap w-[140px] text-center"
                style={{ fontWeight: 500 }}
              >
                Services 🛠️
              </Link>
            </div>
          </div>
          <div className="w-full md:w-1/2 px-5 md:px-0 md:pl-2 order-3 md:order-none">
            <Image
              src="/assets/images/port/dadMowing.jpg"
              alt="Description of the second image"
              width={300}
              height={400}
              className="rounded-image custom-image mx-auto md:mr-auto"
            />
            <div className="flex justify-center mt-4 md:hidden">
              <Link
                href="/services"
                className="inline-block px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-md transition-transform duration-300 ease-in-out hover:-translate-y-0.5 shadow-md whitespace-nowrap w-[140px] text-center"
                style={{ fontWeight: 500 }}
              >
                Services 🛠️
              </Link>
            </div>
          </div>
        </div>

        {/* Third Section */}
        <div className="flex flex-col md:items-center md:flex-row">
          <div className="w-full md:w-1/2 px-5 md:px-0 md:pr-2 order-3 md:order-none">
            <Image
              src="/assets/images/port/Houseblossom.jpg"
              alt="Description of the third image"
              width={300}
              height={400}
              className="rounded-image custom-image mx-auto md:ml-auto"
            />
            <div className="flex justify-center mt-4 md:hidden">
              <Link
                href="/portfolio"
                className="inline-block px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-md transition-transform duration-300 ease-in-out hover:-translate-y-0.5 shadow-md whitespace-nowrap w-[140px] text-center"
                style={{ fontWeight: 500 }}
              >
                Portfolio 🏡
              </Link>
            </div>
          </div>
          <div className="w-full md:w-1/2 pl-6 md:pl-4 order-1 md:order-none">
            <h1 className="text-3xl md:text-4xl font-bold text-[#0cabba] mb-4 text-center md:text-left">
              See your house blossom
            </h1>
            <p className="text-center md:text-left mb-6 md:mb-4">
              Transform your outdoor space into a stunning landscape that
              enhances your property&apos;s beauty and value. Browse our
              portfolio to see how we&apos;ve helped countless homeowners create
              their dream gardens and landscapes.
            </p>
            <div className="hidden md:block">
              <Link
                href="/portfolio"
                className="inline-block px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-md transition-transform duration-300 ease-in-out hover:-translate-y-0.5 shadow-md whitespace-nowrap w-[140px] text-center"
                style={{ fontWeight: 500 }}
              >
                Portfolio 🏡
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

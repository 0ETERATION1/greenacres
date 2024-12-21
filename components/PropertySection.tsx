import Image from "next/image";
import Link from "next/link";

export default function PropertySection() {
  return (
    <section className="">
      <div className="container mx-auto py-10">
        {/* First Image and Text */}
        <div className="flex items-center mb-10">
          <div className="w-1/2 place-items-end px-5">
            <Image
              src="/assets/images/port/dadMowing.jpg"
              alt="Dad mowing Lawn and leaving stripes in Montgomery County Maryland"
              width={300}
              height={400}
              className="rounded-image custom-image"
            />
          </div>
          <div className="w-1/2 pl-6">
            <h1 className="text-3xl md:text-4xl font-bold text-[#0cabba] mb-4">
              What we bring to the table
            </h1>
            <p>TEXTTTTTTT.</p>
            <br></br>
            <Link
              href="/Services"
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
              Services 📋
              {/* <span>Free Quote!</span> <span className="text-lg">🌳</span> */}
            </Link>
          </div>
        </div>

        {/* Second Image and Text */}
        <div className="flex items-center">
          <div className="w-1/2 pr-6 place-items-end">
            <h1 className="text-3xl md:text-4xl font-bold text-[#0cabba] mb-4">
              See your house blossom
            </h1>
            <p>Learn more about the Green Acres Turf Program</p>
          </div>
          <div className="w-1/2 place-items-start px-5">
            <Image
              src="/assets/images/port/dadMowing.jpg"
              alt="Description of the second image"
              width={300}
              height={400}
              className="rounded-image custom-image"
            />
          </div>
        </div>
      </div>
    </section>
    // <section className="property-section">
    //   <div className="container">
    //     <div className="section-content">
    //       {/* Left side - Images */}
    //       <div className="images-grid">
    //         <div className="image-row">
    //           <div className="image-wrapper small">
    //             <Image
    //               src="/assets/images/port/dadMowing.jpg"
    //               alt="Dad mowing Lawn and leaving stripes in Montgomery County Maryland"
    //               width={744}
    //               height={368}
    //               className="rounded-image"
    //             />
    //           </div>
    //           <div className="image-wrapper medium">
    //             <Image
    //               src="/assets/images/port/powerwashing.jpg"
    //               alt="Power washing concrete in Montgomery County Maryland"
    //               width={400}
    //               height={200}
    //               className="rounded-image"
    //             />
    //           </div>
    //         </div>
    //         <div className="image-row">
    //           <div className="image-wrapper large">
    //             <Image
    //               src="/assets/images/port/shrub_trimming.jpg"
    //               alt="Shrub trimming in Montgomery County Maryland"
    //               width={500}
    //               height={300}
    //               className="rounded-image"
    //             />
    //           </div>
    //           <div className="image-wrapper small">
    //             <Image
    //               src="/assets/images/port/silverspringTurf.jpg"
    //               alt="grass in Montgomery County Maryland"
    //               width={300}
    //               height={200}
    //               className="rounded-image"
    //             />
    //           </div>
    //         </div>
    //       </div>

    //       {/* Right side - Text */}
    //       <div className="content-text">
    //         <h2>Keep your Property looking its Best</h2>
    //         <p>
    //           With 30+ years experience we strive to consistently bring value to
    //           our customers. Save time & hassle and hire us for all your outdoor
    //           needs.
    //         </p>
    //         <Link href="/portfolio" className="portfolio-link">
    //           View Portfolio
    //         </Link>
    //       </div>
    //     </div>
    //   </div>
    // </section>
  );
}

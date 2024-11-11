import Image from "next/image";
import Link from "next/link";

export default function PropertySection() {
  return (
    <section className="property-section">
      <div className="container">
        <div className="section-content">
          {/* Left side - Images */}
          <div className="images-grid">
            <div className="image-row">
              <div className="image-wrapper small">
                <Image
                  src="/assets/images/port/dadMowing.jpg"
                  alt="Dad mowing Lawn and leaving stripes in Montgomery County Maryland"
                  width={300}
                  height={200}
                  className="rounded-image"
                />
              </div>
              <div className="image-wrapper medium">
                <Image
                  src="/assets/images/port/powerwashing.jpg"
                  alt="Power washing concrete in Montgomery County Maryland"
                  width={400}
                  height={200}
                  className="rounded-image"
                />
              </div>
            </div>
            <div className="image-row">
              <div className="image-wrapper large">
                <Image
                  src="/assets/images/port/shrub_trimming.jpg"
                  alt="Shrub trimming in Montgomery County Maryland"
                  width={500}
                  height={300}
                  className="rounded-image"
                />
              </div>
              <div className="image-wrapper small">
                <Image
                  src="/assets/images/port/silverspringTurf.jpg"
                  alt="grass in Montgomery County Maryland"
                  width={300}
                  height={200}
                  className="rounded-image"
                />
              </div>
            </div>
          </div>

          {/* Right side - Text */}
          <div className="content-text">
            <h2>Keep your Property looking its Best</h2>
            <p>
              With 30+ years experience we strive to consistently bring value to
              our customers. Save time & hassle and hire us for all your outdoor
              needs.
            </p>
            <Link href="/portfolio" className="portfolio-link">
              View Portfolio
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

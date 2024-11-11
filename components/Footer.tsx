import React from "react";
import Image from "next/image";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="footer bg-light py-5">
      <div className="container">
        <div className="row justify-content-between">
          {/* Logo and Company Info */}
          <div className="col-auto">
            <Link href="/" className="d-inline-block mb-3">
              <Image
                src="/assets/images/greenacres_2/Logo.png"
                alt="Green Acres Landscaping"
                width={150}
                height={75}
                priority
              />
            </Link>
            <div className="text-muted">
              Green Acres is a landscape company, based in <br />
              Montgomery County Maryland.
            </div>
            <div className="text-muted mt-2">
              Founded over 30 years ago, we strive to continue <br />
              providing quality service for our clients.
            </div>
          </div>

          {/* Address and Contact */}
          <div className="col-auto d-flex flex-column">
            <div className="d-flex align-items-center">
              <i className="ti-map-alt me-2"></i>
              <span>14144 Travilah Road Rockville</span>
            </div>
            <div className="ms-4">Maryland 20850</div>

            <div className="d-flex align-items-center mt-2">
              <i className="ti-headphone-alt me-2"></i>
              <a href="tel:3012781049" className="text-decoration-none">
                (301) 278-1049
              </a>
            </div>

            <div className="d-flex align-items-center mt-2">
              <i className="ti-email me-2"></i>
              <a
                href="mailto:info@greenacresdmv.com"
                className="text-decoration-none"
              >
                info@greenacresdmv.com
              </a>
            </div>

            <div className="d-flex align-items-center mt-2">
              <i className="ti-time me-2"></i>
              <span>Office Hours</span>
            </div>
            <div className="ms-4">
              Mon - Fri: <span className="fw-bold">09:00 - 21:00</span>
            </div>
            <div className="ms-4">
              Sat & Sun: <span className="fw-bold">Closed</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-auto">
            <h6>Quick Links</h6>
            <div className="d-flex gap-4">
              <Link href="/about" className="text-decoration-none">
                About
              </Link>
              <Link href="/services" className="text-decoration-none">
                Services
              </Link>
              <Link href="/portfolio" className="text-decoration-none">
                Portfolio
              </Link>
              <Link href="/firewood" className="text-decoration-none">
                Firewood
              </Link>
              <Link href="/contact" className="text-decoration-none">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

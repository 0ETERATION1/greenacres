import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={`${styles.footer} bg-light py-5`}>
      <div className="container">
        <div className="row justify-content-between">
          {/* Logo and Company Info - Left */}
          <div className="col-md-3 text-start">
            <Link href="/" className="d-inline-block mb-3">
              <Image
                src="/assets/images/greenacres_2/Logo.png"
                alt="Green Acres Landscaping"
                width={150}
                height={75}
                priority
              />
            </Link>
          </div>

          {/* Contact Information - Center */}
          <div className="col-md-4 text-center">
            <div className={styles.contactInfo}>
              <p className="mb-2">
                14144 Travilah Road Rockville
                <br />
                Maryland 20850
              </p>

              <p className="mb-2">
                <a href="tel:3012781049" className={styles.contactLink}>
                  (301) 278-1049
                </a>
              </p>

              <p className="mb-2">
                <a
                  href="mailto:info@greenacresdmv.com"
                  className={styles.contactLink}
                >
                  info@greenacresdmv.com
                </a>
              </p>

              <div className={styles.officeHours}>
                <p className="mb-2">Office Hours</p>
                <p className="mb-1">
                  Mon - Fri: <span className="fw-bold">09:00 - 21:00</span>
                </p>
                <p className="mb-0">
                  Sat & Sun: <span className="fw-bold">Closed</span>
                </p>
              </div>
            </div>
          </div>

          {/* Quick Links - Right */}
          <div className="col-md-3">
            <div className={styles.quickLinksContainer}>
              <h6 className="mb-4">Quick Links</h6>
              <ul className={styles.quickLinks}>
                <li>
                  <Link href="/about">About</Link>
                </li>
                <li>
                  <Link href="/services">Services</Link>
                </li>
                <li>
                  <Link href="/portfolio">Portfolio</Link>
                </li>
                <li>
                  <Link href="/firewood">Firewood</Link>
                </li>
                <li>
                  <Link href="/contact">Contact</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

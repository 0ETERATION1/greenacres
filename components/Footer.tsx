import Link from "next/link";
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white/95 backdrop-blur-md text-gray-800 py-6 shadow-inner">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
          {/* Company Information */}
          <div>
            {/* <h3 className="text-xl font-bold mb-4">Green Acres</h3> */}
            <p className="mb-4 justify-items-center text-center">
              Green Acres is a landscape company, based in Montgomery County
              Maryland. Founded over 30 years ago, we strive to continue
              providing quality service for our clients.
            </p>
            <address className="not-italic text-center">
              14144 Travilah Road
              <br />
              Rockville Maryland 20850
              <br />
              <a href="tel:+13012781049" className="hover:underline ">
                (301) 278-1049
              </a>
              <br />
              <a
                href="mailto:info@greenacresdmv.com"
                className="hover:underline"
              >
                info@greenacresdmv.com
              </a>
            </address>
            <div className="mt-4 text-center">
              <h4 className="font-semibold">Hours</h4>
              <p>Mon - Fri: 09:00 - 21:00</p>
              <p>Sat & Sun: Closed</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="justify-items-center">
              {[
                "Services",
                "About",
                "Portfolio",
                "Firewood",
                "Blog",
                "Contact",
              ].map((link) => (
                <li key={link}>
                  <Link href={`/${link.toLowerCase()}`} className="nav-link">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media Links */}
          <div className="flex flex-col items-center">
            <h3 className="text-xl font-bold mb-4">Connect With Us!</h3>
            <div>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link"
              >
                <Facebook size={24} />
                <span className="sr-only">Facebook</span>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link"
              >
                <Instagram size={24} />
                <span className="sr-only">Instagram</span>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link"
              >
                <Twitter size={24} />
                <span className="sr-only">Twitter</span>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link"
              >
                <Linkedin size={24} />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-green-700 text-center">
          <p>
            &copy; {new Date().getFullYear()} Green Acres. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

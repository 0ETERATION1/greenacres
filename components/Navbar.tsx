import Link from "next/link";
import { NavItem } from "@/types";

const navItems: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Firewood", href: "/firewood" },
  { label: "Contact", href: "/contact" },
  {
    label: "Customer Login",
    href: "https://secure.copilotcrm.com/client/login/portal/423",
    //isButton: true,
  },
];

export default function Navbar() {
  return (
    <header className="header-static navbar-sticky navbar-light">
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <Link href="/" className="navbar-logo">
            <div className="logo" aria-label="Green Acres Landscaping"></div>
          </Link>

          {/* <button
            className="navbar-toggler ml-auto"
            type="button"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button> */}

          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav ml-auto">
              {navItems.map((item, index) => (
                <li key={index} className="nav-item dropdown">
                  <Link
                    href={item.href}
                    className={`nav-link ${
                      item.isButton ? "btn btn-grad" : ""
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

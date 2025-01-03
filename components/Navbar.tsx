"use client";

import { useState } from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="sticky top-0 w-full z-50 transition-all duration-300 border-b bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4 max-w-[100vw] overflow-x-hidden">
        <div className="flex items-center justify-between h-20">
          {/* Left: Logo */}
          <div className="w-[150px]">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem className="pl-0">
                  <Link href="/" legacyBehavior passHref>
                    <NavigationMenuLink className="navbar-logo">
                      <div className="logo"></div>
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Center: Navigation on Desktop */}
          <div className="flex-1 flex justify-center items-center">
            <NavigationMenu className="hidden md:flex w-full max-w-4xl">
              <NavigationMenuList className="w-full flex items-center justify-center">
                <div className="flex items-center justify-center gap-12 pl-20">
                  <NavigationMenuItem className="flex items-center">
                    <Link href="/portfolio" legacyBehavior passHref>
                      <NavigationMenuLink className="nav-link py-2 px-1 text-base">
                        Portfolio
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>

                  <NavigationMenuItem className="flex items-center">
                    <Link href="/about" legacyBehavior passHref>
                      <NavigationMenuLink className="nav-link py-2 px-1 text-base">
                        About
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>

                  <NavigationMenuItem className="flex items-center">
                    <Link href="/services" legacyBehavior passHref>
                      <NavigationMenuLink className="nav-link py-2 px-1 text-base">
                        Services
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>

                  <NavigationMenuItem className="flex items-center">
                    <Link href="/firewood" legacyBehavior passHref>
                      <NavigationMenuLink className="nav-link py-2 px-1 text-base">
                        Firewood
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>

                  <NavigationMenuItem className="flex items-center">
                    <Link href="/blog" legacyBehavior passHref>
                      <NavigationMenuLink className="nav-link py-2 px-1 text-base">
                        Blog
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>

                  <NavigationMenuItem className="flex items-center">
                    <Link href="/quotePage" legacyBehavior passHref>
                      <NavigationMenuLink className="nav-link py-2 px-1 text-base">
                        Contact
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                </div>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right: Desktop Buttons */}
          <div className="w-[300px] flex items-center justify-end gap-4 pr-4">
            <div className="hidden md:flex items-center gap-4">
              <Link
                href="/quotePage"
                className="
                  inline-block px-4 py-2
                  bg-white
                  text-black
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
                Free Quote! 🌳
              </Link>
              <Link
                href="https://secure.copilotcrm.com/client/login/portal/423"
                className="
                  inline-block px-4 py-2
                  bg-gradient-to-r from-green-600 to-green-700
                  text-white
                  rounded-md
                  transition-transform duration-300 ease-in-out
                  hover:-translate-y-0.5
                  shadow-sm
                  whitespace-nowrap
                  w-[140px]
                  text-center
                "
              >
                Sign In
              </Link>
            </div>

            {/* Mobile Actions (Free Quote + Hamburger) */}
            <div className="md:hidden flex items-center gap-2">
              <Link
                href="/quotePage"
                className="
                  inline-block px-3 py-2
                  bg-white
                  text-black
                  rounded-md
                  transition-transform duration-300 ease-in-out
                  hover:-translate-y-0.5
                  shadow-md
                  whitespace-nowrap
                  w-[120px]
                  text-center
                "
                style={{ fontWeight: 500 }}
              >
                Free Quote! 🌳
              </Link>
              <button
                onClick={toggleMobileMenu}
                className="p-2 ml-1"
                aria-label="Toggle menu"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMobileMenuOpen ? (
                    <path d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
              <Link
                href="/portfolio"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-50"
              >
                Portfolio
              </Link>
              <Link
                href="/about"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-50"
              >
                About
              </Link>
              <Link
                href="/services"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-50"
              >
                Services
              </Link>
              <Link
                href="/firewood"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-50"
              >
                Firewood
              </Link>
              <Link
                href="/blog"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-50"
              >
                Blog
              </Link>
              <Link
                href="/quotePage"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-50"
              >
                Contact
              </Link>

              {/* Mobile Sign In Button */}
              <div className="mt-4">
                <Link
                  href="https://secure.copilotcrm.com/client/login/portal/423"
                  className="block w-full px-4 py-2 text-center bg-gradient-to-r from-green-600 to-green-700 text-white rounded-md"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

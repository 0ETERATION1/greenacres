"use client";

import { useState } from "react";
import Link from "next/link";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";

export default function Navbar() {
  const { scrollPosition } = useScrollPosition();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div
      className={cn(
        "sticky top-0 w-full z-50 transition-all duration-300 border-b bg-white/95 backdrop-blur-sm",
        scrollPosition > 0 ? "shadow-md" : ""
      )}
    >
      <div className="container mx-auto px-2">
        <div className="flex items-center justify-between h-20">
          {/* Left: Logo */}
          <div className="w-[200px]">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem className="pl-0">
                  <Link href="/" legacyBehavior passHref>
                    <NavigationMenuLink className="navbar-logo">
                      <div className="logo" />
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Hamburger Menu Button (visible only on mobile) */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2"
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

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden md:flex flex-1 justify-center">
            <NavigationMenuList className="flex items-center space-x-6">
              <NavigationMenuItem>
                <Link href="/services" legacyBehavior passHref>
                  <NavigationMenuLink className="nav-link">
                    Services
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref>
                  <NavigationMenuLink className="nav-link">
                    About
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/portfolio" legacyBehavior passHref>
                  <NavigationMenuLink className="nav-link">
                    Portfolio
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/firewood" legacyBehavior passHref>
                  <NavigationMenuLink className="nav-link">
                    Firewood
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/blog" legacyBehavior passHref>
                  <NavigationMenuLink className="nav-link">
                    Blog
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/quotePage" legacyBehavior passHref>
                  <NavigationMenuLink className="nav-link">
                    Contact
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Right: Contact Buttons (hidden on mobile) */}
          <div className="hidden md:flex items-center gap-4 pr-4">
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
              {/* <span>Free Quote!</span> <span className="text-lg">🌳</span> */}
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
              <Link
                href="/services"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-50"
              >
                Services
              </Link>
              <Link
                href="/about"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-50"
              >
                About
              </Link>
              <Link
                href="/portfolio"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-50"
              >
                Portfolio
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

              {/* Mobile Contact Buttons */}
              <div className="mt-4 space-y-2">
                <Link
                  href="https://secure.copilotcrm.com/client/login/portal/423"
                  className="block w-full px-4 py-2 text-center bg-gradient-to-r from-green-600 to-green-700 text-white rounded-md"
                >
                  Sign In
                </Link>
                <Link
                  href="/quotePage"
                  className="block w-full px-4 py-2 text-center bg-white text-black rounded-md shadow-md"
                >
                  Free Quote! 🌳
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

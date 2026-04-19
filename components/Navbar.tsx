"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLocationsOpen, setIsLocationsOpen] = useState(false);
  const locationsRef = useRef<HTMLDivElement | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const openLocations = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setIsLocationsOpen(true);
  };

  const scheduleCloseLocations = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => {
      setIsLocationsOpen(false);
    }, 120);
  };

  useEffect(() => {
    if (!isLocationsOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        locationsRef.current &&
        !locationsRef.current.contains(e.target as Node)
      ) {
        setIsLocationsOpen(false);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsLocationsOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKey);
    };
  }, [isLocationsOpen]);

  return (
    <div className="sticky top-0 w-full z-50 transition-all duration-300 border-b bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4 max-w-[100vw]">
        <div className="flex items-center justify-between h-20">
          {/* Left: Logo */}
          <div className="w-[150px]">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem className="pl-0">
                  <NavigationMenuLink asChild className="navbar-logo">
                    <Link href="/">
                      <div className="logo"></div>
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Center: Navigation on Desktop */}
          <div className="flex-1 flex justify-center items-center min-w-0">
            <NavigationMenu className="hidden lg:flex w-full max-w-4xl justify-center">
              <NavigationMenuList className="w-full flex items-center justify-center">
                <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1 xl:gap-10">
                  <NavigationMenuItem className="flex items-center">
                    <NavigationMenuLink
                      asChild
                      className="nav-link py-2 px-1 text-base"
                    >
                      <Link href="/about">About</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>

                  <NavigationMenuItem className="flex items-center">
                    <NavigationMenuLink
                      asChild
                      className="nav-link py-2 px-1 text-base"
                    >
                      <Link href="/services">Services</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>

                  <NavigationMenuItem className="flex items-center">
                    <NavigationMenuLink
                      asChild
                      className="nav-link py-2 px-1 text-base"
                    >
                      <Link href="/gallery">Gallery</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>

                  <NavigationMenuItem className="flex items-center">
                    <div
                      ref={locationsRef}
                      className="relative"
                      onMouseEnter={openLocations}
                      onMouseLeave={scheduleCloseLocations}
                    >
                      <button
                        type="button"
                        onClick={() =>
                          isLocationsOpen
                            ? scheduleCloseLocations()
                            : openLocations()
                        }
                        aria-haspopup="menu"
                        aria-expanded={isLocationsOpen}
                        className="nav-link py-2 px-1 text-base !inline-flex items-center gap-1 leading-none"
                      >
                        Locations
                        <ChevronDown
                          className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
                            isLocationsOpen ? "rotate-180" : ""
                          }`}
                          aria-hidden="true"
                        />
                      </button>

                      {isLocationsOpen && (
                        <div
                          className="absolute left-1/2 -translate-x-1/2 top-full pt-2 z-50"
                          onMouseEnter={openLocations}
                          onMouseLeave={scheduleCloseLocations}
                        >
                          <div
                            role="menu"
                            className="min-w-[200px] rounded-md border border-gray-200 bg-white shadow-lg p-1"
                          >
                            <Link
                              href="/north-potomac-lawn-mowing"
                              role="menuitem"
                              onClick={() => setIsLocationsOpen(false)}
                              className="block px-3 py-2 rounded-md hover:bg-gray-50 text-base text-gray-800"
                            >
                              North Potomac
                            </Link>
                            <Link
                              href="/rockville-lawn-mowing"
                              role="menuitem"
                              onClick={() => setIsLocationsOpen(false)}
                              className="block px-3 py-2 rounded-md hover:bg-gray-50 text-base text-gray-800"
                            >
                              Rockville
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                  </NavigationMenuItem>

                  <NavigationMenuItem className="flex items-center">
                    <NavigationMenuLink
                      asChild
                      className="nav-link py-2 px-1 text-base"
                    >
                      <Link href="/firewood">Firewood</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>

                  <NavigationMenuItem className="flex items-center">
                    <NavigationMenuLink
                      asChild
                      className="nav-link py-2 px-1 text-base"
                    >
                      <Link href="/blog">Blog</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>

                  <NavigationMenuItem className="flex items-center">
                    <NavigationMenuLink
                      asChild
                      className="nav-link py-2 px-1 text-base"
                    >
                      <Link href="/contact">Contact</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </div>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right: Desktop Buttons (lg+ so iPad portrait/tablet uses hamburger row) */}
          <div className="shrink-0 flex items-center justify-end gap-2 sm:gap-4 pr-1 sm:pr-4 max-w-[min(100%,320px)] lg:max-w-none">
            <div className="hidden lg:flex items-center gap-3 xl:gap-4">
              <Link
                href="/quotePage"
                className="
                  inline-block px-3 py-2 bg-white text-black rounded-md transition-transform duration-300 ease-in-out hover:-translate-y-0.5 shadow-md whitespace-nowrap w-[130px] text-center 
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

            {/* Tablet + mobile: quote + hamburger */}
            <div className="lg:hidden flex items-center gap-2">
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
                  w-[130px]
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
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
              <Link
                href="/about"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-50 text-center"
              >
                About 📖
              </Link>

              <Link
                href="/services"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-50 text-center"
              >
                Services 🛠️
              </Link>

              <Link
                href="/gallery"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-50 text-center"
              >
                Gallery 🖼
              </Link>

              <div className="px-3 pt-3 pb-1 text-xs font-semibold uppercase tracking-wide text-gray-500 text-center">
                Locations
              </div>
              <Link
                href="/north-potomac-lawn-mowing"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-50 text-center"
              >
                North Potomac
              </Link>
              <Link
                href="/rockville-lawn-mowing"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-50 text-center"
              >
                Rockville
              </Link>

              <Link
                href="/firewood"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-50 text-center"
              >
                Firewood 🔥🪵
              </Link>
              <Link
                href="/blog"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-50 text-center"
              >
                Blog 📝
              </Link>
              <Link
                href="/contact"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-50 text-center"
              >
                Contact 📞
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

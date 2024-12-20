"use client";

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

  return (
    <div
      className={cn(
        "fixed w-full z-50 transition-all duration-300 border-b bg-white/95 backdrop-blur-sm",
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

          {/* Center: Navigation Links */}
          <NavigationMenu className="hidden md:flex flex-1">
            <NavigationMenuList className="w-full flex items-center justify-evenly">
              <NavigationMenuItem>
                <Link href="/services" legacyBehavior passHref>
                  <NavigationMenuLink className="nav-link">
                    Services
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/about" legacyBehavior passHref>
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
                <Link href="/contact" legacyBehavior passHref>
                  <NavigationMenuLink className="nav-link">
                    Contact
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
            </NavigationMenuList>
          </NavigationMenu>

          {/* Right: Contact Buttons */}
          <div className="flex items-center gap-4 pr-4">
            <Link
              href="/contact"
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
              href="/contact"
              className="
                inline-block px-4 py-2
                bg-white
                text-black
                rounded-md
                transition-transform duration-300 ease-in-out
                hover:-translate-y-0.5
                shadow-md
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
      </div>
    </div>
  );
}

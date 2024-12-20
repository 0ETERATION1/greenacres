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
        <div className="flex items-center justify-between">
          {/* Left: Logo */}
          <div className="w-[200px]">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem className="pl-0">
                  <Link href="/" legacyBehavior passHref>
                    <NavigationMenuLink className="navbar-logo -ml-4">
                      <div className="logo" />
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Center: Navigation Links */}
          <NavigationMenu>
            <NavigationMenuList className="flex items-center gap-8">
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
            </NavigationMenuList>
          </NavigationMenu>

          {/* Right: Contact Buttons */}
          <div className="flex items-center gap-4 shrink-0">
            <Link
              href="/contact"
              className="
                inline-block px-6 py-3
                bg-gradient-to-r from-green-600 to-green-700
                text-white
                rounded-2xl
                transition-transform duration-300 ease-in-out
                hover:-translate-y-0.5
                shadow-sm
                whitespace-nowrap
                w-[180px]
                text-center
                text-xl
              "
            >
              Sign In
            </Link>

            <Link
              href="/contact"
              className="
                inline-block px-6 py-3
                bg-gradient-to-r from-green-600 to-green-700
                text-white
                rounded-2xl
                transition-transform duration-300 ease-in-out
                hover:-translate-y-0.5
                shadow-sm
                whitespace-nowrap
                w-[180px]
                text-center
                flex items-center justify-center gap-2
                text-xl
              "
            >
              <span>Free Quote!</span> <span className="text-2xl">🌳</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

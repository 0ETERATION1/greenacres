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
  const { scrollDirection, scrollPosition } = useScrollPosition();

  return (
    <div
      className={cn(
        "fixed w-full z-50 transition-all duration-300",
        {
          "translate-y-0": scrollDirection === "up" || scrollPosition < 100,
          "-translate-y-full":
            scrollDirection === "down" && scrollPosition > 100,
        },
        scrollPosition > 0
          ? "bg-white/95 backdrop-blur-sm shadow-md"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto">
        <NavigationMenu className="w-full">
          <NavigationMenuList className="w-full flex justify-between px-4">
            {/* Logo */}
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className="navbar-logo">
                  <div className="logo" />
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            {/* Navigation Items */}
            <div className="flex items-center gap-6">
              <NavigationMenuItem>
                <Link href="/services" legacyBehavior passHref>
                  <NavigationMenuLink
                    className={cn(
                      "nav-link",
                      scrollPosition > 0 ? "text-foreground" : "text-white"
                    )}
                  >
                    Services
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/firewood" legacyBehavior passHref>
                  <NavigationMenuLink
                    className={cn(
                      "nav-link",
                      scrollPosition > 0 ? "text-foreground" : "text-white"
                    )}
                  >
                    Firewood
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/contact" legacyBehavior passHref>
                  <NavigationMenuLink className="btn-grad">
                    Contact Us
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </div>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
}

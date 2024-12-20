import type { Metadata } from "next";
import { Poppins, Playfair_Display, Roboto } from "next/font/google";
import "./globals.css";

// Font configurations
const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

const playfair = Playfair_Display({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-playfair",
});

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Green Acres | Landscaping",
  description: "Lawn and Landscape Company in Maryland",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, viewport-fit=cover"
        />
      </head>
      <body
        className={`${poppins.variable} ${playfair.variable} ${roboto.variable}`}
      >
        {children}
      </body>
    </html>
  );
}

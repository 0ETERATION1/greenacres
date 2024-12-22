import type { Metadata } from "next";
// import { Poppins, Playfair_Display, Roboto } from "next/font/google";
import "./globals.css";
import CopilotScript from "@/components/CopilotScript";

// const playfair = Playfair_Display({
//   weight: ["400", "700"],
//   subsets: ["latin"],
//   variable: "--font-playfair",
// });

// const roboto = Roboto({
//   weight: ["400", "500", "700"],
//   subsets: ["latin"],
//   variable: "--font-roboto",
// });

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
      <body>
        {children}
        <div
          id="7b18f385-61fa-4a26-bb55-bea4198a6257"
          className="copilot-request-container copilot-preview-loader"
          style={{ display: "none" }}
        />
        <CopilotScript />
      </body>
    </html>
  );
}

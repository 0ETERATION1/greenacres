import type { Metadata } from "next";
import "./globals.css";

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
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  // Basic metadata - appears in browser tab and search results
  title: "Anamon",
  description: "Collect, trade, and explore unique Anamons in the ultimate digital card marketplace.",
  
  
  openGraph: {
    title: "Anamon",
    description: "Collect, trade, and explore unique Anamons in the ultimate digital card marketplace.",
    url: "https://anamon.io", // Replace with your actual domain when deployed
    siteName: "Anamon",
    images: [
      {
        url: "/thumbnail-image.png", // Image from /public folder
        width: 1200,
        height: 630,
        alt: "Anamon - Digital Card Marketplace",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  
  // Twitter/X metadata - optimized for Twitter cards
  twitter: {
    card: "summary_large_image", // Large image preview
    title: "Anamon",
    description: "Collect, trade, and explore unique Anamons in the ultimate digital card marketplace.",
    images: ["/thumbnail-image.png"],
  },
  
  // Additional SEO metadata
  keywords: ["Anamon", "digital cards", "collectibles", "marketplace", "trading"],
  authors: [{ name: "Anamon Team" }],
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=Switzer@400,500,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

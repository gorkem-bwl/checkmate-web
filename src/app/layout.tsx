import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { JsonLd } from "@/components/JsonLd";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://checkmate.so"),
  title: {
    default: "Checkmate - Open source infrastructure monitoring",
    template: "%s | Checkmate",
  },
  description:
    "Monitor your servers, websites, Docker containers, and infrastructure with Checkmate. Open-source, self-hosted, and built for teams who value control.",
  keywords: [
    "uptime monitoring",
    "server monitoring",
    "infrastructure monitoring",
    "Docker monitoring",
    "open source",
    "self-hosted",
    "website monitoring",
    "ping monitoring",
    "SSL monitoring",
    "port monitoring",
    "game server monitoring",
    "status page",
    "Lighthouse",
    "PageSpeed",
    "free monitoring",
    "monitoring tool",
    "incident management",
  ],
  authors: [{ name: "Bluewave Labs" }],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://checkmate.so",
  },
  openGraph: {
    title: "Checkmate - Open source infrastructure monitoring",
    description:
      "Monitor your servers, websites, Docker containers, and infrastructure with Checkmate. Open-source, self-hosted, and built for teams who value control.",
    url: "https://checkmate.so",
    siteName: "Checkmate",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Checkmate - Open source infrastructure monitoring",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Checkmate - Open source infrastructure monitoring",
    description:
      "Monitor your servers, websites, Docker containers, and infrastructure with Checkmate. Open-source, self-hosted, and built for teams who value control.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#FAFAFA]`}
      >
        <JsonLd />
        {children}
      </body>
    </html>
  );
}

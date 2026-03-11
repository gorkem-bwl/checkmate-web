import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Checkmate - Open source infrastructure monitoring",
  description:
    "Monitor your servers, websites, Docker containers, and infrastructure with Checkmate. Open-source, self-hosted, and built for teams who value control.",
  keywords: [
    "uptime monitoring",
    "server monitoring",
    "infrastructure monitoring",
    "Docker monitoring",
    "open source",
    "self-hosted",
    "status page",
    "incident management",
  ],
  authors: [{ name: "Bluewave Labs" }],
  openGraph: {
    title: "Checkmate - Open source infrastructure monitoring",
    description:
      "Monitor your servers, websites, Docker containers, and infrastructure with Checkmate. Open-source, self-hosted, and built for teams who value control.",
    url: "https://checkmate.so",
    siteName: "Checkmate",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Checkmate - Open source infrastructure monitoring",
    description:
      "Monitor your servers, websites, Docker containers, and infrastructure with Checkmate. Open-source, self-hosted, and built for teams who value control.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#FAFAFA]`}
      >
        {children}
      </body>
    </html>
  );
}

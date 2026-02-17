import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
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
  title: {
    default: "Platform Engineering Toolkit",
    template: "%s | Platform Engineering Toolkit",
  },
  description:
    "Proven practices to shape the people and organizational side of platform engineering — where impact happens.",
  keywords: [
    "platform engineering",
    "developer experience",
    "DevOps",
    "internal developer platform",
    "team topologies",
    "platform as a product",
  ],
  openGraph: {
    title: "Platform Engineering Toolkit",
    description:
      "Not new tech. Just proven practices to shape the people and organizational side of platform engineering — where impact happens.",
    type: "website",
    locale: "en_US",
    siteName: "Platform Engineering Toolkit",
  },
  twitter: {
    card: "summary_large_image",
    title: "Platform Engineering Toolkit",
    description:
      "Proven practices to shape the people and organizational side of platform engineering.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-background min-h-screen antialiased`}
      >
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

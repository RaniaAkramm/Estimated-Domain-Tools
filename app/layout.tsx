import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Providers from "./providers";

const SITE_URL = "https://estimated.example.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Estimated — Domain Appraisal & Naming Tools",
    template: "%s | Estimated",
  },
  description:
    "Estimate what a domain name is worth and check its letter pattern for pronounceability — free tools for buying, selling, and naming domains.",
  keywords: [
    "domain appraisal",
    "domain valuation tool",
    "what is my domain worth",
    "domain name value estimator",
    "cvcvcv pattern checker",
    "brandable domain checker",
    "domain flipping tools",
  ],
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Estimated",
    title: "Estimated — Domain Appraisal & Naming Tools",
    description:
      "Estimate what a domain name is worth and check its letter pattern for pronounceability.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Estimated — Domain Appraisal & Naming Tools",
    description:
      "Estimate what a domain name is worth and check its letter pattern for pronounceability.",
  },
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Estimated",
    url: SITE_URL,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Any",
    description:
      "Free domain appraisal and naming tools: a multi-factor domain value estimator and a CVCVCV letter-pattern checker for brandability.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <html lang="en">
      <body className="font-serif text-ink bg-bg">
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Providers>
          <Nav />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

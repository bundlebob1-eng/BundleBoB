import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "@/styles/index.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://bundlebob.com"),
  title: {
    default: "BundleBoB — an embedded margin engineer for mid-market construction",
    template: "%s — BundleBoB",
  },
  description:
    "We embed one engineer inside a mid-market general contractor to connect Procore, Sage, Foundation, QuickBooks and the spreadsheets nobody owns — then build the layer on top that shows where the margin is leaking. A headcount line, not a software subscription.",
  openGraph: {
    title: "BundleBoB — an embedded margin engineer for mid-market construction",
    description:
      "One engineer, embedded in your firm. Connect your systems, get job costing and cash on current data, then plain-English answers a person approves.",
    type: "website",
    url: "https://bundlebob.com",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:px-3 focus:py-2 focus:text-paper">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

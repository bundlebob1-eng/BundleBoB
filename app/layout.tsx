import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import "@/styles/index.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "BundleBOB — AI Solutions for Your Business",
  description:
    "BundleBOB builds mobile apps, websites, AI solutions, chatbots, and business automation for modern companies ready to grow.",
  openGraph: {
    title: "BundleBOB — AI Solutions for Your Business",
    description:
      "Mobile apps, websites, AI chatbots, and business automation. Built for the AI era.",
    type: "website",
    url: "https://bundlebob.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "BundleBOB — AI Solutions for Your Business",
    description:
      "Mobile apps, websites, AI chatbots, and business automation. Built for the AI era.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${syne.variable} ${dmSans.variable} bg-[#080808] text-white`}
      >
        <Header />
        {children}
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}

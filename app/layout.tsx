import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import AnimatedCursor from "@/components/AnimatedCursor";
import RevealProvider from "@/components/Common/RevealProvider";
import "@/styles/index.css";

const syne = Syne({ subsets:["latin"], weight:["400","500","600","700","800"], variable:"--font-syne", display:"swap" });
const dmSans = DM_Sans({ subsets:["latin"], weight:["300","400","500"], variable:"--font-dm-sans", display:"swap" });

export const metadata: Metadata = {
  title: { default:"BundleBOB — AI Solutions Agency", template:"%s | BundleBOB" },
  description:"BundleBOB builds mobile apps, websites, AI chatbots, and business automation for companies ready to grow in the AI era. Based in Irving, Texas.",
  keywords:["AI agency","mobile app development","chatbot","business automation","Irving Texas","Next.js","React"],
  openGraph: {
    title:"BundleBOB — AI Solutions Agency",
    description:"Mobile apps, websites, AI chatbots, and automation. Built for the AI era.",
    type:"website", url:"https://bundlebob.com",
  },
  twitter:{ card:"summary_large_image", title:"BundleBOB — AI Solutions Agency", description:"Mobile apps, websites, AI chatbots, and automation." },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${syne.variable} ${dmSans.variable}`}>
        <AnimatedCursor />
        <RevealProvider />
        <Header />
        <main className="page-enter">{children}</main>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}

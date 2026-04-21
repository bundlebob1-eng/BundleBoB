"use client";
import { useEffect, useRef } from "react";

const marqueeRow1 = [
  { tag: "01", text: "Mobile Apps" },
  { tag: "02", text: "Web Development" },
  { tag: "03", text: "AI Solutions" },
  { tag: "04", text: "Chatbot Creation" },
  { tag: "05", text: "Business Automation" },
  { tag: "06", text: "AI-Driven Growth" },
];

const marqueeRow2 = [
  "Flutter · React Native",
  "Next.js · React",
  "OpenAI · LangChain",
  "n8n · Zapier · Make",
  "WhatsApp · Slack · Web",
  "Python · Node.js",
];

const MarqueeBrands = () => {
  return (
    <div className="overflow-hidden border-b border-white/10 bg-[#0f0f0f]">
      {/* Row 1 */}
      <div className="flex items-center overflow-hidden border-b border-white/10" style={{ height: 52 }}>
        <div
          className="flex whitespace-nowrap"
          style={{ animation: "marquee-scroll 24s linear infinite", width: "max-content" }}
        >
          {[...marqueeRow1, ...marqueeRow1].map((item, i) => (
            <div
              key={i}
              className="inline-flex h-[52px] items-center gap-0 border-r border-white/10 px-7"
            >
              <span className="mr-2.5 text-[11px] font-bold uppercase tracking-widest text-[#b8ff57]">
                {item.tag}
              </span>
              <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-gray-500">
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 — reverse */}
      <div className="flex items-center overflow-hidden" style={{ height: 52 }}>
        <div
          className="flex whitespace-nowrap"
          style={{ animation: "marquee-scroll 20s linear infinite reverse", width: "max-content" }}
        >
          {[...marqueeRow2, ...marqueeRow2].map((text, i) => (
            <div
              key={i}
              className="inline-flex h-[52px] items-center border-r border-white/10 px-7 text-[11px] font-medium uppercase tracking-[0.14em] text-gray-500"
            >
              {text}
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

export default MarqueeBrands;

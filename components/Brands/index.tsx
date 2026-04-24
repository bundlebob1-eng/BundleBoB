"use client";

const row1 = [
  { tag: "01", text: "Mobile Apps" },
  { tag: "02", text: "Web Development" },
  { tag: "03", text: "AI Solutions" },
  { tag: "04", text: "Chatbot Creation" },
  { tag: "05", text: "Business Automation" },
  { tag: "06", text: "AI-Driven Growth" },
];

const row2 = [
  "Flutter · React Native",
  "Next.js · React",
  "OpenAI · LangChain",
  "n8n · Zapier · Make",
  "WhatsApp · Slack · Web",
  "Python · Node.js · Supabase",
];

export default function Brands() {
  return (
    <div className="overflow-hidden border-b border-white/[0.07] bg-[#0a0a0c]">
      {/* Row 1 */}
      <div className="flex overflow-hidden border-b border-white/[0.07]" style={{ height: 52 }}>
        <div className="flex" style={{ animation: "ticker 28s linear infinite", width: "max-content", willChange: "transform" }}>
          {[...row1, ...row1, ...row1].map((item, i) => (
            <div key={i} className="flex h-[52px] shrink-0 items-center gap-3 border-r border-white/[0.07] px-8">
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#b8ff57]">{item.tag}</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-gray-600">{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 reverse */}
      <div className="flex overflow-hidden" style={{ height: 52 }}>
        <div className="flex" style={{ animation: "ticker 22s linear infinite reverse", width: "max-content", willChange: "transform" }}>
          {[...row2, ...row2, ...row2].map((text, i) => (
            <div key={i} className="flex h-[52px] shrink-0 items-center border-r border-white/[0.07] px-8 font-mono text-[10px] uppercase tracking-[0.15em] text-gray-600">
              {text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

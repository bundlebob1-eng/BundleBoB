const r1 = [{t:"01",l:"Mobile Apps"},{t:"02",l:"Web Dev"},{t:"03",l:"AI Solutions"},{t:"04",l:"Chatbots"},{t:"05",l:"Automation"},{t:"06",l:"AI Growth"}];
const r2 = ["Flutter · React Native","Next.js · React","OpenAI · LangChain","n8n · Zapier · Make","WhatsApp · Slack","Python · Node.js · AWS"];
export default function Brands() {
  return (
    <div className="overflow-hidden border-b border-white/[0.06] bg-[#07070a]">
      <div className="flex overflow-hidden border-b border-white/[0.06]" style={{height:48}}>
        <div className="flex shrink-0" style={{animation:"ticker 26s linear infinite",width:"max-content"}}>
          {[...r1,...r1,...r1].map((x,i)=>(
            <div key={i} className="flex h-12 shrink-0 items-center gap-3 border-r border-white/[0.06] px-7">
              <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-[#b8ff57]">{x.t}</span>
              <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-gray-600">{x.l}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex overflow-hidden" style={{height:48}}>
        <div className="flex shrink-0" style={{animation:"ticker 20s linear infinite reverse",width:"max-content"}}>
          {[...r2,...r2,...r2].map((x,i)=>(
            <div key={i} className="flex h-12 shrink-0 items-center border-r border-white/[0.06] px-7 font-mono text-[9px] uppercase tracking-[0.14em] text-gray-600">{x}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

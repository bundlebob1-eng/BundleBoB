import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.07] bg-[#040406]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4 border-b border-white/[0.07]">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center border border-[#b8ff57]/40 bg-[#b8ff57]/10 font-mono text-[10px] font-black text-[#b8ff57]">BB</div>
              <span className="font-syne text-lg font-extrabold text-white">Bundle<span className="text-[#b8ff57]">BOB</span></span>
            </div>
            <p className="mb-6 font-mono text-[11px] leading-[1.8] text-gray-500 max-w-[220px]">
              AI-powered apps, websites, chatbots & automation. Built for the modern era.
            </p>
            <div className="space-y-1.5">
              <a href="mailto:contact@bundlebob.com" className="block font-mono text-[11px] text-gray-500 hover:text-[#b8ff57] transition">contact@bundlebob.com</a>
              <span className="block font-mono text-[11px] text-gray-500">Irving, Texas, USA</span>
            </div>
          </div>

          {[
            { title:"Services", links:[{l:"Mobile Apps",h:"/services"},{l:"Websites",h:"/services"},{l:"AI Solutions",h:"/services"},{l:"Automation",h:"/services"},{l:"Chatbots",h:"/services"},{l:"AI Growth",h:"/services"}] },
            { title:"Company",  links:[{l:"About Us",h:"/about"},{l:"Our Work",h:"/work"},{l:"Process",h:"/process"},{l:"Pricing",h:"/services"},{l:"Contact",h:"/contact"}] },
            { title:"Legal",    links:[{l:"Privacy Policy",h:"#"},{l:"Terms of Service",h:"#"},{l:"Cookie Policy",h:"#"},{l:"NDA Template",h:"#"}] },
          ].map(col => (
            <div key={col.title}>
              <h4 className="mb-5 font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-gray-500">{col.title}</h4>
              {col.links.map(l => (
                <Link key={l.l} href={l.h} className="mb-2.5 block font-mono text-[11px] text-gray-500 transition hover:text-[#b8ff57]">{l.l}</Link>
              ))}
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 py-6">
          <span className="font-mono text-[10px] text-gray-600">© 2025 BundleBOB LLC. All rights reserved. Registered in the United States.</span>
          <div className="flex gap-5">
            {["LinkedIn","Twitter / X","GitHub"].map(s => (
              <Link key={s} href="#" className="font-mono text-[10px] text-gray-600 hover:text-[#b8ff57] transition">{s}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

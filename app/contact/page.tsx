import type { Metadata } from "next";
import Pending from "@/components/Pending";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reach us directly by email. Tell us the systems you run and the role you have been trying to fill.",
};

export default function Contact() {
  return (
    <div className="pt-24">
      <section className="border-b border-white/[0.06] bg-[#040406] px-4 py-20">
        <div className="container mx-auto">
          <div className="mb-6 flex items-center gap-2.5">
            <span className="h-px w-8 bg-[#b8ff57]" />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#b8ff57]">Contact</span>
          </div>
          <h1
            className="mb-6 max-w-[20ch] font-syne font-extrabold leading-tight tracking-[-0.04em] text-white"
            style={{ fontSize: "clamp(36px,7vw,80px)" }}
          >
            Email us directly
          </h1>
          <p className="mb-8 max-w-[520px] text-[15px] leading-[1.85] text-gray-400">
            No form that goes nowhere. Write to the address below and a person replies.
          </p>

          <div className="border border-white/[0.07] p-8">
            <div className="font-mono text-[9px] uppercase tracking-[0.16em] text-gray-500">Email</div>
            <div className="mt-2 text-[18px] text-white">
              <Pending>real company inbox, e.g. hello@bundlebob.com — must be a mailbox someone actually reads</Pending>
            </div>
            <div className="mt-4 font-mono text-[9px] uppercase tracking-[0.16em] text-gray-500">Reply time</div>
            <div className="mt-2 text-[13px] text-gray-400">
              <Pending>an expected reply time you can actually hold to, e.g. &ldquo;within two business days&rdquo;</Pending>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/[0.06] bg-[#07070a] px-4 py-20">
        <div className="container mx-auto">
          <h2 className="mb-5 font-syne text-[22px] font-bold text-white">What to put in the email</h2>
          <ul className="max-w-[620px] space-y-3 text-[13px] leading-[1.8] text-gray-400">
            <li className="flex gap-3"><span className="text-[#b8ff57]">→</span> Your firm, roughly your annual revenue, and the type of work you do.</li>
            <li className="flex gap-3"><span className="text-[#b8ff57]">→</span> The systems you run — project management, accounting/ERP, payroll, field apps.</li>
            <li className="flex gap-3"><span className="text-[#b8ff57]">→</span> The role you have been trying to hire, or the report you keep not getting.</li>
            <li className="flex gap-3"><span className="text-[#b8ff57]">→</span> Where month-end currently hurts most: job costing, cash, change orders, retainage.</li>
          </ul>
        </div>
      </section>

      <section className="bg-[#040406] px-4 py-20">
        <div className="container mx-auto">
          <h2 className="mb-5 font-syne text-[22px] font-bold text-white">Company details</h2>
          <div className="max-w-[620px] space-y-3">
            <p className="text-[14px] leading-[1.85] text-gray-400">
              <Pending>registered entity name and US state of registration</Pending>
            </p>
            <p className="text-[14px] leading-[1.85] text-gray-400">
              <Pending>mailing address or region, if one is public</Pending>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

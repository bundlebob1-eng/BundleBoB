import type { Metadata } from "next";
import Pending from "@/components/Pending";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reach us directly by email. Tell us the systems you run and the role you have been trying to fill.",
};

export default function Contact() {
  return (
    <>
      <section className="border-b border-line">
        <div className="container mx-auto px-5 pb-14 pt-36 md:pb-20 md:pt-44">
          <p className="label">
            Contact
          </p>
          <h1
            className="mt-5 max-w-[20ch] font-display font-semibold tracking-[-0.03em] text-white"
            style={{ fontSize: "clamp(30px,5vw,52px)" }}
          >
            Email us directly
          </h1>
          <p className="mt-5 max-w-[52ch] text-[15px] leading-[1.7] text-muted">
            No form that goes nowhere. Write to the address below and a person replies.
          </p>

          <div className="mt-8 max-w-[52ch] border border-line bg-bg-2 p-6">
            <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">Email</div>
            <div className="mt-2 text-[16px] text-white">
              <Pending>real company inbox, e.g. hello@bundlebob.com — must be a mailbox someone actually reads</Pending>
            </div>
            <div className="mt-5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">Reply time</div>
            <div className="mt-2 text-[13px] text-muted">
              <Pending>an expected reply time you can actually hold to, e.g. &ldquo;within two business days&rdquo;</Pending>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-bg-2">
        <div className="container mx-auto px-5 py-14 md:py-20">
          <h2 className="font-display text-[20px] font-semibold text-white">What to put in the email</h2>
          <ul className="mt-4 max-w-[60ch] space-y-2.5 text-[13px] leading-[1.7] text-muted">
            <li className="flex gap-3"><span className="text-accent">→</span> Your firm, roughly your annual revenue, and the type of work you do.</li>
            <li className="flex gap-3"><span className="text-accent">→</span> The systems you run — project management, accounting/ERP, payroll, field apps.</li>
            <li className="flex gap-3"><span className="text-accent">→</span> The role you have been trying to hire, or the report you keep not getting.</li>
            <li className="flex gap-3"><span className="text-accent">→</span> Where month-end currently hurts most: job costing, cash, change orders, retainage.</li>
          </ul>
        </div>
      </section>

      <section>
        <div className="container mx-auto px-5 py-14 md:py-20">
          <h2 className="font-display text-[20px] font-semibold text-white">Company details</h2>
          <div className="mt-4 max-w-[60ch] space-y-3">
            <p className="text-[14px] leading-[1.75] text-muted">
              <Pending>registered entity name and US state of registration</Pending>
            </p>
            <p className="text-[14px] leading-[1.75] text-muted">
              <Pending>mailing address or region, if one is public</Pending>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

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
      <section className="rule-b">
        <div className="container py-16 md:py-24">
          <p className="label">Contact</p>
          <h1 className="mt-5 max-w-[20ch] text-[36px] leading-tight md:text-[48px]">
            Email us directly
          </h1>
          <p className="mt-6 lead">
            No form that goes nowhere. Write to the address below and a person
            replies.
          </p>

          <p className="mt-8 text-[20px]">
            <Pending>real company inbox, e.g. hello@bundlebob.com — must be a mailbox someone actually reads</Pending>
          </p>
          <p className="mt-2 text-[14px] text-ink-soft">
            <Pending>expected reply time you can actually hold to, e.g. &ldquo;within two business days&rdquo;</Pending>
          </p>
        </div>
      </section>

      <section className="rule-b">
        <div className="container py-14 md:py-20">
          <h2 className="text-[22px]">What to put in the email</h2>
          <ul className="mt-4 space-y-3 max-w-prose text-ink-soft">
            <li>Your firm, roughly your annual revenue, and the type of work you do.</li>
            <li>The systems you run &mdash; project management, accounting/ERP, payroll, field apps.</li>
            <li>The role you have been trying to hire, or the report you keep not getting.</li>
            <li>Where month-end currently hurts most: job costing, cash, change orders, retainage.</li>
          </ul>
        </div>
      </section>

      <section>
        <div className="container py-14 md:py-20">
          <h2 className="text-[22px]">Company details</h2>
          <div className="mt-4 max-w-prose prose-block">
            <p className="text-ink-soft">
              <Pending>registered entity name and US state of registration</Pending>
            </p>
            <p className="text-ink-soft">
              <Pending>mailing address or region, if one is public</Pending>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "A public contact channel for BundleBoB is being set up. This page will carry the address once it is live.",
  robots: { index: false, follow: true },
};

export default function Contact() {
  return (
    <>
      <section className="border-b border-white/[0.06]">
        <div className="container mx-auto px-5 pb-14 pt-36 md:pb-20 md:pt-44">
          <p className="label">Contact</p>
          <h1
            className="mt-5 max-w-[22ch] font-syne font-semibold tracking-[-0.03em] text-white"
            style={{ fontSize: "clamp(28px,5vw,48px)" }}
          >
            A direct channel isn&rsquo;t open yet
          </h1>
          <p className="mt-5 max-w-[56ch] text-[15px] leading-[1.7] text-white/50">
            We are not taking inbound enquiries through the site yet. Rather than publish an address that
            nobody is reading, this page will carry a real inbox — and a reply-time we can hold to — once that
            is in place. Check back, or reach us through a warm introduction in the meantime.
          </p>
        </div>
      </section>

      <section className="border-b border-white/[0.06] bg-bg2">
        <div className="container mx-auto px-5 py-14 md:py-20">
          <h2 className="font-syne text-[20px] font-semibold text-white">When the channel is live, tell us</h2>
          <ul className="mt-4 max-w-[60ch] space-y-2.5 text-[13px] leading-[1.7] text-white/50">
            <li className="flex gap-3"><span className="text-accent">&rarr;</span> Your firm, roughly your annual revenue, and the type of work you do.</li>
            <li className="flex gap-3"><span className="text-accent">&rarr;</span> The systems you run &mdash; project management, accounting/ERP, payroll, field apps.</li>
            <li className="flex gap-3"><span className="text-accent">&rarr;</span> The role you have been trying to hire, or the report you keep not getting.</li>
            <li className="flex gap-3"><span className="text-accent">&rarr;</span> Where month-end currently hurts most: job costing, cash, change orders, retainage.</li>
          </ul>
        </div>
      </section>

      <section>
        <div className="container mx-auto px-5 py-14 md:py-20">
          <h2 className="font-syne text-[20px] font-semibold text-white">Company details</h2>
          <p className="mt-4 max-w-[60ch] text-[14px] leading-[1.75] text-white/80">
            The registered entity name, US state of registration, and mailing region are not published here
            yet. They will be listed once they are on record and checkable.
          </p>
        </div>
      </section>
    </>
  );
}

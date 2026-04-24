import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#0f0f0f]">
      <div className="container mx-auto px-4">
        {/* Main grid */}
        <div className="grid grid-cols-1 gap-12 border-b border-white/10 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-3.5 flex items-center gap-2 text-xl font-extrabold tracking-tight text-white">
              Bundle<span className="text-[#b8ff57]">BOB</span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#b8ff57]" />
            </div>
            <p className="mb-7 max-w-[260px] text-[13px] leading-7 text-gray-500">
              AI solutions for your business. We build apps, websites, chatbots, and
              automation systems for companies ready to grow in the AI era.
            </p>
            <div className="space-y-2">
              <a
                href="mailto:contact@bundlebob.com"
                className="block text-[13px] text-gray-500 transition hover:text-[#b8ff57]"
              >
                contact@bundlebob.com
              </a>
              <a
                href="tel:+15550000000"
                className="block text-[13px] text-gray-500 transition hover:text-[#b8ff57]"
              >
                +1 (555) 000-0000
              </a>
              <span className="block text-[13px] text-gray-500">Irving, Texas, USA</span>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-500">
              Services
            </h4>
            {["Mobile Apps", "Websites", "AI Solutions", "Automation", "Chatbots", "AI Growth"].map(
              (item) => (
                <Link
                  key={item}
                  href="/#services"
                  className="mb-3 block text-[13px] text-gray-500 transition hover:text-white"
                >
                  {item}
                </Link>
              )
            )}
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-500">
              Company
            </h4>
            {[
              { label: "About Us", href: "/#about" },
              { label: "How It Works", href: "/#process" },
              { label: "Case Studies", href: "/#testimonials" },
              { label: "Contact", href: "/#contact" },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="mb-3 block text-[13px] text-gray-500 transition hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-500">
              Legal
            </h4>
            {["Privacy Policy", "Terms of Service", "Cookie Policy", "NDA Template"].map((item) => (
              <Link
                key={item}
                href="#"
                className="mb-3 block text-[13px] text-gray-500 transition hover:text-white"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-6">
          <span className="text-[12px] text-gray-600">
            © 2025 BundleBOB LLC. All rights reserved. Registered in the United States.
          </span>
          <div className="flex gap-6">
            {["LinkedIn", "Twitter / X", "GitHub"].map((s) => (
              <Link
                key={s}
                href="#"
                className="text-[12px] text-gray-600 transition hover:text-gray-400"
              >
                {s}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

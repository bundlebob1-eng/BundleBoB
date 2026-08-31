/**
 * Pending — a deliberately conspicuous marker for a fact that is not yet verified.
 *
 * The build brief forbids shipping fabricated stats, names, entity claims, or
 * client proof. Anywhere the real value is not yet known, wrap the description of
 * what needs to go there in <Pending> so the gap is obvious in the rendered page
 * and easy to grep for before launch:  grep -rn "Pending" app components
 */
export default function Pending({
  children,
  block = false,
}: {
  children: React.ReactNode;
  block?: boolean;
}) {
  const base =
    "font-mono text-[12px] leading-relaxed text-amber-300/90 bg-amber-400/10 border border-dashed border-amber-400/50 rounded-sm";
  return (
    <span className={block ? `${base} block p-3` : `${base} inline px-1.5 py-0.5`}>
      [ TO CONFIRM: {children} ]
    </span>
  );
}

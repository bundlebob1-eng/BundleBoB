/**
 * Pending — a deliberately conspicuous marker for a fact that is not yet verified.
 *
 * The build brief forbids shipping fabricated stats, names, entity claims, or
 * client proof. Anywhere the real value is not yet known, wrap the description of
 * what needs to go there in <Pending> so the gap is obvious in the rendered page
 * and easy to grep for before launch.
 */
export default function Pending({
  children,
  block = false,
}: {
  children: React.ReactNode;
  block?: boolean;
}) {
  return (
    <span className={block ? "pending pending-block" : "pending"}>
      [ TO CONFIRM: {children} ]
    </span>
  );
}

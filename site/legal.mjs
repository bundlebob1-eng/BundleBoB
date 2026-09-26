/* ============================================================
   LEGAL — privacy and terms.

   Every factual claim here was verified against the build rather
   than copied from a template:

     analytics scripts     0   (grep across dist/)
     cookies set           0   (no document.cookie anywhere)
     external requests     0   (scripts/verify.mjs)
     localStorage keys     1   (theme preference, assets/theme.js)
     form submissions      0   (no endpoint; prepared locally)

   If any of those stop being true, this page becomes false and
   must be updated in the same commit.

   Deliberately omitted: a governing-law clause and a registered
   legal entity. Neither is known here, and inventing either
   would be worse than leaving it out.
   ============================================================ */

const UPDATED = '26 September 2026';

const hero = (tag, title, body) =>
  `<header class="page-hero wrap"><p class="eyebrow">${tag}</p><h1>${title}</h1><p class="lede">${body}</p></header>`;

const block = (title, body) =>
  `<section class="section wrap section-tight"><h2>${title}</h2>${body}</section>`;

export function privacy() {
  return `${hero(
    'Privacy',
    'We collect less than you expect.',
    'This site has no analytics, no advertising, no tracking pixels and no cookies. That is not a policy position we aspire to; it is what the code currently does, and it is checked on every build.'
  )}

${block('What this site stores on your device', `
<p>One thing: your light or dark theme preference, kept in your browser's local storage so the page does not flash the wrong theme when you return. It never leaves your device and is never sent to us. Clearing your browser data removes it.</p>
<p>No cookies are set by this site.</p>`)}

${block('What happens when you use the contact form', `
<p>The form does not submit to a server. It prepares your message locally, in your own browser, and hands it to you &mdash; either as a file you can download or as a draft in your own email application. Nothing reaches us until you choose to send it yourself.</p>
<p>That means if you fill the form in and close the tab, we never see it, and we have no record that you were here. When you do send, your message arrives in an ordinary mailbox and is kept for as long as it takes to answer you and to keep a record of the conversation.</p>`)}

${block('What our host records', `
<p>The site is served by Vercel, which keeps standard server logs for security and reliability. Those logs typically include your IP address, the page requested, the time, and your browser's user-agent string. We do not combine those logs with anything else, and we do not use them to build a profile of you.</p>
<p>Video and fonts are served from this same domain. There are no third-party embeds, so no other company receives a request when you load a page here.</p>`)}

${block('Demonstration data', `
<p>The reconciliation figures shown on this site are synthetic. They are constructed to explain a method. They are not a customer's data, and they are not a record of a result we have produced for anyone.</p>`)}

${block('Your rights', `
<p>If you have sent us a message and want a copy of it, want it corrected, or want it deleted, reply to that message or use the contact page and we will do it. Because we hold nothing until you write to us, there is usually very little to act on.</p>`)}

${block('Changes', `
<p>Last updated ${UPDATED}. If the site starts collecting anything &mdash; analytics, a form endpoint, a booking tool &mdash; this page changes in the same release, not afterwards.</p>`)}`;
}

export function terms() {
  return `${hero(
    'Terms',
    'What this site is, and is not.',
    'Short, because the site does very little: it describes services and lets you start a conversation.'
  )}

${block('Information, not an offer', `
<p>Everything published here is for information. It is not an offer, a quotation, or a contract, and nothing on this site creates an obligation on either side. Work begins only under a separate written agreement that sets out scope, price and terms.</p>`)}

${block('Demonstrations and examples', `
<p>The reconciliation demonstration and any figures beside it use synthetic data. Example engagements are labelled as examples. Neither is a representation of results achieved for a client, and neither should be relied on as a forecast of what your own numbers would do.</p>`)}

${block('Using this site', `
<p>You are welcome to read, quote and link to this site. The text, code, diagrams and interface illustrations are our work and remain ours. Background footage is licensed stock, credited in the footer, and is not ours to sublicense.</p>
<p>Please do not attempt to disrupt the site, probe it for vulnerabilities without asking first, or use it to send anything unlawful. If you think you have found a security problem, tell us through the contact page and we will be glad to hear it.</p>`)}

${block('No warranty', `
<p>The site is provided as it is. We keep it accurate and available as best we can, but we do not promise it will be uninterrupted or error-free, and we are not liable for decisions made solely on the strength of a marketing page. For anything that matters, talk to us first.</p>`)}

${block('Links out', `
<p>Where we link to another site, we do not control it and are not responsible for what it does with your data. Its terms apply once you arrive.</p>`)}

${block('Changes', `
<p>Last updated ${UPDATED}. We may revise these terms; the current version is always the one on this page.</p>`)}`;
}

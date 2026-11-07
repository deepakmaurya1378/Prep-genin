import LegalPage from "@/components/site/LegalPage";

export const metadata = { title: "Terms of Service · PrepGenin" };

const SECTIONS = [
  {
    id: "agreement",
    title: "Agreement",
    body: ["By creating an account or using PrepGenin, you agree to these terms. If you do not agree, please do not use the service."],
  },
  {
    id: "service",
    title: "What PrepGenin is",
    body: [
      "PrepGenin is a practice tool. It generates mock interview questions with AI, transcribes your spoken answers and gives AI-written ratings and feedback.",
      "AI output can be wrong, incomplete or biased. Feedback is for practice only and is not professional career, legal or hiring advice. It does not predict how a real interview will go.",
    ],
  },
  {
    id: "account",
    title: "Your account",
    body: [
      { list: [
        "You must provide accurate sign-up information and keep your login secure.",
        "You are responsible for activity on your account.",
        "You must be at least 13 years old to use PrepGenin.",
      ] },
    ],
  },
  {
    id: "acceptable-use",
    title: "Acceptable use",
    body: [
      "Please do not:",
      { list: [
        "Use PrepGenin to break the law or harm others.",
        "Try to access other people's accounts or data.",
        "Overload, disrupt, scrape or reverse-engineer the service.",
        "Enter content that is abusive, hateful or that you don't have the right to use.",
      ] },
    ],
  },
  {
    id: "content",
    title: "Your content",
    body: [
      "You keep ownership of the interview details and answers you provide. You allow us to store and process them to run the service for you, including sending them to our AI provider as described in our Privacy Policy.",
    ],
  },
  {
    id: "plans",
    title: "Plans and payments",
    body: [
      "The Starter plan is free. Paid plans, when offered, are billed as shown on the Upgrade page. Prices and plan features may change; we will tell you before a change affects a plan you pay for.",
    ],
  },
  {
    id: "availability",
    title: "Availability",
    body: [
      "We work to keep PrepGenin running, but it is provided “as is” without guarantees of uptime or that it will be error-free. We may change or discontinue features.",
    ],
  },
  {
    id: "liability",
    title: "Limitation of liability",
    body: [
      "To the extent allowed by law, PrepGenin is not liable for indirect or consequential losses, including lost job opportunities, arising from your use of the service.",
    ],
  },
  {
    id: "termination",
    title: "Ending your use",
    body: [
      "You can stop using PrepGenin at any time and ask us to delete your account. We may suspend accounts that break these terms.",
    ],
  },
  {
    id: "changes",
    title: "Changes to these terms",
    body: ["We may update these terms. The date at the top shows the latest version. Continuing to use PrepGenin after a change means you accept the updated terms."],
  },
];

export default function Terms() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms of Service"
      subtitle="The rules for using PrepGenin, in plain language."
      updated="26 October 2026"
      sections={SECTIONS}
    />
  );
}

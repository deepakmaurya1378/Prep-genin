import LegalPage from "@/components/site/LegalPage";

export const metadata = { title: "Cookie Policy · PrepGenin" };

const SECTIONS = [
  {
    id: "overview",
    title: "Overview",
    body: [
      "PrepGenin uses a small number of cookies and browser storage items, only to keep you signed in and remember your settings. We do not use advertising or cross-site tracking cookies.",
    ],
  },
  {
    id: "essential",
    title: "Essential cookies",
    body: [
      "Set by our sign-in provider, Clerk, to keep you logged in securely. Without them you cannot use your account.",
      { list: [
        "Session cookies: identify your signed-in session.",
        "Security cookies: protect your session against misuse.",
      ] },
    ],
  },
  {
    id: "storage",
    title: "Browser storage",
    body: [
      "We also save a few small settings in your browser's local storage. These never leave your device:",
      { list: [
        "Theme: whether you chose light or dark mode.",
        "First visit: so the dashboard greets you correctly the first time.",
        "Speech model files: in browsers without built-in speech recognition, the on-device transcription model is cached so it only downloads once.",
      ] },
    ],
  },
  {
    id: "control",
    title: "Managing cookies",
    body: [
      "You can clear cookies and site data in your browser settings at any time. Clearing them will sign you out and reset your theme choice.",
    ],
  },
  {
    id: "changes",
    title: "Changes",
    body: ["If we start using new kinds of cookies, we will update this page first."],
  },
];

export default function Cookies() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Cookie Policy"
      subtitle="The few cookies we use, and what each one does."
      updated="26 October 2026"
      sections={SECTIONS}
    />
  );
}

import LegalPage from "@/components/site/LegalPage";

export const metadata = { title: "Privacy Policy · PrepGenin" };

const SECTIONS = [
  {
    id: "summary",
    title: "The short version",
    body: [
      "PrepGenin helps you practise interviews. To do that we store your account details, the interviews you create and your written answers with their feedback. Your webcam video is never recorded, stored or uploaded. We do not sell your data.",
    ],
  },
  {
    id: "what-we-collect",
    title: "What we collect",
    body: [
      { list: [
        "Account details: your name and email address, provided when you sign up through our sign-in provider, Clerk.",
        "Interview details you enter: job role, tech stack or job description, and years of experience.",
        "Interview content: the generated questions and model answers, the text transcript of your spoken answers, and the AI rating and feedback for each answer.",
        "Basic technical data such as browser type, needed to keep the service working and secure.",
      ] },
      "We do not collect or store video. Your camera feed is shown only to you, in your own browser, as a preview.",
    ],
  },
  {
    id: "voice",
    title: "Your voice and answers",
    body: [
      "When you record an answer, your speech is turned into text so it can be scored. In Chrome and Edge this uses the browser's built-in speech recognition, which may be processed by the browser provider (for example Google). In other browsers, PrepGenin transcribes your audio on your own device with a small speech model, so the audio does not leave your computer.",
      "Only the resulting text is saved with your interview. Raw audio is not stored by PrepGenin.",
    ],
  },
  {
    id: "how-we-use",
    title: "How we use your information",
    body: [
      { list: [
        "To create tailored interview questions for the role you enter.",
        "To score your answers and write feedback.",
        "To show your interview history so you can review and retake interviews.",
        "To run, secure and improve the service.",
      ] },
    ],
  },
  {
    id: "ai",
    title: "AI processing",
    body: [
      "To generate questions and feedback, we send the interview details you entered and your transcribed answers to an AI model provider (currently Groq). This text is used only to produce your questions and feedback.",
    ],
  },
  {
    id: "sharing",
    title: "Who we share data with",
    body: [
      "We share data only with the services needed to run PrepGenin:",
      { list: [
        "Clerk, for sign-in and account management.",
        "Neon, which hosts our database.",
        "Our AI model provider, to generate questions and feedback.",
      ] },
      "We do not sell your personal information or share it for advertising.",
    ],
  },
  {
    id: "retention",
    title: "Keeping and deleting your data",
    body: [
      "Your interviews stay in your account until you delete them. You can delete any interview from your dashboard, which also deletes its answers and feedback. To delete your whole account, contact us through the Contact page.",
    ],
  },
  {
    id: "rights",
    title: "Your choices and rights",
    body: [
      "You can view and delete your interviews at any time. Depending on where you live, you may also have the right to request a copy of your data, correct it, or ask us to delete it. Reach us through the Contact page and we will respond.",
    ],
  },
  {
    id: "children",
    title: "Children",
    body: ["PrepGenin is not intended for children under 13, and we do not knowingly collect their data."],
  },
  {
    id: "changes",
    title: "Changes to this policy",
    body: ["If we change this policy we will update the date at the top of this page. Significant changes will be announced in the app."],
  },
];

export default function Privacy() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      subtitle="What we collect, why, and how you stay in control."
      updated="26 October 2026"
      sections={SECTIONS}
    />
  );
}

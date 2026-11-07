// Blog articles. Each body item is a paragraph, { h: "Heading" }, or { list: [...] }.
const POSTS = [
  {
    slug: "tell-me-about-yourself",
    title: "How to answer “Tell me about yourself”",
    excerpt: "The first question sets the tone. Use a simple present–past–future structure to give a focused 60–90 second answer.",
    tag: "Interview basics",
    readTime: "4 min read",
    body: [
      "Almost every interview opens with some version of “Tell me about yourself.” It sounds casual, but it is your chance to frame the whole conversation. A rambling life story wastes it. A focused answer makes the interviewer want to hear more.",
      { h: "Use present, past, future" },
      { list: [
        "Present: what you do now, in one or two sentences. Your role, your focus, one result you're proud of.",
        "Past: the experience that led here. Pick one or two points that matter for this job, not your whole CV.",
        "Future: why this role is the next step, and what you want to do in it.",
      ] },
      { h: "Keep it to 60–90 seconds" },
      "That is about 150–200 words spoken. Long enough to show substance, short enough that the interviewer stays engaged and can ask follow-ups.",
      { h: "Tailor it to the job" },
      "Read the job description and pick the two or three skills it stresses most. Make sure your answer touches each one with a concrete example. A frontend role? Mention the product you shipped. A team lead role? Mention the people you've helped grow.",
      { h: "Practise it out loud" },
      "This is the answer you will give most often, so it is worth rehearsing until it sounds natural, not memorised. Record yourself, listen back, and cut anything that doesn't support the job you want.",
    ],
  },
  {
    slug: "star-method",
    title: "The STAR method for behavioural questions",
    excerpt: "“Tell me about a time when…” questions are easier with a structure. Here's how to use Situation, Task, Action, Result.",
    tag: "Behavioural",
    readTime: "5 min read",
    body: [
      "Behavioural questions ask about real past situations: a conflict, a deadline, a failure. Interviewers use them because past behaviour is a good guide to future behaviour. The STAR method keeps your answer clear and complete.",
      { h: "What STAR stands for" },
      { list: [
        "Situation: set the scene in one or two sentences. Where were you, what was going on?",
        "Task: what were you responsible for? What was the goal or problem?",
        "Action: what did you do? This is the heart of the answer, so spend the most time here and say “I”, not “we”.",
        "Result: what happened? Use numbers when you can, and say what you learned.",
      ] },
      { h: "A quick example" },
      "Situation: our checkout page was timing out during a sale. Task: I owned the payments service and had to fix it before the next day's traffic peak. Action: I profiled the slow requests, found an unindexed database query, added the index and a short cache, and load-tested the fix. Result: checkout time dropped from 4 seconds to under 1, and we finished the sale with no further errors.",
      { h: "Prepare a story bank" },
      "Write down five or six stories that show different strengths: leadership, handling conflict, recovering from a mistake, learning something fast, delivering under pressure. Most behavioural questions can be answered with one of them.",
      { h: "Common mistakes" },
      { list: [
        "Spending too long on the situation and running out of time for the action.",
        "Describing what the team did instead of your own part.",
        "Forgetting the result, or choosing a story with no clear outcome.",
      ] },
    ],
  },
  {
    slug: "practise-out-loud",
    title: "Why practising out loud beats rehearsing in your head",
    excerpt: "Answers that feel clear in your head often come out messy when spoken. Speaking them is the fastest way to improve.",
    tag: "Practice",
    readTime: "3 min read",
    body: [
      "Most people prepare for interviews by reading questions and thinking through answers. It feels productive, but it skips the part that actually happens in the interview: speaking.",
      { h: "Your head is too forgiving" },
      "When you rehearse silently, your brain fills gaps and skips the awkward transitions. Out loud, those gaps show up as pauses, filler words and answers that wander. You can only fix what you can hear.",
      { h: "Speaking builds recall" },
      "Saying an answer a few times makes it easier to find under pressure. It is the same reason musicians practise on the instrument instead of just reading the music.",
      { h: "How to practise well" },
      { list: [
        "Answer each question out loud, without stopping to restart.",
        "Listen back or read the transcript. Note filler words and any point you didn't finish.",
        "Compare with a strong example answer and see what you missed.",
        "Repeat the same question a few days later and check that your answer improved.",
      ] },
      "PrepGenin is built around this loop: it asks you real questions for your role, transcribes what you say, and scores each answer with specific tips, so every practice session tells you exactly what to work on next.",
    ],
  },
];

export default POSTS;

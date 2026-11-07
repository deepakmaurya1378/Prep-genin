"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/**
 * Two little robots working together while something loads.
 * The job on the table changes with `scene`:
 *   questions  – writing interview questions (creating an interview)
 *   setup      – setting up camera + checklist (opening an interview)
 *   grading    – listening and scoring (analysing an answer)
 *   feedback   – building a report with charts and stars
 *   history    – pulling interview files out of a cabinet
 *   default    – turning gears
 */

const CAPTIONS = {
  questions: ["Reading your job role…", "Writing tailored questions…", "Drafting model answers…", "Polishing the final set…"],
  setup: ["Setting up the interview room…", "Testing camera and mic…", "Laying out your questions…"],
  grading: ["Listening to your answer…", "Comparing with a model answer…", "Scoring your response…"],
  feedback: ["Collecting your answers…", "Scoring each question…", "Writing improvement tips…", "Building your report…"],
  history: ["Opening your interview files…", "Sorting by most recent…"],
  default: ["Getting things ready…", "Almost there…"],
};

const BLUE = { body: "#3b82f6", head: "#60a5fa" };
const INDIGO = { body: "#6366f1", head: "#818cf8" };

/* ───────── helpers ───────── */

function Swing({ on, from, to, dur = "0.8s", begin = "0s" }) {
  if (!on) return null;
  return (
    <animateTransform
      attributeName="transform"
      type="rotate"
      values={`${from};${to};${from}`}
      keyTimes="0;0.5;1"
      calcMode="spline"
      keySplines=".45 0 .55 1;.45 0 .55 1"
      dur={dur}
      begin={begin}
      repeatCount="indefinite"
    />
  );
}

function Loop({ on, attr, values, keyTimes, dur = "3s", begin = "0s" }) {
  if (!on) return null;
  return <animate attributeName={attr} values={values} keyTimes={keyTimes} dur={dur} begin={begin} repeatCount="indefinite" />;
}

function Arm({ side, color, rest, reach, on, dur, begin, children }) {
  const x = side === "left" ? -24 : 24;
  return (
    <g transform={`translate(${x} -52)`}>
      <g transform={`rotate(${rest})`}>
        <Swing on={on} from={rest} to={reach} dur={dur} begin={begin} />
        <rect x="-4" y="0" width="8" height="30" rx="4" fill={color} />
        <circle cx="0" cy="32" r="5.5" fill="#94a3b8" />
        {children}
      </g>
    </g>
  );
}

/** A robot standing at ground level (y = 176). `facing` is the side the table is on. */
function Robot({ x, colors, facing, on, delay = 0, workDur = "0.8s", tool }) {
  const innerSide = facing === "right" ? "right" : "left";
  const outerSide = facing === "right" ? "left" : "right";
  const sign = facing === "right" ? -1 : 1;

  return (
    <g transform={`translate(${x} 176)`}>
      <g className={on ? "rb-bob" : ""} style={{ animationDelay: `${delay}s` }}>
        {/* feet */}
        <rect x="-18" y="-9" width="14" height="9" rx="4" fill="#64748b" />
        <rect x="4" y="-9" width="14" height="9" rx="4" fill="#64748b" />

        {/* outer arm, gentle sway */}
        <Arm side={outerSide} color={colors.head} rest={sign * -10} reach={sign * -18} on={on} dur="2.4s" />

        {/* body */}
        <rect x="-22" y="-56" width="44" height="46" rx="12" fill={colors.body} />
        <rect x="-13" y="-47" width="26" height="15" rx="5" fill="#ffffff" opacity="0.22" />
        {["#fde68a", "#a7f3d0", "#bae6fd"].map((c, i) => (
          <circle key={c} cx={-6 + i * 7} cy="-39.5" r="2.3" fill={c}>
            <Loop on={on} attr="opacity" values="1;0.25;1" dur="1.4s" begin={`${i * 0.25 + delay}s`} />
          </circle>
        ))}

        {/* neck + head */}
        <rect x="-5" y="-62" width="10" height="7" rx="2" fill="#94a3b8" />
        <g>
          <Swing on={on} from="-4 0 -60" to="4 0 -60" dur="3s" begin={`${delay}s`} />
          <line x1="0" y1="-99" x2="0" y2="-109" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="0" cy="-112" r="4" fill="#fbbf24">
            <Loop on={on} attr="opacity" values="1;0.3;1" dur="1.1s" begin={`${delay}s`} />
          </circle>
          <rect x="-31" y="-86" width="6" height="12" rx="2" fill={colors.body} />
          <rect x="25" y="-86" width="6" height="12" rx="2" fill={colors.body} />
          <rect x="-27" y="-99" width="54" height="39" rx="14" fill={colors.head} />
          <rect x="-20" y="-93" width="40" height="27" rx="9" fill="#0b1220" />
          {/* eyes look toward the table and blink */}
          <g transform={`translate(${sign * -2.5} 0)`}>
            <ellipse cx="-8" cy="-81" rx="3.8" ry="3.8" fill="#7dd3fc">
              <Loop on={on} attr="ry" values="3.8;3.8;0.4;3.8" keyTimes="0;0.92;0.96;1" dur="3.4s" begin={`${delay}s`} />
            </ellipse>
            <ellipse cx="8" cy="-81" rx="3.8" ry="3.8" fill="#7dd3fc">
              <Loop on={on} attr="ry" values="3.8;3.8;0.4;3.8" keyTimes="0;0.92;0.96;1" dur="3.4s" begin={`${delay}s`} />
            </ellipse>
          </g>
          <path d="M-5 -73 q5 4 10 0" stroke="#7dd3fc" strokeWidth="2" fill="none" strokeLinecap="round" />
        </g>

        {/* working arm, reaching toward the table */}
        <Arm side={innerSide} color={colors.head} rest={sign * 55} reach={sign * 78} on={on} dur={workDur} begin={`${delay}s`}>
          {tool}
        </Arm>
      </g>
    </g>
  );
}

function Table() {
  return (
    <g className="text-slate-300 dark:text-slate-700" fill="currentColor">
      <rect x="136" y="140" width="88" height="6" rx="3" />
      <rect x="146" y="146" width="4" height="30" rx="2" />
      <rect x="210" y="146" width="4" height="30" rx="2" />
    </g>
  );
}

/* ───────── scenes (things on the table) ───────── */

function QuestionsScene({ on }) {
  return (
    <g>
      <rect x="154" y="94" width="52" height="46" rx="4" fill="#ffffff" stroke="#cbd5e1" />
      <text x="161" y="104" fontSize="7" fontWeight="700" fill="#3b82f6" fontFamily="sans-serif">Q1</text>
      {[110, 118, 126, 134].map((y, i) => (
        <line key={y} x1="161" y1={y} x2={i === 3 ? 184 : 199} y2={y} stroke="#93c5fd" strokeWidth="2.5" strokeLinecap="round" pathLength="1" strokeDasharray="1" strokeDashoffset={on ? 1 : 0}>
          <Loop on={on} attr="stroke-dashoffset" values="1;0;0;1" keyTimes="0;0.25;0.9;1" dur="3.6s" begin={`${i * 0.45}s`} />
        </line>
      ))}
      {/* question marks drifting up */}
      {[{ x: 162, d: 0 }, { x: 196, d: 1.2 }, { x: 180, d: 2.4 }].map((q) => (
        <text key={q.x} x={q.x} y="88" fontSize="13" fontWeight="800" fill="#6366f1" fontFamily="sans-serif" opacity={on ? 0 : 1}>
          ?
          <Loop on={on} attr="opacity" values="0;1;0" dur="3.6s" begin={`${q.d}s`} />
          {on && (
            <animateTransform attributeName="transform" type="translate" values="0 6;0 -18" dur="3.6s" begin={`${q.d}s`} repeatCount="indefinite" />
          )}
        </text>
      ))}
    </g>
  );
}

function SetupScene({ on }) {
  return (
    <g>
      {/* checklist floating above */}
      <rect x="146" y="34" width="68" height="44" rx="7" fill="#ffffff" stroke="#cbd5e1" />
      {["Camera", "Mic", "Questions"].map((t, i) => (
        <g key={t}>
          <rect x="153" y={41 + i * 12} width="8" height="8" rx="2" fill="none" stroke="#94a3b8" />
          <path d={`M154.5 ${45 + i * 12} l2 2 l3.5 -4`} stroke="#10b981" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" pathLength="1" strokeDasharray="1" strokeDashoffset={on ? 1 : 0}>
            <Loop on={on} attr="stroke-dashoffset" values="1;1;0;0;1" keyTimes={`0;${0.15 + i * 0.2};${0.25 + i * 0.2};0.92;1`} dur="4s" />
          </path>
          <text x="166" y={48 + i * 12} fontSize="7" fill="#475569" fontFamily="sans-serif">{t}</text>
        </g>
      ))}
      {/* camera on tripod */}
      <g stroke="#64748b" strokeWidth="2.5" strokeLinecap="round">
        <line x1="180" y1="114" x2="166" y2="140" />
        <line x1="180" y1="114" x2="194" y2="140" />
        <line x1="180" y1="114" x2="180" y2="140" />
      </g>
      <rect x="163" y="92" width="34" height="22" rx="5" fill="#334155" />
      <rect x="168" y="88" width="10" height="5" rx="1.5" fill="#334155" />
      <circle cx="180" cy="103" r="7" fill="#0b1220" stroke="#60a5fa" strokeWidth="2" />
      <circle cx="182" cy="101" r="1.8" fill="#bae6fd" />
      <circle cx="192" cy="97" r="2" fill="#ef4444">
        <Loop on={on} attr="opacity" values="1;0.2;1" dur="1s" />
      </circle>
    </g>
  );
}

function GradingScene({ on }) {
  const bars = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <g>
      {/* score gauge */}
      <path d="M152 86 A28 28 0 0 1 166 61.8" stroke="#f87171" strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d="M170 59.6 A28 28 0 0 1 190 59.6" stroke="#fbbf24" strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d="M194 61.8 A28 28 0 0 1 208 86" stroke="#34d399" strokeWidth="6" fill="none" strokeLinecap="round" />
      <g transform="translate(180 86)">
        <g transform="rotate(-50)">
          <Swing on={on} from={-55} to={60} dur="2.6s" />
          <rect x="-1.5" y="-24" width="3" height="24" rx="1.5" fill="#334155" className="dark:fill-slate-200" />
        </g>
        <circle r="4" fill="#334155" className="dark:fill-slate-200" />
      </g>
      {/* answer waveform on the table */}
      {bars.map((i) => {
        const h = 6 + ((i * 7) % 18);
        return (
          <rect key={i} x={157 + i * 5.4} y={136 - h} width="3.2" height={h} rx="1.6" fill="#60a5fa">
            <Loop on={on} attr="height" values={`3;${h};3`} dur={`${0.7 + (i % 3) * 0.15}s`} begin={`${i * 0.08}s`} />
            <Loop on={on} attr="y" values={`133;${136 - h};133`} dur={`${0.7 + (i % 3) * 0.15}s`} begin={`${i * 0.08}s`} />
          </rect>
        );
      })}
    </g>
  );
}

function FeedbackScene({ on }) {
  const bars = [14, 22, 30, 40];
  const star = (cx, cy, r = 5) => {
    const pts = [];
    for (let k = 0; k < 10; k++) {
      const rr = k % 2 === 0 ? r : r * 0.45;
      const a = (Math.PI / 5) * k - Math.PI / 2;
      pts.push(`${(cx + rr * Math.cos(a)).toFixed(2)},${(cy + rr * Math.sin(a)).toFixed(2)}`);
    }
    return pts.join(" ");
  };
  return (
    <g>
      {/* stars popping in */}
      {[0, 1, 2, 3, 4].map((i) => (
        <polygon key={i} points={star(156 + i * 12, 58)} fill="#fbbf24" opacity={on ? 0 : 1}>
          <Loop on={on} attr="opacity" values="0;0;1;1;0" keyTimes={`0;${0.1 + i * 0.12};${0.16 + i * 0.12};0.9;1`} dur="4s" />
        </polygon>
      ))}
      {/* report board with growing bars */}
      <rect x="148" y="70" width="64" height="66" rx="6" fill="#ffffff" stroke="#cbd5e1" />
      <line x1="154" y1="128" x2="206" y2="128" stroke="#e2e8f0" strokeWidth="1.5" />
      {bars.map((h, i) => (
        <rect key={i} x={157 + i * 12.5} y={128 - h} width="8" height={h} rx="2" fill={i === 3 ? "#10b981" : "#93c5fd"}>
          <Loop on={on} attr="height" values={`1;${h};${h};1`} keyTimes="0;0.3;0.9;1" dur="4s" begin={`${i * 0.15}s`} />
          <Loop on={on} attr="y" values={`127;${128 - h};${128 - h};127`} keyTimes="0;0.3;0.9;1" dur="4s" begin={`${i * 0.15}s`} />
        </rect>
      ))}
      {/* magnifying glass scanning */}
      <g transform="translate(160 96)">
        {on && <animateTransform attributeName="transform" type="translate" values="158 96;196 104;158 96" dur="3s" repeatCount="indefinite" />}
        <circle r="8" fill="#e0e7ff" fillOpacity="0.5" stroke="#6366f1" strokeWidth="2.5" />
        <line x1="6" y1="6" x2="12" y2="12" stroke="#6366f1" strokeWidth="3" strokeLinecap="round" />
      </g>
    </g>
  );
}

function HistoryScene({ on }) {
  const Folder = ({ to, begin, color }) => (
    <g transform="translate(172 80)" opacity="0">
      {on && (
        <>
          <animateTransform attributeName="transform" type="translate" values={`172 80;${(172 + to[0]) / 2} 52;${to[0]} ${to[1]}`} keyTimes="0;0.45;1" dur="2.4s" begin={begin} repeatCount="indefinite" />
          <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.85;1" dur="2.4s" begin={begin} repeatCount="indefinite" />
        </>
      )}
      <path d="M0 3 h6 l2 -3 h8 v13 h-16 z" fill={color} />
    </g>
  );
  return (
    <g>
      {/* cabinet */}
      <rect x="160" y="84" width="40" height="56" rx="4" fill="#cbd5e1" className="dark:fill-slate-600" />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x="164" y={88 + i * 17} width="32" height="14" rx="2" fill="#e2e8f0" className="dark:fill-slate-500" />
          <rect x="175" y={93 + i * 17} width="10" height="3" rx="1.5" fill="#64748b" />
        </g>
      ))}
      <Folder to={[138, 128]} begin="0s" color="#fbbf24" />
      <Folder to={[206, 128]} begin="1.2s" color="#60a5fa" />
    </g>
  );
}

function gearPath(cx, cy, r, teeth) {
  const pts = [];
  const step = (Math.PI * 2) / (teeth * 2);
  for (let i = 0; i < teeth * 2; i++) {
    const rr = i % 2 === 0 ? r : r * 0.78;
    const a1 = i * step;
    const a2 = (i + 1) * step;
    pts.push(`${(cx + rr * Math.cos(a1)).toFixed(2)},${(cy + rr * Math.sin(a1)).toFixed(2)}`);
    pts.push(`${(cx + rr * Math.cos(a2)).toFixed(2)},${(cy + rr * Math.sin(a2)).toFixed(2)}`);
  }
  return `M${pts.join("L")}Z`;
}

function DefaultScene({ on }) {
  return (
    <g>
      <g>
        {on && <animateTransform attributeName="transform" type="rotate" values="0 166 108;360 166 108" dur="4s" repeatCount="indefinite" />}
        <path d={gearPath(166, 108, 18, 10)} fill="#60a5fa" />
        <circle cx="166" cy="108" r="5" fill="#0b1220" />
      </g>
      <g>
        {on && <animateTransform attributeName="transform" type="rotate" values="0 196 96;-360 196 96" dur="3s" repeatCount="indefinite" />}
        <path d={gearPath(196, 96, 13, 8)} fill="#818cf8" />
        <circle cx="196" cy="96" r="4" fill="#0b1220" />
      </g>
    </g>
  );
}

const SCENES = {
  questions: QuestionsScene,
  setup: SetupScene,
  grading: GradingScene,
  feedback: FeedbackScene,
  history: HistoryScene,
  default: DefaultScene,
};

// Small item each robot holds, per scene
const TOOLS = {
  questions: {
    left: <rect x="-1.5" y="34" width="3" height="12" rx="1" fill="#fbbf24" transform="rotate(-30 0 34)" />,
    right: <rect x="-5" y="34" width="10" height="7" rx="1.5" fill="#c7d2fe" />,
  },
  setup: {
    left: <path d="M-2 34 l0 10 l4 0 l0 -10z" fill="#475569" />,
    right: <circle cx="0" cy="40" r="3.5" fill="#475569" />,
  },
  grading: {
    left: <path d="M-5 36 q5 6 10 0" stroke="#475569" strokeWidth="2" fill="none" />,
    right: <rect x="-1.5" y="34" width="3" height="11" rx="1" fill="#10b981" />,
  },
  feedback: {
    left: <rect x="-1.5" y="34" width="3" height="12" rx="1" fill="#fbbf24" transform="rotate(-30 0 34)" />,
    right: null,
  },
  history: {
    left: null,
    right: null,
  },
  default: {
    left: <path d="M-1.5 34 h3 v10 h3 v4 h-9 v-4 h3z" fill="#475569" />,
    right: null,
  },
};

export default function RobotLoader({ scene = "default", message, size = "md", className = "" }) {
  const reduce = useReducedMotion();
  const on = !reduce;
  const captions = CAPTIONS[scene] || CAPTIONS.default;
  const [i, setI] = useState(0);

  useEffect(() => {
    if (message || captions.length < 2) return;
    const id = setInterval(() => setI((n) => (n + 1) % captions.length), 2200);
    return () => clearInterval(id);
  }, [message, captions.length]);

  const Scene = SCENES[scene] || DefaultScene;
  const tools = TOOLS[scene] || TOOLS.default;
  const text = message || captions[i];
  const fast = scene === "questions" || scene === "feedback" ? "0.45s" : "0.9s";
  const width = size === "sm" ? 220 : size === "lg" ? 380 : 300;

  return (
    <div role="status" aria-live="polite" className={`flex flex-col items-center gap-3 ${className}`}>
      <svg viewBox="40 24 280 160" width={width} style={{ maxWidth: "100%", height: "auto" }} aria-hidden="true">
        <ellipse cx="180" cy="178" rx="130" ry="5" className="fill-slate-200 dark:fill-slate-800" />
        <Table />
        <Scene on={on} />
        <Robot x={92} colors={BLUE} facing="right" on={on} workDur={fast} tool={tools.left} />
        <Robot x={268} colors={INDIGO} facing="left" on={on} delay={0.4} workDur="0.9s" tool={tools.right} />
      </svg>
      <div className="h-5 relative w-full flex justify-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={text}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="text-sm font-medium text-slate-600 dark:text-slate-300 text-center"
          >
            {text}
          </motion.p>
        </AnimatePresence>
      </div>
      <span className="sr-only">Loading</span>
    </div>
  );
}

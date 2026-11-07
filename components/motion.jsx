"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  animate,
  MotionConfig,
} from "framer-motion";

const EASE = [0.21, 0.47, 0.32, 0.98];

/** Respects the OS "reduce motion" setting for every framer animation below it. */
export function MotionProvider({ children }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

/** Fades + lifts its content when scrolled into view. */
export function Reveal({ children, delay = 0, y = 24, className = "", as = "div", once = true }) {
  const Comp = motion[as] || motion.div;
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </Comp>
  );
}

/** Parent that staggers its <StaggerItem> children as they enter the viewport. */
export function Stagger({ children, className = "", gap = 0.08, delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: gap, delayChildren: delay } } }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = "" }) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Headline that reveals word by word.
 * segments: [{ text: "Ace your next interview", className?: "gradient-text", br?: true }]
 */
export function SplitText({ segments, className = "", delay = 0, as = "h1" }) {
  const Comp = motion[as] || motion.h1;
  let index = 0;
  return (
    <Comp
      className={className}
      initial="hidden"
      animate="show"
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: delay } } }}
    >
      {segments.map((seg, s) => (
        <React.Fragment key={s}>
          {seg.br && <br className="hidden sm:inline" />}
          {seg.text.split(" ").map((word) => {
            index += 1;
            return (
              <motion.span
                key={`${s}-${index}`}
                className={`inline-block will-change-transform ${seg.className || ""}`}
                variants={{
                  hidden: { opacity: 0, y: "0.35em" },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
                }}
              >
                {word}
                {" "}
              </motion.span>
            );
          })}
        </React.Fragment>
      ))}
    </Comp>
  );
}

/** Card with a glow that follows the cursor across the surface and the border. */
export function SpotlightCard({ children, className = "", glow = "59, 130, 246", ...rest }) {
  const ref = useRef(null);
  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--x", `${e.clientX - r.left}px`);
    el.style.setProperty("--y", `${e.clientY - r.top}px`);
  };
  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className={`spotlight-card group/spot relative ${className}`}
      style={{ "--glow": glow }}
      {...rest}
    >
      <div aria-hidden className="spotlight-surface" />
      <div aria-hidden className="spotlight-border" />
      {children}
    </div>
  );
}

/** Counts from 0 up to `to` once visible. */
export function CountUp({ to, decimals = 0, duration = 1.6, prefix = "", suffix = "", className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, Number(to) || 0, {
      duration,
      ease: EASE,
      onUpdate: (v) => setVal(v),
    });
    return () => controls.stop();
  }, [inView, to, duration]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {prefix}
      {val.toFixed(decimals)}
      {suffix}
    </span>
  );
}

/** Infinite horizontal scroller with faded edges. */
export function Marquee({ children, className = "", speed = 40, reverse = false }) {
  return (
    <div className={`marquee group/marquee ${className}`}>
      <div
        className="marquee-track"
        style={{ animationDuration: `${speed}s`, animationDirection: reverse ? "reverse" : "normal" }}
      >
        <div className="marquee-group">{children}</div>
        <div className="marquee-group" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}

/** Thin bar fixed to the top of the page showing how far you've scrolled. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[60] bg-gradient-to-r from-blue-500 via-sky-400 to-indigo-500"
    />
  );
}

/** Button/link wrapper that drifts slightly toward the cursor (Stripe-style). */
export function Magnetic({ children, strength = 0.25, className = "" }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 18 });
  const sy = useSpring(y, { stiffness: 250, damping: 18 });

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div ref={ref} onMouseMove={onMove} onMouseLeave={reset} style={{ x: sx, y: sy }} className={className}>
      {children}
    </motion.div>
  );
}

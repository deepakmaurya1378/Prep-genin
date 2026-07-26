import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, Instagram, Linkedin, Mail } from 'lucide-react';

const PRODUCT_LINKS = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/dashboard/Upgrade', label: 'Upgrade' },
  { href: '/dashboard/About', label: 'About' },
];

const SOCIAL_LINKS = [
  { href: 'https://instagram.com/', label: 'Instagram', icon: Instagram },
  { href: 'https://linkedin.com/', label: 'LinkedIn', icon: Linkedin },
  { href: 'mailto:deepakmaurya1378@gmail.com', label: 'Email', icon: Mail },
];

function Footer() {
  return (
    <footer className="mt-auto border-t border-blue-900/40 bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950 relative overflow-hidden">
      {/* Subtle animated accent line — shades of blue */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-400 via-sky-400 to-blue-600 opacity-70 animate-shimmer" style={{ backgroundSize: '200% 100%' }} />

      <div className="max-w-7xl mx-auto px-5 py-7 sm:px-6 sm:py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center sm:text-left">
        <div className="animate-fade-in flex flex-col items-center sm:items-start">
          <Image
            src="/Prepgeninlogo.png"
            width={140}
            height={30}
            alt="Prep-Genin"
            className="object-contain brightness-125 mb-3 w-32 sm:w-[140px] h-auto"
          />
          <p className="text-xs text-blue-200/70 leading-relaxed max-w-xs">
            Practice real interviews with AI-generated questions, live voice &amp; video, and instant, actionable feedback.
          </p>
        </div>

        <div className="animate-fade-in">
          <h4 className="text-xs font-bold uppercase tracking-wider text-blue-300/80 mb-3">
            Product
          </h4>
          <ul className="space-y-2 text-sm">
            {PRODUCT_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-blue-100/80 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="animate-fade-in flex flex-col items-center sm:items-start">
          <h4 className="text-xs font-bold uppercase tracking-wider text-blue-300/80 mb-3">
            Stay sharp
          </h4>
          <p className="text-xs text-blue-200/70 leading-relaxed mb-3">
            A fresh set of AI-generated questions every time you practice.
          </p>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-300">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            Powered by AI
          </span>
        </div>

        <div className="animate-fade-in flex flex-col items-center sm:items-start">
          <h4 className="text-xs font-bold uppercase tracking-wider text-blue-300/80 mb-3">
            Connect
          </h4>
          <div className="flex items-center gap-2.5">
            {SOCIAL_LINKS.map(({ href, label, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                aria-label={label}
                className="p-2 rounded-full bg-white/5 border border-white/10 text-blue-100 hover:text-white hover:bg-white/15 transition-colors"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-blue-900/40 py-3 px-4 text-center text-xs text-blue-300/50">
        &copy; {new Date().getFullYear()} Prep-Genin. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;

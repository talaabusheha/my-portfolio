import React from 'react';
import { FaLinkedin, FaGithub, FaWhatsapp } from 'react-icons/fa';
import { MdMarkEmailUnread } from 'react-icons/md';
import { useTheme } from '../../hooks/useTheme';
import { ABOUT_STATS, SOCIAL_LINKS, logo } from '../../data/portfolioData';

export default function About() {
  const { isDarkMode } = useTheme();

  return (
    <section
      id="about"
      className={`py-28 relative border-t ${
        isDarkMode
          ? 'bg-zinc-950/60 border-zinc-900'
          : 'bg-zinc-100/60 border-zinc-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10 w-[90%] m-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            className={`text-3xl md:text-4xl font-extrabold tracking-tight mb-3 ${
              isDarkMode ? 'text-white' : 'text-[#0f3b57]'
            }`}
          >
            About Me
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-sky-500 to-cyan-400 mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column - Profile / Tech Illustration */}
          <div className="flex justify-center md:justify-start">
            <div className="relative">
              <div
                className={`w-64 h-64 md:w-80 md:h-80 rounded-3xl border p-4 shadow-xl overflow-hidden group transition-all duration-300 ${
                  isDarkMode
                    ? 'border-sky-900/60 bg-[#0f283d]/70 shadow-[0_15px_35px_rgba(2,132,199,0.15)] hover:border-sky-700'
                    : 'border-sky-100 bg-[#e8f4f9] shadow-[0_15px_35px_rgba(14,165,233,0.12)] hover:border-sky-300'
                }`}
              >
                <img
                  src={logo}
                  alt="Tala Abu Sheha"
                  className="w-full h-full object-contain rounded-2xl group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>

          {/* Right Column - Profile Information & Highlights */}
          <div className="space-y-6">
            <div>
              <h3
                className={`text-2xl md:text-3xl font-bold mb-3 ${
                  isDarkMode ? 'text-zinc-100' : 'text-[#0f3b57]'
                }`}
              >
                Passionate Front-End Engineer & Co-Mentor
              </h3>
              <p
                className={`leading-relaxed text-base ${
                  isDarkMode ? 'text-zinc-400' : 'text-slate-600'
                }`}
              >
                I build reliable, high-performance web applications with modern architectures. Experienced in collaborating with cross-functional teams (UI/UX designers, Frontend & Backend developers) to deliver production-ready software solutions.
              </p>
            </div>

            {/* Specialized Skill Quotes */}
            <div className="space-y-3">
              <p
                className={`leading-relaxed border-l-2 border-sky-500/80 pl-4 text-sm ${
                  isDarkMode ? 'text-zinc-400' : 'text-slate-600'
                }`}
              >
                Specialized in{' '}
                <span className={`font-semibold ${isDarkMode ? 'text-sky-300' : 'text-[#0f3b57]'}`}>
                  React.js & modern ecosystems
                </span>
                , with strong mastery of Tailwind CSS, Vite, Supabase, and REST API integration.
              </p>

              <p
                className={`leading-relaxed border-l-2 border-cyan-400/80 pl-4 text-sm ${
                  isDarkMode ? 'text-zinc-400' : 'text-slate-600'
                }`}
              >
                Proven track record in building real-world software, mentoring emerging tech talents at{' '}
                <span className="font-semibold text-sky-600 dark:text-sky-400">TAQAT</span>, and solving real operational bottlenecks through code.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-3 py-3">
              {ABOUT_STATS.map((stat, idx) => (
                <div
                  key={idx}
                  className={`p-4 border rounded-xl text-center transition-all ${
                    isDarkMode
                      ? 'bg-zinc-900/50 border-sky-950/80 hover:border-sky-800'
                      : 'bg-white border-sky-100 hover:border-sky-300 shadow-xs'
                  }`}
                >
                  <div
                    className={`text-2xl font-bold ${
                      isDarkMode ? 'text-sky-300' : 'text-[#0f3b57]'
                    }`}
                  >
                    {stat.value}
                  </div>
                  <div
                    className={`text-xs mt-1 ${
                      isDarkMode ? 'text-zinc-400' : 'text-slate-500'
                    }`}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="hidden md:flex gap-3 pt-2">
              <a
                href={SOCIAL_LINKS.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-10 h-10 flex items-center justify-center rounded-xl border transition-all ${
                  isDarkMode
                    ? 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:border-sky-700 hover:bg-zinc-800'
                    : 'bg-white border-slate-200 text-slate-600 hover:text-sky-600 hover:border-sky-300 shadow-xs'
                }`}
                aria-label="LinkedIn"
              >
                <FaLinkedin className="text-lg" />
              </a>
              <a
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-10 h-10 flex items-center justify-center rounded-xl border transition-all ${
                  isDarkMode
                    ? 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:border-sky-700 hover:bg-zinc-800'
                    : 'bg-white border-slate-200 text-slate-600 hover:text-black hover:border-slate-300 shadow-xs'
                }`}
                aria-label="GitHub"
              >
                <FaGithub className="text-lg" />
              </a>
              <a
                href={SOCIAL_LINKS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-10 h-10 flex items-center justify-center rounded-xl border transition-all ${
                  isDarkMode
                    ? 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-emerald-400 hover:border-zinc-700 hover:bg-zinc-800'
                    : 'bg-white border-slate-200 text-slate-600 hover:text-emerald-600 hover:border-slate-300 shadow-xs'
                }`}
                aria-label="WhatsApp"
              >
                <FaWhatsapp className="text-lg" />
              </a>
              <a
                href={`mailto:${SOCIAL_LINKS.email}`}
                className={`w-10 h-10 flex items-center justify-center rounded-xl border transition-all ${
                  isDarkMode
                    ? 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-sky-400 hover:border-sky-700 hover:bg-zinc-800'
                    : 'bg-white border-slate-200 text-slate-600 hover:text-sky-600 hover:border-sky-300 shadow-xs'
                }`}
                aria-label="Email"
              >
                <MdMarkEmailUnread className="text-lg" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

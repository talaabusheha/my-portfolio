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
              isDarkMode ? 'text-white' : 'text-zinc-900'
            }`}
          >
            About Me
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-indigo-500 to-violet-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column - Profile Image */}
          <div className="flex justify-center md:justify-start">
            <div className="relative">
              <div
                className={`w-64 h-64 md:w-72 md:h-72 rounded-2xl border p-2 shadow-2xl overflow-hidden group ${
                  isDarkMode
                    ? 'border-zinc-800 bg-zinc-900/50'
                    : 'border-zinc-200 bg-white'
                }`}
              >
                <img
                  src={logo}
                  alt="Tala Abu Sheha"
                  className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>

          {/* Right Column - Profile Information & Highlights */}
          <div className="space-y-6">
            <div>
              <h3
                className={`text-2xl md:text-3xl font-bold mb-3 ${
                  isDarkMode ? 'text-zinc-100' : 'text-zinc-900'
                }`}
              >
                Passionate Front-End Engineer & Co-Mentor
              </h3>
              <p
                className={`leading-relaxed text-base ${
                  isDarkMode ? 'text-zinc-400' : 'text-zinc-600'
                }`}
              >
                I build reliable, high-performance web applications with modern architectures. Experienced in collaborating with cross-functional teams (UI/UX designers, Frontend & Backend developers) to deliver production-ready software solutions.
              </p>
            </div>

            {/* Specialized Skill Quotes */}
            <div className="space-y-3">
              <p
                className={`leading-relaxed border-l-2 border-indigo-500/70 pl-4 text-sm ${
                  isDarkMode ? 'text-zinc-400' : 'text-zinc-600'
                }`}
              >
                Specialized in{' '}
                <span className={`font-semibold ${isDarkMode ? 'text-zinc-200' : 'text-zinc-800'}`}>
                  React.js & modern ecosystems
                </span>
                , with strong mastery of Tailwind CSS, Vite, Supabase, and REST API integration.
              </p>

              <p
                className={`leading-relaxed border-l-2 border-violet-500/70 pl-4 text-sm ${
                  isDarkMode ? 'text-zinc-400' : 'text-zinc-600'
                }`}
              >
                Proven track record in building real-world software, mentoring emerging tech talents at{' '}
                <span className="font-semibold text-indigo-400">TAQAT</span>, and solving real operational bottlenecks through code.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-3 py-3">
              {ABOUT_STATS.map((stat, idx) => (
                <div
                  key={idx}
                  className={`p-4 border rounded-xl text-center transition-all ${
                    isDarkMode
                      ? 'bg-zinc-900/50 border-zinc-800/80 hover:border-zinc-700'
                      : 'bg-white border-zinc-200 hover:border-zinc-300 shadow-sm'
                  }`}
                >
                  <div
                    className={`text-2xl font-bold ${
                      isDarkMode ? 'text-zinc-100' : 'text-zinc-900'
                    }`}
                  >
                    {stat.value}
                  </div>
                  <div
                    className={`text-xs mt-1 ${
                      isDarkMode ? 'text-zinc-400' : 'text-zinc-500'
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
                    ? 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 hover:bg-zinc-800'
                    : 'bg-white border-zinc-200 text-zinc-600 hover:text-indigo-600 hover:border-zinc-300 shadow-sm'
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
                    ? 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 hover:bg-zinc-800'
                    : 'bg-white border-zinc-200 text-zinc-600 hover:text-black hover:border-zinc-300 shadow-sm'
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
                    : 'bg-white border-zinc-200 text-zinc-600 hover:text-emerald-600 hover:border-zinc-300 shadow-sm'
                }`}
                aria-label="WhatsApp"
              >
                <FaWhatsapp className="text-lg" />
              </a>
              <a
                href={`mailto:${SOCIAL_LINKS.email}`}
                className={`w-10 h-10 flex items-center justify-center rounded-xl border transition-all ${
                  isDarkMode
                    ? 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-indigo-400 hover:border-zinc-700 hover:bg-zinc-800'
                    : 'bg-white border-zinc-200 text-zinc-600 hover:text-indigo-600 hover:border-zinc-300 shadow-sm'
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

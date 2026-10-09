import React from 'react';
import { FaLinkedin, FaGithub } from 'react-icons/fa6';
import { FileText } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { SOCIAL_LINKS } from '../../data/portfolioData';

export default function Hero() {
  const { isDarkMode } = useTheme();

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-24 pb-16">
      {/* Ambient background glow */}
      <div
        className={`absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] rounded-full blur-[140px] pointer-events-none ${
          isDarkMode
            ? 'bg-gradient-to-tr from-indigo-600/15 via-violet-600/10 to-transparent'
            : 'bg-gradient-to-tr from-indigo-400/20 via-violet-400/15 to-transparent'
        }`}
      ></div>

      <div className="max-w-5xl mx-auto px-6 text-center z-10 relative">
        <div className="space-y-8">
          {/* Availability Badge */}
          <div
            className={`inline-flex items-center gap-2 px-4 py-1.5 border rounded-full text-xs font-medium shadow-sm ${
              isDarkMode
                ? 'bg-zinc-900/80 border-zinc-800 text-zinc-300'
                : 'bg-white border-zinc-200 text-zinc-700'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Available for new opportunities & Front-End roles
          </div>

          {/* Main Headline */}
          <h1
            className={`text-6xl md:text-7xl lg:text-8xl font-black tracking-tight bg-gradient-to-b bg-clip-text text-transparent leading-[1.1] ${
              isDarkMode
                ? 'from-white via-zinc-100 to-zinc-400'
                : 'from-zinc-900 via-zinc-800 to-zinc-600'
            }`}
          >
            Front-End Developer
          </h1>

          {/* Bio Description */}
          <p
            className={`text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed font-normal ${
              isDarkMode ? 'text-zinc-400' : 'text-zinc-600'
            }`}
          >
            I build fast, resilient, and beautiful web experiences specializing in{' '}
            <span className={`font-medium ${isDarkMode ? 'text-zinc-200' : 'text-zinc-900'}`}>
              React, Vite, Tailwind CSS & Modern Web APIs
            </span>
            .
          </p>

          {/* Call to Actions */}
          <div className="flex gap-3.5 justify-center flex-wrap pt-2">
            {/* Direct LinkedIn Link */}
            <a
              href={SOCIAL_LINKS.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm rounded-xl hover:shadow-lg hover:shadow-indigo-500/20 hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <FaLinkedin className="text-base" />
              LinkedIn Profile
            </a>

            {/* Direct GitHub Link */}
            <a
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className={`px-6 py-3 border font-semibold text-sm rounded-xl hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 shadow-sm ${
                isDarkMode
                  ? 'bg-zinc-900/90 hover:bg-zinc-800 border-zinc-800 hover:border-zinc-700 text-zinc-200 hover:text-white'
                  : 'bg-white hover:bg-zinc-50 border-zinc-300 hover:border-zinc-400 text-zinc-800 hover:text-black'
              }`}
            >
              <FaGithub className="text-base" />
              GitHub Repos
            </a>

            {/* View / Download CV Button */}
            <a
              href="#contact"
              className={`px-6 py-3 border font-semibold text-sm rounded-xl hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 shadow-sm ${
                isDarkMode
                  ? 'bg-zinc-900/40 hover:bg-zinc-800/80 border-zinc-800 text-zinc-300 hover:text-white'
                  : 'bg-zinc-100 hover:bg-zinc-200 border-zinc-200 text-zinc-700'
              }`}
            >
              <FileText className="w-4 h-4 text-indigo-400" />
              Get In Touch
            </a>
          </div>

          {/* Bouncing Scroll Indicator */}
          <div
            className={`pt-16 animate-bounce ${
              isDarkMode ? 'text-zinc-500' : 'text-zinc-400'
            }`}
          >
            <svg
              className="w-5 h-5 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

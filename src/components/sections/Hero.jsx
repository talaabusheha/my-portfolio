import React, { useState, useEffect, useRef } from 'react';
import { FaLinkedin, FaGithub } from 'react-icons/fa6';
import { FileText } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { SOCIAL_LINKS } from '../../data/portfolioData';

export default function Hero() {
  const { isDarkMode } = useTheme();
  const heroRef = useRef(null);

  // Smooth mouse parallax offset
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      // Normalized coordinates from -1 to 1 relative to hero center
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      setMouseOffset({ x, y });
    };

    const handleMouseLeave = () => {
      setMouseOffset({ x: 0, y: 0 });
    };

    const heroEl = heroRef.current;
    if (heroEl) {
      heroEl.addEventListener('mousemove', handleMouseMove);
      heroEl.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (heroEl) {
        heroEl.removeEventListener('mousemove', handleMouseMove);
        heroEl.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className={`min-h-screen flex items-center justify-center relative overflow-hidden pt-24 pb-16 selection:bg-indigo-500/20 ${
        isDarkMode ? 'bg-zinc-950' : 'bg-[#fafafa]'
      }`}
    >
      <style>{`
        /* Continuous organic floating keyframes for each card */
        @keyframes float-code {
          0%, 100% {
            transform: translate3d(0, 0, 0) rotate(0deg);
          }
          33% {
            transform: translate3d(-6px, -14px, 0) rotate(-3deg);
          }
          66% {
            transform: translate3d(6px, -8px, 0) rotate(2deg);
          }
        }

        @keyframes float-react {
          0%, 100% {
            transform: translate3d(0, 0, 0) rotate(0deg);
          }
          35% {
            transform: translate3d(8px, 12px, 0) rotate(3deg);
          }
          70% {
            transform: translate3d(-6px, -10px, 0) rotate(-2deg);
          }
        }

        @keyframes float-tailwind {
          0%, 100% {
            transform: translate3d(0, 0, 0) rotate(0deg);
          }
          30% {
            transform: translate3d(-7px, -13px, 0) rotate(3deg);
          }
          65% {
            transform: translate3d(6px, 10px, 0) rotate(-2deg);
          }
        }

        @keyframes float-api {
          0%, 100% {
            transform: translate3d(0, 0, 0) rotate(0deg);
          }
          40% {
            transform: translate3d(7px, 14px, 0) rotate(-3deg);
          }
          75% {
            transform: translate3d(-5px, -9px, 0) rotate(2deg);
          }
        }

        @keyframes pulse-subtle {
          0%, 100% {
            opacity: 0.75;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.02);
          }
        }

        @keyframes react-spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-float-code {
          animation: float-code 6.5s ease-in-out infinite;
        }

        .animate-float-react {
          animation: float-react 7.2s ease-in-out infinite;
        }

        .animate-float-tailwind {
          animation: float-tailwind 6.8s ease-in-out infinite;
        }

        .animate-float-api {
          animation: float-api 5.8s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: react-spin-slow 22s linear infinite;
        }

        .hero-rings-pulse {
          animation: pulse-subtle 8s ease-in-out infinite;
        }
      `}</style>

      {/* ================= BACKGROUND CONCENTRIC RINGS ================= */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-0">
        <div className="relative w-full h-full flex items-center justify-center hero-rings-pulse">
          {/* Innermost Ring */}
          <div
            className={`absolute w-[560px] h-[280px] sm:w-[700px] sm:h-[340px] md:w-[820px] md:h-[400px] lg:w-[920px] lg:h-[440px] rounded-[100%] border transition-colors duration-500 ${
              isDarkMode ? 'border-zinc-800/60' : 'border-slate-200/70'
            }`}
          />
          {/* Middle Ring */}
          <div
            className={`absolute w-[820px] h-[420px] sm:w-[1020px] sm:h-[500px] md:w-[1200px] md:h-[580px] lg:w-[1340px] lg:h-[640px] rounded-[100%] border transition-colors duration-500 ${
              isDarkMode ? 'border-zinc-800/40' : 'border-slate-200/50'
            }`}
          />
          {/* Outermost Ring */}
          <div
            className={`absolute w-[1100px] h-[560px] sm:w-[1360px] sm:h-[680px] md:w-[1580px] md:h-[760px] lg:w-[1760px] lg:h-[840px] rounded-[100%] border transition-colors duration-500 ${
              isDarkMode ? 'border-zinc-800/25' : 'border-slate-200/35'
            }`}
          />
        </div>

        {/* Ambient Soft Radial Gradient Glows (Left & Right) */}
        <div
          className={`absolute -left-28 top-1/4 w-[500px] h-[500px] rounded-full blur-[130px] pointer-events-none transition-opacity duration-700 ${
            isDarkMode
              ? 'bg-gradient-to-tr from-purple-900/25 via-indigo-900/20 to-transparent'
              : 'bg-gradient-to-tr from-purple-300/30 via-indigo-200/25 to-transparent'
          }`}
        />
        <div
          className={`absolute -right-28 bottom-1/4 w-[500px] h-[500px] rounded-full blur-[130px] pointer-events-none transition-opacity duration-700 ${
            isDarkMode
              ? 'bg-gradient-to-bl from-indigo-900/25 via-purple-900/20 to-transparent'
              : 'bg-gradient-to-bl from-indigo-200/30 via-purple-300/25 to-transparent'
          }`}
        />
      </div>

      {/* ================= FLOATING TECH ICONS ================= */}
      {/* 
        Container for floating icons. 
        Anchored around the hero with layered parallax + continuous floating animation.
      */}
      <div className="absolute inset-0 max-w-7xl mx-auto pointer-events-none z-20">
        
        {/* 1. TOP-LEFT: Code </ > */}
        <div
          className="absolute pointer-events-auto transition-transform duration-300 ease-out"
          style={{
            top: '22%',
            left: '8%',
            transform: `translate3d(${mouseOffset.x * 22}px, ${mouseOffset.y * 18}px, 0)`,
          }}
        >
          <div className="animate-float-code">
            <div
              data-cursor="pointer"
              title="Clean & Scalable Code"
              className={`group flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-2xl border transition-all duration-300 cursor-pointer ${
                isDarkMode
                  ? 'bg-zinc-900/90 border-zinc-800 text-indigo-400 shadow-[0_12px_32px_rgba(0,0,0,0.5)] hover:border-indigo-500/50 hover:shadow-indigo-500/20'
                  : 'bg-white/95 border-slate-100 text-indigo-600 shadow-[0_12px_30px_rgba(0,0,0,0.06)] hover:border-indigo-200 hover:shadow-indigo-500/15'
              } hover:scale-110 active:scale-95 backdrop-blur-md`}
            >
              <svg
                viewBox="0 0 24 24"
                className="w-7 h-7 transition-transform duration-300 group-hover:scale-110"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="7 8 3 12 7 16" />
                <polyline points="17 8 21 12 17 16" />
                <line x1="14" y1="4" x2="10" y2="20" />
              </svg>
            </div>
          </div>
        </div>

        {/* 2. BOTTOM-LEFT: React Logo */}
        <div
          className="absolute pointer-events-auto transition-transform duration-300 ease-out"
          style={{
            bottom: '26%',
            left: '4%',
            transform: `translate3d(${mouseOffset.x * -20}px, ${mouseOffset.y * 22}px, 0)`,
          }}
        >
          <div className="animate-float-react">
            <div
              data-cursor="pointer"
              title="React 19 & Next-Gen SPAs"
              className={`group flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-2xl border transition-all duration-300 cursor-pointer ${
                isDarkMode
                  ? 'bg-zinc-900/90 border-zinc-800 text-cyan-400 shadow-[0_12px_32px_rgba(0,0,0,0.5)] hover:border-cyan-500/50 hover:shadow-cyan-500/20'
                  : 'bg-white/95 border-slate-100 text-[#00d8ff] shadow-[0_12px_30px_rgba(0,0,0,0.06)] hover:border-cyan-200 hover:shadow-cyan-500/15'
              } hover:scale-110 active:scale-95 backdrop-blur-md`}
            >
              <div className="animate-spin-slow flex items-center justify-center">
                <svg
                  viewBox="-11.5 -10.23174 23 20.46348"
                  className="w-8 h-8 transition-transform duration-300 group-hover:scale-110"
                  fill="currentColor"
                >
                  <circle cx="0" cy="0" r="2.05" fill="currentColor" />
                  <g stroke="currentColor" strokeWidth="1.2" fill="none">
                    <ellipse rx="11" ry="4.2" />
                    <ellipse rx="11" ry="4.2" transform="rotate(60)" />
                    <ellipse rx="11" ry="4.2" transform="rotate(120)" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* 3. TOP-RIGHT: Tailwind CSS */}
        <div
          className="absolute pointer-events-auto transition-transform duration-300 ease-out"
          style={{
            top: '26%',
            right: '9%',
            transform: `translate3d(${mouseOffset.x * 24}px, ${mouseOffset.y * -20}px, 0)`,
          }}
        >
          <div className="animate-float-tailwind">
            <div
              data-cursor="pointer"
              title="Tailwind CSS UI Architecture"
              className={`group flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-2xl border transition-all duration-300 cursor-pointer ${
                isDarkMode
                  ? 'bg-zinc-900/90 border-zinc-800 text-sky-400 shadow-[0_12px_32px_rgba(0,0,0,0.5)] hover:border-sky-500/50 hover:shadow-sky-500/20'
                  : 'bg-white/95 border-slate-100 text-[#06b6d4] shadow-[0_12px_30px_rgba(0,0,0,0.06)] hover:border-sky-200 hover:shadow-sky-500/15'
              } hover:scale-110 active:scale-95 backdrop-blur-md`}
            >
              <svg
                viewBox="0 0 24 24"
                className="w-8 h-8 transition-transform duration-300 group-hover:scale-110 fill-current"
                aria-hidden="true"
              >
                <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C7.666,17.818,9.027,19.2,12.001,19.2c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z" />
              </svg>
            </div>
          </div>
        </div>

        {/* 4. BOTTOM-RIGHT: API Badge */}
        <div
          className="absolute pointer-events-auto transition-transform duration-300 ease-out"
          style={{
            bottom: '28%',
            right: '5%',
            transform: `translate3d(${mouseOffset.x * -24}px, ${mouseOffset.y * -18}px, 0)`,
          }}
        >
          <div className="animate-float-api">
            <div
              data-cursor="pointer"
              title="RESTful APIs & Modern Web Integration"
              className={`group flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-2xl border transition-all duration-300 cursor-pointer ${
                isDarkMode
                  ? 'bg-zinc-900/90 border-zinc-800 text-indigo-400 shadow-[0_12px_32px_rgba(0,0,0,0.5)] hover:border-indigo-500/50 hover:shadow-indigo-500/20'
                  : 'bg-white/95 border-slate-100 text-[#4f46e5] shadow-[0_12px_30px_rgba(0,0,0,0.06)] hover:border-indigo-200 hover:shadow-indigo-500/15'
              } hover:scale-110 active:scale-95 backdrop-blur-md`}
            >
              <span className="font-extrabold text-base md:text-lg tracking-wider transition-transform duration-300 group-hover:scale-110 select-none">
                API
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* ================= MAIN HERO CONTENT ================= */}
      <div className="max-w-4xl mx-auto px-6 text-center z-10 relative">
        <div className="space-y-7 md:space-y-8">
          
          {/* Availability Badge */}
          <div className="inline-block">
            <div
              className={`inline-flex items-center gap-2.5 px-4 py-1.5 border rounded-full text-xs sm:text-sm font-medium shadow-[0_2px_10px_rgba(0,0,0,0.03)] backdrop-blur-md transition-all duration-300 ${
                isDarkMode
                  ? 'bg-zinc-900/80 border-zinc-800 text-zinc-300'
                  : 'bg-white/90 border-slate-200/90 text-slate-700'
              }`}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Available for new opportunities & Front-End roles
            </div>
          </div>

          {/* Main Headline */}
          <h1
            className={`text-5xl sm:text-6xl md:text-7xl lg:text-[5.4rem] font-black tracking-tight leading-[1.08] transition-colors duration-300 select-none ${
              isDarkMode ? 'text-white' : 'text-zinc-950'
            }`}
          >
            Front-End Developer
          </h1>

          {/* Bio Description */}
          <p
            className={`text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-normal transition-colors duration-300 ${
              isDarkMode ? 'text-zinc-400' : 'text-slate-600'
            }`}
          >
            I build fast, resilient, and beautiful web experiences specializing{' '}
            <span className="font-semibold text-slate-800 dark:text-zinc-200">in</span>
            <br className="hidden sm:inline" />
            <span
              className={`font-bold transition-colors ${
                isDarkMode ? 'text-zinc-100' : 'text-slate-900'
              }`}
            >
              {' '}React, Vite, Tailwind CSS & Modern Web APIs.
            </span>
          </p>

          {/* Call to Actions */}
          <div className="flex gap-3.5 justify-center flex-wrap pt-3">
            {/* Direct LinkedIn Link */}
            <a
              href={SOCIAL_LINKS.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="pointer"
              className="px-6 py-3 bg-[#3b5bfd] hover:bg-[#314edc] text-white font-semibold text-sm sm:text-base rounded-xl shadow-md shadow-blue-500/25 hover:shadow-lg hover:shadow-blue-500/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2.5"
            >
              <FaLinkedin className="text-lg" />
              <span>LinkedIn Profile</span>
            </a>

            {/* Direct GitHub Link */}
            <a
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="pointer"
              className={`px-6 py-3 border font-semibold text-sm sm:text-base rounded-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2.5 shadow-sm ${
                isDarkMode
                  ? 'bg-zinc-900/90 hover:bg-zinc-800 border-zinc-800 hover:border-zinc-700 text-zinc-200 hover:text-white'
                  : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-800 hover:text-black shadow-[0_2px_8px_rgba(0,0,0,0.04)]'
              }`}
            >
              <FaGithub className="text-lg" />
              <span>GitHub Repos</span>
            </a>

            {/* View / Download CV Button */}
            <a
              href="#contact"
              data-cursor="pointer"
              className={`px-6 py-3 border font-semibold text-sm sm:text-base rounded-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2.5 shadow-sm ${
                isDarkMode
                  ? 'bg-zinc-900/90 hover:bg-zinc-800 border-zinc-800 hover:border-zinc-700 text-zinc-200 hover:text-white'
                  : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-800 hover:text-black shadow-[0_2px_8px_rgba(0,0,0,0.04)]'
              }`}
            >
              <FileText className="w-4 h-4 text-indigo-500" />
              <span>Get In Touch</span>
            </a>
          </div>

          {/* Bouncing Scroll Indicator */}
          <div className="pt-12 sm:pt-16">
            <a
              href="#about"
              aria-label="Scroll down to About section"
              data-cursor="pointer"
              className={`inline-block transition-colors animate-bounce ${
                isDarkMode ? 'text-zinc-500 hover:text-zinc-300' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <svg
                className="w-5 h-5 mx-auto"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}

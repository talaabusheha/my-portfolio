import React, { useState } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { ARSENAL_CATEGORIES, FULL_STACK_SKILLS } from '../../data/portfolioData';

export default function Skills() {
  const { isDarkMode } = useTheme();
  const [isPaused, setIsPaused] = useState(false);

  const displayFullStack = [...FULL_STACK_SKILLS, ...FULL_STACK_SKILLS];

  return (
    <section
      id="skills"
      className={`py-28 relative border-t ${
        isDarkMode ? 'bg-zinc-950 border-zinc-900' : 'bg-zinc-50 border-zinc-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            className={`text-4xl md:text-5xl font-black tracking-tight mb-4 ${
              isDarkMode ? 'text-white' : 'text-zinc-900'
            }`}
          >
            My Technical Arsenal
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-indigo-500 to-violet-500 mx-auto rounded-full mb-4"></div>
          <p
            className={`text-base md:text-lg max-w-2xl mx-auto leading-relaxed ${
              isDarkMode ? 'text-zinc-400' : 'text-zinc-600'
            }`}
          >
            Two years of continuous learning, building, and shipping — here's the tech stack I work with daily.
          </p>
        </div>

        {/* 3 Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {ARSENAL_CATEGORIES.map((cat, idx) => (
            <div
              key={idx}
              className={`p-7 rounded-3xl border transition-all duration-300 hover:-translate-y-1.5 ${
                isDarkMode ? cat.hoverBorderDark : cat.hoverBorderLight
              } ${
                isDarkMode
                  ? 'bg-zinc-900/50 border-zinc-800/80 shadow-lg hover:shadow-2xl hover:shadow-black/60'
                  : 'bg-white border-zinc-200 shadow-sm hover:shadow-md'
              }`}
            >
              {/* Card Top */}
              <div className="flex items-center gap-3.5 mb-6">
                <div
                  className={`w-11 h-11 rounded-2xl border flex items-center justify-center ${
                    isDarkMode ? cat.iconBgDark : cat.iconBgLight
                  }`}
                >
                  {cat.icon}
                </div>
                <div>
                  <h3
                    className={`text-lg font-bold ${
                      isDarkMode ? 'text-zinc-100' : 'text-zinc-900'
                    }`}
                  >
                    {cat.title}
                  </h3>
                  <p
                    className={`text-xs font-semibold ${
                      isDarkMode ? cat.countColorDark : cat.countColorLight
                    }`}
                  >
                    {cat.count}
                  </p>
                </div>
              </div>

              {/* Skills Pills */}
              <div className="flex flex-wrap gap-2.5">
                {cat.skills.map((skill, sIdx) => (
                  <div
                    key={sIdx}
                    className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-medium transition-all duration-200 hover:scale-105 ${
                      isDarkMode
                        ? 'bg-zinc-800/60 border-zinc-700/60 text-zinc-200 hover:bg-zinc-800 hover:border-zinc-600'
                        : 'bg-zinc-50 border-zinc-200 text-zinc-800 hover:bg-zinc-100 hover:border-zinc-300 shadow-sm'
                    }`}
                  >
                    <span>{skill.icon}</span>
                    <span>{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Full Tech Stack Marquee Container */}
        <div
          className={`p-6 md:p-8 rounded-3xl border overflow-hidden relative ${
            isDarkMode ? 'bg-zinc-900/40 border-zinc-800/80' : 'bg-white border-zinc-200 shadow-sm'
          }`}
        >
          <div className="text-center mb-6">
            <span
              className={`text-xs font-bold uppercase tracking-widest ${
                isDarkMode ? 'text-zinc-400' : 'text-zinc-500'
              }`}
            >
              Full Tech Stack
            </span>
          </div>

          {/* Auto-scrolling ticker */}
          <div
            className="w-full overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <style>{`
              @keyframes scrollTech {
                0% {
                  transform: translateX(0);
                }
                100% {
                  transform: translateX(-50%);
                }
              }

              .scroll-tech-container {
                display: flex;
                gap: 1rem;
                animation: scrollTech 28s linear infinite;
                animation-play-state: running;
              }

              .scroll-tech-container.paused {
                animation-play-state: paused;
              }

              .tech-marquee-pill {
                display: inline-flex;
                align-items: center;
                gap: 0.5rem;
                padding: 0.6rem 1.25rem;
                border-radius: 9999px;
                font-size: 0.85rem;
                font-weight: 500;
                white-space: nowrap;
                cursor: pointer;
                transition: all 0.2s ease;
                flex-shrink: 0;
              }
            `}</style>

            <div className={`scroll-tech-container ${isPaused ? 'paused' : ''}`}>
              {displayFullStack.map((item, index) => (
                <div
                  key={index}
                  className={`tech-marquee-pill border ${
                    isDarkMode
                      ? 'bg-zinc-950/80 border-zinc-800 text-zinc-300 hover:border-zinc-700 hover:text-white'
                      : 'bg-zinc-50 border-zinc-200 text-zinc-700 hover:border-zinc-300 hover:text-zinc-900 shadow-sm'
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

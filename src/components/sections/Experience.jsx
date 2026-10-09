import React from 'react';
import { Calendar } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { EXPERIENCES } from '../../data/portfolioData';

export default function Experience() {
  const { isDarkMode } = useTheme();

  return (
    <section
      id="experience"
      className={`py-28 relative border-t ${
        isDarkMode ? 'bg-zinc-950' : 'bg-zinc-50'
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            className={`text-3xl md:text-4xl font-extrabold tracking-tight mb-3 ${
              isDarkMode ? 'text-white' : 'text-zinc-900'
            }`}
          >
            Experience & Journey
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-indigo-500 to-violet-500 mx-auto rounded-full"></div>
        </div>

        {/* Experience List */}
        <div className="space-y-6">
          {EXPERIENCES.map((exp, idx) => (
            <div
              key={idx}
              className={`p-7 rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${
                isDarkMode
                  ? 'bg-zinc-900/40 border-zinc-800/80 hover:border-zinc-700/80 hover:bg-zinc-900/70 shadow-sm'
                  : 'bg-white border-zinc-200 hover:border-zinc-300 shadow-sm hover:shadow-md'
              }`}
            >
              {/* Header Info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div>
                  <h3
                    className={`text-lg font-bold ${
                      isDarkMode ? 'text-zinc-100' : 'text-zinc-900'
                    }`}
                  >
                    {exp.role}
                  </h3>
                  <span className="text-sm font-medium text-indigo-400">
                    {exp.company}
                  </span>
                </div>
                <div
                  className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full border w-fit ${
                    isDarkMode
                      ? 'bg-zinc-800/60 border-zinc-700/60 text-zinc-300'
                      : 'bg-zinc-100 border-zinc-200 text-zinc-600'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  {exp.period}
                </div>
              </div>

              {/* Description */}
              <p
                className={`text-sm leading-relaxed mb-4 ${
                  isDarkMode ? 'text-zinc-400' : 'text-zinc-600'
                }`}
              >
                {exp.description}
              </p>

              {/* Tech Tags */}
              <div className="flex gap-2 flex-wrap">
                {exp.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`text-xs px-2.5 py-1 rounded-md border font-medium ${
                      isDarkMode
                        ? 'bg-zinc-800/40 border-zinc-800 text-zinc-400'
                        : 'bg-zinc-50 border-zinc-200 text-zinc-600'
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

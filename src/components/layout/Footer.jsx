import React from 'react';
import { FaGithub, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { useTheme } from '../../hooks/useTheme';
import { NAV_LINKS, SOCIAL_LINKS, logo } from '../../data/portfolioData';

export default function Footer() {
  const { isDarkMode } = useTheme();

  return (
    <footer
      className={`border-t py-12 ${
        isDarkMode
          ? 'border-zinc-900 bg-zinc-950 text-zinc-400'
          : 'border-zinc-200 bg-white text-zinc-600'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10 text-center md:text-left">
          {/* Logo & Description */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2.5 mb-3 justify-center md:justify-start">
              <img
                src={logo}
                alt="Tala"
                className={`w-8 h-8 rounded-lg border object-cover ${
                  isDarkMode ? 'border-zinc-800' : 'border-zinc-200'
                }`}
              />
              <div
                className={`font-bold text-base ${
                  isDarkMode ? 'text-zinc-200' : 'text-zinc-800'
                }`}
              >
                Tala Abusheha
              </div>
            </div>
            <p
              className={`text-xs max-w-xs leading-relaxed ${
                isDarkMode ? 'text-zinc-500' : 'text-zinc-500'
              }`}
            >
              Front-End Developer crafting refined, responsive, and performance-focused web apps.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start">
            <h3
              className={`font-semibold text-xs uppercase tracking-wider mb-3 ${
                isDarkMode ? 'text-zinc-300' : 'text-zinc-700'
              }`}
            >
              Navigation
            </h3>
            <ul
              className={`space-y-2 text-xs ${
                isDarkMode ? 'text-zinc-400' : 'text-zinc-500'
              }`}
            >
              {NAV_LINKS.map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className={`transition-colors ${
                      isDarkMode ? 'hover:text-zinc-100' : 'hover:text-zinc-900'
                    }`}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Follow Me */}
          <div className="flex flex-col items-center md:items-start">
            <h3
              className={`font-semibold text-xs uppercase tracking-wider mb-3 ${
                isDarkMode ? 'text-zinc-300' : 'text-zinc-700'
              }`}
            >
              Connect
            </h3>
            <div
              className={`flex gap-3 justify-center md:justify-start text-xl ${
                isDarkMode ? 'text-zinc-400' : 'text-zinc-600'
              }`}
            >
              <a
                href={SOCIAL_LINKS.linkedIn}
                className="hover:text-blue-500 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <FaLinkedin />
              </a>
              <a
                href={SOCIAL_LINKS.github}
                className={`transition-colors ${
                  isDarkMode ? 'hover:text-white' : 'hover:text-black'
                }`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <FaGithub />
              </a>
              <a
                href={SOCIAL_LINKS.whatsapp}
                className="hover:text-emerald-500 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
              >
                <FaWhatsapp />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div
          className={`border-t pt-6 text-center ${
            isDarkMode ? 'border-zinc-900' : 'border-zinc-200'
          }`}
        >
          <p
            className={`text-xs ${
              isDarkMode ? 'text-zinc-600' : 'text-zinc-500'
            }`}
          >
            © 2026 Tala Abu Sheha. Built with React & Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
}

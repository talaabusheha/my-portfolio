import React, { useState } from 'react';
import { Sun, Moon, FileText } from 'lucide-react';
import { CiMenuFries } from 'react-icons/ci';
import { IoCloseSharp } from 'react-icons/io5';
import { useTheme } from '../../hooks/useTheme';
import { NAV_LINKS, SOCIAL_LINKS, logo } from '../../data/portfolioData';

export default function Header() {
  const { isDarkMode, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 backdrop-blur-xl border-b ${
        isDarkMode
          ? 'bg-zinc-950/80 border-zinc-800/80'
          : 'bg-white/80 border-zinc-200/80 shadow-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-xl overflow-hidden border shadow-md ${
              isDarkMode ? 'border-zinc-800' : 'border-zinc-200'
            }`}
          >
            <img src={logo} alt="Tala" className="w-full h-full object-cover" />
          </div>
          <div
            className={`text-xl font-bold bg-gradient-to-r bg-clip-text text-transparent ${
              isDarkMode
                ? 'from-zinc-100 via-zinc-200 to-zinc-400'
                : 'from-zinc-900 via-zinc-800 to-zinc-600'
            }`}
          >
            Tala Abusheha
          </div>
        </div>

        {/* Desktop Navigation & Actions */}
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex gap-7">
            {NAV_LINKS.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`transition-colors duration-200 relative group font-medium text-sm ${
                  isDarkMode ? 'text-zinc-400 hover:text-zinc-100' : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-violet-500 group-hover:w-full transition-all duration-200"></span>
              </a>
            ))}
          </nav>

          {/* Resume Link */}
          <a
            href={SOCIAL_LINKS.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 border border-indigo-500/20 transition-all"
          >
            <FileText className="w-3.5 h-3.5" />
            Resume
          </a>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className={`p-2.5 rounded-xl border transition-all duration-200 flex items-center justify-center ${
              isDarkMode
                ? 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:text-yellow-400 hover:border-zinc-700'
                : 'bg-zinc-100 border-zinc-200 text-zinc-700 hover:text-indigo-600 hover:border-zinc-300'
            }`}
          >
            {isDarkMode ? (
              <Sun className="w-4 h-4 transition-transform duration-300 rotate-0 hover:rotate-45" />
            ) : (
              <Moon className="w-4 h-4 transition-transform duration-300 -rotate-12 hover:rotate-0" />
            )}
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden text-2xl transition-colors ${
              isDarkMode ? 'text-zinc-400 hover:text-zinc-100' : 'text-zinc-600 hover:text-zinc-900'
            }`}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <IoCloseSharp /> : <CiMenuFries />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <nav
          className={`md:hidden backdrop-blur-xl border-b p-5 space-y-3 ${
            isDarkMode
              ? 'bg-zinc-900/95 border-zinc-800'
              : 'bg-white/95 border-zinc-200'
          }`}
        >
          {NAV_LINKS.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className={`block transition-colors py-2 font-medium text-sm ${
                isDarkMode ? 'text-zinc-300 hover:text-white' : 'text-zinc-700 hover:text-zinc-900'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {item}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}

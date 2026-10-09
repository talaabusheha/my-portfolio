import React, { useState } from 'react';
import { FaWhatsapp, FaGithub, FaLinkedin } from 'react-icons/fa';
import { MdMarkEmailUnread } from 'react-icons/md';
import { Copy, Check } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { SOCIAL_LINKS } from '../../data/portfolioData';

export default function Contact() {
  const { isDarkMode } = useTheme();
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(SOCIAL_LINKS.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <section
      id="contact"
      className={`py-28 relative border-t ${
        isDarkMode
          ? 'bg-zinc-950/60 border-zinc-900'
          : 'bg-zinc-100/60 border-zinc-200'
      }`}
    >
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-14">
          <h2
            className={`text-3xl md:text-4xl font-extrabold tracking-tight mb-3 ${
              isDarkMode ? 'text-white' : 'text-zinc-900'
            }`}
          >
            Get In Touch
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-indigo-500 to-violet-500 mx-auto rounded-full mb-6"></div>
          <p
            className={`text-base max-w-xl mx-auto leading-relaxed ${
              isDarkMode ? 'text-zinc-400' : 'text-zinc-600'
            }`}
          >
            Have a project in mind, an open frontend role, or want to collaborate? Reach out directly via email, WhatsApp, or LinkedIn.
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid md:grid-cols-2 gap-5 mb-10">
          {/* WhatsApp Card */}
          <a
            href={SOCIAL_LINKS.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className={`group flex items-center gap-4 p-5 border rounded-2xl transition-all duration-200 hover:-translate-y-0.5 shadow-sm ${
              isDarkMode
                ? 'bg-zinc-900/40 border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900/80'
                : 'bg-white border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50'
            }`}
          >
            <span className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center text-2xl group-hover:scale-105 transition-transform">
              <FaWhatsapp />
            </span>
            <div className="text-left">
              <div
                className={`font-semibold text-sm ${
                  isDarkMode ? 'text-zinc-100' : 'text-zinc-900'
                }`}
              >
                WhatsApp
              </div>
              <div
                className={`text-xs mt-0.5 ${
                  isDarkMode ? 'text-zinc-400' : 'text-zinc-500'
                }`}
              >
                +970 594828270
              </div>
            </div>
          </a>

          {/* Email with One-Click Copy */}
          <div
            onClick={handleCopyEmail}
            className={`group flex items-center justify-between p-5 border rounded-2xl transition-all duration-200 hover:-translate-y-0.5 shadow-sm cursor-pointer ${
              isDarkMode
                ? 'bg-zinc-900/40 border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900/80'
                : 'bg-white border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50'
            }`}
          >
            <div className="flex items-center gap-4">
              <span className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 flex items-center justify-center text-2xl group-hover:scale-105 transition-transform">
                <MdMarkEmailUnread />
              </span>
              <div className="text-left">
                <div
                  className={`font-semibold text-sm ${
                    isDarkMode ? 'text-zinc-100' : 'text-zinc-900'
                  }`}
                >
                  Email Address
                </div>
                <div
                  className={`text-xs mt-0.5 ${
                    isDarkMode ? 'text-zinc-400' : 'text-zinc-500'
                  }`}
                >
                  {SOCIAL_LINKS.email}
                </div>
              </div>
            </div>
            <div
              className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-all ${
                copiedEmail
                  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                  : isDarkMode
                  ? 'bg-zinc-800 text-zinc-400 border-zinc-700 group-hover:text-zinc-200'
                  : 'bg-zinc-100 text-zinc-600 border-zinc-200 group-hover:text-zinc-900'
              }`}
            >
              {copiedEmail ? (
                <Check className="w-3.5 h-3.5" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
              {copiedEmail ? 'Copied!' : 'Copy'}
            </div>
          </div>

          {/* GitHub Card */}
          <a
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            className={`group flex items-center gap-4 p-5 border rounded-2xl transition-all duration-200 hover:-translate-y-0.5 shadow-sm ${
              isDarkMode
                ? 'bg-zinc-900/40 border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900/80'
                : 'bg-white border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50'
            }`}
          >
            <span
              className={`w-12 h-12 rounded-xl border flex items-center justify-center text-2xl group-hover:scale-105 transition-transform ${
                isDarkMode
                  ? 'bg-zinc-800/80 border-zinc-700/60 text-zinc-300'
                  : 'bg-zinc-100 border-zinc-200 text-zinc-700'
              }`}
            >
              <FaGithub />
            </span>
            <div className="text-left">
              <div
                className={`font-semibold text-sm ${
                  isDarkMode ? 'text-zinc-100' : 'text-zinc-900'
                }`}
              >
                GitHub Profile
              </div>
              <div
                className={`text-xs mt-0.5 ${
                  isDarkMode ? 'text-zinc-400' : 'text-zinc-500'
                }`}
              >
                github.com/talaabusheha
              </div>
            </div>
          </a>

          {/* LinkedIn Card */}
          <a
            href={SOCIAL_LINKS.linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            className={`group flex items-center gap-4 p-5 border rounded-2xl transition-all duration-200 hover:-translate-y-0.5 shadow-sm ${
              isDarkMode
                ? 'bg-zinc-900/40 border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900/80'
                : 'bg-white border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50'
            }`}
          >
            <span className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-500 flex items-center justify-center text-2xl group-hover:scale-105 transition-transform">
              <FaLinkedin />
            </span>
            <div className="text-left">
              <div
                className={`font-semibold text-sm ${
                  isDarkMode ? 'text-zinc-100' : 'text-zinc-900'
                }`}
              >
                LinkedIn Network
              </div>
              <div
                className={`text-xs mt-0.5 ${
                  isDarkMode ? 'text-zinc-400' : 'text-zinc-500'
                }`}
              >
                linkedin.com/in/talaabusheha2832005
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}

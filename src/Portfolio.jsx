import { useTheme } from './hooks/useTheme';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Experience from './components/sections/Experience';
import Projects from './components/sections/Projects';
import Skills from './components/sections/Skills';
import Contact from './components/sections/Contact';

export default function Portfolio() {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`min-h-screen transition-colors duration-300 selection:bg-sky-500/20 selection:text-sky-500 ${
        isDarkMode ? 'bg-[#09111e] text-slate-100' : 'bg-[#f8fafc] text-slate-900'
      }`}
    >
      <style>{`
        html {
          scroll-behavior: smooth;
        }

        ::-webkit-scrollbar {
          width: 6px;
        }

        ::-webkit-scrollbar-track {
          background: ${isDarkMode ? '#070d17' : '#f1f5f9'};
        }

        ::-webkit-scrollbar-thumb {
          background: ${isDarkMode ? '#1e293b' : '#cbd5e1'};
          border-radius: 9999px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: ${isDarkMode ? '#334155' : '#94a3b8'};
        }
      `}</style>

      {/* Navigation Bar */}
      <Header />

      {/* Main Content Sections */}
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>

      {/* Site Footer */}
      <Footer />
    </div>
  );
}

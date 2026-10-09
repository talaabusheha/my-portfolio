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
      className={`min-h-screen transition-colors duration-300 selection:bg-indigo-500/20 selection:text-indigo-400 ${
        isDarkMode ? 'bg-zinc-950 text-zinc-100' : 'bg-zinc-50 text-zinc-900'
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
          background: ${isDarkMode ? '#09090b' : '#f4f4f5'};
        }

        ::-webkit-scrollbar-thumb {
          background: ${isDarkMode ? '#27272a' : '#d4d4d8'};
          border-radius: 9999px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: ${isDarkMode ? '#3f3f46' : '#a1a1aa'};
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

import React, { useState, useEffect } from 'react';
import { FaGithub } from "react-icons/fa6";
import todolist from '../public/todolist.webp'
import PrayerTimesAPI from '../public/PrayerTimesAPI.png'
import calculator from '../public/calculator.png'
import logo from '../public/talalogo.jpeg'
import { FaLinkedin } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdMarkEmailUnread } from "react-icons/md";
import { FaPhone } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";





export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Header Component
  const Header = () => (
    <header className="fixed top-0 w-full bg-gradient-to-b from-slate-950 via-slate-900 to-transparent backdrop-blur-md z-50 border-b border-cyan-500/10 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 py-5 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg flex items-center justify-center font-bold text-white text-xl overflow-hidden shadow-lg">
            <img 
              src={logo} 
              alt="Tala" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
            Tala Abusheha
          </div>
        </div>
        
        <nav className="hidden md:flex gap-8">
          {['About', 'Projects', 'Skills', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 relative group font-medium"
            >
              {item}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-emerald-400 group-hover:w-full transition-all duration-300"></span>
            </a>
          ))}
        </nav>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-cyan-400 hover:text-emerald-400 transition-colors"
        >
          {isMenuOpen ? '✕' : '≡'}
        </button>
      </div>

      {isMenuOpen && (
        <nav className="md:hidden bg-slate-900/95 backdrop-blur border-t border-cyan-500/10 p-4 space-y-3 animate-in">
          {['About', 'Projects', 'Skills', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="block text-gray-400 hover:text-cyan-400 transition-colors py-2 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              {item}
            </a>
          ))}
        </nav>
      )}
    </header>
  );

  // Hero Section
  const Hero = () => (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-emerald-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 text-center z-10">
        <div className="animate-fade-in space-y-8">
          <div className="inline-block">
            <span className="px-4 py-2 bg-cyan-500/10 border border-cyan-400/30 rounded-full text-cyan-400 text-sm font-semibold hover:bg-cyan-500/20 transition-all">
              Hi, I'm Tala Abusheha
            </span>
          </div>

          <h1 className="text-7xl md:text-8xl font-black mb-6 bg-gradient-to-r from-cyan-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent leading-tight tracking-tight">
            Front-End Developer
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed font-light">
            <span className="text-cyan-400 font-semibold">I build fast, beautiful, and effective web applications</span>
            <br />
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <button className="px-8 py-4 bg-gradient-to-r from-cyan-400 to-emerald-400 text-slate-900 font-bold rounded-full hover:shadow-[0_15px_50px_rgba(34,211,238,0.6)] hover:-translate-y-1 transition-all duration-300 hover:scale-105 flex justify-center gap-4">
              View LinkedIn <FaLinkedin className='mt-1' />
 
            </button>
            <a
              href="https://github.com/talaabusheha"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-slate-800/50 border border-cyan-400/50 text-cyan-400 font-bold rounded-full hover:bg-cyan-400/10 hover:border-cyan-400 transition-all duration-300 hover:scale-105 flex justify-center gap-4"
            >
              View GitHub <FaGithub className='mt-1' />

            </a>
          </div>

          <div className="mt-20 animate-bounce">
            <svg className="w-8 h-8 mx-auto text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );

  // About Section
  const About = () => (
    <section id="about" className="py-32 relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 ">
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10 w-[90%] m-auto">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="text-4xl"></div>
            <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
             About Me
            </h2>
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-emerald-400 mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left side - Image */}
              <div className="flex justify-center md:justify-start md:-translate-y-16">
              <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-emerald-400 rounded-full opacity-20 blur-2xl animate-pulse"></div>
              <div className="relative w-72 h-72 md:w-80 md:h-80">
              <div className="w-full h-full rounded-full border-4 border-cyan-400 overflow-hidden shadow-2xl hover:scale-105 transition-transform duration-500 flex items-center justify-center bg-gradient-to-br from-cyan-400/20 to-emerald-400/20">
              <img 
              src={logo} 
              alt="Tala Abu Sheha" 
              className="w-full h-full object-cover"
              />
              </div>
              </div>
              </div>
              </div>

          {/* Right side - Info */}
          <div className="space-y-8">
            <div> <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">About Me</h3> <p className="text-lg text-gray-300 leading-relaxed"> I am a passionate and detail-oriented<span className="text-cyan-400 font-semibold"> Front-End Developer</span> for building modern and fast web applications .<br/> I have <span className="text-emerald-400 font-semibold">+2 years</span> of experience in transforming complex ideas into beautiful and effective user interfaces. </p> </div>
            {/* Description */}
            <div className="space-y-4"> 
              <p className="text-gray-300 leading-relaxed border-l-4 border-cyan-400 pl-4"> 
                Skilled in <span className="font-semibold text-cyan-400">React.js</span>, 
                and experienced with modern web technologies like  
                <span className="font-semibold text-emerald-400"> Tailwind CSS and TypeScript </span> 
                to build reliable, fast, and high-performance applications.
              </p>

              <p className="text-gray-300 leading-relaxed border-l-4 border-emerald-400 pl-4"> 
                I am passionate about solving 
                <span className="font-semibold text-emerald-400"> challenging problems that help me learn </span> 
                and grow every day. I always strive to follow the best practices and stay updated with the latest technologies.
              </p>
            </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 py-6"> 
                <div className="p-4 bg-cyan-500/10 border border-cyan-400/30 rounded-xl text-center hover:bg-cyan-500/20 transition-all"> 
                  <div className="text-3xl font-bold text-cyan-400">+20</div> 
                  <div className="text-xs text-gray-400 mt-2">Completed Projects</div> 
                </div>

                <div className="p-4 bg-emerald-500/10 border border-emerald-400/30 rounded-xl text-center hover:bg-emerald-500/20 transition-all"> 
                  <div className="text-3xl font-bold text-emerald-400">+10</div> 
                  <div className="text-xs text-gray-400 mt-2">Satisfied Clients</div> 
                </div>

                <div className="p-4 bg-purple-500/10 border border-purple-400/30 rounded-xl text-center hover:bg-purple-500/20 transition-all"> 
                  <div className="text-3xl font-bold text-purple-400">+2</div> 
                  <div className="text-xs text-gray-400 mt-2">Years of Experience</div> 
                </div>
              </div>

            {/* Social Links */}
            <div className="md:flex md:gap-4 md:pt-6  hidden">
              <a
                href="https://www.linkedin.com/in/talaabusheha2832005/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-400 hover:bg-blue-500/20 hover:scale-110 transition-all"
              >
                in
              </a>
              <a
                href="https://github.com/talaabusheha"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center rounded-full bg-slate-500/10 border border-slate-400/30 text-slate-300 hover:bg-slate-500/20 hover:scale-110 transition-all"
              >
                <FaGithub/>
              </a>
              <a
                href="https://wa.me/970594828270"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center rounded-full bg-green-500/10 border border-green-400/30 text-green-400 hover:bg-green-500/20 hover:scale-110 transition-all"
              >
                <FaWhatsapp/></a>
              <a
                href="mailto:talaabusheha@gmail.com"
                className="w-12 h-12 flex items-center justify-center rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 hover:bg-cyan-500/20 hover:scale-110 transition-all"
              >
                <MdMarkEmailUnread />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  // Projects Section
  const ProjectCard = ({ image, title, description, tags, link }) => (
    <div className="group bg-gradient-to-b from-slate-800/50 to-slate-900/50 border border-cyan-500/20 rounded-2xl overflow-hidden hover:border-cyan-400/60 transition-all duration-300 hover:-translate-y-4 hover:shadow-[0_30px_80px_rgba(34,211,238,0.15)] cursor-pointer">
          <div className="w-full h-56 bg-gradient-to-br from-cyan-400/10 to-cyan-400/5 
                  flex items-center justify-center rounded-2xl overflow-hidden">
          <img 
          src={image}  
          className="w-full h-full object-cover"
          />
          </div>
      <div className="p-8 space-y-4">
        <h3 className="text-2xl font-bold text-cyan-400">{title}</h3>
        <p className="text-gray-400 text-base leading-relaxed">{description}</p>
        <div className="flex gap-2 flex-wrap pt-4">
          {tags.map((tag) => (
            <span key={tag} className="px-4 py-2 bg-cyan-500/10 text-cyan-400 text-xs font-semibold rounded-full border border-cyan-500/30 hover:bg-cyan-500/20 transition-all">
              {tag}
            </span>
          ))}
        </div>
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-cyan-400 font-semibold mt-4 group/link"
          >
           Open project →
            <span className="group-hover/link:translate-x-1 transition-transform duration-300">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4m-4-6l6 6m0 0l-6 6m6-6H3" />
              </svg>
            </span>
          </a>
        )}
      </div>
    </div>
  );

  const Projects = () => (
    <section id="projects" className="py-32 relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-3 mb-4">
            <h2 className="h-16 text-4xl md:text-5xl font-black bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">My Projects</h2>
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-emerald-400 mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          <ProjectCard
            image={todolist}
            title="To Do List App"
            description="A comprehensive task management app with real-time synchronization,priority levels, and persistent local storage for efficient productivity."
            tags={['HTML', 'JavaScript', 'CSS Tailwind']}
            link=" https://talaabusheha.github.io/To-Do-List/"
          />
          <ProjectCard
            image={PrayerTimesAPI}
            title="Prayer Times"
            description="Prayer times application that calculates accurate Islamic prayer 
            schedules based on user location and region with real-time updates."
            tags={['HTML','CSS', 'JavaScript', 'API']}
            link="https://prayer-times-api-lime.vercel.app/"
          />
          <ProjectCard
            image={calculator}
            title="simple calculator"
            description="A simple yet powerful calculator app providing basic arithmetic operations 
            with a clean interface and efficient calculation experience."
            tags={['HTML', 'CSS', 'JavaScript']}
            link="https://talaabusheha.github.io/Simple-Calculator/"
          />
        </div>
      </div>
    </section>
  );

  // Skills Section
  const SkillItem = ({ name, level, icon }) => (
    <div className="group p-6 bg-gradient-to-br from-cyan-500/10 to-emerald-500/10 border border-cyan-400/30 rounded-2xl hover:border-cyan-400/80 hover:bg-cyan-500/20 hover:scale-110 transition-all duration-300 text-center hover:shadow-[0_10px_40px_rgba(34,211,238,0.2)]">
      <div className="text-4xl mb-3">{icon}</div>
      <h4 className="text-cyan-400 font-bold text-lg mb-2">{name}</h4>
      <p className="text-gray-400 text-sm font-medium">{level}</p>
      <div className="mt-4 h-1 bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );

  const Skills = () => {
  const [isPaused, setIsPaused] = React.useState(false);

  const skillsData = [
    'React.js',
    'Tailwind CSS',
    'JavaScript',
    'TypeScript',
    'Git & GitHub',
    'API Integration',
    'Performance',
    'Responsive Design',
    'BootStrap',
    'HTML5',
    'CSS3',
    'Work with team',
  ];

  // Duplicate for seamless loop
  const displaySkills = [...skillsData, ...skillsData];

  return (
    <section id="skills" className="py-16 md:py-20 relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent pointer-events-none"></div>
      
      <div className="relative z-10">
        <div className="text-center mb-8 md:mb-10">
          <h2 className="text-3xl h-16 md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
            Skills
          </h2>
          <div class="w-24 h-1 bg-gradient-to-r from-cyan-400 to-emerald-400 mx-auto rounded-full"></div>
        </div>

        {/* Auto-scrolling ticker */}
        <div 
          className="w-full overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <style>{`
            @keyframes scroll {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(-50%);
              }
            }

            .scroll-container {
              display: flex;
              gap: 1.5rem;
              animation: scroll 50s linear infinite;
              animation-play-state: running;
            }

            .scroll-container.paused {
              animation-play-state: paused;
            }

            .skill-badge {
              padding: 0.75rem 1.5rem;
              background: rgba(6, 182, 212, 0.1);
              border: 1px solid rgba(6, 182, 212, 0.3);
              border-radius: 999px;
              color: #06b6d4;
              font-weight: 600;
              font-size: 0.95rem;
              white-space: nowrap;
              cursor: pointer;
              transition: all 0.3s ease;
              flex-shrink: 0;
            }

            .skill-badge:hover {
              background: rgba(6, 182, 212, 0.2);
              border-color: rgba(6, 182, 212, 0.6);
              box-shadow: 0 0 15px rgba(6, 182, 212, 0.3);
              transform: translateY(-2px);
            }

            @media (max-width: 768px) {
              .skill-badge {
                padding: 0.6rem 1.2rem;
                font-size: 0.85rem;
              }

              .scroll-container {
                gap: 1rem;
              }
            }
          `}</style>

          <div className={`scroll-container ${isPaused ? 'paused' : ''}`}>
            {displaySkills.map((skill, index) => (
              <div key={index} className="skill-badge">
                {skill}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
  // Contact Section
  const Contact = () => (
    <section id="contact" className="py-32 relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 to-emerald-500/10 pointer-events-none"></div>
      
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="text-4xl"></div>
            <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">Contact Me</h2>
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-emerald-400 mx-auto rounded-full"></div>
        </div>

        <p className="text-xl text-gray-300 text-center mb-12 leading-relaxed">
        Do you have a project you'd like to work on together? I'm ready now! 
Need a quick response? 
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <a
            href="https://wa.me/970594828270"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center gap-3 px-8 py-5 bg-gradient-to-r from-green-500/10 to-green-500/5 border border-green-400/50 rounded-xl hover:bg-green-500/20 hover:border-green-400 hover:shadow-[0_15px_40px_rgba(34,197,94,0.2)] transition-all duration-300 hover:-translate-y-1"
          >
            <span className="text-3xl text-green-400 "><FaWhatsapp/></span>
            <div className="text-left">
              <div className="font-bold text-green-400">WhatsApp</div>
              <div className="text-sm text-gray-400">+970 594828270</div>
            </div>
          </a>

          <a
            href="mailto:talaabusheha@gmail.com"
            className="group flex items-center justify-center gap-3 px-8 py-5 bg-gradient-to-r from-cyan-500/10 to-cyan-500/5 border border-cyan-400/50 rounded-xl hover:bg-cyan-500/20 hover:border-cyan-400 hover:shadow-[0_15px_40px_rgba(34,211,238,0.2)] transition-all duration-300 hover:-translate-y-1"
          >
            <span className="text-3xl"><MdMarkEmailUnread/></span>
            <div className="text-left">
              <div className="font-bold text-cyan-400">Gmail</div>
              <div className="text-sm text-gray-400">talaabusheha@gmail.com</div>
            </div>
          </a>

          <a
            href="https://github.com/talaabusheha"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center gap-3 px-8 py-5 bg-gradient-to-r from-slate-600/10 to-slate-600/5 border border-slate-400/50 rounded-xl hover:bg-slate-600/20 hover:border-slate-400 hover:shadow-[0_15px_40px_rgba(100,100,100,0.2)] transition-all duration-300 hover:-translate-y-1"
          >
            <span className="text-3xl "><FaGithub/></span>
            <div className="text-left ">
              <div className="font-bold text-slate-300">GitHub</div>
              <div className="text-sm text-gray-400">talaabusheha</div>
            </div>
          </a>

          <a
            href="https://www.linkedin.com/in/talaabusheha2832005/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center gap-3 px-8 py-5 bg-gradient-to-r from-blue-500/10 to-blue-500/5 border border-blue-400/50 rounded-xl hover:bg-blue-500/20 hover:border-blue-400 hover:shadow-[0_15px_40px_rgba(59,130,246,0.2)] transition-all duration-300 hover:-translate-y-1"
          >
            <span className="text-3xl text-blue-500"><FaLinkedin/></span>
            <div className="text-left">
              <div className="font-bold text-blue-500">LinkedIn</div>
              <div className="text-sm text-gray-400">Tala Abusheha</div>
            </div>
          </a>
        </div>


      </div>
    </section>
  );

  // Footer
  const Footer = () => (
  <footer className="border-t border-cyan-500/10 bg-gradient-to-t from-slate-950 to-transparent py-16">
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-12 text-center md:text-left">
        {/* Logo & Description */}
        <div className="flex flex-col items-center md:items-start">
          <div className="flex items-center gap-2 mb-4 justify-center md:justify-start">
            <img 
              src={logo} 
              alt="Tala" 
              className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-emerald-400 rounded-lg"
            />
            <div className="font-bold text-lg text-cyan-400">Tala</div>
          </div>
          <p className="text-gray-400 text-sm max-w-xs">
            Frontend developer passionate about building exceptional web applications
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="font-bold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              <a 
                href="#about" 
                className="hover:text-cyan-400 transition-colors"
              >
                About Me
              </a>
            </li>
            <li>
              <a 
                href="#projects" 
                className="hover:text-cyan-400 transition-colors"
              >
                My Projects
              </a>
            </li>
            <li>
              <a 
                href="#skills" 
                className="hover:text-cyan-400 transition-colors"
              >
                My Skills
              </a>
            </li>
            <li>
              <a 
                href="#contact" 
                className="hover:text-cyan-400 transition-colors"
              >
                Contact Me
              </a>
            </li>
          </ul>
        </div>

        {/* Follow Me */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="font-bold text-white mb-4">Follow Me</h3>
          <div className="flex gap-4 justify-center md:justify-start">
            <a 
              href="https://www.linkedin.com/in/talaabusheha2832005/" 
              className="text-blue-400 hover:text-blue-500 transition-colors text-2xl" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <FaLinkedin/>
            </a>
            <a 
              href="https://github.com/talaabusheha" 
              className="text-slate-300 hover:text-slate-200 transition-colors text-2xl" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <FaGithub/>
            </a>
            <a 
              href="https://wa.me/970594828270" 
              className="text-green-400 hover:text-green-500 transition-colors text-2xl" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <FaWhatsapp/>
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-cyan-500/10 pt-8 text-center">
        <p className="text-gray-500 text-sm">
          © 2026 Tala Abu Sheha. All rights reserved 
          <br />
          <span className="text-xs">Built with React & Tailwind CSS </span>
        </p>
      </div>
    </div>
  </footer>
);


  return (
    <div className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white min-h-screen overflow-x-hidden">
      {/* <CustomCursor /> */}
      
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -50px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(50px, 50px) scale(1.05); }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .animate-in {
          animation: fade-in 0.3s ease-out;
        }

        html {
          scroll-behavior: smooth;
        }

        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(15, 23, 42, 0.5);
        }

        ::-webkit-scrollbar-thumb {
          background: rgba(34, 211, 238, 0.5);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: rgba(34, 211, 238, 0.8);
        }
      `}</style>
      
      <Header />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
      <Footer />
    </div>
  );
}

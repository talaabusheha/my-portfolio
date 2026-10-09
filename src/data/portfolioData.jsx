import React from 'react';
import { 
  Zap, 
  Palette, 
  Wrench, 
  Code2, 
  Layers, 
  Sparkles, 
  Smartphone, 
  GitBranch, 
  Database, 
  Globe, 
  Cpu, 
  Atom, 
  Network,
  Bot,
  Layout
} from 'lucide-react';

// Static Assets
import todolist from '../../public/todolist.webp';
import PrayerTimesAPI from '../../public/PrayerTimesAPI.jpg';
import kafeeli from '../../public/kafeeli.jpg';
import qrAttendance from '../../public/qr_attendance.jpg';
import logo from '../../public/talalogo.jpeg';

export { logo };

export const NAV_LINKS = ['About', 'Experience', 'Projects', 'Skills', 'Contact'];

export const SOCIAL_LINKS = {
  linkedIn: 'https://www.linkedin.com/in/talaabusheha2832005/',
  github: 'https://github.com/talaabusheha',
  whatsapp: 'https://wa.me/970594828270',
  email: 'talaabusheha@gmail.com',
  resume: 'https://drive.google.com',
};

export const ABOUT_STATS = [
  { value: '+20', label: 'Completed Projects' },
  { value: '+10', label: 'Satisfied Clients' },
  { value: '+2', label: 'Years Experience' },
];

export const EXPERIENCES = [
  {
    role: 'Co-Mentor & Front-End Developer',
    company: 'TAQAT — CodeMap 3 Program',
    period: 'Sep 2026 - Present',
    description:
      'Co-Mentoring trainees in the CodeMap 3 program, conducting code reviews, and guiding web development workflows. Architected and developed a full-scale session-based Dynamic QR Attendance System with mentor dashboard and automated XLSX reporting.',
    tags: ['CodeMap 3', 'React 19', 'Vite', 'Supabase', 'QR Generation', 'Mentorship'],
  },
  {
    role: 'Front-End Web Developer',
    company: 'Kafeeli Platform (Team Collaboration)',
    period: '2026',
    description:
      'Worked within a cross-functional team of UI/UX designers, frontend, and backend developers to build a comprehensive orphan sponsorship web platform. Engineered the Guardian Dashboard with Axios REST API integration.',
    tags: ['React.js', 'Vite', 'Axios', 'RESTful APIs', 'Tailwind CSS', 'Team Collaboration'],
  },
  {
    role: 'Front-End Web Developer',
    company: 'Freelance & Independent Projects',
    period: '2024 - Present',
    description:
      'Developing custom, responsive, and performance-optimized web apps for clients. Translating complex design mockups into pixel-perfect, accessible code.',
    tags: ['React.js', 'JavaScript', 'Tailwind CSS', 'Responsive Design'],
  },
];

export const PROJECTS = [
  {
    image: kafeeli,
    badge: '🌟 Production Team App',
    title: 'Kafeeli - Orphan Sponsorship Platform',
    description:
      'A real-world full-featured orphan sponsorship platform built with a cross-functional team (UI/UX, Frontend & Backend). Designed to ensure 100% financial and status transparency between guardians and sponsors using Axios REST APIs.',
    tags: ['React.js', 'Vite', 'Axios', 'REST API', 'Tailwind CSS'],
    link: 'https://kafeeli-frontend.vercel.app/',
  },
  {
    image: qrAttendance,
    badge: '🚀 Real-World Tooling',
    title: 'Smart Dynamic QR Attendance System',
    description:
      'An intelligent attendance management tool built for TAQAT. Replaced paper logging and solved remote proxy fraud through session-based dynamic QR code generation, mentor analytics dashboard, and automated Excel (XLSX) reporting.',
    tags: ['React 19', 'Vite', 'Tailwind CSS', 'Supabase', 'Real-Time', 'XLSX'],
    link: 'https://taqat-mentors.vercel.app/admin/dashboard',
  },
  {
    image: PrayerTimesAPI,
    badge: '⚡ Web API',
    title: 'Islamic Prayer Times & Schedules',
    description:
      'Location-aware Islamic prayer schedules application that calculates accurate prayer times based on user coordinates with real-time updates and timezone conversions.',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'REST API'],
    link: 'https://prayer-times-api-lime.vercel.app/',
  },
  {
    image: todolist,
    badge: '🛠️ Productivity',
    title: 'Task Flow & Productivity Hub',
    description:
      'A modern task management application featuring real-time state synchronization, priority categorization, search/filter capabilities, and persistent local storage.',
    tags: ['HTML5', 'JavaScript', 'Tailwind CSS', 'LocalStorage'],
    link: 'https://talaabusheha.github.io/To-Do-List/',
  },
];

export const ARSENAL_CATEGORIES = [
  {
    title: 'Frontend Core',
    count: '4 technologies',
    icon: <Zap className="w-5 h-5 text-indigo-400" />,
    iconBgDark: 'bg-indigo-500/10 border-indigo-500/20',
    iconBgLight: 'bg-indigo-50 border-indigo-200',
    countColorDark: 'text-indigo-400',
    countColorLight: 'text-indigo-600',
    hoverBorderDark: 'hover:border-indigo-500/40',
    hoverBorderLight: 'hover:border-indigo-300',
    skills: [
      { name: 'React.js', icon: <Atom className="w-4 h-4 text-cyan-400" /> },
      { name: 'JavaScript ES6+', icon: <Code2 className="w-4 h-4 text-amber-400" /> },
      { name: 'TypeScript', icon: <Cpu className="w-4 h-4 text-blue-400" /> },
      { name: 'HTML5 / CSS3', icon: <Globe className="w-4 h-4 text-orange-400" /> },
    ],
  },
  {
    title: 'Styling & UI',
    count: '5 technologies',
    icon: <Palette className="w-5 h-5 text-pink-400" />,
    iconBgDark: 'bg-pink-500/10 border-pink-500/20',
    iconBgLight: 'bg-pink-50 border-pink-200',
    countColorDark: 'text-pink-400',
    countColorLight: 'text-pink-600',
    hoverBorderDark: 'hover:border-pink-500/40',
    hoverBorderLight: 'hover:border-pink-300',
    skills: [
      { name: 'Tailwind CSS', icon: <Layers className="w-4 h-4 text-teal-400" /> },
      { name: 'Bootstrap', icon: <Layout className="w-4 h-4 text-purple-400" /> },
      { name: 'UI Components', icon: <Layers className="w-4 h-4 text-rose-400" /> },
      { name: 'Responsive Design', icon: <Smartphone className="w-4 h-4 text-indigo-400" /> },
      { name: 'CSS Animations', icon: <Sparkles className="w-4 h-4 text-yellow-400" /> },
    ],
  },
  {
    title: 'Tools & Workflow',
    count: '6 technologies',
    icon: <Wrench className="w-5 h-5 text-emerald-400" />,
    iconBgDark: 'bg-emerald-500/10 border-emerald-500/20',
    iconBgLight: 'bg-emerald-50 border-emerald-200',
    countColorDark: 'text-emerald-400',
    countColorLight: 'text-emerald-600',
    hoverBorderDark: 'hover:border-emerald-500/40',
    hoverBorderLight: 'hover:border-emerald-300',
    skills: [
      { name: 'Git & GitHub', icon: <GitBranch className="w-4 h-4 text-red-400" /> },
      { name: 'Antigravity IDE', icon: <Bot className="w-4 h-4 text-indigo-400" /> },
      { name: 'Claude & Gemini AI', icon: <Sparkles className="w-4 h-4 text-amber-400" /> },
      { name: 'Vite', icon: <Zap className="w-4 h-4 text-yellow-300" /> },
      { name: 'REST APIs & Axios', icon: <Network className="w-4 h-4 text-emerald-400" /> },
      { name: 'Supabase', icon: <Database className="w-4 h-4 text-teal-400" /> },
    ],
  },
];

export const FULL_STACK_SKILLS = [
  { name: 'React.js', icon: <Atom className="w-3.5 h-3.5 text-cyan-400" /> },
  { name: 'Tailwind CSS', icon: <Layers className="w-3.5 h-3.5 text-teal-400" /> },
  { name: 'JavaScript', icon: <Code2 className="w-3.5 h-3.5 text-amber-400" /> },
  { name: 'TypeScript', icon: <Cpu className="w-3.5 h-3.5 text-blue-400" /> },
  { name: 'Antigravity', icon: <Bot className="w-3.5 h-3.5 text-indigo-400" /> },
  { name: 'Claude AI', icon: <Sparkles className="w-3.5 h-3.5 text-amber-400" /> },
  { name: 'Gemini AI', icon: <Sparkles className="w-3.5 h-3.5 text-cyan-300" /> },
  { name: 'Vite', icon: <Zap className="w-3.5 h-3.5 text-yellow-300" /> },
  { name: 'Supabase', icon: <Database className="w-3.5 h-3.5 text-emerald-400" /> },
  { name: 'RESTful APIs', icon: <Network className="w-3.5 h-3.5 text-indigo-400" /> },
  { name: 'Git & GitHub', icon: <GitBranch className="w-3.5 h-3.5 text-red-400" /> },
  { name: 'HTML5/CSS3', icon: <Globe className="w-3.5 h-3.5 text-orange-400" /> },
  { name: 'Responsive Design', icon: <Smartphone className="w-3.5 h-3.5 text-pink-400" /> },
  { name: 'Bootstrap', icon: <Layers className="w-3.5 h-3.5 text-purple-400" /> },
  { name: 'Axios', icon: <Network className="w-3.5 h-3.5 text-emerald-400" /> },
];

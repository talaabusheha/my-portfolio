import { useTheme } from '../../hooks/useTheme';
import { PROJECTS } from '../../data/portfolioData';
import ProjectCard from './ProjectCard';

export default function Projects() {
  const { isDarkMode } = useTheme();

  return (
    <section
      id="projects"
      className={`py-28 relative border-t ${
        isDarkMode
          ? 'bg-zinc-950/60 border-zinc-900'
          : 'bg-zinc-100/60 border-zinc-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            className={`text-3xl md:text-4xl font-extrabold tracking-tight mb-3 ${
              isDarkMode ? 'text-white' : 'text-zinc-900'
            }`}
          >
            Featured Projects
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-indigo-500 to-violet-500 mx-auto rounded-full"></div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {PROJECTS.map((project, idx) => (
            <ProjectCard
              key={idx}
              image={project.image}
              badge={project.badge}
              title={project.title}
              description={project.description}
              tags={project.tags}
              link={project.link}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

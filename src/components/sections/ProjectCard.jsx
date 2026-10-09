import { useTheme } from '../../hooks/useTheme';

export default function ProjectCard({ image, title, badge, description, tags, link }) {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`group border rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between ${
        isDarkMode
          ? 'bg-zinc-900/40 hover:bg-zinc-900/70 border-zinc-800/80 hover:border-zinc-700/80 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)]'
          : 'bg-white hover:bg-zinc-50/80 border-zinc-200 hover:border-zinc-300 shadow-sm hover:shadow-md'
      }`}
    >
      <div>
        {/* Project Thumbnail & Badge */}
        <div
          className={`w-full h-56 flex items-center justify-center overflow-hidden border-b relative ${
            isDarkMode ? 'bg-zinc-950 border-zinc-800/60' : 'bg-zinc-100 border-zinc-200'
          }`}
        >
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
          />
          {badge && (
            <div className="absolute top-3.5 right-3.5 px-3 py-1 rounded-full bg-zinc-950/80 backdrop-blur-md border border-white/10 text-white text-[11px] font-semibold shadow-lg">
              {badge}
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="p-7 space-y-3">
          <h3
            className={`text-xl font-bold transition-colors ${
              isDarkMode
                ? 'text-zinc-100 group-hover:text-indigo-400'
                : 'text-zinc-900 group-hover:text-indigo-600'
            }`}
          >
            {title}
          </h3>
          <p
            className={`text-sm leading-relaxed ${
              isDarkMode ? 'text-zinc-400' : 'text-zinc-600'
            }`}
          >
            {description}
          </p>

          {/* Tag Badges */}
          <div className="flex gap-2 flex-wrap pt-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className={`px-3 py-1 text-xs font-medium rounded-lg border ${
                  isDarkMode
                    ? 'bg-zinc-800/80 text-zinc-300 border-zinc-700/50'
                    : 'bg-zinc-100 text-zinc-700 border-zinc-200'
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* External Project Link */}
      <div className="px-7 pb-7 pt-2">
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 text-sm font-semibold group/link transition-all ${
              isDarkMode
                ? 'text-indigo-400 hover:text-indigo-300'
                : 'text-indigo-600 hover:text-indigo-700'
            }`}
          >
            Open Project
            <span className="group-hover/link:translate-x-1 transition-transform duration-200">
              →
            </span>
          </a>
        )}
      </div>
    </div>
  );
}

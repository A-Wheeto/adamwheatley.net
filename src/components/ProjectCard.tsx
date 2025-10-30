import { Project } from '@/types/project'

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative backdrop-blur-md bg-white/40 dark:bg-stone-900/60 p-6 md:p-8 shadow-2xl transition-all duration-500 border-2 border-stone-300 dark:border-stone-600 rounded-3xl overflow-hidden hover:shadow-emerald-500/20 hover:border-emerald-600 dark:hover:border-emerald-500 hover:scale-105 block"
    >
      <div className="relative z-10">
        {/* Project Title */}
        <h3 className="text-xl md:text-2xl font-bold mb-3 bg-gradient-to-r from-emerald-600 to-green-700 bg-clip-text text-transparent group-hover:from-emerald-500 group-hover:to-green-600 transition-all">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-sm md:text-base text-stone-800 dark:text-stone-200 mb-4 leading-relaxed font-medium">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech, index) => (
            <span
              key={index}
              className="px-3 py-1.5 bg-white/70 dark:bg-stone-800/70 rounded-lg text-xs font-medium text-stone-800 dark:text-stone-200 border border-stone-300 dark:border-stone-600"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </a>
  )
}
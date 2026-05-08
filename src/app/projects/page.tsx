import type { Metadata } from 'next'
import { projects } from '@/data/projects'
import ProjectCard from '@/components/ProjectCard'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Full-stack applications and solutions built throughout my development journey.',
}

const currentlyClimbing = [
  { name: 'Next.js', description: 'Server-side rendering and optimal performance' },
  { name: 'Vercel', description: 'Seamless deployment and edge functions' },
  { name: 'React', description: 'Component-based UI development' },
  { name: 'Auth0', description: 'Secure authentication and authorization' },
  { name: 'PostgreSQL', description: 'Robust relational database management' },
  { name: 'Shopify', description: 'E-commerce platform development' },
  { name: 'Contentful', description: 'Headless CMS for flexible content' },
  { name: 'APIs', description: 'RESTful and GraphQL integration patterns' },
]

export default function ProjectsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 md:px-12 py-10 pb-20 lg:pb-10">
      <h1 className="text-3xl font-bold mb-2" style={{ color: '#e6edf3' }}>
        My Routes
      </h1>
      <p className="text-sm mb-10 leading-relaxed" style={{ color: 'var(--muted)' }}>
        A collection of full-stack applications built throughout my development journey, from Ruby on Rails backends to Next.js frontends.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>

      <h2 className="climbing-heading">
        # current_stack
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {currentlyClimbing.map((skill) => (
          <div key={skill.name} className="climbing-card">
            <div
              className="font-bold text-sm mb-1"
              style={{ fontFamily: 'var(--mono)', color: 'var(--green)' }}
            >
              {skill.name}
            </div>
            <div className="text-xs" style={{ color: 'var(--muted)' }}>
              {skill.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

import type { Metadata } from 'next'
import { projects } from '@/data/projects'
import ProjectCard from '@/components/ProjectCard'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Full-stack applications and solutions built throughout my development journey.',
}

const currentlyClimbing = [
  { name: 'Ruby on Rails', description: 'Primary backend framework at STEM Learning, powering TeachComputing.org' },
  { name: 'Next.js', description: 'Frontend framework for STEM Learning projects and this portfolio' },
  { name: 'TypeScript', description: 'Type-safe development across all Next.js projects' },
  { name: 'React', description: 'Component-based UI across all frontend projects' },
  { name: 'PostgreSQL', description: 'Relational database for TeachComputing.org and Rails projects' },
  { name: 'Neon', description: 'Serverless Postgres database powering ClipdIn' },
  { name: 'Auth0', description: 'Powers single sign-on authentication across the STEM Learning platform' },
  { name: 'Contentful', description: 'Headless CMS backing STEM Learning project content' },
  { name: 'Strapi', description: 'CMS integrated with TeachComputing.org for content management' },
  { name: 'Docker', description: 'Containerisation for consistent development and deployment environments' },
  { name: 'Sentry', description: 'Error monitoring and performance tracking across production applications' },
  { name: 'Vercel', description: 'Deployment platform for all Next.js projects' },
  { name: 'Heroku', description: 'Cloud platform hosting TeachComputing.org' },
  { name: 'Google Analytics', description: 'User behaviour tracking and reporting across STEM Learning sites' },
  { name: 'Looker Studio', description: 'Data visualisation and reporting dashboards for stakeholder metrics' },
  { name: 'Postman', description: 'API development and testing across all projects' },
  { name: 'RSpec', description: 'Ruby testing framework, maintaining 96% coverage on TeachComputing.org' },
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

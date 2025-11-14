'use client'

import { projects } from '@/data/projects'
import ProjectCard from '@/components/ProjectCard'
import Link from 'next/link'

export default function ProjectsPage() {
  const learningSkills = [
    { name: 'Next.js', benefit: 'Server-side rendering and optimal performance' },
    { name: 'Vercel', benefit: 'Seamless deployment and edge functions' },
    { name: 'React', benefit: 'Component-based UI development' },
    { name: 'Auth0', benefit: 'Secure authentication and authorization' },
    { name: 'PostgreSQL', benefit: 'Robust relational database management' },
    { name: 'Shopify', benefit: 'E-commerce platform development' },
    { name: 'Contentful', benefit: 'Headless CMS for flexible content' },
    { name: 'APIs', benefit: 'RESTful and GraphQL integration patterns' }
  ]

  return (
    <main className="relative min-h-screen">
      {/* Background */}
      <div
        className="fixed inset-0 -z-10"
        style={{
          backgroundImage: 'url("/background.png")',
          backgroundRepeat: 'repeat',
          backgroundSize: 'clamp(400px, 50vw, 800px)',
          opacity: 0.7,
        }}
      />

      {/* Content */}
      <div className='relative z-10 max-w-6xl mx-auto px-4 py-5 sm:px-6 md:px-8 lg:px-12'>
        <Link
          href="/"
          className="block accent p-3 md:p-3 !mb-10 no-underline"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
        >
          Back
        </Link>

        {/* Header */}
        <div className="block fixed !p-6 md:p-8 !mb-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-stone-900 dark:text-stone-100">
            My Routes
          </h1>
          <p className="text-lg md:text-xl text-stone-800 dark:text-stone-200 font-medium">
            A collection of full-stack applications and solutions I&apos;ve built throughout my development journey. From Ruby on Rails backends to Next.js frontends, each project represents a different challenge conquered - showcasing API integrations, database management, and modern web technologies that have shaped my progression from IT support to full-stack developer.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>

        {/* Currently Learning Section */}
        <div className="mt-10">
          <div className="block fixed !p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-stone-900 dark:text-stone-100">
              Currently Climbing
            </h2>
            <p className="text-sm md:text-base text-stone-800 dark:text-stone-200 mb-6 font-medium">
              Technologies I&apos;m actively learning and exploring...
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {learningSkills.map((skill, index) => (
                <div
                  key={index}
                  className="block fixed !px-4 !py-3 font-mono"
                >
                  <div className="font-bold text-stone-900 dark:text-stone-100 mb-1">
                    {skill.name}
                  </div>
                  <div className="text-xs text-stone-700 dark:text-stone-300">
                    {skill.benefit}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-10">
          <div className="block fixed !p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-bold mb-3 text-stone-900 dark:text-stone-100">
              Want to see more?
            </h2>
            <p className="text-sm md:text-base text-stone-800 dark:text-stone-200 mb-4 font-medium">
              Check out my GitHub for all my projects and contributions
            </p>
            <a
              href="https://github.com/A-Wheeto"
              target="_blank"
              rel="noopener noreferrer"
              className="block accent px-6 py-3 font-bold uppercase tracking-wide text-sm no-underline text-white"
              style={{ display: 'inline-block' }}
            >
              Visit GitHub
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}
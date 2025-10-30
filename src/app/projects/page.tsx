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
          backgroundSize: 'auto',
          opacity: 0.7,
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-20 sm:px-6 md:px-8 lg:px-12">
        <Link
          href="/"
          className="backdrop-blur-md bg-white/40 dark:bg-stone-900/60 p-3 md:p-3 shadow-2xl border-2 border-stone-300 dark:border-stone-600 rounded-3xl inline-flex items-center gap-2 text-stone-600 dark:text-stone-400 hover:text-emerald-600 dark:hover:text-emerald-500 transition-colors mb-4 group"
        >
          <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to the climb
        </Link>
        {/* Header */}
        <div className="mb-12 backdrop-blur-md bg-white/40 dark:bg-stone-900/60 p-6 md:p-8 shadow-2xl border-2 border-stone-300 dark:border-stone-600 rounded-3xl">


          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-emerald-600 to-green-700 bg-clip-text text-transparent">
              My Routes
            </span>
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
        <div className="mt-16">
          <div className="backdrop-blur-md bg-white/40 dark:bg-stone-900/60 p-6 md:p-8 shadow-2xl border-2 border-stone-300 dark:border-stone-600 rounded-3xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
              Currently Climbing
            </h2>
            <p className="text-sm md:text-base text-stone-800 dark:text-stone-200 mb-6 font-medium">
              Technologies I&apos;m actively learning and exploring
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {learningSkills.map((skill, index) => (
                <div
                  key={index}
                  className="group px-4 py-3 bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/30 dark:to-cyan-900/30 rounded-xl border-2 border-teal-300 dark:border-teal-600 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="font-bold text-teal-800 dark:text-teal-200 mb-1">
                    {skill.name}
                  </div>
                  <div className="text-xs text-teal-700 dark:text-teal-300">
                    {skill.benefit}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-8">
          <div className="backdrop-blur-md bg-white/40 dark:bg-stone-900/60 p-6 md:p-8 shadow-2xl border-2 border-stone-300 dark:border-stone-600 rounded-3xl">
            <h2 className="text-xl md:text-2xl font-bold mb-3 bg-gradient-to-r from-emerald-600 to-green-700 bg-clip-text text-transparent">
              Want to see more?
            </h2>
            <p className="text-sm md:text-base text-stone-800 dark:text-stone-200 mb-4 font-medium">
              Check out my GitHub for all my projects and contributions
            </p>
            <a
              href="https://github.com/A-Wheeto"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-gradient-to-r from-emerald-700 to-green-700 text-white rounded-xl font-bold uppercase tracking-wide shadow-lg hover:shadow-emerald-500/50 hover:scale-105 transition-all text-sm"
            >
              Visit GitHub
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}
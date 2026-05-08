import { Project } from '@/types/project'

export const projects: Project[] = [
  {
    title: 'TeachComputing.org',
    description: 'The main website for the National Centre for Computing Education, serving thousands of UK computing teachers. Built course management features, integrated Classmarker and Credly APIs, and maintained 96% test coverage with comprehensive RSpec testing.',
    url: 'https://github.com/NCCE/teachcomputing.org',
    liveUrl: 'https://teachcomputing.org',
    technologies: ['Ruby on Rails', 'JavaScript', 'Stimulus', 'RSpec', 'PostgreSQL', 'Heroku', 'API Integration'],
    featured: true,
  },
  {
    title: 'Python Dashboard',
    description: 'A desktop application built with Tkinter that aggregates and visualises various data sources in real-time. Features a clean GUI interface for monitoring multiple metrics and API endpoints simultaneously.',
    url: 'https://github.com/A-Wheeto/Dashboard',
    technologies: ['Python', 'Tkinter', 'GUI', 'Data Visualisation', 'API Calls'],
    featured: true,
  },
  {
    title: 'Instagram Rails Application',
    description: 'A full-featured Instagram clone built from scratch using Ruby on Rails. Includes user authentication, image uploads with Active Storage, post creation and sharing, and a responsive feed interface.',
    url: 'https://github.com/A-Wheeto/Instagram-Rails-Application',
    technologies: ['Ruby on Rails', 'PostgreSQL', 'Active Storage', 'Authentication', 'CSS'],
    featured: true,
  },
  {
    title: 'adamwheatley.net',
    description: 'This portfolio, built from scratch with Next.js and TypeScript. Custom terminal-green design system, scroll-tracked career timeline, and Vercel deployment — all written without a UI framework.',
    url: 'https://github.com/A-Wheeto/adamwheatley.net',
    liveUrl: 'https://adamwheatley.net',
    badge: 'This site',
    technologies: ['Next.js', 'TypeScript', 'Vercel', 'CSS Design System', 'React'],
    featured: true,
  },
]
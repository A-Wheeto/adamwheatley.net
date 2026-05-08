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
    title: 'Pinpoint → HiBob Integration',
    description: 'Serverless webhook built with Ruby on AWS Lambda and API Gateway. When a candidate is hired in Pinpoint, the function automatically creates their employee record in HiBob, uploads their CV, and logs the result to CloudWatch, with multi-layered error handling throughout.',
    url: 'https://github.com/A-Wheeto/Pinpoint-Webhook',

    technologies: ['Ruby', 'AWS Lambda', 'API Gateway', 'Serverless', 'REST APIs', 'CloudWatch'],
    featured: true,
  },
  {
    title: 'stem.org.uk',
    description: 'The main STEM Learning website, serving teachers, students, and STEM professionals across the UK. Built with Next.js and TypeScript, with Contentful powering the content layer across programme pages, resources, and professional development.',
    technologies: ['Next.js', 'TypeScript', 'Contentful', 'Vercel'],
    featured: true,
  },
  {
    title: 'STEM Web User Profile',
    description: 'Single sign-on platform unifying authentication across the STEM Learning suite of websites. Built with Auth0 to provide seamless login across TeachComputing.org, stem.org.uk, and STEM Ambassadors from a single account.',
    technologies: ['Auth0', 'Next.js', 'TypeScript', 'Vercel'],
    featured: true,
  },
  {
    title: 'STEM Ambassadors',
    description: 'Platform connecting STEM professionals as volunteers with schools and colleges across the UK. Built with Next.js and Contentful, enabling ambassadors to register and schools to find and book STEM role models.',
    technologies: ['Next.js', 'TypeScript', 'Contentful', 'Vercel'],
    featured: true,
  },
  {
    title: 'adamwheatley.net',
    description: 'This portfolio, built from scratch with Next.js and TypeScript. Custom terminal-green design system, scroll-tracked career timeline, and Vercel deployment. All written without a UI framework.',
    url: 'https://github.com/A-Wheeto/adamwheatley.net',
    liveUrl: 'https://adamwheatley.net',

    badge: 'This site',
    technologies: ['Next.js', 'TypeScript', 'Vercel', 'CSS Design System', 'React'],
    featured: true,
  },
]
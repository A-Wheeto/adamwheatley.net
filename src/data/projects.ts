import { Project } from '@/types/project'

export const projects: Project[] = [
  {
    title: 'TeachComputing.org',
    description: 'The main website for the National Centre for Computing Education, helping teachers develop their computing skills. Built features for course management, integrated Classmarker and Credly APIs, and maintained 96% test coverage with comprehensive RSpec testing.',
    url: 'https://github.com/NCCE/teachcomputing.org',
    technologies: ['Ruby on Rails', 'JavaScript', 'Stimulus', 'RSpec', 'PostgreSQL', 'Heroku', 'API Integration'],
    featured: true
  },
  {
    title: 'Python Dashboard',
    description: 'A desktop application built with Tkinter that aggregates and visualizes various data sources in real-time. Features a clean GUI interface for monitoring multiple metrics and API endpoints simultaneously.',
    url: 'https://github.com/A-Wheeto/Dashboard',
    technologies: ['Python', 'Tkinter', 'GUI', 'Data Visualization', 'API Calls'],
    featured: true
  },
  {
    title: 'Instagram Rails Application',
    description: 'A full-featured Instagram clone built from scratch using Ruby on Rails. Includes user authentication, image uploads with Active Storage, post creation and sharing, and a responsive feed interface.',
    url: 'https://github.com/A-Wheeto/Instagram-Rails-Application',
    technologies: ['Ruby on Rails', 'PostgreSQL', 'Active Storage', 'Authentication', 'CSS'],
    featured: true
  }
]
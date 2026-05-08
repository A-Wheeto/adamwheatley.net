export interface Project {
  title: string
  description: string
  /** GitHub repository URL — rendered as the "GitHub" link on the project card. Optional for private/closed-source projects. */
  url?: string
  technologies: string[]
  featured?: boolean
  imageUrl?: string
  liveUrl?: string
  badge?: string
}
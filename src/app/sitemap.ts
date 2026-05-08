import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://adamwheatley.net',
      lastModified: new Date('2026-05-08'),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://adamwheatley.net/projects',
      lastModified: new Date('2026-05-08'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]
}

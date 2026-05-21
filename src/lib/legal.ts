import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { cache } from 'react'

export interface LegalDocument {
  slug: string
  title: string
  lastUpdated: string
  content: string
}

const legalDirectory = path.join(process.cwd(), 'src/content/legal')

// Get all legal document slugs
export function getLegalDocumentSlugs(): string[] {
  try {
    return fs.readdirSync(legalDirectory)
      .filter(file => file.endsWith('.md'))
      .map(file => file.replace(/\.md$/, ''))
  } catch (error) {
    console.warn('Could not read legal documents:', error)
    return []
  }
}

// Get legal document with content
export const getLegalDocument = cache((slug: string): LegalDocument | null => {
  try {
    const fullPath = path.join(legalDirectory, `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    
    return {
      slug,
      title: data.title || getDocumentTitle(content),
      lastUpdated: data.lastUpdated || extractLastUpdatedFromContent(content),
      content,
    }
  } catch (error) {
    console.warn(`Could not read legal document ${slug}:`, error)
    return null
  }
})

// Extract title from content if not in frontmatter
function getDocumentTitle(content: string): string {
  const titleMatch = content.match(/^#\s+(.+)$/m)
  if (titleMatch) {
    return titleMatch[1].replace(/\*\*/g, '') // Remove bold markdown
  }
  return 'Legal Document'
}

// Extract last updated date from content
function extractLastUpdatedFromContent(content: string): string {
  const dateMatch = content.match(/\*\*Last updated\s+(.+?)\*\*/i)
  if (dateMatch) {
    return dateMatch[1]
  }
  return new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Format date for display
export function formatLegalDate(dateString: string): string {
  try {
    // Try to parse the date string
    const date = new Date(dateString)
    if (!isNaN(date.getTime())) {
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }
  } catch (error) {
    // If parsing fails, return the original string
  }
  return dateString
}

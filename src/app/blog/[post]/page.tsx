import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { getBlogPost, getAllBlogSlugs, formatDate } from "@/lib/blog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Calendar, User, Tag } from "lucide-react"
import ReactMarkdown from 'react-markdown'
import { mdxComponents } from "@/components/mdx-components"

const LOCALE = "en";

interface BlogPostPageProps {
  params: Promise<{
    post: string
  }>
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { post } = await params
  const blogPost = getBlogPost(LOCALE, post)

  if (!blogPost) {
    notFound()
  }

  return (
    <main className="bg-background">
      <div className="mx-auto max-w-6xl border-x border-border min-h-screen">
        <Navbar />

        {/* Back to blog button */}
        <div className="px-6 pt-8 pb-4">
          <Link href="/blog">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </Link>
        </div>

        {/* Article Header */}
        <article className="px-6 pb-16">
          <header className="mb-12">
            <div className="max-w-4xl">
              {/* Meta info */}
              <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <time dateTime={blogPost.date}>
                    {formatDate(blogPost.date, LOCALE)}
                  </time>
                </div>
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>{blogPost.author}</span>
                </div>
                {blogPost.featured && (
                  <Badge variant="secondary">Featured</Badge>
                )}
              </div>

              {/* Title and description */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                {blogPost.title}
              </h1>

              {blogPost.description && (
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  {blogPost.description}
                </p>
              )}

              {/* Tags */}
              {blogPost.tags.length > 0 && (
                <div className="flex items-center gap-2 flex-wrap">
                  <Tag className="h-4 w-4 text-muted-foreground" />
                  {blogPost.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </header>

          {/* Article Content */}
          <div className="max-w-4xl">
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <ReactMarkdown components={mdxComponents}>
                {blogPost.content}
              </ReactMarkdown>
            </div>
          </div>

          {/* Article Footer */}
          <footer className="max-w-4xl mt-16 pt-8 border-t">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="text-sm text-muted-foreground">
                Published by <strong>{blogPost.author}</strong> on {formatDate(blogPost.date, LOCALE)}
              </div>
              <Link href="/blog">
                <Button variant="outline">
                  Back to Blog
                </Button>
              </Link>
            </div>
          </footer>
        </article>

        <Footer />
      </div>
    </main>
  )
}

export async function generateStaticParams() {
  const allSlugs = getAllBlogSlugs()

  return allSlugs
    .filter(({ locale }) => locale === LOCALE)
    .map(({ slug }) => ({
      post: slug,
    }))
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { post } = await params
  const blogPost = getBlogPost(LOCALE, post)

  if (!blogPost) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.',
    }
  }

  return {
    title: blogPost.title,
    description: blogPost.description,
    authors: [{ name: blogPost.author }],
    keywords: blogPost.tags,
    openGraph: {
      title: blogPost.title,
      description: blogPost.description,
      type: 'article',
      publishedTime: blogPost.date,
      authors: [blogPost.author],
      tags: blogPost.tags,
      images: [{ url: "https://static.struxa.cloud/social/og.jpeg", width: 1200, height: 630 }],
    },
  }
}

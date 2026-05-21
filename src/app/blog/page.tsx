import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { getAllBlogPosts, formatDate } from "@/lib/blog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const LOCALE = "en";

export default function BlogPage() {
  const posts = getAllBlogPosts(LOCALE);

  if (!posts || posts.length === 0) {
    return (
      <main className="bg-background">
        <div className="mx-auto max-w-6xl border-x border-border min-h-screen flex flex-col">
          <Navbar />

          <section className="px-6 py-24 flex-grow flex items-center justify-center">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold mb-4">Blog</h1>
              <p className="text-lg text-muted-foreground">No blog posts available yet. Check back soon!</p>
            </div>
          </section>

          <Footer />
        </div>
      </main>
    );
  }

  const featuredPosts = posts.filter((post) => post.featured);
  const regularPosts = posts.filter((post) => !post.featured);

  return (
    <main className="bg-background">
      <div className="mx-auto max-w-6xl border-x border-border min-h-screen">
        <Navbar />

        {/* Hero Section */}
        <section className="px-6 py-28 border-b border-border">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-[1.08] mb-4">
            Blog
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Updates, guides, and insights from the Struxa team
          </p>
        </section>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <section className="px-6 py-16 border-b border-border">
            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-8">
              Featured Posts
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredPosts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`}>
                  <Card className="h-full hover:shadow-sm transition-shadow cursor-pointer">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary">Featured</Badge>
                        <span className="text-sm text-muted-foreground">
                          {formatDate(post.date, LOCALE)}
                        </span>
                      </div>
                      <CardTitle className="line-clamp-2">
                        {post.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-3">
                        {post.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          {post.author}
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {post.tags.slice(0, 2).map((tag) => (
                            <Badge
                              key={tag}
                              variant="outline"
                              className="text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                          {post.tags.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{post.tags.length - 2}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* All Posts */}
        <section className="px-6 py-16">
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-8">
            {featuredPosts.length > 0 ? "All Posts" : "Latest Posts"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <Card className="h-full hover:shadow-sm transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">
                        {formatDate(post.date, LOCALE)}
                      </span>
                    </div>
                    <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                    <CardDescription className="line-clamp-3">
                      {post.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        {post.author}
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {post.tags.slice(0, 2).map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                        {post.tags.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{post.tags.length - 2}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}

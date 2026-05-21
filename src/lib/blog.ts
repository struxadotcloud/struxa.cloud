import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { cache } from "react";

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  author: string;
  date: string;
  tags: string[];
  featured: boolean;
  content: string;
  locale: string;
  alternates?: Record<string, string>;
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  author: string;
  date: string;
  tags: string[];
  featured: boolean;
  locale: string;
  alternates?: Record<string, string>;
}

const contentDirectory = path.join(process.cwd(), "src/content");

// Get all available locales from the content directory
export function getAvailableLocales(): string[] {
  try {
    return fs
      .readdirSync(contentDirectory, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name);
  } catch (error) {
    console.warn("Could not read content directory:", error);
    return ["en"]; // fallback to default locales
  }
}

// Get all blog post slugs for a specific locale
export function getBlogSlugs(locale: string): string[] {
  const localeDir = path.join(contentDirectory, locale);

  try {
    return fs
      .readdirSync(localeDir)
      .filter((file) => file.endsWith(".mdx"))
      .map((file) => file.replace(/\.mdx$/, ""));
  } catch (error) {
    console.warn(`Could not read blog posts for locale ${locale}:`, error);
    return [];
  }
}

// Get all blog post slugs for all locales
export function getAllBlogSlugs(): Array<{ locale: string; slug: string }> {
  const locales = getAvailableLocales();
  const allSlugs: Array<{ locale: string; slug: string }> = [];

  locales.forEach((locale) => {
    const slugs = getBlogSlugs(locale);
    slugs.forEach((slug) => {
      allSlugs.push({ locale, slug });
    });
  });

  return allSlugs;
}

// Get blog post metadata
export const getBlogPostMeta = cache(
  (locale: string, slug: string): BlogPostMeta | null => {
    try {
      const fullPath = path.join(contentDirectory, locale, `${slug}.mdx`);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);

      return {
        slug,
        locale,
        title: data.title || "Untitled",
        description: data.description || "",
        author: data.author || "Anonymous",
        date: data.date || new Date().toISOString().split("T")[0],
        tags: Array.isArray(data.tags) ? data.tags : [],
        featured: Boolean(data.featured),
        alternates: data.alternates as Record<string, string> | undefined,
      };
    } catch (error) {
      console.warn(
        `Could not read blog post ${slug} for locale ${locale}:`,
        error,
      );
      return null;
    }
  },
);

// Get full blog post with content
export const getBlogPost = cache(
  (locale: string, slug: string): BlogPost | null => {
    try {
      const fullPath = path.join(contentDirectory, locale, `${slug}.mdx`);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        slug,
        locale,
        title: data.title || "Untitled",
        description: data.description || "",
        author: data.author || "Anonymous",
        date: data.date || new Date().toISOString().split("T")[0],
        tags: Array.isArray(data.tags) ? data.tags : [],
        featured: Boolean(data.featured),
        alternates: data.alternates as Record<string, string> | undefined,
        content,
      };
    } catch (error) {
      console.warn(
        `Could not read blog post ${slug} for locale ${locale}:`,
        error,
      );
      return null;
    }
  },
);

// Get all blog posts for a specific locale
export function getAllBlogPosts(locale: string): BlogPostMeta[] {
  const slugs = getBlogSlugs(locale);
  const posts = slugs
    .map((slug) => getBlogPostMeta(locale, slug))
    .filter(Boolean) as BlogPostMeta[];

  // Sort by date (newest first)
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

// Get featured blog posts for a specific locale
export function getFeaturedBlogPosts(locale: string): BlogPostMeta[] {
  return getAllBlogPosts(locale).filter((post) => post.featured);
}

// Format date for display
export function formatDate(dateString: string, locale: string = "en"): string {
  const date = new Date(dateString);

  return date.toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

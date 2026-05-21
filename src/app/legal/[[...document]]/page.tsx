import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { getLegalDocument, formatLegalDate } from "@/lib/legal";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { mdxComponents } from "@/components/mdx-components";

interface LegalPageProps {
  params: Promise<{
    document?: string[];
  }>;
}

export default async function LegalPage({ params }: LegalPageProps) {
  const { document } = await params;

  // Default to privacy if no specific document is requested
  // Handle array from catch-all routes
  let documentSlug: string = "privacy";
  if (Array.isArray(document) && document.length > 0) {
    documentSlug = document[0];
  } else if (typeof document === "string") {
    documentSlug = document;
  }

  const legalDoc = getLegalDocument(documentSlug);

  if (!legalDoc) {
    notFound();
  }

  return (
    <main className="bg-background">
      <div className="mx-auto max-w-6xl border-x border-border min-h-screen">
        <Navbar />

        {/* Back navigation */}
        <div className="px-6 pt-8 pb-4">
          <Link href="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Document Header */}
        <article className="px-6 pb-16">
          <header className="mb-12">
            <div className="max-w-4xl">
              {/* Document metadata */}
              <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>
                    Last updated: {formatLegalDate(legalDoc.lastUpdated)}
                  </span>
                </div>
              </div>

              {/* Document title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                {legalDoc.title}
              </h1>

              <div className="prose prose-gray dark:prose-invert max-w-none mb-8">
                <p className="text-xl text-muted-foreground leading-relaxed">
                  This document outlines our policies and your rights. Please read it carefully and contact us if you have any questions.
                </p>
              </div>
            </div>
          </header>

          {/* Document Content */}
          <div className="max-w-4xl">
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <ReactMarkdown components={mdxComponents}>
                {legalDoc.content}
              </ReactMarkdown>
            </div>
          </div>

          {/* Document Footer */}
          <footer className="max-w-4xl mt-16 pt-8 border-t">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="text-sm text-muted-foreground">
                Last updated:{" "}
                <strong>{formatLegalDate(legalDoc.lastUpdated)}</strong>
              </div>
              <div className="flex gap-2">
                <Link href="/legal/privacy">
                  <Button variant="outline" size="sm">
                    Privacy Policy
                  </Button>
                </Link>
                <Link href="/legal/terms">
                  <Button variant="outline" size="sm">
                    Terms of Service
                  </Button>
                </Link>
                <Link href="/legal/cookies">
                  <Button variant="outline" size="sm">
                    Cookie Policy
                  </Button>
                </Link>
              </div>
            </div>
          </footer>
        </article>

        <Footer />
      </div>
    </main>
  );
}

export async function generateStaticParams() {
  const documents = ["privacy", "terms", "cookies"];
  return documents.map((doc) => ({ document: [doc] }));
}

export async function generateMetadata({ params }: LegalPageProps) {
  const { document } = await params;

  // Handle array from catch-all routes
  let documentSlug: string = "privacy";
  if (Array.isArray(document) && document.length > 0) {
    documentSlug = document[0];
  } else if (typeof document === "string") {
    documentSlug = document;
  }

  const legalDoc = getLegalDocument(documentSlug);

  if (!legalDoc) {
    return {
      title: "Legal Document Not Found",
      description: "The requested legal document could not be found.",
    };
  }

  return {
    title: `${legalDoc.title} - Struxa`,
    description: `Read our ${legalDoc.title.toLowerCase()} to understand how we handle your data and what rights you have.`,
    openGraph: {
      title: `${legalDoc.title} - Struxa`,
      description: `Read our ${legalDoc.title.toLowerCase()} to understand how we handle your data and what rights you have.`,
      type: "article",
    },
  };
}

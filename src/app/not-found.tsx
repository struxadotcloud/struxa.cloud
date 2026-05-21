import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { NotFoundContent } from "@/components/not-found-content";

export default function NotFoundPage() {
  return (
    <main className="bg-background">
      <div className="mx-auto max-w-6xl border-x border-border min-h-screen">
        <Navbar />
        <NotFoundContent />
        <Footer />
      </div>
    </main>
  );
}

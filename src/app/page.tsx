import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Features } from "@/components/features";
import { PanelPreview } from "@/components/panel-preview";
import { Footer } from "@/components/footer";
import SimplePricing from "@/components/mvpblocks/simple-pricing";
import { CTA } from "@/components/cta";
import { FAQ } from "@/components/faq";

export default function Home() {
  return (
    <main className="bg-background">
      {/* Layout rail — the border-x creates the left/right column lines */}
      <div className="mx-auto max-w-6xl border-x border-border min-h-screen">
        <Navbar />
        <Hero />
        <Features />
        <PanelPreview />
        <SimplePricing />
        <CTA />
        <FAQ />
        <Footer />
      </div>
    </main>
  );
}

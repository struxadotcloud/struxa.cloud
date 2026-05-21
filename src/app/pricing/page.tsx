import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PricingSection } from "@/components/pricing/pricing-section";

export default function PricingPage() {
  return (
    <main className="bg-background">
      <div className="mx-auto max-w-6xl border-x border-border min-h-screen">
        <Navbar />
        <PricingSection />
        <Footer />
      </div>
    </main>
  );
}

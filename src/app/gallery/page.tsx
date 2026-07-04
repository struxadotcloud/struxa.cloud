import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { GalleryImage } from "@/components/gallery-image";

const screenshots = [
  { src: "/console.png", title: "Server Console" },
  { src: "/files.png", title: "File Manager" },
  { src: "/backups.png", title: "Backups" },
  { src: "/plugins.png", title: "Plugins" },
  { src: "/settings.png", title: "Settings" },
  { src: "/activity.png", title: "Activity Log" },
  { src: "/admin-user.png", title: "Admin User Detail" },
  { src: "/billing-wallet.png", title: "Billing — Wallet" },
  { src: "/billing-chop.png", title: "Billing — Shop" },
  { src: "/billing-checkout.png", title: "Billing — Checkout" },
  { src: "/admin-nodes.png", title: "Admin — Nodes" },
  { src: "/admin-billing-catalog.png", title: "Admin — Billing Catalog" },
  { src: "/admin-billing-providers.png", title: "Admin — Billing Providers" },
];

export default function GalleryPage() {
  return (
    <main className="bg-background">
      <div className="mx-auto max-w-6xl border-x border-border min-h-screen">
        <Navbar />

        <section className="px-6 py-28 border-b border-border">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-4">
            See it in action
          </p>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-[1.08] mb-4">
            Gallery
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            A look at the Struxa panel, straight from the product.
          </p>
        </section>

        <section className="px-6 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {screenshots.map((shot) => (
              <GalleryImage key={shot.src} src={shot.src} title={shot.title} />
            ))}
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}

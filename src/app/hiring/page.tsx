import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function HiringPage() {
	return (
		<main className="bg-background">
			<div className="mx-auto max-w-6xl border-x border-border min-h-screen flex flex-col">
				<Navbar />

				<section className="px-6 pt-24 pb-12 flex-grow flex items-center justify-center">
					<div className="max-w-3xl mx-auto text-center">
						<h1 className="text-4xl font-bold mb-4">Hiring</h1>
						<p className="text-lg text-muted-foreground">We don&apos;t have any open positions at the moment, but we&apos;re always looking for talented individuals. Check back soon!</p>
					</div>
				</section>

				<Footer />
			</div>
		</main>
	)
}

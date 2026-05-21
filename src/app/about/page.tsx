import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AboutHero } from "@/components/about/about-hero"
import { AboutMission } from "@/components/about/about-mission"
import { AboutValues } from "@/components/about/about-values"
import type { Metadata } from "next"

export const metadata: Metadata = {
	title: "About Us",
	description: "Struxa is an open-source game server management panel built to replace Pterodactyl — modern stack, dark UI, fully self-hosted.",
}

export default function AboutPage() {
	return (
		<main className="bg-background">
			<div className="mx-auto max-w-6xl border-x border-border min-h-screen flex flex-col">
				<Navbar />
				<AboutHero />
				<AboutMission />
				<AboutValues />
				<Footer />
			</div>
		</main>
	)
}

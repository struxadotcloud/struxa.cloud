import { SparklesCore } from "@/components/ui/sparkles";

export default function TrustedPartnersSection() {
  return (
    <div className="pt-0 pb-0 relative overflow-hidden">
      <div className="relative left-1/2 -translate-x-1/2 -mt-8 h-64 w-screen overflow-hidden before:absolute before:left-0 before:top-0 before:h-full before:w-24 before:bg-gradient-to-r before:from-background before:to-transparent before:z-10 after:absolute after:right-0 after:top-0 after:h-full after:w-24 after:bg-gradient-to-l after:from-background after:to-transparent after:z-10">
        {/* Background gradient overlay (tone down in light mode, keep subtle in dark mode) */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/4 via-primary/1 to-transparent dark:opacity-80 opacity-25" />

        {/* Sparkles with improved fade effect */}
        <SparklesCore
          id="tsparticles"
          background="transparent"
          particleDensity={150}
          particleColor="#16a34a"
          minSize={1}
          maxSize={2.8}
          speed={1.5}
          className="absolute inset-0 h-full w-full opacity-100 dark:opacity-90 [mask-image:linear-gradient(to_top,black_0%,black_38%,rgba(0,0,0,0.95)_60%,rgba(0,0,0,0.78)_76%,rgba(0,0,0,0.62)_86%,rgba(0,0,0,0.3)_94%,transparent_100%)] dark:[mask-image:linear-gradient(to_top,black_0%,black_40%,rgba(0,0,0,0.96)_62%,rgba(0,0,0,0.82)_74%,rgba(0,0,0,0.6)_84%,rgba(0,0,0,0.35)_92%,rgba(0,0,0,0.12)_97%,transparent_100%)]"
        />

        {/* Additional overlay for smooth blending (much lighter in light theme) */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/45 via-background/18 to-transparent dark:from-background dark:via-background/86" />
        {/* Dark-mode top fade to hide any visible top seam from particle canvas/mask */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-background via-background/75 to-transparent dark:block hidden" />

        {/* Bottom curve element (globe silhouette) */}
        <div className="absolute -left-[65%] top-[53%] aspect-[1/0.7] w-[230%] rounded-[100%] bg-gradient-to-b from-background via-background to-muted/35" />
        <div className="absolute -left-[65%] top-[53%] aspect-[1/0.7] w-[230%] rounded-[100%] border-t border-border/45" />
        <div className="absolute -left-[65%] top-[53%] aspect-[1/0.7] w-[230%] rounded-[100%] border-t border-primary/14 blur-[0.8px]" />
      </div>
    </div>
  );
}

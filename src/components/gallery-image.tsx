"use client";

import Image from "next/image";
import { Dialog, DialogPopup, DialogTrigger } from "@/components/ui/dialog";

export function GalleryImage({ src, title }: { src: string; title: string }) {
  return (
    <Dialog>
      <DialogTrigger
        render={<button type="button" />}
        className="block w-full cursor-zoom-in overflow-hidden rounded-xl border border-border bg-card text-left"
      >
        <figure>
          <Image
            src={src}
            alt={title}
            width={1280}
            height={800}
            className="w-full h-auto"
          />
          <figcaption className="px-4 py-3 text-sm text-muted-foreground border-t border-border">
            {title}
          </figcaption>
        </figure>
      </DialogTrigger>

      <DialogPopup className="max-w-[95vw] sm:max-w-[95vw] max-h-[95vh] w-auto border-none bg-transparent p-0 shadow-none before:hidden">
        <Image
          src={src}
          alt={title}
          width={1920}
          height={1200}
          className="max-h-[95vh] w-auto rounded-lg object-contain"
        />
      </DialogPopup>
    </Dialog>
  );
}

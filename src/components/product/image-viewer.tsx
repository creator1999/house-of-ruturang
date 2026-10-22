"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { cn } from "@/lib/utils";

export function ImageViewer({
  images,
  alt,
  startIndex = 0,
  onClose,
}: {
  images: string[];
  alt: string;
  startIndex?: number;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(startIndex);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft")
        setIndex((i) => (i - 1 + images.length) % images.length);
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % images.length);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, images.length]);

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-foreground/95 backdrop-blur"
      role="dialog"
      aria-modal="true"
      aria-label={`${alt} — image viewer`}
    >
      <div className="flex items-center justify-between p-4 text-white">
        <span className="text-sm text-white/70">
          {index + 1} / {images.length}
        </span>
        <button
          onClick={onClose}
          aria-label="Close viewer"
          className="text-white/80 transition-colors hover:text-white"
        >
          <X className="size-6" />
        </button>
      </div>

      <div className="relative flex flex-1 items-center justify-center px-14 pb-4">
        <button
          onClick={() => setIndex((i) => (i - 1 + images.length) % images.length)}
          aria-label="Previous image"
          className="absolute left-3 flex size-10 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white"
        >
          <ChevronLeft className="size-6" />
        </button>

        <OptimizedImage
          src={images[index]}
          alt={`${alt} — view ${index + 1}`}
          width={1000}
          height={1333}
          className="max-h-[74vh] w-auto max-w-full object-contain"
        />

        <button
          onClick={() => setIndex((i) => (i + 1) % images.length)}
          aria-label="Next image"
          className="absolute right-3 flex size-10 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white"
        >
          <ChevronRight className="size-6" />
        </button>
      </div>

      <div className="flex justify-center gap-2 p-4">
        {images.map((img, i) => (
          <button
            key={img}
            onClick={() => setIndex(i)}
            aria-label={`View image ${i + 1}`}
            className={cn(
              "size-12 overflow-hidden rounded-sm ring-1",
              i === index ? "ring-white" : "ring-white/30",
            )}
          >
            <OptimizedImage
              src={img}
              alt=""
              width={64}
              height={85}
              className="h-full w-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

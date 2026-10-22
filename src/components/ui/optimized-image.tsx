import Image from "next/image";

type OptimizedImageProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

/**
 * Renders images consistently across the storefront.
 *
 * SVG placeholders are served via a plain, well-configured <img> (next/image
 * does not optimize SVG). Raster images use next/image for automatic
 * optimization — swap in real product photos later and this keeps working.
 */
export function OptimizedImage({
  src,
  alt,
  width,
  height,
  sizes,
  priority,
  className,
  style,
}: OptimizedImageProps) {
  if (src.endsWith(".svg")) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className={className}
        style={style}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width ?? 800}
      height={height ?? 1000}
      sizes={sizes}
      priority={priority}
      className={className}
      style={style}
    />
  );
}

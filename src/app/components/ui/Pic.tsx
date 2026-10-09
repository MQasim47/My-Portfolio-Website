import type { CSSProperties } from 'react';

interface PicProps {
  /** Path without extension, e.g. "/images/projects/unknot/banner". Needs .avif and .webp beside it. */
  src: string;
  alt: string;
  className?: string;
  style?: CSSProperties;
  /** Above-the-fold images load eagerly; the rest are lazy. */
  eager?: boolean;
}

/**
 * AVIF with a WebP fallback. The files are exported to final size by
 * scripts/export-project-images.mjs, so this is a plain <picture>, not next/image.
 */
export default function Pic({ src, alt, className, style, eager }: PicProps) {
  return (
    <picture>
      <source srcSet={`${src}.avif`} type="image/avif" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${src}.webp`}
        alt={alt}
        className={className}
        style={style}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        draggable={false}
      />
    </picture>
  );
}

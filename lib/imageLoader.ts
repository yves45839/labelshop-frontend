import type { ImageLoaderProps } from 'next/image';

/**
 * Custom Next.js image loader that bypasses the built-in optimization pipeline.
 * This prevents hitting Vercel's remote image optimization limits while
 * keeping the "next/image" component API for responsive loading and lazy
 * loading behaviors.
 */
const imageLoader = ({ src }: ImageLoaderProps): string => src;

export default imageLoader;

import type { MetadataRoute } from "next";
import { POSTS } from "@/lib/blog";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const paths = ["", "/features", "/pricing", "/blog", ...POSTS.map((p) => `/blog/${p.slug}`), "/about", "/contact", "/privacy", "/terms", "/sign-in", "/sign-up"];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((p) => ({ url: `${base}${p}`, changeFrequency: "monthly", priority: p === "" ? 1 : 0.6 }));
}

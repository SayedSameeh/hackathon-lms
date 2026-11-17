"use client";

import { useEffect, useState } from "react";

// Sticky table of contents. The active entry is the last heading that has
// scrolled past the reading line, so it always names the section you are in.
export default function PostToc({ items }: { items: { id: string; text: string }[] }) {
  const [active, setActive] = useState(items[0]?.id ?? "");

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      let cur = items[0]?.id ?? "";
      for (const { id } of items) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 140) cur = id;
      }
      // At the very bottom, the last section wins even if its heading never reaches the line
      if (innerHeight + scrollY >= document.documentElement.scrollHeight - 4) cur = items[items.length - 1]?.id ?? cur;
      setActive(cur);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    return () => { removeEventListener("scroll", onScroll); removeEventListener("resize", onScroll); cancelAnimationFrame(raf); };
  }, [items]);

  return (
    <nav aria-label="On this page" className="sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto overscroll-contain pr-2">
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-zinc-400">On this page</p>
      <ul className="mt-4 space-y-1 border-l border-zinc-200">
        {items.map((h) => {
          const on = h.id === active;
          return (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                aria-current={on ? "location" : undefined}
                className={`-ml-px block border-l-2 py-1.5 pl-4 text-sm font-semibold transition-[color,border-color] duration-200 ${on ? "border-primary text-zinc-950" : "border-transparent text-zinc-500 hover:border-zinc-300 hover:text-zinc-950"}`}
              >
                {h.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

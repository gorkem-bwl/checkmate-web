"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Contributor {
  login: string;
  avatar_url: string;
  html_url: string;
  contributions: number;
  type: string;
}

export function Contributors() {
  const [contributors, setContributors] = useState<Contributor[]>([]);

  useEffect(() => {
    async function fetchContributors() {
      try {
        const res = await fetch(
          "https://api.github.com/repos/bluewave-labs/checkmate/contributors?per_page=100"
        );
        if (!res.ok) return;
        const data: Contributor[] = await res.json();
        // Filter out bots
        const humans = data.filter((c) => c.type === "User");
        setContributors(humans);
      } catch {
        // Silently fail — section just won't show avatars
      }
    }
    fetchContributors();
  }, []);

  if (contributors.length === 0) return null;

  return (
    <section className="py-20" style={{ borderBottom: "1px solid #f3f4f6" }}>
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center mb-12">
          <h2 className="text-[40px] sm:text-[48px] font-bold tracking-[-0.04em] leading-[1.1] text-gray-900 mb-4">
            Our contributors
          </h2>
          <p className="text-xl text-gray-500">
            Built by{" "}
            <span className="text-gray-900 font-semibold">
              130+ developers
            </span>{" "}
            from around the world
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {contributors.map((contributor) => (
            <Link
              key={contributor.login}
              href={contributor.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative"
            >
              <img
                src={`${contributor.avatar_url}&s=64`}
                alt={contributor.login}
                width={40}
                height={40}
                className="w-10 h-10 rounded-full grayscale group-hover:grayscale-0 transition-all duration-200 group-hover:scale-110"
                loading="lazy"
              />
              <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-gray-900 px-2 py-1 text-xs text-white opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                {contributor.login}
              </span>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="https://github.com/bluewave-labs/checkmate"
            target="_blank"
            className="text-sm text-gray-500 hover:text-gray-900 transition-colors underline underline-offset-4"
          >
            Become a contributor
          </Link>
        </div>
      </div>
    </section>
  );
}

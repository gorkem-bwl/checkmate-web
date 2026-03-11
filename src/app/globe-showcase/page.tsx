"use client";

import dynamic from "next/dynamic";
import { Globe } from "lucide-react";

const GlobeVariantA = dynamic(
  () => import("@/components/GlobeVariantA").then((mod) => mod.GlobeVariantA),
  { ssr: false }
);
const GlobeVariantB = dynamic(
  () => import("@/components/GlobeVariantB").then((mod) => mod.GlobeVariantB),
  { ssr: false }
);
const GlobeVariantC = dynamic(
  () => import("@/components/GlobeVariantC").then((mod) => mod.GlobeVariantC),
  { ssr: false }
);
const GlobeVariantD = dynamic(
  () => import("@/components/GlobeVariantD").then((mod) => mod.GlobeVariantD),
  { ssr: false }
);
const GlobeVariantE = dynamic(
  () => import("@/components/GlobeVariantE").then((mod) => mod.GlobeVariantE),
  { ssr: false }
);
const GlobeLight = dynamic(
  () => import("@/components/GlobeLight").then((mod) => mod.GlobeLight),
  { ssr: false }
);

function BentoCard({
  label,
  description,
  children,
}: {
  label: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-16">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-900">{label}</h2>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      {/* Simulate the exact bento grid card layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-200 border border-gray-200">
        <div className="md:col-span-2 lg:col-span-2 bg-white overflow-hidden relative min-h-[320px]">
          {/* Globe background — same positioning as main page */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -bottom-[600px] right-[-200px] w-[900px] h-[900px]">
              {children}
            </div>
          </div>
          {/* Content overlay — exact copy of main page card */}
          <div className="relative z-10 h-full flex flex-col items-start p-8">
            <div>
              <h3 className="text-sm font-bold tracking-[-0.02em] text-gray-900 mb-2 flex items-center gap-2">
                <Globe className="w-4 h-4 text-emerald-500" />
                Global uptime monitoring
              </h3>
              <p className="text-[22px] text-gray-500 leading-snug max-w-md">
                Monitor{" "}
                <span className="text-gray-900 font-semibold">
                  HTTP, ping, and TCP endpoints
                </span>{" "}
                from{" "}
                <span className="text-gray-900 font-semibold">6 continents</span>{" "}
                with GlobalPing. Know when things go down, anywhere in the world.
              </p>
            </div>
            <div className="mt-8 w-full">
              <div className="flex flex-wrap items-center gap-3 text-sm">
                {[
                  "North America",
                  "Europe",
                  "Asia",
                  "Oceania",
                  "South America",
                  "Africa",
                ].map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-100"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Placeholder card to complete the grid */}
        <div className="bg-white p-8 hidden lg:block">
          <div className="h-full flex items-center justify-center text-gray-300 text-sm">
            Other bento card
          </div>
        </div>
      </div>
    </div>
  );
}

export default function GlobeShowcase() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] py-16 px-6">
      <div className="max-w-[1200px] mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Globe design variants
        </h1>
        <p className="text-gray-500 mb-12">
          Each variant shown exactly as it would appear in the bento grid card.
          Pick your favorite.
        </p>

        <BentoCard
          label="Current — Basic dots"
          description="The current design. Simple circular dots on sphere, basic shader colors."
        >
          <GlobeLight />
        </BentoCard>

        <BentoCard
          label="Variant A — Dense dots + graticule grid + traveling data packets"
          description="Higher density continent dots, latitude/longitude grid lines visible through the globe, animated dots traveling along arc connections."
        >
          <GlobeVariantA />
        </BentoCard>

        <BentoCard
          label="Variant B — Outlined continents with fill"
          description="Edge detection makes continent outlines bold, interior dots are faint. Double-ring city markers. Clean and cartographic."
        >
          <GlobeVariantB />
        </BentoCard>

        <BentoCard
          label="Variant C — Dark glass sphere with neon data streams"
          description="Dark translucent sphere with bright emerald continent dots. Multiple animated particles streaming along arc connections. Futuristic monitoring dashboard feel."
        >
          <GlobeVariantC />
        </BentoCard>

        <BentoCard
          label="Variant D — Hexagonal grid"
          description="Continents rendered as filled hexagons, ocean has sparse outline hexagons. Dashed arc connections. Hex-shaped city markers. Technical/data-viz aesthetic."
        >
          <GlobeVariantD />
        </BentoCard>

        <BentoCard
          label="Variant E — Particle cloud with diamond markers"
          description="High-performance Points-based rendering (thousands of particles). Sparse ocean dots for depth. Diamond-shaped pulsing city markers. Animated data packets along arcs."
        >
          <GlobeVariantE />
        </BentoCard>
      </div>
    </div>
  );
}

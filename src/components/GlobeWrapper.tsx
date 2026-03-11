"use client";

import dynamic from "next/dynamic";

const Globe = dynamic(
  () => import("@/components/Globe").then((mod) => mod.Globe),
  { ssr: false }
);

const GlobeLight = dynamic(
  () => import("@/components/GlobeLight").then((mod) => mod.GlobeLight),
  { ssr: false }
);

export function GlobeWrapper() {
  return <Globe />;
}

export function GlobeLightWrapper() {
  return <GlobeLight />;
}

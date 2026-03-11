"use client";

import dynamic from "next/dynamic";

const Globe = dynamic(
  () => import("@/components/Globe").then((mod) => mod.Globe),
  { ssr: false }
);

export function GlobeWrapper() {
  return <Globe />;
}

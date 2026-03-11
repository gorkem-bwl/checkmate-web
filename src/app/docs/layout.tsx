import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { source } from "@/lib/source";
import { RootProvider } from "fumadocs-ui/provider/next";
import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <RootProvider
      search={{
        options: {
          type: "static",
          defaultTag: "all",
        },
      }}
    >
      <DocsLayout
        tree={source.pageTree}
        nav={{
          title: "Checkmate",
          url: "/",
        }}
        links={[
          {
            text: "GitHub",
            url: "https://github.com/bluewave-labs/checkmate",
          },
          {
            text: "Discord",
            url: "https://discord.gg/NAb6H3UTjK",
          },
        ]}
      >
        {children}
      </DocsLayout>
    </RootProvider>
  );
}

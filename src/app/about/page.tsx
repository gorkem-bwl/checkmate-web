"use client";

import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  Github,
  Heart,
  Users,
  Globe,
  Shield,
  Zap,
  ArrowRight,
  Star,
  GitFork,
  MessageSquare,
} from "lucide-react";

const values = [
  {
    icon: Shield,
    title: "Transparency first",
    description:
      "Open source isn't just a license - it's a commitment to transparency. Every line of code is public, every decision documented.",
  },
  {
    icon: Users,
    title: "Community driven",
    description:
      "Built by the community, for the community. Feature requests and improvements come from users who care.",
  },
  {
    icon: Zap,
    title: "Simplicity matters",
    description:
      "Monitoring shouldn't require a PhD. Powerful features accessible to everyone, from solo devs to enterprise teams.",
  },
  {
    icon: Globe,
    title: "Self-hosted by default",
    description:
      "Your data belongs to you. Self-hosting is a first-class citizen with zero feature restrictions.",
  },
];

const timeline = [
  {
    year: "2023",
    title: "Project inception",
    description: "Started as an internal tool at Bluewave Labs.",
  },
  {
    year: "2023",
    title: "Open source release",
    description: "Released under AGPL-3.0 license.",
  },
  {
    year: "2024",
    title: "Community growth",
    description: "5,000 stars, Docker and game server support.",
  },
  {
    year: "2025",
    title: "Today",
    description: "9,300+ stars, 130+ contributors worldwide.",
  },
];

const stats = [
  { icon: Star, value: "9,300+", label: "GitHub stars" },
  { icon: GitFork, value: "620+", label: "Forks" },
  { icon: Users, value: "130+", label: "Contributors" },
  { icon: Globe, value: "9", label: "Languages" },
];

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#FAFAFA]">
      <Header />

      {/* Main content wrapper with bounding box */}
      <div
        className="mx-auto w-full max-w-[1200px] mt-20 mb-8 bg-white"
        style={{ border: "1px solid #e5e7eb" }}
      >
        {/* Hero Section */}
        <section
          className="relative pt-24 pb-20 overflow-hidden"
          style={{ borderBottom: "1px solid #f3f4f6" }}
        >
          {/* Subtle gradient ellipsis background */}
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute -top-[400px] -left-[300px] w-[900px] h-[700px] rounded-full"
              style={{
                background: "radial-gradient(ellipse, rgba(224, 242, 254, 0.6) 0%, transparent 60%)",
              }}
            />
            <div
              className="absolute -top-[200px] -right-[250px] w-[700px] h-[500px] rounded-full"
              style={{
                background: "radial-gradient(ellipse, rgba(236, 253, 245, 0.5) 0%, transparent 55%)",
              }}
            />
            <div
              className="absolute top-[100px] left-1/2 -translate-x-1/2 w-[1200px] h-[600px] rounded-full"
              style={{
                background: "radial-gradient(ellipse, rgba(243, 244, 246, 0.4) 0%, transparent 50%)",
              }}
            />
          </div>
          <div className="mx-auto max-w-[1000px] px-6">
            <div className="flex flex-col items-center text-center">
              <h1 className="text-[56px] sm:text-[64px] font-bold tracking-[-0.04em] leading-[1.0] text-gray-900 mb-6">
                Monitoring built
                <br />
                on trust
              </h1>

              <p className="max-w-[600px] text-[20px] text-gray-500 leading-[1.6]">
                Checkmate is an open-source infrastructure monitoring platform built
                by{" "}
                <Link
                  href="https://bluewavelabs.ca"
                  target="_blank"
                  className="text-gray-900 underline underline-offset-4"
                >
                  Bluewave Labs
                </Link>{" "}
                and a growing community of contributors who believe monitoring should
                be{" "}
                <span className="text-gray-900 font-semibold">
                  transparent, accessible, and powerful
                </span>
                .
              </p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16" style={{ borderBottom: "1px solid #f3f4f6" }}>
          <div className="mx-auto max-w-6xl px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-gray-200">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-[#FAFAFA] p-8 text-center">
                  <div className="w-12 h-12 border border-gray-200 flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="w-6 h-6 text-gray-900" />
                  </div>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-gray-500 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="py-20" style={{ borderBottom: "1px solid #f3f4f6" }}>
          <div className="mx-auto max-w-3xl px-4 text-center">
            <h2 className="text-[40px] font-bold tracking-[-0.04em] leading-[1.1] text-gray-900 mb-8">
              Our mission
            </h2>
            <p className="text-xl text-gray-500 leading-relaxed mb-6">
              We believe that infrastructure monitoring is{" "}
              <span className="text-gray-900 font-semibold">
                too important to be locked behind proprietary walls
              </span>
              . Teams of all sizes deserve access to reliable, feature-rich
              monitoring without vendor lock-in or surprise bills.
            </p>
            <p className="text-xl text-gray-500 leading-relaxed">
              Checkmate exists to{" "}
              <span className="text-gray-900 font-semibold">
                democratize infrastructure monitoring
              </span>
              . Whether you&apos;re a solo developer or an enterprise team, you
              deserve tools that respect your data and your intelligence.
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="py-20" style={{ borderBottom: "1px solid #f3f4f6" }}>
          <div className="mx-auto max-w-6xl px-4">
            <div className="text-center mb-16">
              <h2 className="text-[40px] font-bold tracking-[-0.04em] leading-[1.1] text-gray-900">
                What we believe
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-px bg-gray-200">
              {values.map((value) => (
                <div key={value.title} className="bg-white border border-gray-200 p-8">
                  <div className="w-10 h-10 border border-gray-200 flex items-center justify-center mb-4">
                    <value.icon className="w-5 h-5 text-gray-900" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-20" style={{ borderBottom: "1px solid #f3f4f6" }}>
          <div className="mx-auto max-w-3xl px-4">
            <div className="text-center mb-16">
              <h2 className="text-[40px] font-bold tracking-[-0.04em] leading-[1.1] text-gray-900">
                Our journey
              </h2>
            </div>

            <div className="space-y-px bg-gray-200">
              {timeline.map((item) => (
                <div key={item.title} className="bg-white p-6 flex gap-6">
                  <span className="text-sm font-medium text-emerald-600 w-16 flex-shrink-0">
                    {item.year}
                  </span>
                  <div>
                    <h3 className="font-semibold text-gray-900">{item.title}</h3>
                    <p className="text-gray-500 text-sm mt-1">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bluewave Labs */}
        <section className="py-24 bg-gray-900">
          <div className="mx-auto max-w-6xl px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-white mb-4">
                  Built by Bluewave Labs
                </h2>
                <p className="text-lg text-gray-400 mb-4">
                  Bluewave Labs is a software development company focused on building{" "}
                  <span className="text-white font-semibold">
                    open-source tools for developers and teams
                  </span>
                  . We believe in the power of community-driven software.
                </p>
                <p className="text-lg text-gray-400 mb-8">
                  Checkmate is one of several open-source projects we maintain, and
                  we&apos;re grateful for the community that has helped shape it.
                </p>

                <Link
                  href="https://bluewavelabs.ca"
                  target="_blank"
                  className="inline-flex items-center justify-center h-10 px-6 text-sm font-medium text-white bg-white/10 hover:bg-white/20 transition-colors"
                >
                  Visit Bluewave Labs
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>

              <div className="flex items-center justify-center">
                <div className="w-64 h-64 bg-gray-800 flex items-center justify-center">
                  <Heart className="w-24 h-24 text-emerald-400" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Community */}
        <section className="py-20" style={{ borderBottom: "1px solid #f3f4f6" }}>
          <div className="mx-auto max-w-3xl px-4 text-center">
            <h2 className="text-[40px] font-bold tracking-[-0.04em] leading-[1.1] text-gray-900 mb-4">
              Join our community
            </h2>
            <p className="text-xl text-gray-500 mb-10">
              Checkmate is built by developers, for developers. Join us to get help,
              share ideas, and contribute.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="https://github.com/bluewave-labs/checkmate"
                target="_blank"
                className="inline-flex items-center justify-center h-10 px-6 text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 transition-colors"
              >
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </Link>
              <Link
                href="https://discord.gg/NAb6H3UTjK"
                target="_blank"
                className="inline-flex items-center justify-center h-10 px-6 text-sm font-medium text-gray-700 border border-gray-200 hover:border-gray-400 transition-colors"
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                Discord
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-24 overflow-hidden">
          {/* Gradient ellipsis background */}
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute -top-[200px] -left-[200px] w-[600px] h-[400px] rounded-full"
              style={{
                background: "radial-gradient(ellipse, rgba(224, 242, 254, 0.5) 0%, transparent 60%)",
              }}
            />
            <div
              className="absolute -top-[100px] -right-[150px] w-[500px] h-[350px] rounded-full"
              style={{
                background: "radial-gradient(ellipse, rgba(236, 253, 245, 0.4) 0%, transparent 55%)",
              }}
            />
            <div
              className="absolute -bottom-[150px] -left-[100px] w-[500px] h-[300px] rounded-full"
              style={{
                background: "radial-gradient(ellipse, rgba(207, 250, 254, 0.3) 0%, transparent 55%)",
              }}
            />
            <div
              className="absolute -bottom-[100px] -right-[100px] w-[400px] h-[300px] rounded-full"
              style={{
                background: "radial-gradient(ellipse, rgba(220, 252, 231, 0.35) 0%, transparent 55%)",
              }}
            />
          </div>
          <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
            <h2 className="text-[40px] sm:text-[48px] font-bold tracking-[-0.04em] leading-[1.1] text-gray-900 mb-8">
              Ready to try Checkmate?
            </h2>
            <p className="text-xl text-gray-500 mb-12 max-w-2xl mx-auto">
              Start monitoring your infrastructure today.{" "}
              <span className="text-gray-900 font-semibold">
                It&apos;s free to get started.
              </span>
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href="https://checkmate-demo.bluewavelabs.ca/"
                target="_blank"
                className="inline-flex items-center justify-center h-12 px-8 text-sm font-medium text-white bg-gray-900 hover:bg-black transition-colors"
              >
                Try live demo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/docs"
                className="inline-flex items-center justify-center h-12 px-8 text-sm font-medium text-gray-700 bg-white border border-gray-200 hover:border-gray-400 transition-colors"
              >
                Read the docs
              </Link>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}

"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Contributors } from "@/components/Contributors";

const GlobeLight = dynamic(
  () => import("@/components/GlobeLight").then((mod) => mod.GlobeLight),
  { ssr: false }
);
import {
  ArrowRight,
  Check,
  Activity,
  Server,
  Bell,
  Clock,
  Shield,
  Globe,
  Container,
  Gamepad2,
  Github,
  Zap,
  Users,
  BarChart3,
  MessageSquare,
} from "lucide-react";

export default function Home() {
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
              <h1 className="text-[56px] sm:text-[72px] lg:text-[80px] font-bold tracking-[-0.04em] leading-[1.0] text-gray-900 mb-6">
                Monitor everything.
                <br />
                Miss nothing.
              </h1>

              <p className="max-w-[600px] text-[20px] text-gray-500 leading-[1.6] mb-10">
                Open-source infrastructure monitoring for{" "}
                <span className="text-gray-900 font-semibold">
                  uptime, servers, Docker containers
                </span>
                , and{" "}
                <span className="text-gray-900 font-semibold">
                  hardware health
                </span>
                . Self-host for free.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Link
                  href="https://checkmate-demo.bluewavelabs.ca/"
                  target="_blank"
                  className="inline-flex items-center justify-center h-10 px-4 text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 transition-all duration-200"
                >
                  Try live demo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  href="https://github.com/bluewave-labs/checkmate"
                  target="_blank"
                  className="inline-flex items-center justify-center h-10 px-4 text-sm font-medium text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
                >
                  <Github className="mr-2 h-4 w-4" />
                  View on GitHub
                </Link>
              </div>

              {/* Demo credentials */}
              <p className="mt-4 text-xs text-gray-400">
                Demo credentials:{" "}
                <span className="text-gray-500 font-medium">demouser@demo.com</span>
                {" / "}
                <span className="text-gray-500 font-medium">Demouser1!</span>
              </p>

              {/* Stats row */}
              <div className="mt-12 flex items-center gap-8 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <span className="text-gray-900 font-semibold">9,300+</span>{" "}
                  GitHub stars
                </div>
                <div className="w-px h-4 bg-gray-200" />
                <div className="flex items-center gap-2">
                  <span className="text-gray-900 font-semibold">130+</span>{" "}
                  contributors
                </div>
                <div className="w-px h-4 bg-gray-200" />
                <div className="flex items-center gap-2">
                  <span className="text-gray-900 font-semibold">AGPL-3.0</span>{" "}
                  license
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Problem Statement */}
        <section className="py-20" style={{ borderBottom: "1px solid #f3f4f6" }}>
          <div className="mx-auto max-w-6xl px-4">
            <div className="text-center mb-16">
              <h2 className="text-[40px] sm:text-[48px] font-bold tracking-[-0.04em] leading-[1.1] text-gray-900 mb-8 max-w-4xl mx-auto">
                Monitoring shouldn&apos;t cost
                <br />a fortune or your sanity.
              </h2>
              <p className="text-xl text-gray-500 leading-relaxed max-w-3xl mx-auto">
                Enterprise tools are{" "}
                <span className="text-gray-900 font-semibold">overpriced</span>.
                Free tools are{" "}
                <span className="text-gray-900 font-semibold">limited</span>.
                Checkmate gives you{" "}
                <span className="text-gray-900 font-semibold">
                  everything you need
                </span>
                , open source.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-px bg-gray-200">
              <div className="bg-[#FAFAFA] p-8">
                <div className="w-10 h-10 border border-gray-200 flex items-center justify-center mb-5">
                  <Clock className="w-5 h-5 text-gray-900" />
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">
                  Expensive alternatives
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Datadog and PagerDuty charge{" "}
                  <span className="text-gray-900 font-semibold">
                    per host, per feature
                  </span>
                  . Costs spiral as you scale. Checkmate is{" "}
                  <span className="text-gray-900 font-semibold">
                    free to self-host
                  </span>{" "}
                  with no artificial limits.
                </p>
              </div>

              <div className="bg-[#FAFAFA] p-8">
                <div className="w-10 h-10 border border-gray-200 flex items-center justify-center mb-5">
                  <Shield className="w-5 h-5 text-gray-900" />
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">
                  Data privacy concerns
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  SaaS monitoring means{" "}
                  <span className="text-gray-900 font-semibold">
                    your data on their servers
                  </span>
                  . Self-host Checkmate and keep{" "}
                  <span className="text-gray-900 font-semibold">
                    full control of your metrics
                  </span>
                  .
                </p>
              </div>

              <div className="bg-[#FAFAFA] p-8">
                <div className="w-10 h-10 border border-gray-200 flex items-center justify-center mb-5">
                  <Zap className="w-5 h-5 text-gray-900" />
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">
                  Complex setup
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Prometheus and Grafana require{" "}
                  <span className="text-gray-900 font-semibold">
                    hours of configuration
                  </span>
                  . Checkmate is{" "}
                  <span className="text-gray-900 font-semibold">
                    ready in minutes
                  </span>{" "}
                  with Docker.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Bento Grid Features */}
        <section
          className="py-16 px-6"
          style={{ borderBottom: "1px solid #f3f4f6" }}
        >
          <div className="mx-auto max-w-[1200px]">
            <div className="text-center mb-16">
              <h2 className="text-[40px] sm:text-[48px] font-bold tracking-[-0.04em] leading-[1.1] text-gray-900 mb-6">
                Everything you need to
                <br />
                keep systems running
              </h2>
              <p className="text-xl text-gray-500 leading-relaxed max-w-3xl mx-auto">
                From simple uptime checks to advanced infrastructure monitoring.{" "}
                <span className="text-gray-900 font-semibold">
                  One platform, complete visibility.
                </span>
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-200 border border-gray-200">
              {/* Card 1 - Large: Global Uptime Monitoring with Globe */}
              <div className="md:col-span-2 lg:col-span-2 bg-white overflow-hidden relative min-h-[320px]">
                {/* Background globe — 3x size, only upper part visible */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  <div className="absolute -bottom-[600px] right-[-200px] w-[900px] h-[900px]">
                    <GlobeLight />
                  </div>
                </div>
                {/* Content */}
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
                      <span className="text-gray-900 font-semibold">
                        6 continents
                      </span>{" "}
                      with GlobalPing. Know when things go down, anywhere in the world.
                    </p>
                  </div>
                  <div className="mt-8 w-full">
                    <div className="flex flex-wrap items-center gap-3 text-sm">
                      {["North America", "Europe", "Asia", "Oceania", "South America", "Africa"].map(
                        (item) => (
                          <span
                            key={item}
                            className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-100"
                          >
                            {item}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2: Server Monitoring */}
              <div className="bg-white p-8 overflow-hidden">
                <div className="h-full flex flex-col justify-between min-h-[280px]">
                  <div>
                    <h3 className="text-sm font-bold tracking-[-0.02em] text-gray-900 mb-2 flex items-center gap-2">
                      <Server className="w-4 h-4 text-gray-400" />
                      Server monitoring
                    </h3>
                    <p className="text-[22px] text-gray-500 leading-tight">
                      Track{" "}
                      <span className="text-gray-900 font-semibold">
                        CPU, memory, disk
                      </span>
                      , and{" "}
                      <span className="text-gray-900 font-semibold">
                        network usage
                      </span>{" "}
                      across all your servers.
                    </p>
                  </div>
                  <div className="mt-4 space-y-2">
                    {[
                      { label: "CPU", value: "24%" },
                      { label: "Memory", value: "67%" },
                      { label: "Disk", value: "45%" },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center gap-3">
                        <span className="text-xs text-gray-500 w-16">
                          {item.label}
                        </span>
                        <div className="flex-1 h-2 bg-gray-100">
                          <div
                            className="h-full bg-gray-900"
                            style={{ width: item.value }}
                          />
                        </div>
                        <span className="text-xs text-gray-900 font-medium">
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card 3: Docker Monitoring */}
              <div className="bg-white p-8 overflow-hidden">
                <div className="h-full flex flex-col justify-between min-h-[280px]">
                  <div>
                    <h3 className="text-sm font-bold tracking-[-0.02em] text-gray-900 mb-2 flex items-center gap-2">
                      <Container className="w-4 h-4 text-gray-400" />
                      Docker monitoring
                    </h3>
                    <p className="text-[22px] text-gray-500 leading-tight">
                      Monitor{" "}
                      <span className="text-gray-900 font-semibold">
                        container health
                      </span>
                      , resource usage, and{" "}
                      <span className="text-gray-900 font-semibold">
                        restart events
                      </span>
                      .
                    </p>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {["nginx", "postgres", "redis", "api"].map((container) => (
                      <div
                        key={container}
                        className="flex items-center gap-2 px-3 py-2 border border-gray-200"
                      >
                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span className="text-sm text-gray-700">
                          {container}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card 4 - Extended: Alerting */}
              <div className="md:col-span-2 lg:col-span-2 bg-white p-8 overflow-hidden">
                <div className="h-full flex flex-col justify-between min-h-[280px]">
                  <div>
                    <h3 className="text-sm font-bold tracking-[-0.02em] text-gray-900 mb-2 flex items-center gap-2">
                      <Bell className="w-4 h-4 text-gray-400" />
                      Multi-channel alerts
                    </h3>
                    <p className="text-[28px] text-gray-500 max-w-md leading-tight">
                      Get notified via{" "}
                      <span className="text-gray-900 font-semibold">
                        email, Slack, Discord
                      </span>
                      , or custom webhooks.{" "}
                      <span className="text-gray-900 font-semibold">
                        Never miss an incident.
                      </span>
                    </p>
                  </div>
                  <div className="mt-6 flex flex-wrap gap-3">
                    {[
                      "Email",
                      "Slack",
                      "Discord",
                      "Webhooks",
                    ].map((channel) => (
                      <span
                        key={channel}
                        className="px-4 py-2 border border-gray-200 text-sm text-gray-700"
                      >
                        {channel}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Features - 2x2 Bento Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-200 border-x border-b border-gray-200">
              {/* Status Pages */}
              <div className="bg-white p-8 overflow-hidden">
                <div className="h-full flex flex-col justify-between min-h-[220px]">
                  <div>
                    <h3 className="text-sm font-bold tracking-[-0.02em] text-gray-900 mb-2 flex items-center gap-2">
                      <Globe className="w-4 h-4 text-gray-400" />
                      Public status pages
                    </h3>
                    <p className="text-[22px] text-gray-500 leading-snug">
                      Beautiful, customizable status pages to{" "}
                      <span className="text-gray-900 font-semibold">
                        keep your users informed
                      </span>{" "}
                      during incidents.
                    </p>
                  </div>
                  {/* Status Page Illustration */}
                  <div className="mt-4 max-w-[340px]">
                    <svg viewBox="0 0 320 90" className="w-full h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g>
                        <circle cx="12" cy="14" r="4" fill="#10B981" />
                        <text x="24" y="17" fontSize="11" fill="#374151" fontFamily="system-ui">API</text>
                        {[...Array(28)].map((_, i) => (
                          <rect key={`api-${i}`} x={60 + i * 9} y="6" width="7" height="16" rx="1" fill={i === 22 ? "#F59E0B" : "#10B981"} />
                        ))}
                      </g>
                      <g>
                        <circle cx="12" cy="44" r="4" fill="#10B981" />
                        <text x="24" y="47" fontSize="11" fill="#374151" fontFamily="system-ui">Web</text>
                        {[...Array(28)].map((_, i) => (
                          <rect key={`web-${i}`} x={60 + i * 9} y="36" width="7" height="16" rx="1" fill="#10B981" />
                        ))}
                      </g>
                      <g>
                        <circle cx="12" cy="74" r="4" fill="#10B981" />
                        <text x="24" y="77" fontSize="11" fill="#374151" fontFamily="system-ui">DB</text>
                        {[...Array(28)].map((_, i) => (
                          <rect key={`db-${i}`} x={60 + i * 9} y="66" width="7" height="16" rx="1" fill={i === 14 ? "#EF4444" : "#10B981"} />
                        ))}
                      </g>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Game Server Monitoring */}
              <div className="bg-white p-8 overflow-hidden">
                <div className="h-full flex flex-col justify-between min-h-[220px]">
                  <div>
                    <h3 className="text-sm font-bold tracking-[-0.02em] text-gray-900 mb-2 flex items-center gap-2">
                      <Gamepad2 className="w-4 h-4 text-gray-400" />
                      Game server monitoring
                    </h3>
                    <p className="text-[22px] text-gray-500 leading-tight">
                      Monitor{" "}
                      <span className="text-gray-900 font-semibold">
                        Minecraft, CS2, Valheim
                      </span>
                      , and other game servers with{" "}
                      <span className="text-gray-900 font-semibold">
                        player counts
                      </span>
                      .
                    </p>
                  </div>
                </div>
              </div>

              {/* Response Time Tracking */}
              <div className="bg-white p-8 overflow-hidden">
                <div className="h-full flex flex-col justify-between min-h-[220px]">
                  <div>
                    <h3 className="text-sm font-bold tracking-[-0.02em] text-gray-900 mb-2 flex items-center gap-2">
                      <BarChart3 className="w-4 h-4 text-gray-400" />
                      Response time tracking
                    </h3>
                    <p className="text-[22px] text-gray-500 leading-snug">
                      Track{" "}
                      <span className="text-gray-900 font-semibold">
                        response times and latency
                      </span>{" "}
                      with historical charts and{" "}
                      <span className="text-gray-900 font-semibold">
                        performance insights
                      </span>
                      .
                    </p>
                  </div>
                </div>
              </div>

              {/* Team Collaboration */}
              <div className="bg-white p-8 overflow-hidden">
                <div className="h-full flex flex-col justify-between min-h-[220px]">
                  <div>
                    <h3 className="text-sm font-bold tracking-[-0.02em] text-gray-900 mb-2 flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-400" />
                      Team collaboration
                    </h3>
                    <p className="text-[22px] text-gray-500 leading-snug">
                      Invite your team with{" "}
                      <span className="text-gray-900 font-semibold">
                        role-based access control
                      </span>
                      . Everyone stays in the loop.
                    </p>
                  </div>
                  {/* Team Illustration */}
                  <div className="mt-4 max-w-[340px]">
                    <svg viewBox="0 0 300 80" className="w-full h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        {/* Gradients for avatars */}
                        <linearGradient id="adminGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#6366F1" />
                          <stop offset="100%" stopColor="#8B5CF6" />
                        </linearGradient>
                        <linearGradient id="editorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#14B8A6" />
                          <stop offset="100%" stopColor="#10B981" />
                        </linearGradient>
                        <linearGradient id="viewerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#F59E0B" />
                          <stop offset="100%" stopColor="#F97316" />
                        </linearGradient>
                        <linearGradient id="addGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#E0E7FF" />
                          <stop offset="100%" stopColor="#F3E8FF" />
                        </linearGradient>
                        {/* Shadow filter */}
                        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                          <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.1" />
                        </filter>
                      </defs>

                      {/* Connection lines */}
                      <path d="M55 35 Q100 10 145 35" stroke="#E5E7EB" strokeWidth="1.5" fill="none" strokeDasharray="4 2" />
                      <path d="M125 35 Q170 10 215 35" stroke="#E5E7EB" strokeWidth="1.5" fill="none" strokeDasharray="4 2" />

                      {/* Member 1 - Admin */}
                      <g filter="url(#shadow)">
                        <circle cx="35" cy="30" r="22" fill="white" />
                        <circle cx="35" cy="30" r="20" fill="url(#adminGrad)" />
                        <circle cx="35" cy="26" r="8" fill="white" fillOpacity="0.9" />
                        <ellipse cx="35" cy="40" rx="10" ry="5" fill="white" fillOpacity="0.9" />
                        {/* Online indicator */}
                        <circle cx="50" cy="42" r="5" fill="white" />
                        <circle cx="50" cy="42" r="3.5" fill="#10B981" />
                      </g>
                      <rect x="10" y="58" width="50" height="18" rx="9" fill="url(#adminGrad)" />
                      <text x="35" y="70" fontSize="9" fill="white" textAnchor="middle" fontWeight="500" fontFamily="system-ui">Admin</text>

                      {/* Member 2 - Editor */}
                      <g filter="url(#shadow)">
                        <circle cx="110" cy="30" r="22" fill="white" />
                        <circle cx="110" cy="30" r="20" fill="url(#editorGrad)" />
                        <circle cx="110" cy="26" r="8" fill="white" fillOpacity="0.9" />
                        <ellipse cx="110" cy="40" rx="10" ry="5" fill="white" fillOpacity="0.9" />
                        {/* Online indicator */}
                        <circle cx="125" cy="42" r="5" fill="white" />
                        <circle cx="125" cy="42" r="3.5" fill="#10B981" />
                      </g>
                      <rect x="85" y="58" width="50" height="18" rx="9" fill="url(#editorGrad)" />
                      <text x="110" y="70" fontSize="9" fill="white" textAnchor="middle" fontWeight="500" fontFamily="system-ui">Editor</text>

                      {/* Member 3 - Viewer */}
                      <g filter="url(#shadow)">
                        <circle cx="185" cy="30" r="22" fill="white" />
                        <circle cx="185" cy="30" r="20" fill="url(#viewerGrad)" />
                        <circle cx="185" cy="26" r="8" fill="white" fillOpacity="0.9" />
                        <ellipse cx="185" cy="40" rx="10" ry="5" fill="white" fillOpacity="0.9" />
                        {/* Away indicator */}
                        <circle cx="200" cy="42" r="5" fill="white" />
                        <circle cx="200" cy="42" r="3.5" fill="#F59E0B" />
                      </g>
                      <rect x="160" y="58" width="50" height="18" rx="9" fill="url(#viewerGrad)" />
                      <text x="185" y="70" fontSize="9" fill="white" textAnchor="middle" fontWeight="500" fontFamily="system-ui">Viewer</text>

                      {/* Add member button */}
                      <g filter="url(#shadow)">
                        <circle cx="260" cy="30" r="22" fill="white" />
                        <circle cx="260" cy="30" r="20" fill="url(#addGrad)" />
                        <line x1="250" y1="30" x2="270" y2="30" stroke="#8B5CF6" strokeWidth="2.5" strokeLinecap="round" />
                        <line x1="260" y1="20" x2="260" y2="40" stroke="#8B5CF6" strokeWidth="2.5" strokeLinecap="round" />
                      </g>
                      <rect x="235" y="58" width="50" height="18" rx="9" fill="white" stroke="#E5E7EB" strokeWidth="1" />
                      <text x="260" y="70" fontSize="9" fill="#6B7280" textAnchor="middle" fontWeight="500" fontFamily="system-ui">Invite</text>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Screenshots — Alternating layout */}
        <section className="py-24" style={{ borderBottom: "1px solid #f3f4f6" }}>
          <div className="mx-auto max-w-6xl px-4">
            <div className="text-center mb-20">
              <h2 className="text-[40px] sm:text-[48px] font-bold tracking-[-0.04em] leading-[1.1] text-gray-900 mb-6">
                See it in action
              </h2>
              <p className="text-xl text-gray-500 max-w-3xl mx-auto">
                A clean, powerful interface that gives you{" "}
                <span className="text-gray-900 font-semibold">
                  complete visibility
                </span>{" "}
                into your infrastructure
              </p>
            </div>

            <div className="space-y-24">
              {/* 1: Screenshot left, text right — Monitor details */}
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="border border-gray-200 overflow-hidden">
                  <img
                    src="https://github.com/user-attachments/assets/2eff6464-0738-4a32-9312-26e1e8e86275"
                    alt="Checkmate uptime monitoring dashboard"
                    className="w-full h-auto"
                    loading="lazy"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Know the moment something goes wrong
                  </h3>
                  <p className="text-gray-500 leading-relaxed mb-6">
                    Track uptime percentage, incident count, and response times
                    for every endpoint. Historical charts show patterns so you
                    can catch issues before they become outages.
                  </p>
                  <ul className="space-y-3">
                    {[
                      "Real-time uptime percentage and incident tracking",
                      "Response time charts with day, week, and month views",
                      "SSL certificate expiry monitoring",
                    ].map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-gray-700"
                      >
                        <Check className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* 2: Text left, screenshot right — PageSpeed */}
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="order-2 lg:order-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Understand your site performance
                  </h3>
                  <p className="text-gray-500 leading-relaxed mb-6">
                    Powered by Google Lighthouse, get detailed performance
                    scores, accessibility ratings, and Core Web Vitals tracking
                    over time.
                  </p>
                  <ul className="space-y-3">
                    {[
                      "Lighthouse performance, accessibility, and SEO scores",
                      "Core Web Vitals: LCP, FCP, CLS, and more",
                      "Score history to track improvements over time",
                    ].map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-gray-700"
                      >
                        <Check className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="order-1 lg:order-2 border border-gray-200 overflow-hidden">
                  <img
                    src="https://github.com/user-attachments/assets/616c3563-c2a7-4ee4-af6c-7e6068955d1a"
                    alt="Checkmate PageSpeed monitoring"
                    className="w-full h-auto"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* 3: Screenshot left, text right — Infrastructure */}
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="border border-gray-200 overflow-hidden">
                  <img
                    src="https://github.com/user-attachments/assets/7912d7cf-0d0e-4f26-aa5c-2ad7170b5c99"
                    alt="Checkmate infrastructure monitoring"
                    className="w-full h-auto"
                    loading="lazy"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Deep visibility into server health
                  </h3>
                  <p className="text-gray-500 leading-relaxed mb-6">
                    Monitor CPU, memory, disk, and network usage across all your
                    servers with the lightweight Capture agent. See real-time
                    gauges and historical trends.
                  </p>
                  <ul className="space-y-3">
                    {[
                      "CPU usage, temperature, and core frequency",
                      "Memory and disk usage with visual gauges",
                      "Historical charts for capacity planning",
                    ].map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-gray-700"
                      >
                        <Check className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* 4: Text left, screenshot right — Status pages */}
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="order-2 lg:order-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Keep your users informed
                  </h3>
                  <p className="text-gray-500 leading-relaxed mb-6">
                    Create beautiful public status pages that show real-time
                    service health. Build trust with your users by being
                    transparent about uptime.
                  </p>
                  <ul className="space-y-3">
                    {[
                      "Public-facing status dashboard with custom branding",
                      "Per-service uptime bars with historical data",
                      "Shareable link for customers and stakeholders",
                    ].map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-gray-700"
                      >
                        <Check className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="order-1 lg:order-2 border border-gray-200 overflow-hidden">
                  <img
                    src="https://github.com/user-attachments/assets/08c2c6ac-3a2f-44d1-a229-d1746a3f9d16"
                    alt="Checkmate status pages"
                    className="w-full h-auto"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Deployment Options */}
        <section className="py-24" style={{ borderBottom: "1px solid #f3f4f6" }}>
          <div className="mx-auto max-w-6xl px-4">
            <div className="text-center mb-16">
              <h2 className="text-[40px] sm:text-[48px] font-bold tracking-[-0.04em] leading-[1.1] text-gray-900 mb-8">
                Deploy your way
              </h2>
              <p className="text-xl max-w-3xl mx-auto">
                <span className="text-gray-500">
                  Self-host for{" "}
                </span>
                <span className="text-gray-900 font-semibold">
                  complete control over your data and infrastructure
                </span>
                .
              </p>
            </div>

            {/* Deployment Card */}
            <div className="bg-[#FAFAFA] border border-gray-200 p-10 max-w-2xl mx-auto">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gray-100">
                  <Server className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Self-hosted
                  </h3>
                  <span className="text-sm text-emerald-600 font-medium">
                    Free forever
                  </span>
                </div>
              </div>
              <p className="text-lg font-semibold text-gray-900 mb-6">
                Complete control over your data and infrastructure
              </p>
              <ul className="space-y-2 mb-8">
                {[
                  "Deploy with Docker in under 5 minutes",
                  "No artificial limits on monitors or team size",
                  "Your data stays on your servers",
                  "Full source code access under AGPL-3.0",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-gray-700"
                  >
                    <Check className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="https://github.com/bluewave-labs/checkmate"
                target="_blank"
                className="inline-flex items-center justify-center h-10 px-6 text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 transition-colors"
              >
                <Github className="mr-2 h-4 w-4" />
                Get started
              </Link>
            </div>
          </div>
        </section>

        {/* Open Source Section */}
        <section className="py-24 bg-gray-900">
          <div className="mx-auto max-w-6xl px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Github className="w-6 h-6 text-white" />
                  <span className="text-emerald-400 font-medium">
                    Open source
                  </span>
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">
                  Built in the open, for everyone
                </h2>
                <p className="text-lg text-gray-400 mb-6">
                  Checkmate is fully open source under the AGPL-3.0 license.
                  No vendor lock-in, no hidden costs. Inspect the code, suggest
                  features, or contribute directly.
                </p>
                <p className="text-lg text-gray-400 mb-8">
                  Join our community of{" "}
                  <span className="text-white font-semibold">
                    130+ contributors
                  </span>{" "}
                  building the future of infrastructure monitoring.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Link
                    href="https://github.com/bluewave-labs/checkmate"
                    target="_blank"
                    className="inline-flex items-center justify-center h-10 px-6 text-sm font-medium text-white bg-white/10 hover:bg-white/20 transition-colors"
                  >
                    <Github className="mr-2 h-4 w-4" />
                    Star on GitHub
                  </Link>
                  <Link
                    href="https://discord.gg/NAb6H3UTjK"
                    target="_blank"
                    className="inline-flex items-center justify-center h-10 px-6 text-sm font-medium text-gray-400 border border-gray-700 hover:border-gray-500 transition-colors"
                  >
                    Join Discord
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "9,300+", label: "GitHub stars" },
                  { value: "620+", label: "Forks" },
                  { value: "130+", label: "Contributors" },
                  { value: "AGPL-3.0", label: "License" },
                ].map((stat) => (
                  <div key={stat.label} className="bg-gray-800 p-6">
                    <div className="text-2xl font-bold text-white mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contributors */}
        <Contributors />

        {/* Discord Community Banner */}
        <section className="py-16" style={{ borderBottom: "1px solid #f3f4f6" }}>
          <div className="mx-auto max-w-6xl px-4">
            <Link
              href="https://discord.gg/NAb6H3UTjK"
              target="_blank"
              className="block bg-[#5865F2] p-8 sm:p-10 transition-all duration-200 hover:brightness-110"
            >
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 bg-white/20 flex items-center justify-center">
                    <MessageSquare className="w-7 h-7 text-white" />
                  </div>
                </div>
                <div className="text-center sm:text-left flex-1">
                  <h3 className="text-xl font-bold text-white mb-1">
                    Join our Discord community
                  </h3>
                  <p className="text-white/80 text-sm max-w-xl">
                    Get help, share ideas, report bugs, and connect with other
                    Checkmate users and contributors. Our community is active
                    and welcoming.
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center justify-center h-10 px-6 text-sm font-medium text-[#5865F2] bg-white hover:bg-gray-100 transition-colors">
                    Join Discord
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                </div>
              </div>
            </Link>
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
              Ready to stop worrying
              <br />
              about downtime?
            </h2>
            <p className="text-xl text-gray-500 mb-12 max-w-2xl mx-auto">
              Start monitoring your infrastructure in minutes.{" "}
              <span className="text-gray-900 font-semibold">
                Free forever, self-hosted
              </span>
              .
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
      {/* Close bounding box wrapper */}

      <Footer />
    </div>
  );
}

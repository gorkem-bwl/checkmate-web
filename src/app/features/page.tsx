"use client";

import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  Globe,
  Server,
  Container,
  Activity,
  Zap,
  Gamepad2,
  Bell,
  Mail,
  MessageSquare,
  BarChart3,
  Clock,
  Calendar,
  Shield,
  Lock,
  Code,
  ArrowRight,
  Check,
  Cpu,
  HardDrive,
  Thermometer,
  Network,
  Github,
} from "lucide-react";

const monitorTypes = [
  {
    icon: Globe,
    title: "HTTP/Website monitoring",
    description:
      "Monitor any website or API endpoint with response times, status codes, and content validation.",
    features: ["Response time tracking", "Status code validation", "Content/keyword checking", "Custom headers"],
  },
  {
    icon: Activity,
    title: "Ping monitoring",
    description:
      "Simple ICMP ping checks to verify network connectivity and measure latency.",
    features: ["Network connectivity", "Latency measurement", "IPv4 and IPv6"],
  },
  {
    icon: Zap,
    title: "Page speed monitoring",
    description:
      "Lighthouse-powered performance monitoring with Core Web Vitals tracking.",
    features: ["Lighthouse scores", "Core Web Vitals", "Performance history"],
  },
  {
    icon: Server,
    title: "Infrastructure monitoring",
    description:
      "Monitor server hardware including CPU, memory, disk, and temperature.",
    features: ["CPU utilization", "Memory usage", "Disk space", "Temperature"],
  },
  {
    icon: Container,
    title: "Docker monitoring",
    description:
      "Track Docker container status, health checks, and resource usage.",
    features: ["Container status", "Health checks", "Resource usage"],
  },
  {
    icon: Network,
    title: "Port monitoring",
    description:
      "TCP port availability checking for services on expected ports.",
    features: ["TCP port checks", "Connection timeout", "Service verification"],
  },
  {
    icon: Gamepad2,
    title: "Game server monitoring",
    description:
      "Monitor 100+ game server types with player counts and server info.",
    features: ["100+ game types", "Player counts", "Server status"],
  },
  {
    icon: Lock,
    title: "SSL certificate monitoring",
    description:
      "Monitor SSL certificate expiration and get alerts before they expire.",
    features: ["Expiration alerts", "Certificate details", "Auto-discovery"],
  },
  {
    icon: Clock,
    title: "Flexible check intervals",
    description:
      "Configure monitoring frequency from 15 seconds to custom intervals.",
    features: ["15s to 10min intervals", "Custom schedules", "Smart throttling"],
  },
];

const notificationChannels = [
  { icon: Mail, name: "Email", description: "SMTP notifications" },
  { icon: MessageSquare, name: "Slack", description: "Workspace webhooks" },
  { icon: MessageSquare, name: "Discord", description: "Server webhooks" },
  { icon: Code, name: "Webhooks", description: "Custom HTTP hooks" },
];

const additionalFeatures = [
  {
    icon: BarChart3,
    title: "Status pages",
    description: "Create beautiful public status pages with uptime charts and incident history.",
  },
  {
    icon: Shield,
    title: "Incident management",
    description: "Automatic incident detection with historical logs and acknowledgment.",
  },
  {
    icon: Calendar,
    title: "Maintenance windows",
    description: "Schedule maintenance to suppress alerts with recurring support.",
  },
  {
    icon: Code,
    title: "API validation",
    description: "Validate JSON responses with JMESPath and regex matching.",
  },
  {
    icon: Bell,
    title: "Custom alert rules",
    description: "Set thresholds and conditions to trigger alerts exactly when you need them.",
  },
  {
    icon: Globe,
    title: "Multi-region checks",
    description: "Monitor from multiple locations to ensure global availability.",
  },
];

export default function FeaturesPage() {
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
                Everything you need
                <br />
                to stay informed
              </h1>

              <p className="max-w-[600px] text-[20px] text-gray-500 leading-[1.6] mb-10">
                From{" "}
                <span className="text-gray-900 font-semibold">
                  simple uptime checks
                </span>{" "}
                to{" "}
                <span className="text-gray-900 font-semibold">
                  comprehensive infrastructure monitoring
                </span>
                . Nine monitor types, four notification channels.
              </p>
            </div>
          </div>
        </section>

        {/* Monitor Types - Bento Grid */}
        <section className="py-20" style={{ borderBottom: "1px solid #f3f4f6" }}>
          <div className="mx-auto max-w-6xl px-4">
            <div className="text-center mb-16">
              <h2 className="text-[40px] font-bold tracking-[-0.04em] leading-[1.1] text-gray-900 mb-4">
                Monitor types
              </h2>
              <p className="text-xl text-gray-500">
                Nine different ways to keep an eye on your infrastructure
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-200 border border-gray-200">
              {monitorTypes.map((monitor) => (
                <div
                  key={monitor.title}
                  className="bg-white p-8"
                >
                  <div className="w-10 h-10 border border-gray-200 flex items-center justify-center mb-4">
                    <monitor.icon className="w-5 h-5 text-gray-900" />
                  </div>
                  <h3 className="text-base font-semibold text-gray-900 mb-2">
                    {monitor.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">
                    {monitor.description}
                  </p>
                  <ul className="space-y-1">
                    {monitor.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2 text-sm text-gray-600"
                      >
                        <Check className="w-3 h-3 text-emerald-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Notification Channels */}
        <section className="py-20" style={{ borderBottom: "1px solid #f3f4f6" }}>
          <div className="mx-auto max-w-6xl px-4">
            <div className="text-center mb-16">
              <h2 className="text-[40px] font-bold tracking-[-0.04em] leading-[1.1] text-gray-900 mb-4">
                Get notified your way
              </h2>
              <p className="text-xl text-gray-500">
                Four notification channels to ensure you{" "}
                <span className="text-gray-900 font-semibold">
                  never miss an alert
                </span>
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-gray-200">
              {notificationChannels.map((channel) => (
                <div
                  key={channel.name}
                  className="bg-[#FAFAFA] p-6 text-center"
                >
                  <div className="w-10 h-10 border border-gray-200 flex items-center justify-center mx-auto mb-3">
                    <channel.icon className="w-5 h-5 text-gray-900" />
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm">
                    {channel.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {channel.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Additional Features */}
        <section className="py-20" style={{ borderBottom: "1px solid #f3f4f6" }}>
          <div className="mx-auto max-w-6xl px-4">
            <div className="text-center mb-16">
              <h2 className="text-[40px] font-bold tracking-[-0.04em] leading-[1.1] text-gray-900 mb-4">
                Powerful features for
                <br />
                serious monitoring
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-200 border border-gray-200">
              {additionalFeatures.map((feature) => (
                <div
                  key={feature.title}
                  className="bg-white p-8"
                >
                  <div className="w-10 h-10 border border-gray-200 flex items-center justify-center mb-4">
                    <feature.icon className="w-5 h-5 text-gray-900" />
                  </div>
                  <h3 className="text-base font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Capture Agent */}
        <section className="py-24 bg-gray-900">
          <div className="mx-auto max-w-6xl px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Github className="w-5 h-5 text-white" />
                  <span className="text-emerald-400 font-medium">Open source</span>
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">
                  Deep infrastructure insights with Capture
                </h2>
                <p className="text-lg text-gray-400 mb-6">
                  The{" "}
                  <Link href="https://github.com/bluewave-labs/capture" target="_blank" className="text-white underline underline-offset-4">
                    Capture agent
                  </Link>{" "}
                  runs on your servers to collect{" "}
                  <span className="text-white font-semibold">
                    detailed hardware metrics
                  </span>{" "}
                  via a lightweight RESTful API.
                </p>

                <div className="grid grid-cols-2 gap-3 mb-8">
                  {[
                    { icon: Cpu, label: "CPU & temperature" },
                    { icon: HardDrive, label: "Disk & S.M.A.R.T." },
                    { icon: Server, label: "Memory usage" },
                    { icon: Network, label: "Network throughput" },
                    { icon: Container, label: "Docker containers" },
                    { icon: Activity, label: "Host & uptime" },
                  ].map((metric) => (
                    <div
                      key={metric.label}
                      className="flex items-center gap-3 text-white text-sm"
                    >
                      <metric.icon className="w-4 h-4 text-emerald-400" />
                      <span>{metric.label}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4">
                  <Link
                    href="https://github.com/bluewave-labs/capture"
                    target="_blank"
                    className="inline-flex items-center justify-center h-10 px-6 text-sm font-medium text-white bg-white/10 hover:bg-white/20 transition-colors"
                  >
                    <Github className="mr-2 h-4 w-4" />
                    View Capture on GitHub
                  </Link>
                  <Link
                    href="https://docs.checkmate.so/monitors/infrastructure"
                    className="inline-flex items-center justify-center h-10 px-6 text-sm font-medium text-gray-400 border border-gray-700 hover:border-gray-500 transition-colors"
                  >
                    Documentation
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>

              <div className="bg-gray-800 p-6">
                <div className="font-mono text-sm text-gray-300">
                  <div className="text-emerald-400"># Install via Docker (recommended)</div>
                  <div className="mt-2 text-xs leading-relaxed">
                    docker run -d -p 59232:59232 \<br />
                    &nbsp;&nbsp;-e API_SECRET=your-secret \<br />
                    &nbsp;&nbsp;ghcr.io/bluewave-labs/capture:latest
                  </div>
                  <div className="mt-4 text-emerald-400"># Or install via Go</div>
                  <div className="mt-2 text-xs">
                    go install github.com/bluewave-labs/capture/cmd/capture@latest
                  </div>
                  <div className="mt-4 text-gray-500 text-xs">
                    Pre-built binaries also available on GitHub Releases
                  </div>
                </div>
              </div>
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
              Ready to start monitoring?
            </h2>
            <p className="text-xl text-gray-500 mb-12 max-w-2xl mx-auto">
              Get started in minutes.{" "}
              <span className="text-gray-900 font-semibold">
                Self-host on your own infrastructure
              </span>
              .
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href="https://app.checkmate.so"
                className="inline-flex items-center justify-center h-12 px-8 text-sm font-medium text-white bg-gray-900 hover:bg-black transition-colors"
              >
                Start free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="https://github.com/bluewave-labs/checkmate"
                target="_blank"
                className="inline-flex items-center justify-center h-12 px-8 text-sm font-medium text-gray-700 bg-white border border-gray-200 hover:border-gray-400 transition-colors"
              >
                <Github className="mr-2 h-4 w-4" />
                View on GitHub
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

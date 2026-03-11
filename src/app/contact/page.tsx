import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with the Checkmate team. Join our Discord, open a GitHub discussion, or email us directly.",
};
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  Mail,
  MessageSquare,
  Github,
  FileText,
} from "lucide-react";

const contactOptions = [
  {
    icon: MessageSquare,
    title: "Discord community",
    description: "Join our Discord for real-time support and discussions.",
    link: "https://discord.gg/NAb6H3UTjK",
    linkText: "Join Discord",
  },
  {
    icon: Github,
    title: "GitHub discussions",
    description: "Ask questions and share ideas with the community.",
    link: "https://github.com/bluewave-labs/checkmate/discussions",
    linkText: "Open discussion",
  },
  {
    icon: FileText,
    title: "Documentation",
    description: "Find answers in our comprehensive docs and guides.",
    link: "/docs",
    linkText: "Read docs",
  },
  {
    icon: Github,
    title: "Bug reports",
    description: "Found a bug? Report it on GitHub and help us improve.",
    link: "https://github.com/bluewave-labs/checkmate/issues",
    linkText: "Report issue",
  },
];

export default function ContactPage() {
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
                Get in touch
              </h1>

              <p className="max-w-[600px] text-[20px] text-gray-500 leading-[1.6]">
                Have questions about Checkmate? We&apos;d love to hear from you.
                Choose the best way to reach us below.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Options */}
        <section className="py-12" style={{ borderBottom: "1px solid #f3f4f6" }}>
          <div className="mx-auto max-w-6xl px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200">
              {contactOptions.map((option) => (
                <div key={option.title} className="bg-white p-6">
                  <div className="w-10 h-10 border border-gray-200 flex items-center justify-center mb-4">
                    <option.icon className="w-5 h-5 text-gray-900" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {option.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">{option.description}</p>
                  <Link
                    href={option.link}
                    target="_blank"
                    className="text-sm font-medium text-gray-900 underline underline-offset-4"
                  >
                    {option.linkText}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Email Section */}
        <section className="relative py-20 overflow-hidden">
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
          <div className="relative z-10 mx-auto max-w-3xl px-4 text-center">
            <div className="w-16 h-16 border border-gray-200 flex items-center justify-center mx-auto mb-6">
              <Mail className="w-8 h-8 text-gray-900" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Email us
            </h2>
            <p className="text-gray-500">
              For enterprise inquiries, partnerships, or anything else, reach us at{" "}
              <a
                href="mailto:hello@checkmate.so"
                className="text-gray-900 underline underline-offset-4"
              >
                hello@checkmate.so
              </a>
            </p>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}

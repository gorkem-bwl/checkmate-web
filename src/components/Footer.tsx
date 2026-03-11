import React from "react";
import Link from "next/link";
import { Github, MessageSquare } from "lucide-react";

const footerLinks = {
  product: [
    { name: "Features", href: "/features" },
    { name: "Documentation", href: "/docs" },
    { name: "Changelog", href: "https://github.com/bluewave-labs/checkmate/releases" },
  ],
  company: [
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ],
  resources: [
    { name: "GitHub", href: "https://github.com/bluewave-labs/checkmate" },
    { name: "Discord", href: "https://discord.gg/NAb6H3UTjK" },
  ],
  legal: [
    { name: "Privacy policy", href: "/privacy" },
    { name: "Terms of service", href: "/terms" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-[#FAFAFA] border-t border-gray-200">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center mb-4">
              <span className="text-xl font-bold text-gray-900">Checkmate</span>
            </Link>
            <p className="text-sm text-gray-500 mb-4">
              Open-source infrastructure monitoring for teams who value control and transparency.
            </p>
            <div className="flex gap-4">
              <Link
                href="https://github.com/bluewave-labs/checkmate"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-900 transition-colors"
              >
                <Github className="h-5 w-5" />
              </Link>
              <Link
                href="https://discord.gg/NAb6H3UTjK"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-900 transition-colors"
              >
                <MessageSquare className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} Checkmate. Open source under AGPL-3.0 license.
            </p>
            <p className="text-sm text-gray-500">
              Built with care by{" "}
              <Link
                href="https://bluewavelabs.ca"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-900 underline underline-offset-4"
              >
                Bluewave Labs
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

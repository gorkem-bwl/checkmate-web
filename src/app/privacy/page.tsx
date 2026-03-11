"use client";

import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function PrivacyPage() {
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
          className="relative pt-24 pb-12 overflow-hidden"
          style={{ borderBottom: "1px solid #f3f4f6" }}
        >
          <div className="mx-auto max-w-[800px] px-6">
            <h1 className="text-[48px] font-bold tracking-[-0.04em] leading-[1.1] text-gray-900 mb-4">
              Privacy policy
            </h1>
            <p className="text-gray-500">
              Last updated: January 2025
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16">
          <div className="mx-auto max-w-[800px] px-6">
            <div className="prose prose-gray max-w-none">
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
                  <p className="text-gray-600 leading-relaxed">
                    Checkmate explains how it gathers, handles, and safeguards personal information through two deployment models: our SaaS platform and self-hosted editions. Data handling differs substantially between offerings. We are committed to protecting your privacy based on your chosen deployment method.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Service offerings and data handling</h2>

                  <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">SaaS platform (app.checkmate.so)</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                    <li>Hosted on secure infrastructure</li>
                    <li>Collects: account/organization info, platform usage data, technical data (IP addresses, browser info), and support communications</li>
                    <li>Your monitoring data (uptime metrics, server stats, incidents) is stored securely and accessible only to your team</li>
                  </ul>

                  <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Self-hosted edition</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                    <li>Operates entirely within your own infrastructure</li>
                    <li>Zero data leaves your infrastructure</li>
                    <li>No telemetry, usage analytics, or automatic updates sent to Checkmate</li>
                    <li>Checkmate has no access to your monitoring data or server metrics</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Information collected</h2>

                  <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Website and general business</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                    <li>Contact form submissions</li>
                    <li>Marketing preferences</li>
                    <li>Website analytics</li>
                    <li>Technical website data</li>
                  </ul>

                  <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">SaaS platform specific</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                    <li>Registration and authentication information</li>
                    <li>Billing and payment data (processed by third-party processors)</li>
                    <li>Platform configuration and usage patterns</li>
                    <li>Monitoring data (uptime, server metrics, incidents)</li>
                    <li>Support tickets and customer service interactions</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Data usage</h2>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Information is used to:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                    <li>Provide infrastructure monitoring services</li>
                    <li>Process payments (SaaS only)</li>
                    <li>Deliver customer support</li>
                    <li>Send product updates and marketing communications</li>
                    <li>Improve platform and develop features</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Data security and encryption</h2>
                  <p className="text-gray-600 leading-relaxed">
                    Security measures include: encryption in transit and at rest, multi-tenant data isolation, access controls, authentication mechanisms, and regular security monitoring with incident response procedures.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Cookies and tracking technologies</h2>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    We use the following types of cookies:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                    <li><strong>Functional:</strong> Website operation and authentication</li>
                    <li><strong>Analytics:</strong> Performance analysis and usage patterns</li>
                    <li><strong>Marketing:</strong> Campaign effectiveness and user preference tracking</li>
                  </ul>
                  <p className="text-gray-600 leading-relaxed mt-4">
                    Users can manage preferences through browser settings.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Third-party services and subprocessors</h2>

                  <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">SaaS platform integrations</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                    <li>Stripe for payment processing</li>
                    <li>Analytics services for platform improvement</li>
                    <li>Infrastructure providers</li>
                  </ul>
                  <p className="text-gray-600 leading-relaxed mt-4">
                    Self-hosted deployments use no third-party services for data processing.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Data retention</h2>
                  <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                    <li>Monitoring data: Retained according to your plan (30 days Free, 90 days Pro, 180 days Business, 1 year Enterprise)</li>
                    <li>Account data: Retained for 3 years from account creation or last activity</li>
                    <li>Marketing communications: Until unsubscribe or removal request</li>
                    <li>Contact submissions: Up to 3 years for business communication</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Your rights and data control</h2>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    You have the right to:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                    <li>Access your organization account and usage data</li>
                    <li>Correct inaccurate information</li>
                    <li>Request account and data deletion</li>
                    <li>Object to marketing communications</li>
                    <li>Request data export for migration</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Legal basis for processing and compliance</h2>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Processing grounds:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                    <li><strong>Contract performance:</strong> Service delivery</li>
                    <li><strong>Legitimate interest:</strong> Platform improvement, security, business communications</li>
                    <li><strong>Consent:</strong> Marketing and non-essential cookies</li>
                  </ul>
                  <p className="text-gray-600 leading-relaxed mt-4">
                    We comply with GDPR (European customers) and CCPA (California customers).
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Data breach notification</h2>
                  <p className="text-gray-600 leading-relaxed">
                    In security incidents: assessment within 24 hours, customer notification within 72 hours for high-risk breaches, and authority notification as required by law.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Policy changes</h2>
                  <p className="text-gray-600 leading-relaxed">
                    Material changes will trigger: date updates, email notification to active customers, and website posting.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Contact information</h2>
                  <p className="text-gray-600 leading-relaxed">
                    <strong>Bluewave Labs</strong><br />
                    Email:{" "}
                    <a href="mailto:hello@checkmate.so" className="text-gray-900 underline underline-offset-4">
                      hello@checkmate.so
                    </a>
                  </p>
                  <p className="text-gray-600 leading-relaxed mt-4">
                    You can also reach us through our{" "}
                    <Link href="/contact" className="text-gray-900 underline underline-offset-4">
                      contact page
                    </Link>
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}

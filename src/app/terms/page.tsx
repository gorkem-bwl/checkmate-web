import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of service",
  description:
    "Terms of service for Checkmate, an open-source infrastructure monitoring platform.",
};
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function TermsPage() {
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
              Terms of service
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
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of terms</h2>
                  <p className="text-gray-600 leading-relaxed">
                    By accessing or using Checkmate&apos;s open source software or services, you agree to be bound by these Terms of Service. If you disagree with any provision, you may not use the software or services.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Description of service</h2>
                  <p className="text-gray-600 leading-relaxed">
                    Bluewave Labs distributes Checkmate as open source software and related services. Checkmate is an infrastructure monitoring platform that provides uptime monitoring, server monitoring, Docker monitoring, and related services through self-hosted deployment.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Open source licensing</h2>
                  <p className="text-gray-600 leading-relaxed">
                    Checkmate software operates under the GNU Affero General Public License v3.0 (AGPL-3.0). Users must follow applicable license requirements during use. You are free to use, modify, and distribute the software in accordance with that license. If you modify Checkmate and offer it as a service, you must make your modifications available under the same license. The Checkmate name and branding remain trademarks of Bluewave Labs.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">4. User responsibilities</h2>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Prohibited activities include:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                    <li>Using software for unlawful purposes</li>
                    <li>Monitoring systems without proper authorization</li>
                    <li>Attempting unauthorized system access</li>
                    <li>Transmitting malicious code or viruses</li>
                    <li>Violating intellectual property rights</li>
                    <li>Abusing or overloading the service infrastructure</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Account registration</h2>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    To use certain features of our service, you must register for an account. You agree to:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                    <li>Provide accurate, current, and complete information</li>
                    <li>Maintain and update your information to keep it accurate</li>
                    <li>Maintain the security of your account credentials</li>
                    <li>Accept responsibility for all activities under your account</li>
                    <li>Notify us immediately of any unauthorized access</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Disclaimer of warranties</h2>
                  <p className="text-gray-600 leading-relaxed">
                    Services are provided without warranties or guarantees. There is no assurance of error-free or continuous operation. The service is provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind, either express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, and non-infringement.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Limitation of liability</h2>
                  <p className="text-gray-600 leading-relaxed">
                    Bluewave Labs disclaims responsibility for indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or business opportunities, arising from your use of the service. Our total liability shall not exceed the amount you paid us in the 12 months preceding the claim.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Data ownership</h2>
                  <p className="text-gray-600 leading-relaxed">
                    You retain all rights to your data. We do not claim ownership of your monitoring data, configurations, or any content you create using our service. You grant us a limited license to process your data solely to provide the service.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Termination</h2>
                  <p className="text-gray-600 leading-relaxed">
                    We may terminate or suspend your account immediately, without prior notice, for conduct that we believe violates these terms or is harmful to other users, us, or third parties. Upon termination, your right to use the service will cease immediately. You may export your data before termination.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Modifications to terms</h2>
                  <p className="text-gray-600 leading-relaxed">
                    We reserve the authority to change these terms. Continued platform use indicates acceptance of revisions. We will provide notice of significant changes by posting on our website or sending you an email.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Governing law</h2>
                  <p className="text-gray-600 leading-relaxed">
                    These terms fall under Ontario, Canada jurisdiction. These terms shall be governed by and construed in accordance with the laws of the Province of Ontario, Canada, without regard to its conflict of law provisions.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Contact information</h2>
                  <p className="text-gray-600 leading-relaxed">
                    Questions about these terms? Contact us at{" "}
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

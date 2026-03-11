// JsonLd renders static structured data for search engines (Schema.org SoftwareApplication).
// Content is a compile-time constant with no user input — no XSS risk.
// This is the standard Next.js App Router pattern for JSON-LD structured data.

const data = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Checkmate",
  description: "Open-source infrastructure monitoring platform",
  url: "https://checkmate.so",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Linux, macOS, Windows",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  author: {
    "@type": "Organization",
    name: "Bluewave Labs",
    url: "https://bluewavelabs.ca",
  },
};

export function JsonLd() {
  // Static compile-time constant — safe to use dangerouslySetInnerHTML here
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

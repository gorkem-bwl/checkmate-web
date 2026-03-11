/**
 * Converts Checkmate's JS-based documentation to MDX files for Fumadocs.
 * Run: node scripts/convert-docs.mjs
 */

import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";
import vm from "vm";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CHECKMATE_DOCS = path.resolve(__dirname, "../../Checkmate/docs/user-guide");
const OUTPUT_DIR = path.resolve(__dirname, "../content/docs");

/**
 * Load a JS file with `export` syntax by transforming it to CJS-compatible code
 */
async function loadJsModule(filePath) {
  let code = await fs.readFile(filePath, "utf-8");

  // Create a module-like context
  const exports = {};
  const module = { exports };

  // Transform export statements to assignments
  code = code.replace(/export\s+const\s+(\w+)\s*=/g, "const $1 = module.exports.$1 =");
  code = code.replace(/export\s+default\s+/g, "module.exports.default = ");
  code = code.replace(/export\s*\{([^}]+)\}/g, (_, names) => {
    return names.split(",").map((n) => {
      const name = n.trim();
      return `module.exports.${name} = ${name};`;
    }).join("\n");
  });

  const script = new vm.Script(code, { filename: filePath });
  const context = vm.createContext({
    module,
    exports,
    console,
    require: createRequire(filePath),
  });
  script.runInContext(context);

  return module.exports;
}

// Load source files
const configModule = await loadJsModule(path.join(CHECKMATE_DOCS, "userGuideConfig.js"));
const contentModule = await loadJsModule(path.join(CHECKMATE_DOCS, "index.js"));

const collections = configModule.collections;
const articleContents = contentModule.articleContents || contentModule.default || contentModule;

if (!collections || !articleContents) {
  console.error("Failed to load collections or articleContents");
  console.log("Config keys:", Object.keys(configModule));
  console.log("Content keys:", Object.keys(contentModule).slice(0, 10));
  process.exit(1);
}

// Callout variant mapping
const calloutVariantMap = {
  info: "info",
  tip: "info",
  warning: "warn",
  success: "info",
};

/**
 * Process inline text: convert [[text]](path) links to standard markdown
 */
function processInlineText(text) {
  if (!text) return "";
  return text.replace(/\[\[([^\]]+)\]\]\(([^)]+)\)/g, (_, linkText, linkPath) => {
    return `[${linkText}](/docs/${linkPath})`;
  });
}

/**
 * Convert a single content block to MDX string
 */
function convertBlock(block) {
  switch (block.type) {
    case "heading": {
      const prefix = block.level === 2 ? "##" : "###";
      return `${prefix} ${block.text}`;
    }

    case "paragraph":
      return processInlineText(block.text);

    case "bullet-list":
      return block.items
        .map((item) => {
          if (item.bold) return `- **${item.bold}**: ${processInlineText(item.text)}`;
          return `- ${processInlineText(item.text || String(item))}`;
        })
        .join("\n");

    case "ordered-list":
      return block.items
        .map((item, i) => `${i + 1}. ${processInlineText(item.text || String(item))}`)
        .join("\n");

    case "checklist":
      return block.items
        .map((item) => `- [ ] ${processInlineText(item.text || String(item))}`)
        .join("\n");

    case "callout": {
      const type = calloutVariantMap[block.variant] || "info";
      const titleAttr = block.title ? ` title="${block.title}"` : "";
      return `<Callout type="${type}"${titleAttr}>\n${processInlineText(block.text)}\n</Callout>`;
    }

    case "code": {
      const lang = block.language || "";
      const content = block.text || block.code || "";
      return `\`\`\`${lang}\n${content}\n\`\`\``;
    }

    case "table": {
      if (!block.columns || !block.rows) return "";
      const headers = block.columns.map((col) => col.label || col.key);
      const keys = block.columns.map((col) => col.key);
      const headerRow = `| ${headers.join(" | ")} |`;
      const separator = `| ${headers.map(() => "---").join(" | ")} |`;
      const dataRows = block.rows
        .map((row) => `| ${keys.map((key) => processInlineText(String(row[key] || ""))).join(" | ")} |`)
        .join("\n");
      return `${headerRow}\n${separator}\n${dataRows}`;
    }

    case "icon-cards": {
      const cards = block.items
        .map((item) => `<Card title="${item.title}">\n${item.description}\n</Card>`)
        .join("\n\n");
      return `<Cards>\n\n${cards}\n\n</Cards>`;
    }

    case "grid-cards": {
      const cards = (block.items || [])
        .map((item) => `<Card title="${item.title}">\n${item.description || item.text || ""}\n</Card>`)
        .join("\n\n");
      return `<Cards>\n\n${cards}\n\n</Cards>`;
    }

    case "article-links": {
      let output = "";
      if (block.title) output += `## ${block.title}\n\n`;
      const cards = block.items
        .map((item) => {
          const href = `/docs/${item.collectionId}/${item.articleId}`;
          return `<Card href="${href}" title="${item.title}">\n${item.description || ""}\n</Card>`;
        })
        .join("\n\n");
      output += `<Cards>\n\n${cards}\n\n</Cards>`;
      return output;
    }

    case "image": {
      const alt = block.alt || block.caption || "Screenshot";
      const src = block.src || "";
      let output = `![${alt}](${src})`;
      if (block.caption) output += `\n*${block.caption}*`;
      return output;
    }

    case "time-estimate":
      return `<Callout type="info">\nEstimated time: ${block.time || block.text || "a few minutes"}\n</Callout>`;

    case "info-box": {
      const titleAttr = block.title ? ` title="${block.title}"` : "";
      return `<Callout type="info"${titleAttr}>\n${processInlineText(block.text || "")}\n</Callout>`;
    }

    case "requirements":
      return `### Requirements\n\n${(block.items || []).map((item) => `- ${processInlineText(item.text || String(item))}`).join("\n")}`;

    default:
      console.warn(`  Unknown block type: ${block.type}`);
      return `<!-- Unknown block type: ${block.type} -->`;
  }
}

function generateFrontmatter(title, description) {
  const safeTitle = title.replace(/"/g, '\\"');
  const safeDesc = description.replace(/"/g, '\\"');
  return `---\ntitle: "${safeTitle}"\ndescription: "${safeDesc}"\n---`;
}

async function main() {
  console.log("Converting Checkmate docs to MDX...\n");

  // Clean output directory
  await fs.rm(OUTPUT_DIR, { recursive: true, force: true });
  await fs.mkdir(OUTPUT_DIR, { recursive: true });

  // Root meta.json
  await fs.writeFile(
    path.join(OUTPUT_DIR, "meta.json"),
    JSON.stringify({ title: "Documentation", pages: collections.map((c) => c.id) }, null, 2)
  );

  // Index page
  const indexContent = `${generateFrontmatter("Checkmate documentation", "Open-source infrastructure monitoring platform documentation.")}

Welcome to the Checkmate documentation. Choose a topic from the sidebar to get started.

## Getting started

<Cards>

<Card href="/docs/getting-started/what-is-checkmate" title="What is Checkmate">
Overview of monitoring capabilities and core features.
</Card>

<Card href="/docs/getting-started/quick-start" title="Quick start guide">
Create your first monitor in 5 minutes.
</Card>

</Cards>

## Popular topics

<Cards>

<Card href="/docs/uptime-monitoring/http-monitors" title="HTTP monitors">
Monitor websites and APIs with response validation.
</Card>

<Card href="/docs/infrastructure/installing-capture" title="Infrastructure monitoring">
Install the Capture agent for hardware metrics.
</Card>

<Card href="/docs/notifications/email-notifications" title="Email notifications">
Configure SMTP for email alerts.
</Card>

<Card href="/docs/status-pages/creating-status-page" title="Status pages">
Create public-facing uptime dashboards.
</Card>

</Cards>
`;
  await fs.writeFile(path.join(OUTPUT_DIR, "index.mdx"), indexContent);

  let totalArticles = 0;

  for (const collection of collections) {
    const collectionDir = path.join(OUTPUT_DIR, collection.id);
    await fs.mkdir(collectionDir, { recursive: true });

    // Collection meta.json
    await fs.writeFile(
      path.join(collectionDir, "meta.json"),
      JSON.stringify(
        { title: collection.title, pages: collection.articles.map((a) => a.id) },
        null,
        2
      )
    );

    for (const article of collection.articles) {
      const key = `${collection.id}/${article.id}`;
      const content = articleContents[key];

      if (!content || !content.blocks) {
        console.warn(`  Missing content for: ${key}`);
        await fs.writeFile(
          path.join(collectionDir, `${article.id}.mdx`),
          `${generateFrontmatter(article.title, article.description)}\n\nContent coming soon.\n`
        );
        continue;
      }

      const frontmatter = generateFrontmatter(article.title, article.description);
      const mdxBody = content.blocks.map(convertBlock).join("\n\n");
      await fs.writeFile(
        path.join(collectionDir, `${article.id}.mdx`),
        `${frontmatter}\n\n${mdxBody}\n`
      );

      totalArticles++;
      console.log(`  Converted: ${key}`);
    }

    console.log(`Collection: ${collection.title} (${collection.articles.length} articles)\n`);
  }

  console.log(`Done! Converted ${totalArticles} articles to ${OUTPUT_DIR}`);
}

main().catch(console.error);

import { readFile, mkdir, writeFile } from "node:fs/promises";
import { parse } from "node:path";
import type { ComponentDocApi, ComponentDocs } from "../plugin";

/** Max description length in summary */
const SUMMARY_DESC_MAX = 150;

/**  */
const SECTION_HEADER = "## Svelte Components";

export interface WriteLlmsTxtOptions {
  /** Output path for the summary */
  outFile: string;
  /** Output path for the full API documentation */
  outFileFull: string;
  /**
   * Whether to append to existing files instead of overwriting.
   * Adds a separator before the component section.
   */
  append?: boolean;
}

export interface LlmsTxtResult {
  /** summary index */
  summary: string;
  /** complete API */
  full: string;
}

/**
 * Write llms.txt and llms-full.txt files from component documentation.
 *
 * When `append` is true, reads existing files and appends after a separator,
 * replacing any previous "Svelte Components" section.
 */
export default async function writeLlmsTxt(
  components: ComponentDocs,
  options: WriteLlmsTxtOptions,
): Promise<LlmsTxtResult> {
  const sorted = sortComponents(components);
  const result: LlmsTxtResult = {
    summary: renderSummary(sorted),
    full: renderFull(sorted),
  };

  await Promise.all([
    writeOutput(options.outFile, result.summary, options.append),
    writeOutput(options.outFileFull, result.full, options.append),
  ]);

  console.log(
    `created "${options.outFile}" and "${options.outFileFull}" (${sorted.length} components).\n`,
  );

  return result;
}

function renderSummary(components: ComponentDocApi[]): string {
  const lines: string[] = [`${SECTION_HEADER}\n`];

  for (const comp of components) {
    const desc = truncate(parseDescription(comp.componentComment, comp.moduleName));

    let line = `- \`${comp.moduleName}\``;
    const meta: string[] = [];
    if (comp.props.length) meta.push(`${comp.props.length} prop${comp.props.length > 1 ? "s" : ""}`);
    if (comp.slots.length) meta.push(`${comp.slots.length} slot${comp.slots.length > 1 ? "s" : ""}`);
    if (comp.rest_props) meta.push(`rest → \`<${comp.rest_props.name}>\``);
    if (meta.length) line += ` (${meta.join(", ")})`;
    if (desc) line += `: ${desc}`;
    lines.push(line);
  }

  return lines.join("\n") + "\n";
}

function renderFull(components: ComponentDocApi[]): string {
  const lines: string[] = [`${SECTION_HEADER}\n`];

  for (const comp of components) {
    const desc = parseDescription(comp.componentComment, comp.moduleName);

    lines.push(`### ${comp.moduleName}\n`);
    lines.push(`Source: \`${comp.filePath}\`\n`);
    if (desc) lines.push(`${desc}\n`);

    if (comp.props.length) {
      lines.push("**Props:**\n");
      for (const prop of comp.props) {
        lines.push(formatProp(prop));
      }
      lines.push("");
    }

    if (comp.rest_props) {
      lines.push(`Accepts additional attributes from \`<${comp.rest_props.name}>\`.\n`);
    }

    if (comp.slots.length) {
      lines.push("**Slots:**\n");
      for (const slot of comp.slots) {
        lines.push(formatSlot(slot));
      }
      lines.push("");
    }

    if (comp.events.length) {
      lines.push("**Events:**\n");
      for (const evt of comp.events) {
        const detail = evt.detail ? ` \`${evt.detail}\`` : "";
        const evtDesc = evt.description ? ` — ${evt.description}` : "";
        lines.push(`- \`${evt.name}\`${detail}${evtDesc}`);
      }
      lines.push("");
    }

    if (comp.moduleExports.length) {
      lines.push("**Module exports:**\n");
      for (const exp of comp.moduleExports) {
        const parts = [`- \`${exp.name}\``];
        if (exp.type) parts.push(`\`${exp.type}\``);
        if (exp.isFunction) parts.push("*(function)*");
        lines.push(parts.join(" "));
      }
      lines.push("");
    }

    lines.push("---\n");
  }

  return lines.join("\n");
}

function sortComponents(components: ComponentDocs): ComponentDocApi[] {
  return Array.from(components.values()).sort((a, b) =>
    a.moduleName.localeCompare(b.moduleName),
  );
}

/**
 * Extract a clean description from a component comment block.
 *
 * Strips JSDoc-style tags (@prop, @slot, @example, @cssprop, etc.)
 * and removes a leading module name if sveld duplicates it.
 */
function parseDescription(raw: string | undefined, moduleName: string): string {
  if (!raw) return "";

  const lines = raw.split("\n").map((l) => l.replace(/^\t+/, "").trim());
  const description: string[] = [];

  for (const line of lines) {
    if (line.startsWith("@")) break; // stop at first tag
    if (line) description.push(line);
  }

  let desc = description.join(" ").replace(/\s+/g, " ").trim();

  // Remove leading component name if sveld repeats it
  if (moduleName && desc.startsWith(moduleName)) {
    desc = desc.slice(moduleName.length).replace(/^\s*-?\s*/, "").trim();
    if (desc) desc = desc[0].toUpperCase() + desc.slice(1);
  }

  return desc;
}

function formatProp(prop: ComponentDocApi["props"][number]): string {
  const opt = prop.isRequired ? "" : " (optional)";
  const type = prop.type ? `: ${prop.type}` : "";
  const def = prop.value !== undefined ? ` — default: \`${prop.value}\`` : "";
  const desc = prop.description ? ` — ${prop.description}` : "";
  return `- \`${prop.name}${type}\`${opt}${def}${desc}`;
}

function formatSlot(slot: ComponentDocApi["slots"][number]): string {
  const name = slot.default ? "(default)" : `\`${slot.name}\``;
  const props =
    slot.slot_props && slot.slot_props !== "Record<string, never>"
      ? ` — props: \`${slot.slot_props}\``
      : "";
  return `- ${name}${props}`;
}

function truncate(desc: string): string {
  if (!desc || desc.length <= SUMMARY_DESC_MAX) return desc;
  const firstSentence = desc.match(/^[^.!?]+[.!?]/)?.[0];
  if (firstSentence && firstSentence.length <= SUMMARY_DESC_MAX) {
    return firstSentence;
  }
  return desc.slice(0, SUMMARY_DESC_MAX - 3) + "...";
}

async function readExisting(filePath: string): Promise<string | null> {
  try {
    return await readFile(filePath, "utf-8");
  } catch {
    return null;
  }
}

async function writeOutput(
  filePath: string,
  content: string,
  append?: boolean,
): Promise<void> {
  await mkdir(parse(filePath).dir, { recursive: true });

  if (!append) {
    await writeFile(filePath, content);
    return;
  }

  const existing = await readExisting(filePath);

  if (!existing) {
    await writeFile(filePath, content);
    return;
  }

  // Replace previous component section if present, otherwise append
  if (existing.includes(SECTION_HEADER)) {
    const idx = existing.indexOf(SECTION_HEADER);
    await writeFile(filePath, existing.slice(0, idx).trimEnd() + "\n\n---\n\n" + content);
  } else {
    await writeFile(filePath, existing.trimEnd() + "\n\n---\n\n" + content);
  }
}

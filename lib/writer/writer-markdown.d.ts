import type { ComponentDocs } from "../plugin";
import WriterMarkdown, { type AppendType } from "./WriterMarkdown";
export interface WriteMarkdownOptions {
    write?: boolean;
    outFile: string;
    onAppend?: (type: AppendType, document: WriterMarkdown, components: ComponentDocs) => void;
}
/**
 * Writes component documentation to a markdown file.
 *
 * Renders all components to markdown format and optionally writes
 * the result to a file. Returns the markdown string regardless of
 * whether it was written to disk.
 *
 * @param components - Map of component documentation to render
 * @param options - Write options including output file and callbacks
 * @returns A promise that resolves to the generated markdown string
 *
 * @example
 * ```ts
 * const markdown = await writeMarkdown(components, {
 *   outFile: "COMPONENTS.md",
 *   write: true,
 *   onAppend: (type, doc) => {
 *     console.log(`Appended ${type}`);
 *   }
 * });
 * ```
 */
export default function writeMarkdown(components: ComponentDocs, options: WriteMarkdownOptions): Promise<string>;

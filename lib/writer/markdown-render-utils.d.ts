import type { ComponentDocs } from "../plugin";
import type { AppendType } from "./MarkdownWriterBase";
/**
 * Interface for markdown documents that can be used for rendering.
 * Only requires the methods we actually use, not the full implementation.
 */
interface MarkdownDocument {
    append(type: AppendType, raw?: string): MarkdownDocument;
    tableOfContents(): MarkdownDocument;
}
/**
 * Renders component documentation to a markdown document.
 * This shared function is used by both writeMarkdown and writeMarkdownCore.
 */
export declare function renderComponentsToMarkdown(document: MarkdownDocument, components: ComponentDocs): void;
export {};

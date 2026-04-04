import type { ComponentDocs } from "../plugin";
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
export default function writeLlmsTxt(components: ComponentDocs, options: WriteLlmsTxtOptions): Promise<LlmsTxtResult>;

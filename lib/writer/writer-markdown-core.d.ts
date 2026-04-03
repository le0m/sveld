import type { ComponentDocs } from "../plugin";
import { type AppendType, MarkdownWriterBaseImpl } from "./MarkdownWriterBase";
export type { AppendType };
type OnAppend = (type: AppendType, document: BrowserWriterMarkdown) => void;
interface MarkdownOptions {
    onAppend?: OnAppend;
}
/**
 * Browser-compatible WriterMarkdown that doesn't extend Writer.
 *
 * This class is designed for browser environments where file system operations
 * are not available. It extends MarkdownWriterBaseImpl directly instead of
 * Writer to avoid Node.js dependencies.
 *
 * @example
 * ```ts
 * const writer = new BrowserWriterMarkdown({
 *   onAppend: (type, doc) => {
 *     console.log(`Appended ${type} to document`);
 *   }
 * });
 * ```
 */
export declare class BrowserWriterMarkdown extends MarkdownWriterBaseImpl {
    onAppend?: OnAppend;
    constructor(options: MarkdownOptions);
    append(type: AppendType, raw?: string): this;
}
export interface WriteMarkdownCoreOptions {
    onAppend?: (type: AppendType, document: BrowserWriterMarkdown, components: ComponentDocs) => void;
}
export declare function writeMarkdownCore(components: ComponentDocs, options?: WriteMarkdownCoreOptions): string;

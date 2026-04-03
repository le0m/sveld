import { type AppendType } from "./MarkdownWriterBase";
import Writer from "./Writer";
type OnAppend = (type: AppendType, document: WriterMarkdown) => void;
interface MarkdownOptions {
    onAppend?: OnAppend;
}
export type { AppendType };
/**
 * Markdown writer that extends Writer for file operations.
 *
 * Combines file writing capabilities from Writer with markdown
 * generation capabilities from MarkdownWriterBaseImpl. Supports
 * callbacks for monitoring document construction.
 *
 * @example
 * ```ts
 * const writer = new WriterMarkdown({
 *   onAppend: (type, doc) => {
 *     console.log(`Appended ${type} to markdown`);
 *   }
 * });
 * writer.append("h1", "Title");
 * await writer.write("./docs.md", writer.end());
 * ```
 */
export default class WriterMarkdown extends Writer {
    onAppend?: OnAppend;
    private markdownBase;
    /**
     * Creates a new WriterMarkdown instance.
     *
     * @param options - Markdown writer options including append callback
     */
    constructor(options: MarkdownOptions);
    get source(): string;
    get hasToC(): boolean;
    get toc(): import("./MarkdownWriterBase").TocLine[];
    appendLineBreaks(): this;
    append(type: AppendType, raw?: string): this;
    tableOfContents(): this;
    end(): string;
}

export type AppendType = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "quote" | "p" | "divider" | "raw";
export interface TocLine {
    array: number[];
    raw: string;
}
export interface MarkdownWriterBase {
    sourceParts: string[];
    hasToC: boolean;
    toc: TocLine[];
    appendLineBreaks(): this;
    append(type: AppendType, raw?: string): this;
    tableOfContents(): this;
    end(): string;
    get source(): string;
}
/**
 * Base class containing shared markdown writing logic.
 * This can be extended or used via composition.
 */
export declare class MarkdownWriterBaseImpl implements MarkdownWriterBase {
    sourceParts: string[];
    hasToC: boolean;
    toc: TocLine[];
    get source(): string;
    appendLineBreaks(): this;
    append(type: AppendType, raw?: string): this;
    tableOfContents(): this;
    end(): string;
}

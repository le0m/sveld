import { type ParsedComponent } from "./ComponentParser";
import { type ParsedExports } from "./parse-exports";
import { type WriteJsonOptions } from "./writer/writer-json";
import { type WriteLlmsTxtOptions } from "./writer/writer-llms-txt";
import { type WriteMarkdownOptions } from "./writer/writer-markdown";
import { type WriteTsDefinitionsOptions } from "./writer/writer-ts-definitions";
export interface PluginSveldOptions {
    /**
     * Specify the entry point to uncompiled Svelte source.
     * If not provided, sveld will use the "svelte" field from package.json.
     */
    entry?: string;
    glob?: boolean;
    types?: boolean;
    typesOptions?: Partial<Omit<WriteTsDefinitionsOptions, "inputDir">>;
    json?: boolean;
    jsonOptions?: Partial<Omit<WriteJsonOptions, "inputDir">>;
    markdown?: boolean;
    markdownOptions?: Partial<WriteMarkdownOptions>;
    llmsTxt?: boolean;
    llmsTxtOptions?: Partial<WriteLlmsTxtOptions>;
}
type ComponentModuleName = string;
export interface ComponentDocApi extends ParsedComponent {
    filePath: string;
    moduleName: string;
}
export type ComponentDocs = Map<ComponentModuleName, ComponentDocApi>;
interface SveldPlugin {
    name: string;
    apply?: "build" | "serve";
    enforce?: "pre" | "post";
    buildStart(): void;
    generateBundle(): Promise<void>;
    writeBundle(): void;
}
export default function pluginSveld(opts?: PluginSveldOptions): SveldPlugin;
interface GenerateBundleResult {
    exports: ParsedExports;
    components: ComponentDocs;
    allComponentsForTypes: ComponentDocs;
}
/**
 * Generates component documentation bundle from Svelte source files.
 *
 * Parses exports, discovers components (optionally via glob), and processes
 * all Svelte files to extract component metadata. Returns both exported
 * components (for JSON/Markdown) and all components (for TypeScript definitions).
 *
 * @param input - Entry point file or directory containing Svelte components
 * @param glob - Whether to glob for all .svelte files in the directory
 * @returns Bundle result containing exports, components, and allComponentsForTypes
 *
 * @example
 * ```ts
 * // Generate from single file:
 * const result = await generateBundle("./src/App.svelte", false);
 *
 * // Generate from directory with glob:
 * const result = await generateBundle("./src", true);
 * ```
 */
export declare function generateBundle(input: string, glob: boolean): Promise<{
    exports: ParsedExports;
    components: ComponentDocs;
    allComponentsForTypes: ComponentDocs;
}>;
/**
 * Writes output files based on plugin options.
 *
 * Generates TypeScript definitions, JSON metadata, and/or Markdown documentation
 * based on the options provided. Uses different component sets for different
 * output types to match expected behavior.
 *
 * @param result - Bundle result containing exports and component documentation
 * @param opts - Plugin options determining what outputs to generate
 * @param input - Input file path for determining input directory
 *
 * @example
 * ```ts
 * writeOutput(result, {
 *   types: true,
 *   json: true,
 *   markdown: true
 * }, "./src/App.svelte");
 * // Generates: types/*.d.ts, COMPONENT_API.json, COMPONENT_INDEX.md
 * ```
 */
export declare function writeOutput(result: GenerateBundleResult, opts: PluginSveldOptions, input: string): void;
export {};

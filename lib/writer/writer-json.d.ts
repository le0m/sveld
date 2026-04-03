import type { ComponentDocs } from "../plugin";
export interface WriteJsonOptions {
    input: string;
    inputDir: string;
    outFile: string;
    outDir?: string;
}
/**
 * Writes component documentation to JSON format.
 *
 * Can write either:
 * - Individual JSON files per component (when `outDir` is specified)
 * - A single combined JSON file (when only `outFile` is specified)
 *
 * @param components - Map of component documentation to write
 * @param options - Write options including output directory or file
 * @returns A promise that resolves when all files have been written
 *
 * @example
 * ```ts
 * // Write individual files:
 * await writeJson(components, {
 *   inputDir: "./src",
 *   outDir: "./dist"
 * });
 *
 * // Write single file:
 * await writeJson(components, {
 *   inputDir: "./src",
 *   outFile: "components.api.json"
 * });
 * ```
 */
export default function writeJson(components: ComponentDocs, options: WriteJsonOptions): Promise<void>;

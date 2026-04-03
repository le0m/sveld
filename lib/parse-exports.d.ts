export type ParsedExports = Record<string, {
    source: string;
    default: boolean;
    mixed?: boolean;
}>;
/**
 * Parses export statements from JavaScript/TypeScript source code.
 *
 * Extracts all exports (default, named, and re-exports) and resolves
 * their source paths, handling path aliases and directory imports.
 * Caches parsed ASTs for performance.
 *
 * @param source - The source code to parse
 * @param dir - The directory context for resolving relative paths and aliases
 * @param ts - Whether the code is in TypeScript
 * @returns A map of export names to their source paths and metadata
 *
 * @example
 * ```ts
 * // Source: export { Button } from "./Button.svelte";
 * //        export default App from "./App.svelte";
 * parseExports(source, "./src")
 * // Returns: {
 * //   Button: { source: "./Button.svelte", default: false },
 * //   App: { source: "./App.svelte", default: true }
 * // }
 * ```
 */
export declare function parseExports(source: string, dir: string, ts: boolean): ParsedExports;

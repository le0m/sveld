import type { ParsedExports } from "./parse-exports";
/**
 * Creates export statements from parsed export information.
 *
 * Groups exports by source file and generates optimized export statements.
 * Handles special cases like Svelte component exports, default exports,
 * and mixed exports from module context.
 *
 * @param parsed_exports - Map of export names to their source and metadata
 * @returns A string containing all export statements
 *
 * @example
 * ```ts
 * // Input:
 * { Button: { source: "./Button.svelte", default: true } }
 *
 * // Output:
 * // export { default as Button } from "./Button.svelte";
 * ```
 */
export declare function createExports(parsed_exports: ParsedExports): string;
/**
 * Removes the `.svelte` extension from a file path.
 *
 * @param filePath - The file path to process
 * @returns The path without the .svelte extension
 *
 * @example
 * ```ts
 * removeSvelteExt("./Button.svelte") // Returns: "./Button"
 * ```
 */
export declare function removeSvelteExt(filePath: string): string;
/**
 * Converts a `.svelte` file path to a `.svelte.d.ts` TypeScript definition path.
 *
 * @param filePath - The Svelte file path to convert
 * @returns The path with .svelte.d.ts extension
 *
 * @example
 * ```ts
 * convertSvelteExt("./Button.svelte") // Returns: "./Button.svelte.d.ts"
 * ```
 */
export declare function convertSvelteExt(filePath: string): string;

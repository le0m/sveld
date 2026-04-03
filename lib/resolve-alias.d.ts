/**
 * Clears the TypeScript/JavaScript config cache.
 *
 * Useful for testing or when config files are modified during runtime.
 * Forces re-reading of config files on next resolution.
 */
export declare function clearConfigCache(): void;
/**
 * Resolves a path alias to an absolute file system path for reading files.
 *
 * Uses TypeScript/JavaScript config path mappings to resolve aliases like
 * `$lib/components` to actual file system paths. Handles wildcard patterns
 * and baseUrl resolution.
 *
 * @param importPath - The import path that may contain an alias
 * @param fromDir - The directory to resolve relative to (for finding config)
 * @returns The absolute resolved path, or original path if resolution fails
 *
 * @example
 * ```ts
 * // With tsconfig.json: { "paths": { "$lib/*": ["./src/lib/*"] } }
 * resolvePathAliasAbsolute("$lib/utils", "./src")
 * // Returns: "/absolute/path/to/src/lib/utils"
 *
 * resolvePathAliasAbsolute("./relative", "./src")
 * // Returns: "./relative" (unchanged, not an alias)
 * ```
 */
export declare function resolvePathAliasAbsolute(importPath: string, fromDir: string): string;
/**
 * Resolves a path alias and converts it to a relative path from fromDir.
 *
 * This is used for storing paths in the exports object for output generation.
 * Unlike `resolvePathAliasAbsolute`, this returns a relative path suitable
 * for use in generated export statements.
 *
 * @param importPath - The import path that may contain an alias
 * @param fromDir - The directory to resolve relative to
 * @returns A relative path (prefixed with ./ if needed), or original path if resolution fails
 *
 * @example
 * ```ts
 * // With alias "$lib/utils" -> "./src/lib/utils"
 * resolvePathAlias("$lib/utils", "./src")
 * // Returns: "./lib/utils"
 *
 * resolvePathAlias("./Button.svelte", "./src")
 * // Returns: "./Button.svelte" (unchanged, not an alias)
 * ```
 */
export declare function resolvePathAlias(importPath: string, fromDir: string): string;

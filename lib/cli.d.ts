/**
 * Command-line interface for sveld.
 *
 * Parses command-line arguments, runs Rollup to process the entry point,
 * generates component documentation, and writes output files.
 *
 * @param process - Node.js process object containing command-line arguments
 *
 * @example
 * ```ts
 * // Called from CLI: sveld --types --json --glob
 * // Parses: { types: true, json: true, glob: true }
 * ```
 */
export declare function cli(process: NodeJS.Process): Promise<void>;

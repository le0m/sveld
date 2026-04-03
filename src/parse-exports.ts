import { existsSync, lstatSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join, resolve, extname } from "node:path";
import { type Node, Parser } from "acorn";
import { normalizeSeparators } from "./path";
import { resolvePathAlias, resolvePathAliasAbsolute } from "./resolve-alias";
import { tsPlugin } from "@sveltejs/acorn-typescript";

interface NodeImportDeclaration extends Node {
  type: "ImportDeclaration";
  specifiers: { local: { name: string } }[];
  source: null | { value: string };
}

interface NodeExportNamedDeclaration extends Node, Pick<NodeImportDeclaration, "source"> {
  type: "ExportNamedDeclaration";
  specifiers: { local: { name: string }; exported: { name: string } }[];
}

interface NodeExportDefaultDeclaration extends Node {
  type: "ExportDefaultDeclaration";
  declaration: { name: string };
}

interface NodeExportAllDeclaration extends Node, Pick<NodeImportDeclaration, "source"> {
  type: "ExportAllDeclaration";
}

type BodyNode =
  | NodeImportDeclaration
  | NodeExportNamedDeclaration
  | NodeExportDefaultDeclaration
  | NodeExportAllDeclaration;

export type ParsedExports = Record<string, { source: string; default: boolean; mixed?: boolean }>;

interface ProgramNode extends Node {
  type: "Program";
  body: BodyNode[];
}

const astCache = new Map<string, ProgramNode>();

const fileExtensionSubstitution = new Map<string, string[]>([
    [".js", [".ts", ".tsx", ".d.ts", ".js", ".jsx"]],
    [".mjs", [".mts", ".d.mts", ".mjs"]],
    [".cjs", [".cts", ".d.cts", ".cjs"]]
]);

/**
 * Follows TypeScript [file extension substitution](https://www.typescriptlang.org/docs/handbook/modules/reference.html#file-extension-substitution) rules,
 * testing multiple file extensions, if the original file was in TypeScript.
 *
 * @param path - The absolute file path
 * @param ts - Whether the original file was in TypeScript
 * @returns The file path with extension modified according to the file extension substitution rules
 */
function resolveExtension(path: string, ts: boolean): string {
  if (existsSync(path) || !ts) return path;

  const extension = extname(path);
  const substitutions = fileExtensionSubstitution.get(extension);
  if (!substitutions?.length) return path;

  const extensionless = path.slice(0, -extension.length);
  for (const substitution of substitutions) {
    const new_path = `${extensionless}${substitution}`;
    if (existsSync(new_path)) return new_path;
  }

  return path;
}

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
export function parseExports(source: string, dir: string, ts: boolean) {
  let ast = astCache.get(source);

  if (!ast) {
    const parser = ts ? Parser.extend(tsPlugin()) : Parser;
    ast = parser.parse(source, {
      ecmaVersion: "latest",
      sourceType: "module",
      locations: ts ? true : undefined,
    }) as ProgramNode;
    astCache.set(source, ast);
  }

  const exports_by_identifier: ParsedExports = {};

  for (const node of ast.body) {
    if (node.type === "ExportDefaultDeclaration") {
      const id = node.declaration.name;

      if (id in exports_by_identifier) {
        exports_by_identifier[id].default = true;
      } else {
        exports_by_identifier[id] = { source: "", default: true };
      }
    } else if (node.type === "ExportAllDeclaration") {
      if (!node.source) continue;

      const resolvedSource = resolvePathAliasAbsolute(node.source.value, dir);
      let file_path = resolveExtension(resolve(dir, resolvedSource), ts);
      let source_dir = dirname(node.source.value);

      if (!lstatSync(file_path).isFile()) {
        source_dir = node.source.value;
        const files = readdirSync(file_path);

        for (const file of files)
          if (file.includes("index")) {
            file_path = join(file_path, file);
            break;
          }
      }

      const export_file = readFileSync(file_path, "utf-8");
      const exports = parseExports(export_file, dirname(file_path), ts);

      for (const [key, value] of Object.entries(exports)) {
        const source = normalizeSeparators(`./${join(source_dir, value.source)}`);
        exports_by_identifier[key] = {
          ...value,
          source,
        };
      }
    } else if (node.type === "ExportNamedDeclaration") {
      for (const specifier of node.specifiers) {
        const exported_name = specifier.exported.name;
        const local_name = specifier.local.name;
        const id = exported_name || local_name;

        if (id in exports_by_identifier) {
          if (node.type === "ExportNamedDeclaration") {
            exports_by_identifier[id].mixed = true;
          }

          if (!exports_by_identifier[id].source) {
            exports_by_identifier[id].source = resolvePathAlias(node.source?.value ?? "", dir);
          }
        } else {
          exports_by_identifier[id] = {
            source: resolvePathAlias(node.source?.value ?? "", dir),
            default: local_name === "default",
          };
        }
      }
    } else if (node.type === "ImportDeclaration") {
      const id = node.specifiers[0].local.name;

      if (id in exports_by_identifier) {
        if (!exports_by_identifier[id].source) {
          exports_by_identifier[id].source = resolvePathAlias(node.source?.value ?? "", dir);
        }
      } else {
        exports_by_identifier[id] = {
          source: resolvePathAlias(node.source?.value ?? "", dir),
          default: id === "default",
        };
      }
    }
  }

  return exports_by_identifier;
}

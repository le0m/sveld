import type { ComponentDocApi } from "../plugin";
export declare function formatTsProps(props?: string): string;
export declare function getTypeDefs(def: Pick<ComponentDocApi, "typedefs">): string;
/**
 * Generates TypeScript type definitions for component contexts.
 *
 * Creates exported type definitions for each context, including generic
 * type parameters when contexts reference component generics. Handles
 * empty context objects by using `Record<string, never>`.
 *
 * @param def - Component documentation containing contexts and generics
 * @returns TypeScript type definition string, or empty string if no contexts
 *
 * @example
 * ```ts
 * // Input: contexts with generic reference
 * // Output:
 * // export type ModalContext<T> = {
 * //   /** Open the modal *\/
 * //   open: () => void;
 * //   /** Close the modal *\/
 * //   close: () => void;
 * // };
 * ```
 */
export declare function getContextDefs(def: Pick<ComponentDocApi, "contexts" | "generics">): string;
export declare function writeTsDefinition(component: ComponentDocApi): string;

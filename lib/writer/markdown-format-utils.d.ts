export declare const BACKTICK_REGEX: RegExp;
export declare const WHITESPACE_REGEX: RegExp;
export declare const MD_TYPE_UNDEFINED = "--";
export declare const PROP_TABLE_HEADER = "| Prop name | Required | Kind | Reactive | Type | Default value | Description |\n| :- | :- | :- | :- |\n";
export declare const SLOT_TABLE_HEADER = "| Slot name | Default | Props | Fallback |\n| :- | :- | :- | :- |\n";
export declare const EVENT_TABLE_HEADER = "| Event name | Type | Detail | Description |\n| :- | :- | :- | :- |\n";
/**
 * Formats a prop type for display in markdown tables.
 *
 * Escapes pipe characters to prevent breaking markdown table syntax
 * and wraps the type in a code block.
 *
 * @param type - The type string to format
 * @returns Formatted type string or MD_TYPE_UNDEFINED if type is undefined
 *
 * @example
 * ```ts
 * formatPropType("string | number") // Returns: "<code>string &#124; number</code>"
 * formatPropType(undefined)         // Returns: "--"
 * ```
 */
export declare function formatPropType(type?: string): string;
/**
 * Escapes HTML special characters in text.
 *
 * Converts `<` to `&lt;` and `>` to `&gt;` to prevent HTML injection
 * and ensure proper rendering in markdown.
 *
 * @param text - The text to escape
 * @returns The escaped text
 *
 * @example
 * ```ts
 * escapeHtml("<div>") // Returns: "&lt;div&gt;"
 * ```
 */
export declare function escapeHtml(text: string): string;
/**
 * Formats a prop default value for display in markdown tables.
 *
 * Escapes backticks and pipe characters, and wraps the value in a code block.
 *
 * @param value - The default value string to format
 * @returns Formatted value string or MD_TYPE_UNDEFINED if value is undefined
 *
 * @example
 * ```ts
 * formatPropValue("'hello'")  // Returns: "<code>'hello'</code>"
 * formatPropValue("`test`")   // Returns: "<code>\\`test\\`</code>"
 * ```
 */
export declare function formatPropValue(value: string | undefined): string;
/**
 * Formats a prop description for display in markdown tables.
 *
 * Escapes HTML characters and converts newlines to `<br />` tags
 * for proper rendering in markdown tables.
 *
 * @param description - The description string to format
 * @returns Formatted description or MD_TYPE_UNDEFINED if description is empty
 *
 * @example
 * ```ts
 * formatPropDescription("Line 1\nLine 2")
 * // Returns: "Line 1<br />Line 2"
 * ```
 */
export declare function formatPropDescription(description: string | undefined): string;
/**
 * Formats slot props for display in markdown tables.
 *
 * Converts TypeScript type definitions to a single-line format
 * and wraps them in a code block. Returns MD_TYPE_UNDEFINED for
 * empty or undefined props.
 *
 * @param props - The slot props type string
 * @returns Formatted props string or MD_TYPE_UNDEFINED
 *
 * @example
 * ```ts
 * formatSlotProps("{ title: string }") // Returns: "<code>{ title: string }</code>"
 * formatSlotProps("{}")                 // Returns: "--"
 * ```
 */
export declare function formatSlotProps(props?: string): string;
/**
 * Formats slot fallback content for display in markdown tables.
 *
 * Escapes HTML and converts newlines to `<br />` tags, then wraps
 * in a code block.
 *
 * @param fallback - The fallback content string
 * @returns Formatted fallback string or MD_TYPE_UNDEFINED if undefined
 *
 * @example
 * ```ts
 * formatSlotFallback("<p>Default</p>")
 * // Returns: "<code>&lt;p&gt;Default&lt;/p&gt;</code>"
 * ```
 */
export declare function formatSlotFallback(fallback?: string): string;
/**
 * Formats event detail type for display in markdown tables.
 *
 * Converts the detail type to a single-line format and wraps it
 * in a code block.
 *
 * @param detail - The event detail type string
 * @returns Formatted detail string or MD_TYPE_UNDEFINED if undefined
 *
 * @example
 * ```ts
 * formatEventDetail("{ value: string }")
 * // Returns: "<code>{ value: string }</code>"
 * ```
 */
export declare function formatEventDetail(detail?: string): string;

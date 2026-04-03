/**
 * Diagnostic information for component parsing.
 *
 * Used to provide context about the component being parsed for error
 * messages and logging.
 */
interface ComponentParserDiagnostics {
    /** The module/component name (e.g., "Button", "App") */
    moduleName: string;
    /** The file path to the component (e.g., "./Button.svelte") */
    filePath: string;
}
/**
 * Options for configuring the ComponentParser behavior.
 */
interface ComponentParserOptions {
    /** Enable verbose logging for debugging parsing issues */
    verbose?: boolean;
}
/**
 * Parameter information for function props.
 *
 * Extracted from JSDoc `@param` tags to provide detailed function signatures.
 */
interface ComponentPropParam {
    /** The parameter name */
    name: string;
    /** The parameter type (e.g., "string", "number", "CustomType") */
    type: string;
    /** Optional description from JSDoc */
    description?: string;
    /** Whether the parameter is optional */
    optional?: boolean;
}
/**
 * Component prop definition extracted from Svelte component.
 *
 * Represents a single prop that can be passed to the component, including
 * its type, default value, description, and metadata about whether it's
 * required, reactive, or a function.
 */
interface ComponentProp {
    /** The prop name as declared in the component */
    name: string;
    /** The declaration kind: "let" (required), "const" (optional with default), or "function" */
    kind: "let" | "const" | "function";
    /** Whether this prop is declared as `const` (has a default value) */
    constant: boolean;
    /** The TypeScript type of the prop (e.g., "string", "number | string") */
    type?: string;
    /** The default value as a string representation of the source code */
    value?: string;
    /** Description extracted from JSDoc comments */
    description?: string;
    /** Function parameters (for function props) extracted from `@param` tags */
    params?: ComponentPropParam[];
    /** Return type (for function props) extracted from `@returns` tag */
    returnType?: string;
    /** Whether this prop is a function (arrow function or function expression) */
    isFunction: boolean;
    /** Whether this prop is a function declaration (not an expression) */
    isFunctionDeclaration: boolean;
    /** Whether this prop is required (no default value, declared with `let`) */
    isRequired: boolean;
    /** Whether this prop is reactive (can change and trigger reactivity) */
    reactive: boolean;
}
/**
 * Component slot definition.
 *
 * Represents a slot that can be used to pass content into the component.
 * Includes information about slot props, fallback content, and descriptions.
 */
interface ComponentSlot {
    /** The slot name (null or undefined for default slot) */
    name?: string | null;
    /** Whether this is the default slot */
    default: boolean;
    /** Fallback content to display when slot is not provided */
    fallback?: string;
    /** TypeScript type definition for slot props (e.g., "{ title: string }") */
    slot_props?: string;
    /** Description extracted from JSDoc `@slot` or `@snippet` tags */
    description?: string;
}
/**
 * Event that is forwarded from a child component or element.
 *
 * Forwarded events are those that use `on:eventname` syntax without
 * a handler, passing the event through to the parent.
 */
interface ForwardedEvent {
    /** Always "forwarded" for forwarded events */
    type: "forwarded";
    /** The event name (e.g., "click", "change") */
    name: string;
    /** The element or component that forwards this event */
    element: ComponentInlineElement | ComponentElement;
    /** Description extracted from JSDoc `@event` tags */
    description?: string;
    /** The detail type if explicitly specified in `@event` tag */
    detail?: string;
}
/**
 * Event that is dispatched by the component.
 *
 * Dispatched events are those created with `createEventDispatcher()`
 * and dispatched via `dispatch("eventname", detail)`.
 */
interface DispatchedEvent {
    /** Always "dispatched" for dispatched events */
    type: "dispatched";
    /** The event name (e.g., "click", "change") */
    name: string;
    /** The detail type (e.g., "{ value: string }", "null", "CustomEvent<...>") */
    detail?: string;
    /** Description extracted from JSDoc `@event` tags */
    description?: string;
}
type ComponentEvent = ForwardedEvent | DispatchedEvent;
/**
 * Type definition extracted from JSDoc `@typedef` tags.
 *
 * Represents custom types defined in component comments that can be
 * referenced by props, events, and other type annotations.
 */
interface TypeDef {
    /** The type string representation (e.g., "{ x: number; y: number }") */
    type: string;
    /** The type name (e.g., "Point", "User") */
    name: string;
    /** Description extracted from JSDoc comments */
    description?: string;
    /** The full TypeScript type definition string (e.g., "type Point = { x: number; y: number }") */
    ts: string;
}
type ComponentGenerics = [name: string, type: string] | null;
/**
 * Represents an inline Svelte component element.
 *
 * Used to identify which component forwards an event or accepts rest props.
 */
interface ComponentInlineElement {
    /** Always "InlineComponent" for component elements */
    type: "InlineComponent";
    /** The component name (e.g., "Button", "Modal") */
    name: string;
}
interface ComponentElement {
    type: "Element";
    name: string;
    /**
     * For `svelte:element`, stores the hardcoded element tag if `this` is a literal string.
     *
     * When `svelte:element` is used with a static tag (e.g., `svelte:element this="div"`),
     * this property contains the tag name. If the tag is dynamic, this property is undefined.
     *
     * @example
     * ```svelte
     * <!-- Static tag -->
     * <svelte:element this="div" bind:this={elementRef} />
     * // thisValue: "div"
     *
     * <!-- Dynamic tag -->
     * <svelte:element this={tagName} bind:this={elementRef} />
     * // thisValue: undefined
     * ```
     */
    thisValue?: string;
    /** Inline or block description from the `@restProps` JSDoc tag */
    description?: string;
}
type RestProps = undefined | ComponentInlineElement | ComponentElement;
/**
 * Interface extension information from JSDoc `@extends` tag.
 *
 * Allows components to extend external TypeScript interfaces for
 * better type safety and code reuse.
 */
interface Extends {
    /** The interface name to extend (e.g., "ButtonProps") */
    interface: string;
    /** The import path for the interface (e.g., "./types" or "carbon-components-svelte") */
    import: string;
}
/**
 * Property definition for a component context.
 *
 * Represents a single property in a context object created with `setContext`.
 */
interface ComponentContextProp {
    /** The property name */
    name: string;
    /** The property type (inferred from JSDoc or variable types) */
    type: string;
    /** Description extracted from JSDoc comments on the variable */
    description?: string;
    /** Whether the property is optional */
    optional: boolean;
}
/**
 * Component context definition.
 *
 * Represents a context created with `setContext(key, value)` that can be
 * accessed by child components via `getContext(key)`.
 */
interface ComponentContext {
    /** The context key (e.g., "modal", "tabs") */
    key: string;
    /** The generated TypeScript type name (e.g., "ModalContext", "TabsContext") */
    typeName: string;
    /** Description extracted from JSDoc comments */
    description?: string;
    /** Properties available in this context */
    properties: ComponentContextProp[];
}
/**
 * Complete parsed component metadata.
 *
 * This is the main return type from {@link ComponentParser.parseSvelteComponent}.
 * Contains all extracted information about a Svelte component including props,
 * slots, events, types, and more.
 *
 * @example
 * ```ts
 * const parser = new ComponentParser();
 * const parsed = parser.parseSvelteComponent(source, {
 *   moduleName: "Button",
 *   filePath: "./Button.svelte"
 * });
 *
 * // Access component metadata:
 * parsed.props        // Array of component props
 * parsed.slots        // Array of component slots
 * parsed.events       // Array of component events
 * parsed.typedefs     // Array of custom type definitions
 * parsed.contexts     // Array of context definitions
 * ```
 */
export interface ParsedComponent {
    /** Component props that can be passed to the component */
    props: ComponentProp[];
    /** Exports from `<script context="module">` block */
    moduleExports: ComponentProp[];
    /** Slots available in the component template */
    slots: ComponentSlot[];
    /** Events that the component can dispatch or forward */
    events: ComponentEvent[];
    /** Custom type definitions from JSDoc `@typedef` tags */
    typedefs: TypeDef[];
    /** Generic type parameters (e.g., `[name: "T", type: "string"]`) or null */
    generics: null | ComponentGenerics;
    /** Rest props configuration (which elements/components accept rest props) */
    rest_props: RestProps;
    /** Interface extension from JSDoc `@extends` tag */
    extends?: Extends;
    /** Component-level description from `@component` HTML comment */
    componentComment?: string;
    /** Contexts created with `setContext` in the component */
    contexts?: ComponentContext[];
}
export default class ComponentParser {
    /** Parser configuration options (e.g., verbose logging) */
    private options?;
    /** Whether the component uses legacy or runes syntax according to compiler metadata */
    private syntaxMode;
    /** Raw source code of the Svelte component being parsed */
    private source?;
    /** Compiled Svelte code containing extracted variables and AST */
    private compiled?;
    /** Parsed abstract syntax tree from the Svelte compiler */
    private parsed?;
    /** Rest props configuration (e.g., `$$restProps`) if present in component */
    private rest_props?;
    /** Component extension information (e.g., `extends` attribute) */
    private extends?;
    /** Component-level description extracted from `@component` HTML comment */
    private componentComment?;
    /** Set of reactive variable names found in the component */
    private readonly reactive_vars;
    /** Set of all variable declarations found in the component script */
    private readonly vars;
    /** Map of component props keyed by prop name */
    private readonly props;
    /** Map of module exports (functions/variables exported from script) keyed by name */
    private readonly moduleExports;
    /** Map of component slots keyed by slot name (null for default slot) */
    private readonly slots;
    /** Map of component events (dispatched events) keyed by event name */
    private readonly events;
    /** Map of event descriptions extracted from JSDoc comments keyed by event name */
    private readonly eventDescriptions;
    /** Map of forwarded events (events forwarded from child components) keyed by event name */
    private readonly forwardedEvents;
    /** Map of type definitions (typedefs) extracted from JSDoc comments keyed by type name */
    private readonly typedefs;
    /** Component generic type parameters (null if no generics) */
    private generics;
    /** Map of prop bindings (e.g., `bind:value`) keyed by prop name */
    private readonly bindings;
    /** Map of component contexts (created with `setContext`) keyed by context name */
    private readonly contexts;
    /** Cache for variable type and description information to avoid redundant lookups */
    private variableInfoCache;
    /** Maps local binding names back to their public prop names */
    private readonly propLocalToPublicName;
    /** Tracks `$props()` bindings that are used as spread/rest props */
    private readonly restPropLocals;
    /** Tracks prop locals that are used as snippet/render props */
    private readonly snippetPropLocals;
    /** Per-declarator type metadata extracted from modern AST `$props()` annotations */
    private readonly runesPropTypeMetadataByDeclaratorStart;
    /** Component-level lexical scope shared by instance script and template */
    private readonly componentScope;
    /** Precomputed lexical scopes for nested AST nodes */
    private scopeDeclarations;
    /** Active lexical scopes while walking the component AST */
    private readonly activeScopes;
    /** Cached array of source code lines split by newline for efficient line-based operations */
    private sourceLinesCache?;
    constructor(options?: ComponentParserOptions);
    private static mapToArray;
    private static assignValue;
    private resolvePublicPropName;
    private trackPropLocalName;
    private getPropByLocalOrPublic;
    private getPropTypeByLocalOrPublic;
    private getRunesPropTypeMetadata;
    private declareScopeBinding;
    private resolveIdentifierToReactiveProp;
    private collectPatternIdentifiers;
    private markReactivePropsFromMutationTarget;
    private isScopeOwner;
    private isFunctionScopeOwner;
    private getOrCreateScope;
    private declareVariableDeclaration;
    private declareFunctionLikeScopeBindings;
    private collectDirectBlockDeclarations;
    private extractRunesScopeBindings;
    private collectComponentScopeDeclarations;
    private collectNestedScopeDeclarations;
    private buildScopeDeclarations;
    private createRestPropsFromParent;
    private maybeSetRestProps;
    private isCallExpressionNamed;
    private getPropertyName;
    private logUnsupportedRunesPattern;
    private static formatComment;
    /**
     * Extracts and categorizes JSDoc tags from a parsed comment.
     *
     * Separates tags into type, param, returns, and additional categories while
     * excluding tags that are handled separately (extends, restProps, slot/snippet, event, typedef).
     *
     * @param parsed - The parsed comment result from comment-parser
     * @returns An object containing categorized tags and the comment description
     *
     * @example
     * ```ts
     * // Input: Parsed comment with tags
     * // Output:
     * {
     *   type: { tag: "type", type: "string" },
     *   param: [
     *     { tag: "param", name: "value", type: "string" }
     *   ],
     *   returns: { tag: "returns", type: "void" },
     *   additional: [{ tag: "since", name: "1.0.0" }],
     *   description: "Main description text"
     * }
     * ```
     */
    private getCommentTags;
    /**
     * Finds the last comment from an array of leading comments.
     *
     * TypeScript directives are stripped before parsing, so we can safely take
     * the last comment as it will be the JSDoc comment if present.
     *
     * @param leadingComments - Array of comment nodes from the AST
     * @returns The last comment's value if found, undefined otherwise
     *
     * @example
     * ```ts
     * // Given leadingComments with multiple comments:
     * // [/* regular comment *\/, /** JSDoc comment *\/]
     * // Returns: { value: " JSDoc comment " }
     *
     * // If no comments:
     * // Returns: undefined
     * ```
     */
    private static findJSDocComment;
    private findAdjacentJSDocComment;
    private processNodeJSDoc;
    private processLeadingCommentsJSDoc;
    /**
     * Processes JSDoc comments from leadingComments and extracts structured information.
     *
     * Parses JSDoc comments to extract type information, parameters, return types,
     * and descriptions. Handles both inline and block-level descriptions.
     *
     * @param leadingComments - Array of comment nodes from the AST
     * @returns Structured JSDoc information or undefined if no JSDoc comment is found
     *
     * @example
     * ```ts
     * // Input JSDoc:
     * /**
     *  * @type {string}
     *  * @param {number} x - The x coordinate
     *  * @param {number} y - The y coordinate
     *  * @returns {void}
     *  * Description text
     *  *\/
     *
     * // Output:
     * {
     *   type: "string",
     *   params: [
     *     { name: "x", type: "number", description: "The x coordinate", optional: false },
     *     { name: "y", type: "number", description: "The y coordinate", optional: false }
     *   ],
     *   returnType: "void",
     *   description: "Description text"
     * }
     * ```
     */
    private processJSDocComment;
    private buildRunesPropTypeMetadata;
    /**
     * Checks if a MemberExpression represents a well-known numeric constant.
     *
     * Identifies constants from the Number and Math objects that should be
     * typed as `number` rather than their literal values.
     *
     * @param memberExpr - The AST node to check
     * @returns True if the expression is a recognized numeric constant
     *
     * @example
     * ```ts
     * // Recognized constants:
     * Number.POSITIVE_INFINITY  // true
     * Number.MAX_VALUE          // true
     * Math.PI                   // true
     * Math.E                    // true
     *
     * // Not recognized:
     * Custom.CONSTANT           // false
     * Number.UNKNOWN            // false
     * ```
     */
    private isNumericConstant;
    /**
     * Extracts source code at the given position range.
     *
     * @param start - Start position in the source
     * @param end - End position in the source
     * @returns The source code substring, or undefined if source is not available
     */
    private sourceAtPos;
    /**
     * Processes an initializer expression to extract its value, type, and function status.
     *
     * Handles various expression types including object literals, arrays, binary expressions,
     * arrow functions, unary expressions, identifiers, member expressions, template literals,
     * and primitive literals. Extracts the source code representation and infers types
     * where possible.
     *
     * @param init - The initializer AST node
     * @returns An object containing the value (source code), inferred type, and whether it's a function
     *
     * @example
     * ```ts
     * // ObjectExpression: { x: 1, y: 2 }
     * // Returns: { value: "{ x: 1, y: 2 }", type: "{ x: 1, y: 2 }", isFunction: false }
     *
     * // ArrowFunctionExpression: () => {}
     * // Returns: { value: undefined, type: "(...args: any[]) => any", isFunction: true }
     *
     * // Literal: "hello"
     * // Returns: { value: '"hello"', type: "string", isFunction: false }
     *
     * // BinaryExpression: "a" + "b"
     * // Returns: { value: '"a" + "b"', type: "string", isFunction: false }
     *
     * // MemberExpression: Math.PI
     * // Returns: { value: "Math.PI", type: "number" (if numeric constant), isFunction: false }
     * ```
     */
    private processInitializer;
    /**
     * Unwraps `$bindable(...)` calls so defaults are documented as their underlying values.
     */
    private unwrapBindableInitializer;
    /**
     * Extracts component props from top-level `$props()` declarations in runes components.
     */
    private parseRunesPropsDeclaration;
    private inferSlotPropValueFromExpression;
    private buildSlotPropsFromObjectExpression;
    private extractRenderTagInfo;
    /**
     * Adds or merges a component prop to the props map.
     *
     * If a prop with the same name already exists, the new data is merged
     * with the existing prop, with new values taking precedence.
     *
     * @param prop_name - The name of the prop
     * @param data - The prop data to add or merge
     *
     * @example
     * ```ts
     * // First call:
     * addProp("count", { name: "count", type: "number", kind: "let" })
     * // Props map: { "count" => { name: "count", type: "number", kind: "let" } }
     *
     * // Second call (merge):
     * addProp("count", { description: "The count value" })
     * // Props map: { "count" => { name: "count", type: "number", kind: "let", description: "The count value" } }
     * ```
     */
    private addProp;
    /**
     * Adds or merges a module export to the moduleExports map.
     *
     * Similar to {@link addProp}, but for exported values from the module script.
     * If an export with the same name already exists, the new data is merged
     * with the existing export.
     *
     * @param prop_name - The name of the exported value
     * @param data - The export data to add or merge
     *
     * @example
     * ```ts
     * // For: export const API_URL = "https://api.example.com"
     * addModuleExport("API_URL", {
     *   name: "API_URL",
     *   kind: "const",
     *   type: "string",
     *   value: '"https://api.example.com"'
     * })
     * ```
     */
    private addModuleExport;
    /**
     * Normalizes type strings by aliasing common patterns.
     *
     * Converts `*` to `any` (common JSDoc wildcard) and trims whitespace
     * from type annotations.
     *
     * @param type - The type string to normalize
     * @returns The normalized type string
     *
     * @example
     * ```ts
     * aliasType("*")        // Returns: "any"
     * aliasType(" string ") // Returns: "string"
     * aliasType("number")   // Returns: "number"
     * ```
     */
    private aliasType;
    /**
     * Extracts a property's type from an object type string.
     *
     * Parses type strings like `{ value: string; other: number }` and returns
     * the type for the requested property name. Handles nested braces, generics,
     * and optional properties.
     *
     * @returns The property type string, or undefined if not found
     */
    private extractPropertyType;
    /**
     * Resolves the type of a MemberExpression (e.g., `obj.value`) by looking up
     * the object's type annotation and extracting the property type.
     *
     * @returns The resolved type string, or undefined if it cannot be resolved
     */
    private resolveMemberExpressionType;
    /**
     * Adds or merges a slot definition to the slots map.
     *
     * Handles both named slots and the default slot. If a slot with the same
     * name already exists, merges the data with existing values taking precedence
     * where appropriate.
     *
     * @param slot_name - Optional slot name (undefined/empty = default slot)
     * @param slot_props - Optional slot props type definition
     * @param slot_fallback - Optional fallback content for the slot
     * @param slot_description - Optional description for the slot
     *
     * @example
     * ```ts
     * // Default slot:
     * addSlot({ slot_name: undefined, slot_props: "{ children: string }" })
     *
     * // Named slot:
     * addSlot({
     *   slot_name: "header",
     *   slot_props: "{ title: string }",
     *   slot_description: "Header slot with title prop"
     * })
     *
     * // Slot with fallback:
     * addSlot({
     *   slot_name: "footer",
     *   slot_fallback: "<p>Default footer</p>"
     * })
     * ```
     */
    private addSlot;
    /**
     * Adds or merges a dispatched event to the events map.
     *
     * Handles event detail type inference: if no argument is provided to the
     * dispatcher and no `@event` tag specifies a detail type, the detail defaults
     * to `null`. Otherwise, uses the provided detail type.
     *
     * @param name - The event name
     * @param detail - The event detail type string
     * @param has_argument - Whether the dispatcher call includes a detail argument
     * @param description - Optional event description
     *
     * @example
     * ```ts
     * // Event without detail:
     * // createEventDispatcher()("click")
     * addDispatchedEvent({
     *   name: "click",
     *   detail: "",
     *   has_argument: false,
     *   description: "Fires on click"
     * })
     * // Result: { type: "dispatched", name: "click", detail: "null" }
     *
     * // Event with detail:
     * // dispatch("change", { value: 42 })
     * addDispatchedEvent({
     *   name: "change",
     *   detail: "{ value: number }",
     *   has_argument: true,
     *   description: "Fires when value changes"
     * })
     * // Result: { type: "dispatched", name: "change", detail: "{ value: number }" }
     * ```
     */
    private addDispatchedEvent;
    private normalizeRunesCallbackProps;
    /**
     * Parses custom types, events, slots, and other JSDoc annotations from component comments.
     *
     * Scans the entire source for JSDoc comment blocks and extracts structured information
     * about events, typedefs, callbacks, slots, extends, restProps, and generics. Handles complex
     * description extraction logic that supports both inline descriptions and preceding
     * line descriptions.
     *
     * @example
     * ```ts
     * // Parses comments like:
     * /**
     *  * @event {CustomEvent} change - Fires when value changes
     *  * @property {string} value - The new value
     *  * @property {number} timestamp - When it changed
     *  *\/
     *
     * // Or:
     * /**
     *  * Description for the event
     *  * @event change
     *  *\/
     * ```
     */
    private parseCustomTypes;
    /**
     * Builds an event detail type string from an array of property definitions.
     *
     * Creates an inline object type with JSDoc comments for each property,
     * including descriptions and default values. Used for both event details
     * and typedef property definitions.
     *
     * @param properties - Array of property definitions with name, type, description, etc.
     * @param _eventName - Optional event name (unused, kept for API consistency)
     * @returns A string representation of the object type with JSDoc comments
     *
     * @example
     * ```ts
     * // Input:
     * [
     *   { name: "value", type: "string", description: "The new value" },
     *   { name: "count", type: "number", optional: true, default: "0" }
     * ]
     *
     * // Output:
     * "{ /** The new value *\/ value: string; /** @default 0 *\/ count?: number; }"
     * ```
     */
    private buildEventDetailFromProperties;
    /**
     * Generates a TypeScript type name for a context key.
     *
     * Converts kebab-case, snake_case, or space-separated keys into PascalCase
     * with "Context" suffix. Splits on dashes, underscores, and spaces, then
     * capitalizes each part.
     *
     * @param key - The context key (e.g., "simple-modal", "tabs_context", "My Context")
     * @returns The generated type name (e.g., "SimpleModalContext", "TabsContext", "MyContextContext")
     *
     * @example
     * ```ts
     * generateContextTypeName("simple-modal")  // Returns: "SimpleModalContext"
     * generateContextTypeName("Tabs")           // Returns: "TabsContext"
     * generateContextTypeName("user_settings") // Returns: "UserSettingsContext"
     * generateContextTypeName("my context")    // Returns: "MyContextContext"
     * ```
     */
    private generateContextTypeName;
    /**
     * Builds a cache of variable type information from JSDoc comments.
     *
     * Scans the source code for variable declarations and extracts type information
     * from preceding JSDoc comments. This cache is used to infer types for context
     * properties and other variable references.
     *
     * @example
     * ```ts
     * // Source code:
     * /**
     *  * @type {string}
     *  * The user's name
     *  *\/
     * const userName = "John";
     *
     * // Cache entry:
     * // { "userName": { type: "string", description: "The user's name" } }
     * ```
     */
    private buildVariableInfoCache;
    /**
     * Cache for compiled regex patterns for variable name matching.
     *
     * Stores three regex patterns (const, let, function) per variable name
     * to avoid recreating them on each lookup. Improves performance when
     * searching for the same variable multiple times.
     */
    private static readonly VAR_NAME_REGEX_CACHE;
    /**
     * Gets or creates cached regex patterns for matching variable declarations.
     *
     * Creates three regex patterns for matching const, let, and function declarations
     * of a specific variable name. The patterns are cached to avoid recreating them
     * for the same variable name.
     *
     * @param varName - The variable name to create regex patterns for
     * @returns A tuple of three RegExp objects for const, let, and function patterns
     *
     * @example
     * ```ts
     * getVarNameRegexes("count")
     * // Returns:
     * // [
     * //   /\bconst\s+count\s*=/,
     * //   /\blet\s+count\s*=/,
     * //   /\bfunction\s+count\s*\(/
     * // ]
     * ```
     */
    private static getVarNameRegexes;
    /**
     * Finds the type and description for a variable by searching for its JSDoc comment.
     *
     * First checks the cache built by {@link buildVariableInfoCache}. If not found,
     * searches the source code directly for the variable declaration and its
     * preceding JSDoc comment.
     *
     * @param varName - The variable name to look up
     * @returns The type and description if found, null otherwise
     *
     * @example
     * ```ts
     * // Source:
     * /**
     *  * @type {number}
     *  * The count value
     *  *\/
     * const count = 0;
     *
     * findVariableTypeAndDescription("count")
     * // Returns: { type: "number", description: "The count value" }
     * ```
     */
    private findVariableTypeAndDescription;
    /**
     * Parses a context value from an AST node to extract type information.
     *
     * Handles two cases:
     * 1. ObjectExpression: Parses object literal properties and infers types from variable references
     * 2. Identifier: Looks up the variable's type from JSDoc comments
     *
     * @param node - The AST node representing the context value
     * @param key - The context key name
     * @returns A ComponentContext object with parsed properties, or null if parsing fails
     *
     * @example
     * ```ts
     * // Case 1: Object literal
     * // setContext('modal', { open, close })
     * // Returns: { key: "modal", typeName: "ModalContext", properties: [...] }
     *
     * // Case 2: Variable reference
     * // setContext('tabs', tabContext)
     * // Returns: { key: "tabs", typeName: "TabsContext", properties: [...] }
     * ```
     */
    private parseContextValue;
    /**
     * Parses a `setContext` call expression to extract context information.
     *
     * Extracts the context key from the first argument (must be a string literal
     * or simple template literal) and the context value from the second argument.
     * Only processes static keys - dynamic keys are skipped with a warning.
     *
     * @param node - The AST node (should be a CallExpression)
     * @param _parent - The parent node (unused)
     *
     * @example
     * ```ts
     * // Parses: setContext('modal', { open, close })
     * // Extracts: key = "modal", value = { open, close }
     *
     * // Skips: setContext(dynamicKey, value) // key is not a literal
     * ```
     */
    private parseSetContextCall;
    /**
     * Cleans up all parser state, resetting the instance for reuse.
     *
     * Clears all maps, caches, and resets all state variables to their initial
     * values. Should be called before parsing a new component or when the
     * parser instance needs to be reset.
     *
     * @example
     * ```ts
     * parser.parseSvelteComponent(source1, diagnostics1);
     * parser.cleanup(); // Reset state
     * parser.parseSvelteComponent(source2, diagnostics2); // Fresh parse
     * ```
     */
    cleanup(): void;
    /**
     * Pre-compiled regex for matching script blocks in Svelte components.
     *
     * Matches `<script>` tags and their content, capturing the opening tag,
     * script content, and closing tag. Global and case-insensitive flags
     * allow matching multiple script blocks.
     *
     * @example
     * ```ts
     * // Matches:
     * // "<script>const x = 1;</script>"
     * // "<script lang='ts'>...</script>"
     * ```
     */
    private static readonly SCRIPT_BLOCK_REGEX;
    /**
     * Pre-compiled regex for matching TypeScript directive comments.
     *
     * Matches TypeScript directive comments like ts-ignore, ts-expect-error,
     * etc. Used to remove these directives from script blocks before JSDoc parsing.
     *
     * @example
     * ```ts
     * // Matches:
     * // "// ts-ignore"
     * // "// ts-expect-error: reason"
     * // "// ts-nocheck"
     * ```
     */
    private static readonly TS_DIRECTIVE_REGEX;
    /**
     * Strips TypeScript directive comments from script blocks only.
     *
     * Removes TypeScript directive comments (e.g., ts-ignore, ts-expect-error directives)
     * from within `<script>` blocks to prevent them from interfering with JSDoc parsing.
     * Directives outside script blocks are left untouched.
     *
     * @param source - The Svelte component source code
     * @returns The source code with TypeScript directives removed from script blocks
     *
     * @example
     * ```ts
     * // Input (with TypeScript directive):
     * <script>
     *   const x: string = 123; // directive removed
     * </script>
     *
     * // Output (directive stripped):
     * <script>
     *   const x: string = 123;
     * </script>
     * ```
     */
    private static stripTypeScriptDirectivesFromScripts;
    /**
     * Parses a Svelte component and extracts all component metadata.
     *
     * This is the main entry point that orchestrates the entire parsing process:
     * 1. Cleans up previous state
     * 2. Strips TypeScript directives that might interfere with JSDoc
     * 3. Compiles the component to get the AST
     * 4. Collects reactive variables
     * 5. Builds variable type cache
     * 6. Parses custom types from JSDoc comments
     * 7. Walks the AST to extract props, slots, events, bindings, and contexts
     * 8. Post-processes events to distinguish dispatched vs forwarded
     * 9. Processes props with bindings and slots with prop references
     * 10. Returns the complete parsed component structure
     *
     * @param source - The Svelte component source code
     * @param diagnostics - Diagnostic information (module name and file path)
     * @returns A ParsedComponent object containing all extracted metadata
     *
     * @example
     * ```ts
     * const parser = new ComponentParser();
     * const result = parser.parseSvelteComponent(source, {
     *   moduleName: "Button",
     *   filePath: "./Button.svelte"
     * });
     * // Returns: { props: [...], slots: [...], events: [...], ... }
     * ```
     */
    parseSvelteComponent(source: string, diagnostics: ComponentParserDiagnostics): ParsedComponent;
}
export {};

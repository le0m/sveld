/**
 * Element tag map adapted from TypeScript's `lib.dom.d.ts`.
 *
 * Maps HTML element tag names to their corresponding TypeScript element types.
 * Used for generating proper TypeScript types for element bindings and rest props.
 * See the TypeScript lib.dom.d.ts for the original source.
 *
 * @example
 * ```ts
 * tag_map["button"] // "HTMLButtonElement"
 * tag_map["div"]    // "HTMLDivElement"
 * tag_map["input"]  // "HTMLInputElement"
 * ```
 */
declare const tag_map: {
    a: string;
    abbr: string;
    address: string;
    applet: string;
    area: string;
    article: string;
    aside: string;
    audio: string;
    b: string;
    base: string;
    basefont: string;
    bdi: string;
    bdo: string;
    blockquote: string;
    body: string;
    br: string;
    button: string;
    canvas: string;
    caption: string;
    cite: string;
    code: string;
    col: string;
    colgroup: string;
    data: string;
    datalist: string;
    dd: string;
    del: string;
    details: string;
    dfn: string;
    dialog: string;
    dir: string;
    div: string;
    dl: string;
    dt: string;
    em: string;
    embed: string;
    fieldset: string;
    figcaption: string;
    figure: string;
    font: string;
    footer: string;
    form: string;
    frame: string;
    frameset: string;
    h1: string;
    h2: string;
    h3: string;
    h4: string;
    h5: string;
    h6: string;
    head: string;
    header: string;
    hgroup: string;
    hr: string;
    html: string;
    i: string;
    iframe: string;
    img: string;
    input: string;
    ins: string;
    kbd: string;
    label: string;
    legend: string;
    li: string;
    link: string;
    main: string;
    map: string;
    mark: string;
    marquee: string;
    menu: string;
    meta: string;
    meter: string;
    nav: string;
    noscript: string;
    object: string;
    ol: string;
    optgroup: string;
    option: string;
    output: string;
    p: string;
    param: string;
    picture: string;
    pre: string;
    progress: string;
    q: string;
    rp: string;
    rt: string;
    ruby: string;
    s: string;
    samp: string;
    script: string;
    search: string;
    section: string;
    select: string;
    slot: string;
    small: string;
    source: string;
    span: string;
    strong: string;
    style: string;
    sub: string;
    summary: string;
    sup: string;
    table: string;
    tbody: string;
    td: string;
    template: string;
    textarea: string;
    tfoot: string;
    th: string;
    thead: string;
    time: string;
    title: string;
    tr: string;
    track: string;
    u: string;
    ul: string;
    var: string;
    video: string;
    wbr: string;
};
type ElementTag = keyof typeof tag_map;
/**
 * Gets the TypeScript element type for a given HTML tag name.
 *
 * Returns the specific element type (e.g., `HTMLButtonElement`) if the tag
 * is in the map, otherwise returns the generic `HTMLElement` type.
 *
 * @param element - The HTML tag name (e.g., "button", "div", "input")
 * @returns The corresponding TypeScript element type name
 *
 * @example
 * ```ts
 * getElementByTag("button")  // Returns: "HTMLButtonElement"
 * getElementByTag("div")     // Returns: "HTMLDivElement"
 * getElementByTag("custom")  // Returns: "HTMLElement" (fallback)
 * ```
 */
export declare function getElementByTag(element: ElementTag | string): string;
export {};

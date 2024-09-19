const puppeteer = require("puppeteer-core");
const chromium = require("@sparticuz/chromium");
const createDOMPurify = require("dompurify");
const { JSDOM } = require("jsdom");

let inputHtml: string = "";
const COURIER_NEW = `@font-face {
  font-family: 'Courier New';
  font-style: normal;
  font-weight: 400;
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}`;

const allTagsHTML: string[] = [
  "a",
  "abbr",
  "acronym",
  "animate",
  "animateMotion",
  "animateTransform",
  "animatecolor",
  "applet",
  "area",
  "article",
  "aside",
  "audio",
  "b",
  "base",
  "basefont",
  "bdi",
  "bdo",
  "bgsound",
  "big",
  "blink",
  "blockquote",
  "body",
  "br",
  "button",
  "canvas",
  "caption",
  "circle",
  "cite",
  "clipPath",
  "code",
  "col",
  "colgroup",
  "command",
  "datalist",
  "dd",
  "defs",
  "del",
  "desc",
  "details",
  "dfn",
  "dir",
  "div",
  "dl",
  "dt",
  "ellipse",
  "em",
  "embed",
  "feBlend",
  "feColorMatrix",
  "feComponentTransfer",
  "feComposite",
  "feConvolveMatrix",
  "feDiffuseLighting",
  "feDisplacementMap",
  "feDistantLight",
  "feFlood",
  "feFuncA",
  "feFuncB",
  "feFuncG",
  "feFuncR",
  "feGaussianBlur",
  "feImage",
  "feMerge",
  "feMergeNode",
  "feMorphology",
  "feOffset",
  "fePointLight",
  "feSpecularLighting",
  "feSpotLight",
  "feTile",
  "feTurbulence",
  "fieldset",
  "figcaption",
  "figure",
  "filter",
  "font",
  "footer",
  "foreignObject",
  "form",
  "frame",
  "frameset",
  "g",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hgroup",
  "hr",
  "html",
  "i",
  "iframe",
  "image",
  "img",
  "input",
  "ins",
  "isindex",
  "kbd",
  "keygen",
  "label",
  "legend",
  "li",
  "line",
  "linearGradient",
  "link",
  "listing",
  "main",
  "map",
  "mark",
  "marker",
  "marquee",
  "mask",
  "menu",
  "menuitem",
  "meta",
  "metadata",
  "meter",
  "nav",
  "nextid",
  "nobr",
  "noembed",
  "noframes",
  "noscript",
  "object",
  "ol",
  "optgroup",
  "option",
  "output",
  "p",
  "param",
  "path",
  "pattern",
  "picture",
  "plaintext",
  "polygon",
  "polyline",
  "pre",
  "progress",
  "q",
  "radialGradient",
  "rp",
  "rt",
  "ruby",
  "s",
  "samp",
  "script",
  "section",
  "select",
  "small",
  "source",
  "spacer",
  "span",
  "stop",
  "strike",
  "strong",
  "style",
  "sub",
  "summary",
  "sup",
  "svg",
  "switch",
  "symbol",
  "table",
  "tbody",
  "td",
  "template",
  "textarea",
  "tfoot",
  "th",
  "thead",
  "time",
  "title",
  "tr",
  "track",
  "tspan",
  "tt",
  "u",
  "ul",
  "use",
  "var",
  "video",
  "view",
  "wbr",
  "xmp",
];

/**
 * Lambda used to exporty to PDF a event
 */
export async function sendBackPdf(event: any) {
  inputHtml = event;
  if (inputHtml.substring(0, 3) === "%3C") {
    inputHtml = decodeURIComponent(inputHtml);
  }
  inputHtml = updateStyle(inputHtml);
  encodeSpecialCharacters();

  const window = new JSDOM("").window;
  const DOMPurify = createDOMPurify(window);
  inputHtml = DOMPurify.sanitize(inputHtml, {
    FORBID_ATTR: ["src", "href"],
  });

  return await sendPDF(inputHtml);
}

/**
 * Update style if the payload contain an empty values by adding the font 'Courier New'
 * @param payload is the input
 * @returns
 */
export const updateStyle = (payload: string): string => {
  return payload.replace(
    "<style></style>",
    `<style>${COURIER_NEW};html, body {font-family: "Courier New"; word-wrap: break-word;}</style>`
  );
};

/**
 * Encodes the "<" in inputHtml which can be taken for an html tag by JSDOM
 */
const encodeSpecialCharacters = () => {
  let output: string = "";
  let tagNamePossible: string = "";
  let isEndTag: Boolean = false;
  for (let i = 0; i < inputHtml.length; i++) {
    const char = inputHtml[i];
    if (char === "<") {
      // Get characters until we encounter a space or a newline
      for (let j = i + 1; j < inputHtml.length; j++) {
        const nextChar = inputHtml[j];
        // If the first next character is "/""
        if (
          (nextChar === "/" && j == i + 1) ||
          (nextChar === "!" && j == i + 1)
        ) {
          isEndTag = true;
        }

        if (
          nextChar === " " ||
          nextChar === "\n" ||
          nextChar === "\r" ||
          nextChar === ">" ||
          nextChar === "/"
        ) {
          break;
        }
        tagNamePossible += nextChar;
      }
      // If tagNamePossible is in the list of allTagsHTML, replace "<" with "&lt;"
      if (!allTagsHTML.includes(tagNamePossible) && !isEndTag) {
        output += "&lt;";
      } else {
        output += "<";
      }
      tagNamePossible = "";
      isEndTag = false;
    } else {
      // If it's not "<", simply add the character to the output
      output += char;
    }
  }
  inputHtml = output;
};

/**
 * To create and send the pdf
 *
 * @param inputHtml
 * @returns pdf
 */
async function sendPDF(inputHtml: string) {
  chromium.setHeadlessMode = true;

  const executablePath = await chromium.executablePath();

  let browser;
  try {
    browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      headless: chromium.headless,
      executablePath,
    });
  } catch (error) {
    throw new Error("An error occurred while launching Puppeteer: " + error);
  }

  const page = await browser.newPage();

  await page.setJavaScriptEnabled(false);

  try {
    await page.goto(`data:text/html,${inputHtml}`, {
      waitUntil: "networkidle2",
    });
  } catch (error) {
    await browser.close();
    throw new Error("An error occurred while loading the page: " + error);
  }

  const pdf = await page.pdf({ printBackground: true, format: "A4" });

  await browser.close();

  return pdf.toString("base64");
}

/** convert style attributes to css style name ( marginRight --> margin-right ) */
function toCSSName(text: string) {
  return text.replace(/([a-z]|(?=[A-Z]))([A-Z])/g, "$1-$2")?.toLowerCase();
}

/** convert classList of a element to css selector */
function classListToSelector(element: Element) {
  const text = element?.classList.value;
  if (!text) {
    return element.tagName.toLowerCase();
  }
  return `.${text.replace(/\s/g, ".")}`;
}

/** Clean and convert css */
function buildCleanCss(styles: { [k: string]: { [k: string]: string } }) {
  let cleanedStyle = "";
  Object.keys(styles).forEach((cssSelector) => {
    let attributes = "";
    Object.keys(styles[cssSelector]).forEach((styleName) => {
      attributes = `${attributes}${styleName}:${styles[cssSelector][styleName]};`;
    });
    cleanedStyle = `${cleanedStyle}${cssSelector}{${attributes}}`;
  });
  return cleanedStyle;
}

/** Get dom content of the element to export */
export function preparePdfContent() {
  let htmlContent = "";
  let cssContent = "";
  const cssBuild: { [k: string]: any } = {};
  const parent = document.querySelectorAll(".container");
  htmlContent = `${htmlContent}${parent[0].outerHTML}`;
  const parentClass = classListToSelector(parent[0]);
  function updateCss(
    elements: NodeListOf<Element> | HTMLCollection,
    immediateParent?: string
  ) {
    Object.values(elements).forEach((element) => {
      const currentSelector = classListToSelector(element);
      // build custom css selector for Immediate parent element
      const builtImmediateParent =
        immediateParent && immediateParent !== parentClass
          ? ` ${immediateParent}`
          : "";
      const parentSelector = `${parentClass}${builtImmediateParent}`;
      // build custom css selector for current element
      const builtElementSelector =
        parentClass !== currentSelector ? `>${currentSelector}` : "";
      const selector = `${parentSelector}${builtElementSelector}`;
      // get style of element add to css object
      if (!cssBuild[selector]) {
        const cssCleaned: { [k: string]: any } = {};
        const cssKeys = getComputedStyle(element);
        Object.values(cssKeys).forEach((key) => {
          if (isNaN(parseInt(key, 10)) && cssKeys[key as any]) {
            cssCleaned[toCSSName(key)] = cssKeys.getPropertyValue(key);
          }
        });
        cssBuild[selector] = cssCleaned;
      }
      // get and update style for all children
      if (element.children.length) {
        updateCss(element.children, currentSelector);
      }
    });
  }
  // get css content
  updateCss(parent);

  // build css from object
  cssContent = buildCleanCss(cssBuild);

  return `<!DOCTYPE html>
    <html><body>
    <style>
    ${cssContent}
    </style>
    ${htmlContent}
    </body></html>`;
}

export function uint8ArrayFromBase64(base64: string) {
  return Uint8Array.from(window.atob(base64), (v) => v.charCodeAt(0));
}

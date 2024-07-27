"use strict";
import logger from "./utils/logger";
const puppeteer = require("puppeteer-core");
const chromium = require("@sparticuz/chromium");
const createDOMPurify = require("dompurify");
const { JSDOM } = require("jsdom");

let inputHtml: string ="";

/**
 * Lambda used to exporty to PDF a event
 */
export async function sendBackPdf(event, context) {
  if (typeof process.env.EXPORT_PDF_TAGS_ALLOWLIST === 'undefined') {
    throw new Error("process.env.EXPORT_PDF_TAGS_ALLOWLIST is undefined");
  } else {
    const whiteListTags: string[] = JSON.parse(process.env.EXPORT_PDF_TAGS_ALLOWLIST);
    if (process.env.LOG_LEVEL === "DEBUG") {
      logger.debug("EXPORT_PDF_TAGS_ALLOWLIST: ", whiteListTags);
    }
    inputHtml = event.body;

    if (inputIsSafe(whiteListTags)) {
      return await sendPDF(inputHtml);
    } else {
      if (process.env.TOTAL_BLOCKING_IS_ENABLED === "true") {
        return null;
      }
      const window = new JSDOM("").window;
      const DOMPurify = createDOMPurify(window);
      inputHtml = DOMPurify.sanitize(inputHtml, {
        FORBID_ATTR: ["src", "href"],
      });

      if (process.env.LOG_LEVEL === "DEBUG") {
        logger.debug("Removed attributes from input HTML", DOMPurify.removed);
      }
      return await sendPDF(inputHtml);
    }
  }
}

/**
 * Test the input with a whitelist
 * @param page ie event.body, it's the input
 * @returns true if the input contains exclusively tags defined in the whitelist below, false otherwise
 */
const inputIsSafe = (whiteListTags: string[]) => {
  const dom = new JSDOM(inputHtml);

  const window = new JSDOM("").window;
  const DOMPurify = createDOMPurify(window);

  let inputIsSafe: boolean = true;

  // Create a Element whitelist
  let whiteListTagsElement: Element[] = Array.from(
    dom.window.document.querySelectorAll(whiteListTags.join(","))
  );

  // Capture all tags
  let allTags: Element[] = Array.from(dom.window.document.querySelectorAll("*"));

  // Saving the starting pdf
  const firstPDF = inputHtml;

  for (let tag of allTags) {
    if (!whiteListTagsElement.includes(tag)) {
      const attributs: string[] = tag.getAttributeNames();
      attributs.forEach((attribute: string) => {
        const valueAttribute: string | null = tag.getAttribute(attribute);
        logger.warn(
          `Tag not included in whitelist: ${tag.tagName}, Attribute: ${attribute}, Value: ${valueAttribute}`
        );
      });

      if (process.env.PARTIAL_BLOCKING_IS_ENABLED === "true") {
        inputHtml = DOMPurify.sanitize(inputHtml, {
          FORBID_TAGS: [tag.tagName],
        });
      }
      inputIsSafe = false
    }
  }

  if(inputIsSafe){
    if (process.env.LOG_LEVEL === "DEBUG") {
      logger.debug(`PDF safe:  ${inputHtml}`);
    }
  }else{
    logger.warn(`PDF containing tag(s) not included in the white list: ${firstPDF}`);
    if (process.env.PARTIAL_BLOCKING_IS_ENABLED === "true") {
      logger.warn(`PDF cleaned:  ${inputHtml}`);
    }
  }

  return inputIsSafe;
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
  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    headless: chromium.headless,
    executablePath,
  });

  const page = await browser.newPage();
  await page.setJavaScriptEnabled(false);
  await page.goto(`data:text/html,${inputHtml}`, {
    waitUntil: "networkidle2",
  });

  const pdf = await page.pdf({ printBackground: true, format: "A4" });

  await browser.close();
  return {
    statusCode: 200,
    isBase64Encoded: true,
    headers: {
      "Content-type": "application/pdf",
    },
    body: pdf.toString("base64"),
  };
}

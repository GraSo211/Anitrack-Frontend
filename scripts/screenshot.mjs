import { mkdir } from "node:fs/promises";
import { dirname } from "node:path";
import { chromium } from "playwright";

const args = process.argv.slice(2);
const positional = args.filter((arg) => !arg.startsWith("--"));
const flags = Object.fromEntries(
    args
        .filter((arg) => arg.startsWith("--"))
        .map((arg) => {
            const [key, value = "true"] = arg.replace(/^--/, "").split("=");
            return [key, value];
        }),
);

const url = positional[0] ?? "http://localhost:3000";
const out =
    positional[1] ?? `/tmp/opencode/screenshots/shot-${Date.now()}.png`;
const width = Number(flags.width ?? 1440);
const height = Number(flags.height ?? 900);
const wait = Number(flags.wait ?? 1500);

await mkdir(dirname(out), { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({
    viewport: { width, height },
    deviceScaleFactor: Number(flags.scale ?? 1),
    colorScheme: flags.scheme === "light" ? "light" : "dark",
});
await page.goto(url, { waitUntil: "networkidle" });
await page.waitForTimeout(wait);

if (flags.hide) {
    for (const selector of flags.hide.split(",")) {
        await page.locator(selector).evaluateAll((nodes) => {
            for (const node of nodes) node.style.visibility = "hidden";
        });
    }
}

if (flags.selector && !flags.screen) {
    await page.locator(flags.selector).screenshot({ path: out });
} else {
    if (flags.screen && flags.selector) {
        await page.locator(flags.selector).scrollIntoViewIfNeeded();
        await page.evaluate(
            (offset) => window.scrollBy(0, offset),
            Number(flags.scroll ?? 0),
        );
        await page.waitForTimeout(300);
    }
    await page.screenshot({ path: out, fullPage: flags.full === "true" });
}

await browser.close();
console.log(out);

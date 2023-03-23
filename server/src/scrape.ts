const playwright = require('playwright');

async function scrape() {
    console.log("scraping")
    const browser = await playwright.chromium.launch({ headless: true });

    const page = await browser.newPage();

    await page.goto('https://phoenixnlotus.com/collections/tarot-decks?page=1');

    const decks = await page.locator(".grid-product__meta").allTextContents();

    decks.forEach((deck: any) => console.log(deck))

    await page.waitForTimeout(5000);
    await browser.close();
}

module.exports = { scrape };

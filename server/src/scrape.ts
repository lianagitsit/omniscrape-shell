const playwright = require('playwright');

async function scrape() {
    console.log("scraping")
    const browser = await playwright.chromium.launch({ headless: true });

    const page = await browser.newPage();

    await page.goto('https://phoenixnlotus.com/collections/tarot-decks?page=1');
    
    const pageTitle = await page.title();

    const deck = await page.locator(".grid-product__meta").filter({hasText: 'Light Visions'});

    const deckName = await deck.locator(".grid-product__title").textContent();
    
    const price = await deck.locator(".grid-product__price").textContent();

    await page.waitForTimeout(5000);
    await browser.close();

    return {
        pageTitle,
        deckName,
        price
    };
}

module.exports = { scrape };

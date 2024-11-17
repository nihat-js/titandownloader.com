import playwright from 'playwright';




export async function downloadFromTiktok(url: string) {
  try {

    const browser = await playwright.chromium.launch({headless : false})
    const page = await browser.newPage()
    await page.setExtraHTTPHeaders({
      'Accept-Language': 'en-US,en;q=0.9',
      'Accept-Encoding': 'gzip, deflate, br',
      'Connection': 'keep-alive',
      'Upgrade-Insecure-Requests': '1',
      'DNT': '1', // Do Not Track header
    });
    await page.goto(url)
    let source, sourceElement = await page.$("source")
    if (sourceElement) {
      source = await sourceElement.getAttribute('src')
    } else {
      console.log("No element found")
    }

    return {
      source: source
    }
  } catch (error) {
    console.error('Error fetching the page:', error);
  }
}
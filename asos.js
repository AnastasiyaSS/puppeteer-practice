import puppeteer from 'puppeteer'

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setUserAgent(
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36"
  );
  await page.goto("https://asos.com/");
  await page.type("#chrome-search", "the ordinary");
  await Promise.all([
    page.waitForNavigation(),
    page.click("[data-testid=search-button-inline]"),
  ])
    .then((resp) => page.pdf({path: 'asos.pdf', format: 'a4'}));

  await browser.close();
})();
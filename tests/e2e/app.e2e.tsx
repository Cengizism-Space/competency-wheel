import puppeteer, { Page, Browser } from "puppeteer";

let browser: Browser;
let page: Page;
let promises: Promise<any>[] = [];

beforeAll(async () => {
  browser = await puppeteer.launch({
    // headless: false,
  });
  page = await browser.newPage();
  const timeout = 5000;
  page.setDefaultTimeout(timeout);

  const startWaitingForEvents = () => {
    promises.push(page.waitForNavigation());
  };
  startWaitingForEvents();
  await page.goto("http://localhost:3000/");
  await Promise.all(promises);
});

afterAll(async () => {
  await browser.close();
});

describe("App", () => {
  it('should be titled "Competency.."', async () => {
    await expect(page.title()).resolves.toMatch("Competency wheel app");
  });
});

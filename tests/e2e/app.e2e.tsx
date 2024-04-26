import puppeteer, { Page, Browser } from "puppeteer";

let browser: Browser;
let page: Page;
let promises: Promise<any>[] = [];

beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: false,
    defaultViewport: {
      width: 1200,
      height: 1100,
    },
  });
  page = await browser.newPage();
  const timeout = 10000;
  page.setDefaultTimeout(timeout);

  const startWaitingForEvents = () => {
    promises.push(page.waitForNavigation());
  };
  startWaitingForEvents();
  await page.goto("http://localhost:3000/");
  await Promise.all(promises);
}, 10000);

afterAll(async () => {
  await browser.close();
});

describe("App", () => {
  it('should be titled "Competency.."', async () => {
    await expect(page.title()).resolves.toMatch("Competency wheel app");
  });

  it("should click on start a fresh wheel and navigate to wheel page", async () => {
    await page.click('[data-testid="start-fresh-wheel-button"]');
    await page.waitForSelector('[data-testid="wheel-component"]');
  });

  it("should add a new competency", async () => {
    await page.type(
      '[data-testid="competency-title-input"]',
      "First Competency"
    );
    await page.type(
      '[data-testid="competency-description-input"]',
      "This is a new competency"
    );
    await page.click('[data-testid="increase-value-button"]');
    await page.click('[data-testid="increase-value-button"]');
    await page.click('[data-testid="competency-submit-button"]');
  });

  it("should add a second competency", async () => {
    await page.type(
      '[data-testid="competency-title-input"]',
      "Second Competency"
    );
    await page.click('[data-testid="improvement-button"]');
    await page.click('[data-testid="decrease-value-button"]');
    await page.click('[data-testid="competency-submit-button"]');
  });

  it("should keep the browser window open for 30 seconds", async () => {
    await new Promise((resolve) => setTimeout(resolve, 10000));
  }, 10000);
});

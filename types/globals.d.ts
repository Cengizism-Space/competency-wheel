declare namespace NodeJS {
  interface Global {
    page: import('puppeteer').Page;
    browser: import('puppeteer').Browser;
  }
}
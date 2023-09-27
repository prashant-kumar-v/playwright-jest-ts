import { Browser, BrowserContext, Page, chromium } from "playwright"
import HomePage from "../pages/HomePage";
import Helpers from "../utils/Helpers";
import ProductPage from "../pages/ProductPage";
import ProductCartSideSheet from "../pages/ProductCartSideSheet";

describe("Amazon test", () => {
  let browser: Browser;
  let context: BrowserContext;
  let page: Page;

  // pages
  let homepage: HomePage;
  let productPage: ProductPage;
  let productCartSideSheet:ProductCartSideSheet;

  // utils
  let helpers: Helpers

  beforeAll(async () => {
    browser = await chromium.launch({
      headless: false
    });
    context = await browser.newContext();
    page = await context.newPage();
    await page.goto("https://www.amazon.in/");

  })

  afterAll(async () => {
    // await browser.close();
  })

  test("amazon aut", async () => {

    homepage = new HomePage(page);
    await homepage.searchProduct("iphone 14");
    await homepage.clickOnSearchBtn();

    const [newWindow] = await Promise.all([
      context.waitForEvent("page"),
      await page.getByRole('heading', { name: 'Apple iPhone 14 (128 GB) - Midnight' }).getByRole('link').click()
    ])
    await newWindow.waitForLoadState("domcontentloaded");

    productPage = new ProductPage(newWindow);
    await productPage.verifyProductTitle("Apple iPhone 14 (128 GB) - Midnight");
    await productPage.clickOnAddToCartBtn();
    await newWindow.waitForTimeout(2000);
    
    productCartSideSheet = new ProductCartSideSheet(newWindow);
    await productCartSideSheet.verifyCartSideSheetIsDisplayed();
    await productCartSideSheet.clickOnSideSheetCartBtn();
  })
})
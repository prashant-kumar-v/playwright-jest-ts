import { Browser, BrowserContext, Page, chromium } from "playwright"
import HomePage from "../pages/HomePage";
import Helpers from "../utils/Helpers";
import ProductPage from "../pages/ProductPage";
import ProductCartSideSheet from "../pages/ProductCartSideSheet";
import CartPage from "../pages/CartPage";

describe("Amazon test", () => {
  let browser: Browser;
  let context: BrowserContext;
  let page: Page;

  // pages
  let homepage: HomePage;
  let productPage: ProductPage;
  let productCartSideSheet: ProductCartSideSheet;
  let cartPage: CartPage;

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
    await browser.close();
  })

  test("Verify that Cart Count is replenished in navbar if the user add to cart some product", async () => {

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
    await newWindow.waitForTimeout(3000);

    productCartSideSheet = new ProductCartSideSheet(newWindow);
    await productCartSideSheet.verifyCartSideSheetIsDisplayed();
    await productCartSideSheet.clickOnCrossBtn();
    await newWindow.waitForTimeout(3000);

    await productPage.getCartCountAndVerify(1);
    await productPage.clickOnNavCartLink();
    await newWindow.waitForTimeout(3000);


    cartPage=new CartPage(newWindow);
    await cartPage.clickOnDeleteBtn();
    await newWindow.waitForTimeout(3000);


    await productPage.getCartCountAndVerify(0);
  })
})
import { Locator, Page } from "playwright";

export default class ProductCartSideSheet {
  private page: Page;
  private cartSideSheet: Locator;
  private crossBtn: Locator;
  private sideSheetCartBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartSideSheet = page.locator("div[id='attach-accessory-pane']");
    this.sideSheetCartBtn = page.locator("span[id='attach-sidesheet-view-cart-button'] input");
    this.crossBtn = page.locator("a#attach-close_sideSheet-link");
  }

  // Functions
  async verifyCartSideSheetIsDisplayed() {
    const boundingBox = await this.cartSideSheet.boundingBox();

    expect((boundingBox && boundingBox.width > 0 && boundingBox.height > 0) ? true : false).toBeTruthy();

  }

  async clickOnCrossBtn(){
    await this.crossBtn.click();
  }

  async clickOnSideSheetCartBtn() {
    await this.sideSheetCartBtn.click();
  }

}
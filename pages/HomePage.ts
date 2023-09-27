import { Locator, Page } from "playwright";

export default class HomePage {

  private page: Page;
  private searchBox: Locator;
  private searchBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchBox = page.locator("input[id='twotabsearchtextbox']");
    this.searchBtn = page.locator("input[id='nav-search-submit-button']");
  }

  async searchProduct(txt: string) {
   await this.searchBox.fill(txt);
  }

  async clickOnSearchBtn() {
    await this.searchBtn.click();
  }
}
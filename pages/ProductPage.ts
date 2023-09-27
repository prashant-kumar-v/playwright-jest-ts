import { Locator, Page } from "playwright";

export default class ProductPage {

  private page: Page;
  private productTitle: Locator;
  private addToCartBtn: Locator;
  private buyNowBtn: Locator;
  private navCartCount:Locator;
  private navCartLink:Locator;


  constructor(page: Page) {
    this.page = page;
    this.productTitle = page.locator("span[id='productTitle']");
    // this.addToCartBtn = page.locator("input[id='add-to-cart-button'][title='Add to Shopping Cart']");
    this.addToCartBtn = page.locator("#desktop_qualifiedBuyBox input[id='add-to-cart-button']");
    this.buyNowBtn = page.locator("input[id='buy-now-button']");
    this.navCartCount = page.locator("span[id='nav-cart-count']");
    this.navCartLink=page.locator("a[id='nav-cart']")
  }

  // Functions
  async verifyProductTitle(productTitle:string) {
    const elementData = await this.productTitle.textContent();
    expect(elementData).toContain(productTitle);
  }

  async clickOnAddToCartBtn() {
    await this.addToCartBtn.click();
  }

  async clickOnNavCartLink(){
    this.navCartLink.click();
  }

  async getCartCountAndVerify(count:number){
    // console.log(await this.navCartCount.textContent());
    expect(Number(await this.navCartCount.textContent())).toEqual(count);
  }
}
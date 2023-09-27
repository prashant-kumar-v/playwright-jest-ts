import { Locator, Page } from "playwright";

export default class CartPage {
  private page: Page;
  private deleteBtn: Locator;
  private proceedToBuyBtn: Locator;
  private selectedQty: Locator;
  private qtyDropdown: Locator;
  private activeCartSubtotal:Locator;

  constructor(page: Page) {
    this.page = page;
    this.deleteBtn = page.locator("span[data-feature-id='delete'] input[value='Delete']");
    this.proceedToBuyBtn = page.locator("[name='proceedToRetailCheckout']");
    this.selectedQty = page.locator("[id='quantity'] option[selected]");
    this.qtyDropdown = page.locator("[id='quantity']");
    this.activeCartSubtotal = page.locator("[id='sc-subtotal-amount-activecart']>span");

  }

  async getSelectedQtyAndVerify(qty:number){
    expect(Number(await this.selectedQty.textContent())).toEqual(qty);
  }

  async changeQty(qty:number){
    await this.qtyDropdown.selectOption(`${qty}`);
  }

  async clickOnDeleteBtn() {
    this.deleteBtn.click();
  }

  async clickOnProceedToBuyBtn() {
    this.proceedToBuyBtn.click();
  }

  async getSubtotalAndVerify(totalAmt:string){
    expect((await this.activeCartSubtotal.textContent())?.trim()).toEqual(totalAmt);
  }
}
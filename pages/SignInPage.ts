import { Page } from "playwright";

export default class SignInPage {
  private page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async verifySignInPageOpened(){
    expect((this.page.url()).startsWith("https://www.amazon.in/ap/signin?")).toBe(true);
  }
}
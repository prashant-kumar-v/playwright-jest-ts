import { BrowserContext, Page } from "playwright"

export default class Helpers {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // async getNewWindowContext(context:BrowserContext,eventSelector:string,actioncallback:()=>Promise<W>):Promise<W>{
  //   const [newWindow]= await Promise.all([
  //     context.waitForEvent(eventSelector),
  //     actioncallback()
  //   ])
  //   return newWindow;
  // }

  async takeScreenshot() {
    const dirPath = "../screenshots/";
    const fileExtension = ".png";
    const fileName= this.getTimestamp();
    await this.page.screenshot({ path: `${dirPath}${fileExtension}${fileExtension}` });
  }

  private getTimestamp() {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}-${String(now.getHours()).padStart(2, '0')}-${String(now.getMinutes()).padStart(2, '0')}-${String(now.getSeconds()).padStart(2, '0')}`;
  }
}
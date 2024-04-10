import { Page, expect, BrowserContext } from "@playwright/test";

export class BasePage {
    readonly page: Page;
    readonly context: BrowserContext;

    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context;
    }

    async goTo(url: string): Promise<void> {
        await this.page.goto(url);
    }
}
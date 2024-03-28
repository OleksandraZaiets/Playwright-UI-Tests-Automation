import { Page, BrowserContext, Locator, expect } from "@playwright/test";

export class HomePage {
    readonly page: Page;
    readonly context: BrowserContext;
    readonly uitapLink: Locator;
    readonly homePageUrl: string;
    readonly homeLink: Locator;
    readonly homePageFirstUrl: string;
    readonly resourcesLink: Locator;
    readonly resourcesPageUrl: string;
    readonly titleUi: Locator;
    readonly quoteAristotle: Locator;
    readonly noteInTable: Locator;
    readonly textUnderTheNote: Locator;
    readonly rubiksCubeImg: Locator;
    readonly rubiksCubeLink: Locator;
    readonly ccLink: Locator;
    readonly pngUrl: string;
    readonly ccUrl: string;
    readonly informationTitles: Locator;
    readonly containerTitles: Locator;

    constructor (page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context;
        this.uitapLink = page.getByRole(`link`, { name: `UITAP` });
        this.homePageUrl = `uitestingplayground.com/`;
        this.homeLink = page.getByRole(`link`, { name: `HOME` });
        this.homePageFirstUrl = `/home`;
        this.resourcesLink = page.getByRole(`link`, { name: `Resources` });
        this.resourcesPageUrl = `/resources`;
        this.titleUi = page.locator(`#title`);
        this.quoteAristotle = page.locator(`#citation`);
        this.noteInTable = page.locator(`.alert`);
        this.textUnderTheNote = page.getByText(`Different automation pitfalls appearing in modern web applications are described and emulated below.`);
        this.rubiksCubeImg = page.locator(`.img-fluid`);
        this.rubiksCubeLink = page.getByRole(`link`, { name: `Rubik's Cube` });
        this.ccLink = page.getByRole(`link`, { name: `CC 4.0 BY-NC` });
        this.pngUrl = `/image`;
        this.ccUrl = `/licenses`;
        this.informationTitles = page.locator(`#overview .row .col-sm`);
        this.containerTitles = page.locator(`section#overview h3 > a`);
    }

    async goToHomePage(): Promise<void> {
        await this.page.goto("/");
    }

    async clickOnUitap(): Promise<void> {
        await this.uitapLink.click();
    }

    async verifyRedirectToHomePage(): Promise<void> {
        await expect(this.page.url()).toContain(this.homePageUrl);
    }

    async clickOnHome(): Promise<void> {
        await this.homeLink.click();
    }

    async verifyRedirectToFirstHomePage(): Promise<void> {
        await expect(this.page.url()).toContain(this.homePageFirstUrl);
    }

    async clickOnResources(): Promise<void> {
        await this.resourcesLink.click();
    }

    async verifyRedirectToResourcesPage(): Promise<void> {
        await expect(this.page.url()).toContain(this.resourcesPageUrl);
    }

    async verifyTitle(): Promise<void> {
        await expect(this.titleUi).toBeVisible();
    }

    async verifyQuote(): Promise<void> {
        await expect(this.quoteAristotle).toBeVisible();
    }

    async verifyNote(): Promise<void> {
        await expect(this.noteInTable).toBeVisible();
    }

    async verifyText(): Promise<void> {
        await expect(this.textUnderTheNote).toBeVisible();
    }

    async verifyRubiksCube(): Promise<void> {
        await expect(this.rubiksCubeImg).toBeVisible();
    }

    async clickOnRubiksCubeAndVerifyRedirect(): Promise<void> {
        await this.rubiksCubeLink.click();
        await expect(this.page.url()).toContain(this.pngUrl);
        await this.page.goBack();
    }

    async clickOnCcAndVerifyRedirect(): Promise<void> {
        await this.ccLink.click();
        await expect(this.page.url()).toContain(this.ccUrl);
    }

        async verifyInformationTitles(): Promise<void> {
            const urls = [
                `/dynamicid`,
                `/classattr`,
                `/hiddenlayers`,
                `/loaddelay`,
                `/ajax`,
                `/clientdelay`,
                `/click`,
                `/textinput`,
                `/scrollbars`,
                `/dynamictable`,
                `/verifytext`,
                `/progressbar`,
                `/visibility`,
                `/sampleapp`,
                `/mouseover`,
                `/nbsp`,
                `/overlapped`,
                `/shadowdom`
            ];

            const container = await this.informationTitles.count();
            for (let i = 0; i < container; i++) {
                await expect(this.informationTitles.nth(i)).toBeVisible();
                const textContent = await this.informationTitles.nth(i).textContent();
                if (!textContent) continue;

                if (i < urls.length) {
                    await this.containerTitles.nth(i).click();

                    if (i === 3) {
                        await this.page.waitForTimeout(5000);
                    }
                    await expect(this.page.url()).toContain(urls[i]);
                    await this.page.goBack();
                }
            }
        }
}


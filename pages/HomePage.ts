import { Page, BrowserContext, Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import { URLS, ENDPOINTS } from "../constants/constants";

export class HomePage extends BasePage {
    readonly uitapLink: Locator;
    readonly homeLink: Locator;
    readonly resourcesLink: Locator;
    readonly titleUi: Locator;
    readonly quoteAristotle: Locator;
    readonly noteInTable: Locator;
    readonly textUnderTheNote: Locator;
    readonly rubiksCubeImg: Locator;
    readonly rubiksCubeLink: Locator;
    readonly ccLink: Locator;
    readonly informationTitles: Locator;
    readonly containerTitles: Locator;

    constructor(page: Page, context: BrowserContext) {
        super(page, context);
        this.uitapLink = page.getByRole(`link`, { name: `UITAP` });
        this.homeLink = page.getByRole(`link`, { name: `HOME` });
        this.resourcesLink = page.getByRole(`link`, { name: `Resources` });
        this.titleUi = page.locator(`#title`);
        this.quoteAristotle = page.locator(`#citation`);
        this.noteInTable = page.locator(`.alert`);
        this.textUnderTheNote = page.getByText(`Different automation pitfalls appearing in modern web applications are described and emulated below.`);
        this.rubiksCubeImg = page.locator(`.img-fluid`);
        this.rubiksCubeLink = page.getByRole(`link`, { name: `Rubik's Cube` });
        this.ccLink = page.getByRole(`link`, { name: `CC 4.0 BY-NC` });
        this.informationTitles = page.locator(`#overview .row .col-sm`);
        this.containerTitles = page.locator(`section#overview h3 > a`);
    }


    async goToHomePage(): Promise<void> {
        await this.goTo(URLS.HOME_URL);
    }

    async clickOnUitap(): Promise<void> {
        await this.uitapLink.click();
    }

    async verifyRedirectToHomePage(): Promise<void> {
        await expect(this.page.url()).toContain(URLS.BASE_HOME_URL);
    }

    async clickOnHome(): Promise<void> {
        await this.homeLink.click();
    }

    async verifyRedirectToFirstHomePage(): Promise<void> {
        await expect(this.page.url()).toContain(ENDPOINTS.HOME);
    }

    async clickOnResources(): Promise<void> {
        await this.resourcesLink.click();
    }

    async verifyRedirectToResourcesPage(): Promise<void> {
        await expect(this.page.url()).toContain(URLS.RESOURCES_URL);
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
        await expect(this.page.url()).toContain(ENDPOINTS.IMAGE);
        await this.page.goBack();
    }

    async clickOnCcAndVerifyRedirect(): Promise<void> {
        await this.ccLink.click();
        await expect(this.page.url()).toContain(ENDPOINTS.LICENSES);
    }

    async verifyInformationTitles(): Promise<void> {
            const urls = [
                ENDPOINTS.DYNAMICID, ENDPOINTS.CLASSATTR, ENDPOINTS.HIDDENLAYERS, ENDPOINTS.LOADDELAY,
                ENDPOINTS.AJAX, ENDPOINTS.CLIENTDELAY, ENDPOINTS.CLICK, ENDPOINTS.TEXTINPUT,
                ENDPOINTS.SCROLLBARS, ENDPOINTS.DYNAMICTABLE, ENDPOINTS.VERIFYTEXT, ENDPOINTS.PROGRESSBAR,
                ENDPOINTS.VISIBILITY, ENDPOINTS.SAMPLEAPP, ENDPOINTS.MOUSEOVER, ENDPOINTS.NBSP,
                ENDPOINTS.OVERLAPPED, ENDPOINTS.SHADOWDOM
            ];

            const container = await this.informationTitles.count();
            for (let i = 0; i < container; i++) {
                await expect(this.informationTitles.nth(i)).toBeVisible();
                const textContent = await this.informationTitles.nth(i).textContent();
                if (!textContent) continue;

                if (i < urls.length) {
                    await this.containerTitles.nth(i).click();

                    if (i === 3) {
                        await this.page.waitForURL(`**${ENDPOINTS.LOADDELAY}`);
                    }
                    await expect(this.page.url()).toContain(urls[i]);
                    await this.page.goBack();
                }
            }
    }
}


import { test as baseTest } from '@playwright/test';
import {HomePage} from "../pages/HomePage";
import {BasePage} from "../pages/BasePage";

const test = baseTest.extend<{
    homePage: HomePage;
    basePage: BasePage;
}>({
    homePage: async ({page, context}, use) => {
        await use(new HomePage(page, context));
    },
    basePage: async ({page, context}, use) => {
        await use(new BasePage(page, context));
    }
});
export default test;
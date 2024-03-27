import { test as baseTest } from '@playwright/test';
import {HomePage} from "../pages/HomePage";

const test = baseTest.extend<{
    homePage: HomePage;
}>({
    homePage: async ({page, context}, use) => {
        await use(new HomePage(page, context));
    },
});
export default test;
import { test as baseTest } from '@playwright/test';

const test = baseTest.extend<{

}>({
    /*webActions: async ({page, context}, use) => {
        await use(new WebActions(page, context));
    },*/
});
export default test;
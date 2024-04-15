import test from "../../lib/BaseTest";

test.describe("Home page", () => {
    //Before Hook goto baseURL
    test.beforeEach(async ({homePage}) => {
        await test.step(`Navigate to home page`, async () => {
            await homePage.goToHomePage();
        });
    });

    test(`Verify header elements`, async ({homePage}) => {
        await test.step(`Click on the navigation link “UITAP” in header and verify redirect`, async () => {
            await homePage.clickOnUitap();
            await homePage.verifyRedirectToHomePage();
        });

        await test.step(`Click on the navigation link “Home” in header and verify redirect`, async () => {
            await homePage.clickOnHome();
            await homePage.verifyRedirectToFirstHomePage();
        });

        await test.step(`Click on the navigation link “Resources” in header and verify redirect`, async () => {
            await homePage.clickOnResources();
            await homePage.verifyRedirectToResourcesPage();
        });
    });

    test(`Verify playground section`, async ({homePage}) => {
        await test.step(`Verify section title “UI Test Automation Playground`, async () => {
            await homePage.verifyTitle();
        });

        await test.step(`Verify quote under title`, async () => {
            await homePage.verifyQuote();
        });

        await test.step(`Verify note with text under the title`, async () => {
            await homePage.verifyNote();
        });

        await test.step(`Verify text under the note`, async () => {
            await homePage.verifyText();
        });

        await test.step(`Verify Rubik's Cube image`, async () => {
            await homePage.verifyRubiksCube();
        });

        await test.step(`Click on Rubik's Cube link`, async () => {
            await homePage.clickOnRubiksCubeAndVerifyRedirect();
        });

        await test.step(`Click on the CC 4.0 BY-NC link`, async () => {
            await homePage.clickOnCcAndVerifyRedirect();
        });
    });

    test(`Verify information section`, async ({homePage}) => {
        await test.step(`Verify all information titles with descriptions, click on all titles and verify redirect`, async () => {
            await homePage.verifyInformationTitles();
        });
    });
});
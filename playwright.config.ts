import { PlaywrightTestConfig, devices } from '@playwright/test';

const config: PlaywrightTestConfig = {
  // Specifies the directory where the test files are located
  testDir: './tests',

  // Includes or excludes files for testing based on a pattern
  testMatch: '**/*.spec.ts',

  // Number of retries for failed tests
  retries: 0,

  // Enables parallel test execution
  // CI environments might have different capabilities, hence the conditional setting
  workers: process.env.CI ? 2 : undefined,

  // Timeout for tests before they are considered failed (in milliseconds)
  timeout: 25000,

  // Global variables accessible in tests
  use: {
    // Applying device emulation
    ...devices['Desktop Chrome'],

    // Path for saving screenshots
    screenshot: 'only-on-failure', // Take screenshots only for failed tests

    // Video recording settings for tests
    video: 'retain-on-failure', // Keep videos only for failed tests

    // Other settings can include cookies, headers, browser window size, etc.
    trace: 'on'
  },

  // Configuration for projects allows running tests with different configurations
  projects: [
    {
      name: 'Chromium',
      use: { ...devices['Desktop Chrome'],
        baseURL: 'http://uitestingplayground.com/home'
      },
    },
    {
      name: 'Firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'WebKit',
      use: { ...devices['Desktop Safari'] },
    },
  ],

  // Plugins
  reporter: 'html', // Use the HTML reporter
};

export default config;
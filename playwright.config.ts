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
  timeout: 10000,

  // Global variables accessible in tests
  use: {
    // Applying device emulation
    ...devices['Desktop Chrome'],

    // Path for saving screenshots
    screenshot: 'only-on-failure', // Take screenshots only for failed tests

    // Video recording settings for tests
    video: 'retain-on-failure', // Keep videos only for failed tests

    // Settings for geolocation, language, and timezone
    locale: 'en-US',
    timezoneId: 'America/New_York',

    // Other settings can include cookies, headers, browser window size, etc.
  },

  // Configuration for projects allows running tests with different configurations
  projects: [
    {
      name: 'Chromium',
      use: { ...devices['Desktop Chrome'] },
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

  // Configuration for starting a web server before running tests
  webServer: {
    command: 'npm run start', // Command to start the server
    port: 3000, // Server port
    timeout: 120_000, // Timeout to wait for the server to start
    reuseExistingServer: !process.env.CI // Reuse server in non-CI environments
  },

  // Plugins
  reporter: 'html', // Use the HTML reporter
};

export default config;
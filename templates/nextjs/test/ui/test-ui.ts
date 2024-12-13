import { execSync } from 'child_process';

/**
 * Runs UI tests using Playwright
 * @returns Exit code from the test execution
 */
function runTests(): number {
  try {
    // Install Playwright dependencies silently
    execSync('pnpm exec playwright install --with-deps', {
      stdio: 'ignore',
    });

    // Run the tests
    execSync('pnpm exec playwright test', {
      stdio: 'inherit', // This will show the test output in the console
    });

    return 0; // Success
  } catch (error) {
    if (error instanceof Error && 'status' in error && typeof error.status === 'number') {
      return error.status; // Return the actual error code from Playwright
    }
    return 1; // Generic error if we can't get the specific status
  }
}

// Run the tests and exit with the appropriate code
process.exit(runTests());

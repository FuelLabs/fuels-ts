import { execSync } from "child_process";

const fuelsVersion = process.env.PUBLISHED_NPM_VERSION;
const projectName = 'test-project';

/**
 * @group integration
 */
describe('CLI', () => {
  beforeAll(() => {
    execSync(`pnpm create fuels@${fuelsVersion} ${projectName} --pnpm --contract --predicate --script`, { stdio: 'inherit' })
  })

  it('should have all the files', () => {
    console.log(process.env.PUBLISHED_NPM_VERSION)
  });
})
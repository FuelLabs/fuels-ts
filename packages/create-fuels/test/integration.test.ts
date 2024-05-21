import { safeExec } from "@fuel-ts/errors/test-utils";
import { execSync } from "child_process";

import type { ProjectPaths} from "./utils/bootstrapProject";
import { bootstrapProject, copyTemplate, resetFilesystem } from "./utils/bootstrapProject";
import { generateArgs } from "./utils/generateArgs";
import { filterOriginalTemplateFiles, getAllFiles } from "./utils/templateFiles";

const fuelsVersion = process.env.PUBLISHED_NPM_VERSION;
const programsToInclude = { contract: true, predicate: true, script: true };

/**
 * @group integration
 */
describe('CLI - Integration', () => {
  const paths: ProjectPaths = bootstrapProject(__filename);;
  const args = generateArgs(programsToInclude, paths.root).join(' ');

  beforeAll(() => {
    copyTemplate(paths.sourceTemplate, paths.template);
  })

  afterAll(() => {
    resetFilesystem(paths.root);
    vi.resetAllMocks();
  });

  it('should perform `pnpm create fuels`', async () => {
    let expectedTemplateFiles = await getAllFiles(paths.template);
    expectedTemplateFiles = filterOriginalTemplateFiles(expectedTemplateFiles, programsToInclude);

    // Perform create fuels
    const { error: createFuelsError } = await safeExec(
      () => execSync(`pnpm create fuels@${fuelsVersion} ${args}`, { stdio: 'inherit' })
    );
    expect(createFuelsError).toBeUndefined();

    // Perform install
    // const { error: installError } = await safeExec(
    //   () => execSync(`pnpm install --ignore-workspace`, { cwd: paths.root, stdio: 'inherit' })
    // )
    // expect(installError).toBeUndefined();

    // Perform `fuels build`
    // const { error: buildError } = await safeExec(
    //   () => execSync(`pnpm fuels build`, { cwd: paths.root, stdio: 'inherit' })
    // )
    // expect(buildError).toBeUndefined();

    const actualTemplateFiles = await getAllFiles(paths.root);
    expect(actualTemplateFiles.sort()).toEqual(expectedTemplateFiles.sort());
  }, { timeout: 60000 });
})
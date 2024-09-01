import { versions } from '@fuel-ts/versions';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

export const rewriteTemplateFiles = (templateDir: string) => {
  const packageJsonFilePath = join(templateDir, 'package.json');
  const fuelsConfigFilePath = join(templateDir, 'fuels.config.ts');

  // package.json
  let contents = readFileSync(packageJsonFilePath, 'utf-8');
  contents = contents.replace(/xprebuild/g, 'prebuild');
  contents = contents.replace(/"fuels": "workspace:\*"/, `"fuels": "${versions.FUELS}"`);
  writeFileSync(packageJsonFilePath, contents);

  // fuels.config.ts
  contents = readFileSync(fuelsConfigFilePath, 'utf-8');
  contents = contents.replace(/\n\W+forcPath: 'fuels-forc',/g, '');
  contents = contents.replace(/\n\W+fuelCorePath: 'fuels-core',/g, '');
  writeFileSync(fuelsConfigFilePath, contents);

  // tests
  const testDir = join(templateDir, 'test');
  const programs = ['contract', 'predicate', 'script'];
  programs.forEach((program) => {
    const testFilePath = join(testDir, `${program}.test.ts`);
    contents = readFileSync(testFilePath, 'utf-8');
    const capitalisedProgram = program.charAt(0).toUpperCase() + program.slice(1);
    contents = contents.replace(/@group node/g, `${capitalisedProgram} Testing`);
    contents = contents.replace(/@group browser/g, '');
    writeFileSync(testFilePath, contents);
  });
};

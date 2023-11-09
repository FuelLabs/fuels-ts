// eslint-disable-next-line import/no-extraneous-dependencies
import { versions } from '@fuel-ts/versions';
import fs from 'fs/promises';
import { join } from 'path';

const replacePhraseWithSomething = async (phrase: RegExp, something: string) => {
  const templatePackageJson = await fs.readFile(
    join(__dirname, '../templates/nextjs/package.json'),
    'utf-8'
  );

  const newPackageJson = templatePackageJson.replace(phrase, something);

  await fs.writeFile(join(__dirname, '../templates/nextjs/package.json'), newPackageJson);
};

// This script injects the latest version of fuels into the package.json of the template, in place of workspace:*.
const run = async () => {
  await replacePhraseWithSomething(/"fuels": "workspace:\*"/, `"fuels": "${versions.FUELS}"`);

  // replace "fuels:init" with "prebuild"
  await replacePhraseWithSomething(/"fuels:init"/, `"prebuild"`);

  // replace "build": "npm run fuels:init && next build", with "build": "next build"
  await replacePhraseWithSomething(
    /"build": "npm run fuels:init && next build"/,
    `"build": "next build"`
  );
};

run().catch(() => {
  process.exitCode = 1;
});

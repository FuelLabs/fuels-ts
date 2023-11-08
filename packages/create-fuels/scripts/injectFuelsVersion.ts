// eslint-disable-next-line import/no-extraneous-dependencies
import { versions } from '@fuel-ts/versions';
import fs from 'fs/promises';
import { join } from 'path';

// This script injects the latest version of fuels into the package.json of the template, in place of workspace:*.
const run = async () => {
  const templatePackageJson = await fs.readFile(
    join(__dirname, '../templates/nextjs/package.json'),
    'utf-8'
  );

  const newPackageJson = templatePackageJson.replace(
    /"fuels": "workspace:\*"/,
    `"fuels": "${versions.FUELS}"`
  );

  await fs.writeFile(join(__dirname, '../templates/nextjs/package.json'), newPackageJson);
};

run().catch(() => {
  process.exitCode = 1;
});

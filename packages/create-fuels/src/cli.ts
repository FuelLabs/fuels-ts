/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
import chalk from 'chalk';
import { Command } from 'commander';
import { createWriteStream } from 'fs';
import { mkdir, unlink } from 'fs/promises';
import { tmpdir } from 'os';
import { join } from 'path';
import { pipeline } from 'stream';
import tar from 'tar';
import { promisify } from 'util';

import packageJson from '../package.json';

const streamPipeline = promisify(pipeline);

async function downloadTar(url) {
  const tempFile = join(tmpdir(), `create-fuels.temp-${Date.now()}`);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Unexpected response ${response.statusText}`);
  }
  // @ts-expect-error types mismatch
  await streamPipeline(response.body, createWriteStream(tempFile));
  return tempFile;
}

export const runScaffoldCli = async () => {
  let projectPath = '';
  new Command(packageJson.name)
    .version(packageJson.version)
    .arguments('<project-name>')
    .usage(`${chalk.green('<project-name>')} [options]`)
    .showHelpAfterError(true)
    .action((name) => {
      projectPath = name;
    })
    .parse(process.argv);

  await mkdir(projectPath);
  const tempFile = await downloadTar(
    `https://codeload.github.com/Dhaiwat10/fuel-cli-starter-template/tar.gz/main` // TODO: change this to a repo in the Fuel org
  );
  await tar.x({
    file: tempFile,
    strip: 1,
    cwd: join(process.cwd(), projectPath),
  });
  await unlink(tempFile);

  console.log();
  console.log();
  console.log(chalk.green(`⚡️ Success! Created a a fullstack Fuel dapp at ${projectPath}`));
  console.log();
  console.log();
  console.log('To get started:');
  console.log();
  console.log(`- cd into the project directory: cd ${projectPath}`);
  console.log(`- Install the dependencies: npm install`);
  console.log('- Start a local Fuel dev server: npx fuels dev`');
  console.log('- Run the frontend by running npm run dev');
  console.log();
  console.log();
  console.log('-> TS SDK docs: https://fuellabs.github.io/fuels-ts/');
  console.log('-> Sway docs: https://fuellabs.github.io/sway/');
  console.log('-> If you have any questions, check the Fuel forum: https://forum.fuel.network/');
  console.log();
  console.log();
};

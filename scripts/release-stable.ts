#!/usr/bin/env node

import prompts from 'prompts';
import sh from 'shelljs';

import { changeAllPkgJSON, deleteMasterReleases } from './utils/changePackages';
import { generateChangelogs } from './utils/generateChangelogs';
import { getVersion } from './utils/getVersion';

(async () => {
  const nextVersion = await getVersion();
  const res = await prompts({
    type: 'text',
    name: 'version',
    message: 'For which version you need to bump?',
    initial: nextVersion || '',
  });

  if (res.version) {
    await changeAllPkgJSON(res.version);
    await generateChangelogs(res.version);
    sh.exec('git add ./CHANGELOG.md');
    sh.exec('git add ./package.json');
    sh.exec('git add ./packages/**/CHANGELOG.md');
    sh.exec('git add ./packages/**/package.json');
    sh.exec(`git commit -m "bump to ${res.version}"`);
    sh.exec(`git tag -a ${res.version} -m "bump to ${res.version}"`);
    sh.exec('git push origin master --tags');
    sh.exec(`pnpm publish -r --tag=latest --no-git-checks --force`);
    await deleteMasterReleases();
  }
})();

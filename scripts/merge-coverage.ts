import { readdirSync, renameSync, rmSync, lstatSync } from 'fs';
import { join } from 'path';

const coverageDir = join(__dirname, '../coverage/');
const environmentsDir = join(coverageDir, '/environments/');
const validEnvironments = ['browser', 'node'];

const main = () => {
  const environments = readdirSync(environmentsDir);
  environments.forEach(async (environment) => {
    if (validEnvironments.includes(environment)) {
      // Move environment coverage directories to a single file
      await renameSync(
        join(environmentsDir, `${environment}/coverage-final.json`),
        join(environmentsDir, `${environment}.json`)
      );
      // Remove environment coverage directory
      rmSync(join(environmentsDir, environment), { recursive: true, force: true });
    }
  });
};

main();

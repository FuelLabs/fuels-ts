import { execSync } from 'child_process';
import { readdirSync, renameSync, rmSync } from 'fs';
import { join } from 'path';

const restructureCoverageDirectory = () => {
  const coverageDir = join(__dirname, '../coverage/');
  const environmentsDir = join(coverageDir, '/environments/');
  const validEnvironments = ['node'];

  const environments = readdirSync(environmentsDir);
  environments.forEach((environment) => {
    if (validEnvironments.includes(environment)) {
      // Move environment coverage directories to a single file
      renameSync(
        join(environmentsDir, `${environment}/coverage-final.json`),
        join(environmentsDir, `${environment}.json`)
      );
      // Remove environment coverage directory
      rmSync(join(environmentsDir, environment), { recursive: true, force: true });
    }
  });
};

(() => {
  // Structure all coverage environment dirs into a single dir
  restructureCoverageDirectory();

  // Merge all coverage files
  execSync('nyc merge coverage/environments coverage/merged/coverage.json');

  // Generate coverage report
  execSync(
    'nyc report --temp-dir=coverage/merged --report-dir=coverage/report --exclude-after-remap=false'
  );
})();

import { execSync } from 'child_process';
import { error } from 'console';

const dtsTsupConfigFile = 'tsup.config.dts.ts';

/**
 * 1) Emit Declaration Maps
 */
try {
  execSync(`tsup --config ${dtsTsupConfigFile}`, { stdio: 'inherit' });
} catch (err) {
  error(err.toString());
  process.exit(1);
}


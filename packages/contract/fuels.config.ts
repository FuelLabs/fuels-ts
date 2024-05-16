// eslint-disable-next-line import/no-relative-packages
import { createConfig } from '../fuels/src/index';

export default createConfig({
  workspace: './test/fixtures/forc-projects',
  output: './test/typegen',
  forcBuildFlags: ['--release'],
});

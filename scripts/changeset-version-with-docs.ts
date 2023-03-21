#!/usr/bin/env node

import sh from 'shelljs';

(() => {
  // Force exit on error
  sh.set(`-e`);

  // Update doc version references
  sh.exec(
    `echo "# generated-file\nfuels: $BUILD_VERSION\nfuel-core: $FUEL_CORE_VERSION\nsway: $FORC_VERSION\nforc: $FORC_VERSION" > docs/_data/versions.yml`
  );

  // Update doc helper
  sh.exec(`pnpm -C ./scripts/typedoc-plugin-guide-builder build`);

  // clean guide
  sh.exec(`rm -rf docs/guide`);

  // Update docs
  sh.exec(`pnpm typedoc`);

  // rollback exit on error
  sh.set(`+e`);

  // commit doc changes
  sh.exec(`git add docs/*`);
  sh.exec(`git commit -m"ci(scripts): update docs"`);

  // run changeset version
  sh.exec(`changeset version`);
})();

/* eslint-disable @typescript-eslint/no-var-requires */

/**
 * This is a special loader for ts-node, intended to be able
 * to run `.ts` files that are importing raw `.hbs` templates.
 *
 * Based on:
 *   https://github.com/TypeStrong/ts-node/issues/652
 *
 */

const fs = require('fs');
const Module = require('module');
const path = require('path');

function register() {
  const cwd = process.cwd();
  const isHbsReg = /\.hbs$/;
  const orginalLoad = Module._load;

  Module._load = function load(request, _parent) {
    if (!isHbsReg.test(request)) {
      return orginalLoad.apply(this, [request, _parent]);
    }
    const dir = path.dirname(_parent ? _parent.filename : cwd);
    const filepath = path.join(dir, request);
    return fs.readFileSync(filepath, 'utf8');
  };

  return () => {
    Module._load = orginalLoad;
  };
}

register();

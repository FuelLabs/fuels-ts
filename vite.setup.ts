import { TestNodeLauncher } from '@fuel-ts/test-utils';

export async function setup() {
  await console.log('Calling setup');
  console.log(process.env);
  // await TestNodeLauncher.prepareCache(25);
}

export async function teardown() {
  console.log('Calling teardown');
  await TestNodeLauncher.cleanCache();
}

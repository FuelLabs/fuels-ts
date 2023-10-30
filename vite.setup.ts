export async function setup() {
  await console.log('Calling setup');
  // await TestNodeLauncher.prepareCache(25);
}

export async function teardown() {
  await console.log('Calling teardown');
  // await TestNodeLauncher.cleanCache();
}

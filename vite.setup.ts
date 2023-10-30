import EventEmitter from 'events';

export async function setup() {
  process.setMaxListeners(0);
  EventEmitter.defaultMaxListeners = 1500;
  await console.log('Calling setup');
  // await TestNodeLauncher.prepareCache(25);
}

export async function teardown() {
  await console.log('Calling teardown');
  // await TestNodeLauncher.cleanCache();
}

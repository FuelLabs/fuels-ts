function sleep(time: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
}

module.exports = async function globalTeardown() {
  console.log('running global teardown');
  await sleep(3000);
};

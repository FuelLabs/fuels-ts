function sleep(time: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
}

module.exports = async function globalTeardown() {
  // Wait a bit before killing jest because the gql subscriptions library doesn't immediately close connections
  await sleep(3000);
};

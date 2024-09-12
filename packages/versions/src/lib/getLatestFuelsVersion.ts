export const getLatestFuelsVersion = async () => {
  const response = await fetch('https://registry.npmjs.org/fuels/latest');
  const data = await response.json();
  return data.version;
};

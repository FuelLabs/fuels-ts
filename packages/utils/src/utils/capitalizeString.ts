export const capitalizeString = (str: string) => {
  if (!str.length) {
    return str;
  }
  return str[0].toUpperCase() + str.slice(1);
};

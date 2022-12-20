import { cyan, green, red } from 'chalk';

export interface IColorizeUserVersion {
  version: string;
  isGt: boolean;
  isOk: boolean;
}

export const colorizeUserVersion = (params: IColorizeUserVersion) => {
  const { version, isGt, isOk } = params;

  if (isGt) {
    return cyan(version);
  }

  if (isOk) {
    return green(version);
  }

  return red(version);
};

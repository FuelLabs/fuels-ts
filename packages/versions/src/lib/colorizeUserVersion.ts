import chalk from 'chalk';

export interface IColorizeUserVersion {
  version: string;
  isGt: boolean;
  isOk: boolean;
}

export const colorizeUserVersion = (params: IColorizeUserVersion) => {
  const { version, isGt, isOk } = params;

  if (isGt) {
    return chalk.cyan(version);
  }

  if (isOk) {
    return chalk.green(version);
  }

  return chalk.red(version);
};

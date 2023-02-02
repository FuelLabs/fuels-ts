import { CategoryEnum } from '../types/enums/CategoryEnum';

export function validateBinFile(params: {
  abiFilepath: string;
  binFilepath: string;
  binExists: boolean;
  category: CategoryEnum;
}) {
  const { abiFilepath, binFilepath, binExists, category } = params;

  const isNotAContract = category !== CategoryEnum.CONTRACT;

  if (!binExists && isNotAContract) {
    throw new Error(
      [
        'Could not find [required] BIN file for given ABI.',
        `- ABI: ${abiFilepath}`,
        `- BIN: ${binFilepath}`,
        category,
      ].join('\n')
    );
  }
}

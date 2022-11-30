import type { ContractsConfig } from 'src/types';
import * as yup from 'yup';

const schema = yup
  .object({
    contracts: yup.array().required('config.contract should be a valid array'),
    types: yup.object({
      output: yup.string().required('config.types.output should be a valid string'),
    }),
  })
  .required();

export async function validateConfig(config: ContractsConfig) {
  try {
    await schema.validate(config);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    throw new Error(err.message);
  }
}

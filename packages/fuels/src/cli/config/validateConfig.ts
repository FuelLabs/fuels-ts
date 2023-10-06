import * as yup from 'yup';

import type { UserFuelsConfig } from '../types';

const schema = yup
  .object({
    workspace: yup.string(),
    contracts: yup
      .array(yup.string().required('config.contracts should be a valid string'))
      .when('workspace', {
        is: (w?: string) => !w,
        then: yup
          .array()
          .required('config.contracts should be a valid array')
          .min(1, 'config.contracts should have at least 1 item'),
      }),
    scripts: yup.array(yup.string()),
    predicates: yup.array(yup.string()),
    output: yup.string().required('config.output should be a valid string'),
  })
  .required();

export async function validateConfig(config: UserFuelsConfig) {
  return schema.validate(config);
}

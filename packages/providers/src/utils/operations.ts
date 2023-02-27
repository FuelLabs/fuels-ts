import { GraphQLClient } from 'graphql-request';

import { getSdk } from '../__generated__/operations';

export const createOperations = (url: string) => {
  const gqlClient = new GraphQLClient(url);
  return getSdk(gqlClient);
};

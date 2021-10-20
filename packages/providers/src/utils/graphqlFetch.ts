import fetch from 'cross-fetch';
import type { FormattedExecutionResult } from 'graphql';

export default async function graphqlFetch<TData = unknown, TVariables = unknown>(
  url: string,
  query: string,
  variables?: TVariables
): Promise<TData> {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const body: FormattedExecutionResult<TData> = await response.json();

  if (body.errors) {
    body.errors.forEach(console.error);
    // TODO: Use AggregateError
    throw new Error(body.errors[0].message);
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return body.data!;
}

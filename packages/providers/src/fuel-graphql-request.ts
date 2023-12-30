import type { DocumentNode } from 'graphql';
import { print } from 'graphql';

export async function fuelGraphQL(
  fetchFn: typeof fetch,
  url: string,
  query: DocumentNode,
  variables: Record<string, unknown>
) {
  console.log(print(query));
  const response = await fetchFn(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: print(query), variables }),
  });

  const { data, errors } = await response.json();

  if (errors) {
    throw new Error(JSON.stringify(errors));
  }

  return data;
}

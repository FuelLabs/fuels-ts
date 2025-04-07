import { FuelGraphqlSubscriber } from "../fuel-graphql-subscriber";

type ParseGraphqlResponseReturns = {
  extensions: {
    current_fuel_block_height?: number;
    fuel_block_height_precondition_failed: boolean;
  };
}

export const parseGraphqlResponse = async (options: { response: Response, isSubscription: boolean }): Promise<ParseGraphqlResponseReturns> => {
  const { response, isSubscription } = options;

  let extensions: {
    current_fuel_block_height?: number;
    fuel_block_height_precondition_failed: boolean;
  };

  const responseClone = response.clone();

  if (isSubscription) {
    const reader = responseClone.body?.getReader() as ReadableStreamDefaultReader<Uint8Array>;
    const { event } = await FuelGraphqlSubscriber.readEvent(reader);

    extensions = event?.extensions as typeof extensions;
  } else {
    extensions = (await responseClone.json()).extensions;
  }

  return {
    extensions,
  }
}

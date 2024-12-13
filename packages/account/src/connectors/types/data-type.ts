import type { AbiSpecification } from '@fuel-ts/abi';
import type { RequireAtLeastOne } from 'type-fest';

/**
 * @name Version
 */
export type Version = {
  app: string;
  /**
   * Version selection this allow
   * Caret Ranges ^1.2.3 ^0.2.5 ^0.0.4
   * Tilde Ranges ~1.2.3 ~1.2 ~1
   * And Exact Versions 1.0.0
   */
  network: string;
};

/**
 * @name Network
 */
export type Network = {
  /**
   * The name of the network.
   */
  url: string;
  /**
   * The chain id of the network.
   */
  chainId: number;
};

/**
 * @name SelectNetworkArguments
 *
 * Select a network requires either the `chainId` or the `url`.
 */
export type SelectNetworkArguments = RequireAtLeastOne<Network, 'chainId' | 'url'>;

/**
 * ABI that represents a binary code interface from Sway.
 *
 * Read more at: https://docs.fuel.network/docs/specs/abi/json-abi-format/
 */
export type FuelABI = AbiSpecification;

import { ErrorCode, FuelError } from '@fuel-ts/errors';

const DEFAULT_BLOCK_EXPLORER_URL = 'https://app.fuel.network';

/** @hidden */
const getPathFromInput = (
  key: BuildBlockExplorerUrlHelperParam,
  value: string | number | undefined
) => {
  const pathMap = {
    address: `address`,
    txId: `transaction`,
    blockNumber: `block`,
  };
  const path = pathMap[key] || key;
  return `${path}/${value}`;
};

type BuildBlockExplorerUrlHelperParam = 'address' | 'txId' | 'blockNumber';

/**
 * @hidden
 *
 * Builds a block explorer url based on and the given path, block explorer URL and provider URL
 */
export const buildBlockExplorerUrl = (
  options: {
    blockExplorerUrl?: string;
    path?: string;
    providerUrl?: string;
    address?: string;
    txId?: string;
    blockNumber?: number;
  } = {}
) => {
  const { blockExplorerUrl, path, providerUrl, address, txId, blockNumber } = options;
  const explorerUrl = blockExplorerUrl || DEFAULT_BLOCK_EXPLORER_URL;

  // make sure that only ONE or none of the following is defined: address, txId, blockNumber
  const customInputParams = [
    {
      key: 'address',
      value: address,
    },
    {
      key: 'txId',
      value: txId,
    },
    {
      key: 'blockNumber',
      value: blockNumber,
    },
  ];

  const definedValues = customInputParams
    .filter((param) => !!param.value)
    .map(({ key, value }) => ({
      key,
      value,
    }));

  const hasAnyDefinedValues = definedValues.length > 0;

  if (definedValues.length > 1) {
    throw new FuelError(
      ErrorCode.ERROR_BUILDING_BLOCK_EXPLORER_URL,
      `Only one of the following can be passed in to buildBlockExplorerUrl: ${customInputParams
        .map((param) => param.key)
        .join(', ')}.`
    );
  }

  if (path && definedValues.length > 0) {
    const inputKeys = customInputParams.map(({ key }) => key).join(', ');
    throw new FuelError(
      ErrorCode.ERROR_BUILDING_BLOCK_EXPLORER_URL,
      `You cannot pass in a path to 'buildBlockExplorerUrl' along with any of the following: ${inputKeys}.`
    );
  }

  const pathGeneratedFromInputParams = hasAnyDefinedValues
    ? getPathFromInput(
        definedValues[0].key as BuildBlockExplorerUrlHelperParam,
        definedValues[0].value
      )
    : '';

  // Remove leading and trailing slashes from the path and block explorer url respectively, if present
  const trimSlashes = /^\/|\/$/gm;
  const cleanPath = path ? path.replace(trimSlashes, '') : pathGeneratedFromInputParams;
  const cleanBlockExplorerUrl = explorerUrl.replace(trimSlashes, '');
  const cleanProviderUrl = providerUrl?.replace(trimSlashes, '');
  const encodedProviderUrl = cleanProviderUrl ? encodeURIComponent(cleanProviderUrl) : undefined;

  // if the block explorer url doesn't have a protocol i.e. http:// or https://, add https://
  const protocol = cleanBlockExplorerUrl.match(/^https?:\/\//) ? '' : 'https://';
  const providerUrlProtocol = cleanProviderUrl?.match(/^https?:\/\//) ? '' : 'https://';

  const url = `${protocol}${cleanBlockExplorerUrl}/${cleanPath}${
    encodedProviderUrl ? `?providerUrl=${providerUrlProtocol}${encodedProviderUrl}` : ''
  }`;

  return url;
};

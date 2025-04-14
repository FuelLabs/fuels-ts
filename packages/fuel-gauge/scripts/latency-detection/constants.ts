import { ContractEnum } from './types';

export const CONTRACT_IDS = {
  devnet: {
    [ContractEnum.TransferContract]:
      '0xe785250c141d1c50c6ee4dc28cba5ef9c8f760ef2be5d3f93bfc8391dc8c0a84',
    [ContractEnum.LogContract]:
      '0x9c6478c277c38e9abc485b03619be75b33c2debc24ab62a7530c8ae79ee6819d',
    [ContractEnum.AdvancedLogContract]:
      '0x5c443b6b4141e25b6f210d9124f366efadc5570f7a60fd389276e06139bc5c43',
  },
  testnet: {
    [ContractEnum.TransferContract]:
      '0x32094faf567257d3347a00df9c2e62530074a6d5037edf3f7c637b35656f502d',
    [ContractEnum.LogContract]:
      '0x4b23f93fa8eb62e2a61ec7e3e000aa260aa9affb4efc6e7d8859f4b835dfa6e8',
    [ContractEnum.AdvancedLogContract]:
      '0xc450e651cf79481cee7db363b9ee1264ef3509c9b33f81b5fde5b9a1e0d946eb',
  },
};

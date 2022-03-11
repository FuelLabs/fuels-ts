import { BigNumber } from '@ethersproject/bignumber';
import type { Provider, SpendQueryElement } from '@fuel-ts/providers';
import { returnZeroScript, TransactionType, InputType, OutputType } from '@fuel-ts/providers';

interface WalletLike {
  address: string;
  provider: Provider;
}

export const seedWallet = async (wallet: WalletLike, query: SpendQueryElement[]) => {
  const { provider } = wallet;

  const sender = '0x0101010101010101010101010101010101010101010101010101010101010101';
  const coins = await provider.getCoinsToSpend(sender, query);

  const response = await provider.sendTransaction({
    type: TransactionType.Script,
    gasPrice: BigNumber.from(0),
    gasLimit: BigNumber.from(1000000),
    bytePrice: BigNumber.from(0),
    script: returnZeroScript.bytes,
    scriptData: '0x',
    inputs: coins.map((coin) => ({
      type: InputType.Coin,
      ...coin,
      witnessIndex: 0,
    })),
    outputs: query.flatMap(({ assetId, amount }) => [
      {
        type: OutputType.Coin,
        assetId,
        amount,
        to: wallet.address,
      },
      { type: OutputType.Change, assetId, to: sender },
    ]),
    witnesses: ['0x'],
  });

  await response.wait();
};

/* eslint-disable @typescript-eslint/no-explicit-any */
import type { BigNumberish } from '@ethersproject/bignumber';
import { BigNumber } from '@ethersproject/bignumber';
import { concat, hexlify } from '@ethersproject/bytes';
import { Logger } from '@ethersproject/logger';
import type { JsonFragment, FunctionFragment } from '@fuel-ts/abi-coder';
import { Interface } from '@fuel-ts/abi-coder';
import type { TransactionRequest } from '@fuel-ts/providers';
import { Provider } from '@fuel-ts/providers';
import type { Receipt } from '@fuel-ts/transactions';
import { InputType, OutputType, ReceiptType, TransactionType } from '@fuel-ts/transactions';

const genBytes32 = () => hexlify(new Uint8Array(32).map(() => Math.floor(Math.random() * 256)));

type ContractFunction<T = any> = (...args: Array<any>) => Promise<T>;

export type Overrides = {
  gasPrice: BigNumberish;
  gasLimit: BigNumberish;
  maturity: BigNumberish;
};

const logger = new Logger('0.0.1');

const buildCall = (contract: Contract, func: FunctionFragment): ContractFunction =>
  async function call(...args: Array<any>): Promise<any> {
    if (contract.provider === null || contract.provider === undefined) {
      return logger.throwArgumentError(
        'Cannot call without provider',
        'provider',
        contract.provider
      );
    }
    let overrides = {};
    if (args.length === func.inputs.length + 1 && typeof args[args.length - 1] === 'object') {
      overrides = args.pop() as BigNumberish;
    }

    const transaction: TransactionRequest = {
      type: TransactionType.Script,
      gasPrice: BigNumber.from(0),
      gasLimit: BigNumber.from(1000000),
      maturity: BigNumber.from(0),
      ...overrides,
      script:
        /*
        Opcode::ADDI(0x10, REG_ZERO, script_data_offset)
        Opcode::CALL(0x10, REG_ZERO, 0x10, REG_CGAS)
        Opcode::RET(REG_RET)
        Opcode::NOOP
      */
        '0x504001e02d40040a2434000047000000',
      scriptData: hexlify(concat([contract.id, contract.interface.encodeFunctionData(func, args)])),
      inputs: [{ type: InputType.Contract, contractId: contract.id }],
      outputs: [{ type: OutputType.Contract, inputIndex: 0 }],
      witnesses: [
        // A dummy witness to make the transaction hash change to avoid collisions
        genBytes32(),
      ],
    };
    const response = await contract.provider.sendTransaction(transaction);
    const result = await response.wait();

    const receipts = result.receipts as Receipt[];
    const returnReceipt = receipts.reverse().find((receipt) => receipt.type === ReceiptType.Return);
    const returnValue = (returnReceipt as any).data.val;

    return returnValue;
  };

export default class Contract {
  interface!: Interface;
  id!: string;
  provider!: Provider | null;
  // Keyable functions
  functions!: { [key: string]: any };

  constructor(
    id: string,
    abi: ReadonlyArray<JsonFragment>,
    signerOrProvider: Provider | null = null
  ) {
    this.interface = new Interface(abi);
    this.functions = this.interface.functions;
    this.id = id;

    if (signerOrProvider === null) {
      this.provider = null;
    } else if (signerOrProvider instanceof Provider) {
      this.provider = signerOrProvider;
    }

    //  TODO: Update this so the generated methods call the contract
    Object.keys(this.functions).forEach((name) => {
      const fragment = this.interface.getFunction(name);
      Object.defineProperty(this.functions, fragment.name, {
        value: buildCall(this, fragment),
        writable: false,
      });
    });
  }
}

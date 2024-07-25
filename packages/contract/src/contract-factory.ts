import { BYTES_32, Interface } from '@fuel-ts/abi-coder';
import type { JsonAbi, InputValue } from '@fuel-ts/abi-coder';
import type {
  Account,
  CreateTransactionRequestLike,
  Provider,
  TransactionResult,
  TransactionType,
} from '@fuel-ts/account';
import { CreateTransactionRequest, BlobTransactionRequest } from '@fuel-ts/account';
import { randomBytes } from '@fuel-ts/crypto';
import { ErrorCode, FuelError } from '@fuel-ts/errors';
import type { BytesLike } from '@fuel-ts/interfaces';
import { Contract, InstructionSet } from '@fuel-ts/program';
import type { StorageSlot } from '@fuel-ts/transactions';
import { arrayify, concat, isDefined } from '@fuel-ts/utils';
import * as asm from '@fuels/vm-asm';
import { blob } from 'stream/consumers';

import { getContractId, getContractStorageRoot, hexlifyWithPrefix } from './util';

/**
 * Options for deploying a contract.
 */
export type DeployContractOptions = {
  salt?: BytesLike;
  storageSlots?: StorageSlot[];
  stateRoot?: BytesLike;
  configurableConstants?: { [name: string]: unknown };
} & CreateTransactionRequestLike;

export type DeployContractResult<TContract extends Contract = Contract> = {
  transactionId: string;
  contractId: string;
  waitForResult: () => Promise<{
    contract: TContract;
    transactionResult: TransactionResult<TransactionType.Create>;
  }>;
};

export type ContractChunk = {
  id: number;
  size: number;
  bytecode: Uint8Array;
  blobId?: string;
};

/**
 * `ContractFactory` provides utilities for deploying and configuring contracts.
 */
export default class ContractFactory {
  bytecode: Uint8Array;
  interface: Interface;
  provider!: Provider | null;
  account!: Account | null;

  /**
   * Create a ContractFactory instance.
   *
   * @param bytecode - The bytecode of the contract.
   * @param abi - The contract's ABI (Application Binary Interface).
   * @param accountOrProvider - An account or provider to be associated with the factory.
   */
  constructor(
    bytecode: BytesLike,
    abi: JsonAbi | Interface,
    accountOrProvider: Account | Provider | null = null
  ) {
    // Force the bytecode to be a byte array
    this.bytecode = arrayify(bytecode);

    if (abi instanceof Interface) {
      this.interface = abi;
    } else {
      this.interface = new Interface(abi);
    }

    /**
     Instead of using `instanceof` to compare classes, we instead check
      if `accountOrProvider` has a `provider` property inside. If yes,
      than we assume it's a Wallet.

      This approach is safer than using `instanceof` because it
      there might be different versions and bundles of the library.

      The same is done at:
      - ./contract.ts

      @see Contract
      */
    if (accountOrProvider && 'provider' in accountOrProvider) {
      this.provider = accountOrProvider.provider;
      this.account = accountOrProvider;
    } else {
      this.provider = accountOrProvider;
      this.account = null;
    }
  }

  /**
   * Connect the factory to a provider.
   *
   * @param provider - The provider to be associated with the factory.
   * @returns A new ContractFactory instance.
   */
  connect(provider: Provider) {
    return new ContractFactory(this.bytecode, this.interface, provider);
  }

  /**
   * Create a transaction request to deploy a contract with the specified options.
   *
   * @param deployContractOptions - Options for deploying the contract.
   * @returns The CreateTransactionRequest object for deploying the contract.
   */
  createTransactionRequest(deployContractOptions?: DeployContractOptions) {
    const storageSlots = deployContractOptions?.storageSlots
      ?.map(({ key, value }) => ({
        key: hexlifyWithPrefix(key),
        value: hexlifyWithPrefix(value),
      }))
      .sort(({ key: keyA }, { key: keyB }) => keyA.localeCompare(keyB));

    const options = {
      salt: randomBytes(32),
      ...deployContractOptions,
      storageSlots: storageSlots || [],
    };

    if (!this.provider) {
      throw new FuelError(
        ErrorCode.MISSING_PROVIDER,
        'Cannot create transaction request without provider'
      );
    }

    const stateRoot = options.stateRoot || getContractStorageRoot(options.storageSlots);
    const contractId = getContractId(this.bytecode, options.salt, stateRoot);
    const transactionRequest = new CreateTransactionRequest({
      bytecodeWitnessIndex: 0,
      witnesses: [this.bytecode],
      ...options,
    });
    transactionRequest.addContractCreatedOutput(contractId, stateRoot);

    return {
      contractId,
      transactionRequest,
    };
  }

  /**
   * Deploy a contract with the specified options.
   *
   * @param deployContractOptions - Options for deploying the contract.
   * @returns A promise that resolves to the deployed contract instance.
   */
  async deployContract<TContract extends Contract = Contract>(
    deployContractOptions: DeployContractOptions = {}
  ): Promise<DeployContractResult<TContract>> {
    const account = this.getAccount();

    const { consensusParameters } = account.provider.getChain();
    const maxContractSize = consensusParameters.contractParameters.contractMaxSize.toNumber();

    let contractId: string;
    let transactionRequest: CreateTransactionRequest;

    // Checker whether the contract needs to be chunked
    if (this.bytecode.length > maxContractSize) {
      // Ensure the max contract size is byte aligned (VM requirement)
      if (maxContractSize % 8 !== 0) {
        throw new FuelError(
          ErrorCode.CONTRACT_SIZE_EXCEEDS_LIMIT, // Todo: change error
          `Max contract size of ${maxContractSize} bytes is not byte aligned.`
        );
      }

      // Set configurables
      const { configurableConstants } = deployContractOptions;
      const hasConfigurable = Object.keys(this.interface.configurables).length;
      if (hasConfigurable && configurableConstants) {
        this.setConfigurableConstants(configurableConstants);
      }

      // Chunk the bytecode
      const chunks: ContractChunk[] = [];
      // Subtract 10,000 because max tx size === max contract size, come up with something better
      const chunkSize = maxContractSize - 10_000;
      for (let offset = 0, index = 0; offset < this.bytecode.length; offset += chunkSize, index++) {
        const chunk = this.bytecode.slice(offset, offset + chunkSize);
        chunks.push({ id: index, size: chunk.length, bytecode: chunk });
      }

      // Deploy chunk as blob tx
      const { maxFee: setMaxFee } = deployContractOptions;
      for (const { id, bytecode } of chunks) {
        const blobTxRequest = new BlobTransactionRequest({
          witnessIndex: 0,
          witnesses: [bytecode],
        });

        const txCost = await account.getTransactionCost(blobTxRequest);

        if (isDefined(setMaxFee)) {
          if (txCost.maxFee.gt(setMaxFee)) {
            throw new FuelError(
              ErrorCode.MAX_FEE_TOO_LOW,
              `Max fee '${deployContractOptions.maxFee}' is lower than the required: '${txCost.maxFee}'.`
            );
          }
        } else {
          blobTxRequest.maxFee = txCost.maxFee;
        }

        await account.fund(blobTxRequest, txCost);
        const response = await account.sendTransaction(blobTxRequest, { awaitExecution: true });

        const {
          transaction: { blobId },
        } = await response.waitForResult<TransactionType.Blob>();

        // Todo: check status
        chunks[id].blobId = blobId as string;
      }

      const { RegId, Instruction } = asm;

      const instructionsPerBlob = 26;
      const numberOfBlobs = chunks.length;
      const numberOfInstructions = numberOfBlobs * instructionsPerBlob;
      const blobIdSize = BYTES_32;

      // Bytes for the Blob Ids
      const blobIdBytes = () => concat(chunks.map(({ blobId }) => arrayify(blobId as string)));
      // Btyes for the BSIZ opcode
      const bsizBytes = () => new Uint8Array([186, 69, 0, 0]);
      // Bytes for the BLDD opcode
      const blddBytes = () => new Uint8Array([187, 81, 0, 17]);

      const instructionsBytes = concat([
        new InstructionSet(
          // 0x12 is going to hold the total size of the contract
          asm.move_(0x12, RegId.zero().to_u8()),
          // find the start of the hardcoded blob ids, which are located after the code ends
          asm.move_(0x10, RegId.is().to_u8()),
          // 0x10 to hold the address of the current blob id
          asm.addi(0x10, 0x10, numberOfInstructions * Instruction.size()),
          // loop counter
          asm.addi(0x13, RegId.zero().to_u8(), numberOfBlobs)
        ).toBytes(),
        // LOOP starts here
        // 0x11 to hold the size of the current blob
        bsizBytes(),
        new InstructionSet(
          // update the total size of the contract
          asm.add(0x12, 0x12, 0x11),
          // move on to the next blob
          asm.addi(0x10, 0x10, blobIdSize),
          // decrement the loop counter
          asm.subi(0x13, 0x13, 1),
          // Jump backwards 3 instructions if the counter has not reached 0
          asm.jneb(0x13, RegId.zero().to_u8(), RegId.zero().to_u8(), 3),
          // move the stack pointer by the contract size since we need to write the contract on the stack since only that memory can be executed
          asm.cfe(0x12),
          // find the start of the hardcoded blob ids, which are located after the code ends
          asm.move_(0x10, RegId.is().to_u8()),
          // 0x10 to hold the address of the current blob id
          asm.addi(0x10, 0x10, numberOfInstructions * Instruction.size()),
          // 0x12 is going to hold the total bytes loaded of the contract
          asm.move_(0x12, RegId.zero().to_u8()),
          // loop counter
          asm.addi(0x13, RegId.zero().to_u8(), numberOfBlobs)
        ).toBytes(),
        // LOOP starts here
        // 0x11 to hold the size of the current blob
        bsizBytes(),
        new InstructionSet(
          // the location where to load the current blob (start of stack)
          asm.move_(0x14, RegId.spp().to_u8()),
          // move to where this blob should be loaded by adding the total bytes loaded
          asm.add(0x14, 0x14, 0x12)
        ).toBytes(),
        blddBytes(),
        new InstructionSet(
          // update the total bytes loaded
          asm.add(0x12, 0x12, 0x11),
          // move on to the next blob
          asm.addi(0x10, 0x10, blobIdSize),
          // decrement the loop counter
          asm.subi(0x13, 0x13, 1),
          // Jump backwards 6 instructions if the counter has not reached 0
          asm.jneb(0x13, RegId.zero().to_u8(), RegId.zero().to_u8(), 6),
          // what follows is called _jmp_mem by the sway compiler
          // move to the start of the stack (also the start of the contract we loaded)
          asm.move_(0x16, RegId.spp().to_u8()),
          // subtract the address contained in IS because jmp will add it back
          asm.sub(0x16, 0x16, RegId.is().to_u8()),
          // jmp will multiply by 4 so we need to divide to cancel that out
          asm.divi(0x16, 0x16, 4),
          // jump to the start of the contract we loaded
          asm.jmp(0x16)
        ).toBytes(),
        blobIdBytes(),
      ]);

      const storageSlots = deployContractOptions?.storageSlots
        ?.map(({ key, value }) => ({
          key: hexlifyWithPrefix(key),
          value: hexlifyWithPrefix(value),
        }))
        .sort(({ key: keyA }, { key: keyB }) => keyA.localeCompare(keyB));

      const options = {
        salt: randomBytes(32),
        ...deployContractOptions,
        storageSlots: storageSlots || [],
      };

      const stateRoot = options.stateRoot || getContractStorageRoot(options.storageSlots);

      contractId = getContractId(instructionsBytes, options.salt, stateRoot);
      const createTxRequest = new CreateTransactionRequest({
        bytecodeWitnessIndex: 0,
        witnesses: [instructionsBytes],
        ...deployContractOptions,
      });
      createTxRequest.addContractCreatedOutput(contractId, stateRoot);

      transactionRequest = createTxRequest;

      const txCost = await account.getTransactionCost(transactionRequest);

      if (isDefined(setMaxFee)) {
        if (txCost.maxFee.gt(setMaxFee)) {
          throw new FuelError(
            ErrorCode.MAX_FEE_TOO_LOW,
            `Max fee '${deployContractOptions.maxFee}' is lower than the required: '${txCost.maxFee}'.`
          );
        }
      } else {
        transactionRequest.maxFee = txCost.maxFee;
      }

      await account.fund(transactionRequest, txCost);
    } else {
      const { contractId: id, transactionRequest: req } =
        await this.prepareDeploy(deployContractOptions);
      contractId = id;
      transactionRequest = req;
    }

    const transactionResponse = await account.sendTransaction(transactionRequest, {
      awaitExecution: false,
    });

    const waitForResult = async () => {
      const transactionResult = await transactionResponse.waitForResult<TransactionType.Create>();
      const contract = new Contract(contractId, this.interface, account) as TContract;

      return { contract, transactionResult };
    };

    return { waitForResult, contractId, transactionId: transactionResponse.id };
  }

  /**
   * Set configurable constants of the contract with the specified values.
   *
   * @param configurableConstants - An object containing configurable names and their values.
   */
  setConfigurableConstants(configurableConstants: { [name: string]: unknown }) {
    try {
      const hasConfigurable = Object.keys(this.interface.configurables).length;

      if (!hasConfigurable) {
        throw new Error('Contract does not have configurables to be set');
      }

      Object.entries(configurableConstants).forEach(([key, value]) => {
        if (!this.interface.configurables[key]) {
          throw new Error(`Contract does not have a configurable named: '${key}'`);
        }

        const { offset } = this.interface.configurables[key];

        const encoded = this.interface.encodeConfigurable(key, value as InputValue);

        const bytes = arrayify(this.bytecode);

        bytes.set(encoded, offset);

        this.bytecode = bytes;
      });
    } catch (err) {
      throw new FuelError(
        ErrorCode.INVALID_CONFIGURABLE_CONSTANTS,
        `Error setting configurable constants on contract: ${(<Error>err).message}.`
      );
    }
  }

  private getAccount(): Account {
    if (!this.account) {
      throw new FuelError(ErrorCode.ACCOUNT_REQUIRED, 'Account not assigned to contract.');
    }
    return this.account;
  }

  private async prepareDeploy(deployContractOptions: DeployContractOptions) {
    const { configurableConstants } = deployContractOptions;

    if (configurableConstants) {
      this.setConfigurableConstants(configurableConstants);
    }

    const { contractId, transactionRequest } = this.createTransactionRequest(deployContractOptions);

    const account = this.getAccount();

    const txCost = await account.getTransactionCost(transactionRequest);

    const { maxFee: setMaxFee } = deployContractOptions;

    if (isDefined(setMaxFee)) {
      if (txCost.maxFee.gt(setMaxFee)) {
        throw new FuelError(
          ErrorCode.MAX_FEE_TOO_LOW,
          `Max fee '${deployContractOptions.maxFee}' is lower than the required: '${txCost.maxFee}'.`
        );
      }
    } else {
      transactionRequest.maxFee = txCost.maxFee;
    }

    await account.fund(transactionRequest, txCost);

    return {
      contractId,
      transactionRequest,
    };
  }
}

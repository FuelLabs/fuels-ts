import type { BN } from '@fuel-ts/math';

interface Coin {
  tx_id: string;
  output_index: number;
  tx_pointer_block_height: number;
  tx_pointer_tx_idx: number;
  owner: string;
  amount: number | BN;
  asset_id: string;
}

interface Message {
  sender: string;
  recipient: string;
  nonce: string;
  amount: number | BN;
  data: string;
  da_height: number;
}

interface StateConfig {
  coins: Coin[];
  messages: Message[];
}

type Operation =
  | {
      LightOperation: {
        base: number;
        units_per_gas: number;
      };
    }
  | {
      HeavyOperation: {
        base: number;
        gas_per_unit: number;
      };
    };

interface GasCosts {
  add: number;
  addi: number;
  and: number;
  andi: number;
  bal: number;
  bhei: number;
  bhsh: number;
  burn: number;
  cb: number;
  cfsi: number;
  div: number;
  divi: number;
  eck1: number;
  ecr1: number;
  eq: number;
  exp: number;
  expi: number;
  flag: number;
  gm: number;
  gt: number;
  gtf: number;
  ji: number;
  jmp: number;
  jne: number;
  jnei: number;
  jnzi: number;
  jmpf: number;
  jmpb: number;
  jnzf: number;
  jnzb: number;
  jnef: number;
  jneb: number;
  lb: number;
  log: number;
  lt: number;
  lw: number;
  mint: number;
  mlog: number;
  mod: number;
  modi: number;
  move: number;
  movi: number;
  mroo: number;
  mul: number;
  muli: number;
  mldv: number;
  noop: number;
  not: number;
  or: number;
  ori: number;
  poph: number;
  popl: number;
  pshh: number;
  pshl: number;
  ret_contract: number;
  rvrt_contract: number;
  sb: number;
  sll: number;
  slli: number;
  srl: number;
  srli: number;
  srw: number;
  sub: number;
  subi: number;
  sw: number;
  sww: number;
  time: number;
  tr: number;
  tro: number;
  wdcm: number;
  wqcm: number;
  wdop: number;
  wqop: number;
  wdml: number;
  wqml: number;
  wddv: number;
  wqdv: number;
  wdmd: number;
  wqmd: number;
  wdam: number;
  wqam: number;
  wdmm: number;
  wqmm: number;
  xor: number;
  xori: number;
  new_storage_per_byte: number;
  aloc: Operation;
  bsiz: Operation;
  bldd: Operation;
  cfe: Operation;
  cfei: Operation;
  call: Operation;
  ccp: Operation;
  croo: Operation;
  csiz: Operation;
  ed19: Operation;
  k256: Operation;
  ldc: Operation;
  logd: Operation;
  mcl: Operation;
  mcli: Operation;
  mcp: Operation;
  mcpi: Operation;
  meq: Operation;
  retd_contract: Operation;
  s256: Operation;
  scwq: Operation;
  smo: Operation;
  srwq: Operation;
  swwq: Operation;
  contract_root: Operation;
  state_root: Operation;
  vm_initialization: Operation;
}

interface Consensus {
  PoA: {
    signing_key: string;
  };
}

interface ConsensusParameters {
  chain_id: number;
  base_asset_id: string;
  privileged_address: string;
  tx_params: {
    V1: {
      max_inputs: number;
      max_outputs: number;
      max_witnesses: number;
      max_gas_per_tx: number;
      max_size: number;
    };
  };
  predicate_params: {
    V1: {
      max_predicate_length: number;
      max_predicate_data_length: number;
      max_gas_per_predicate: number;
      max_message_data_length: number;
    };
  };
  script_params: {
    V1: {
      max_script_length: number;
      max_script_data_length: number;
    };
  };
  contract_params: {
    V1: {
      contract_max_size: number;
      max_storage_slots: number;
    };
  };
  fee_params: {
    V1: {
      gas_price_factor: number;
      gas_per_byte: number;
    };
  };
  block_gas_limit: number;
  gas_costs: { V4: GasCosts };
}

interface ChainConfig {
  chain_name: string;
  consensus_parameters: {
    V2: ConsensusParameters;
  };
  consensus: Consensus;
}

interface MetadataConfig {
  chain_config: string;
  table_encoding: {
    Json: {
      filepath: string;
    };
  };
}

export interface SnapshotConfigs {
  stateConfig: StateConfig;
  chainConfig: ChainConfig;
  metadata: MetadataConfig;
}

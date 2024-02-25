interface Coin {
  owner: string;
  amount: string;
  asset_id: string;
}

interface Message {
  sender: string;
  recipient: string;
  nonce: string;
  amount: string;
  data: string;
  da_height: string;
}

interface InitialState {
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
  aloc: number;
  and: number;
  andi: number;
  bal: number;
  bhei: number;
  bhsh: number;
  burn: number;
  cb: number;
  cfei: number;
  cfsi: number;
  croo: number;
  div: number;
  divi: number;
  ecr1: number;
  eck1: number;
  poph: number;
  popl: number;
  pshh: number;
  pshl: number;
  ed19: number;
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
  k256: Operation;
  lb: number;
  log: number;
  lt: number;
  lw: number;
  mint: number;
  mlog: number;
  modOp: number;
  modi: number;
  moveOp: number;
  movi: number;
  mroo: number;
  mul: number;
  muli: number;
  mldv: number;
  noop: number;
  not: number;
  or: number;
  ori: number;
  ret: number;
  rvrt: number;
  s256: Operation;
  sb: number;
  scwq: Operation;
  sll: number;
  slli: number;
  srl: number;
  srli: number;
  srw: number;
  sub: number;
  subi: number;
  sw: number;
  sww: number;
  swwq: Operation;
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
  contract_root: Operation;
  state_root: Operation;
  vm_initialization: Operation;
  call: Operation;
  mcpi: Operation;
  ccp: Operation;
  csiz: Operation;
  ldc: Operation;
  logd: Operation;
  mcl: Operation;
  mcli: Operation;
  mcp: Operation;
  meq: Operation;
  retd: Operation;
  smo: Operation;
  srwq: Operation;
}

interface Consensus {
  PoA: {
    signing_key: string;
  };
}

interface ConsensusParameters {
  tx_params: {
    max_inputs: number;
    max_outputs: number;
    max_witnesses: number;
    max_gas_per_tx: number;
    max_size: number;
  };
  predicate_params: {
    max_predicate_length: number;
    max_predicate_data_length: number;
    max_gas_per_predicate: number;
    max_message_data_length: number;
  };
  script_params: {
    max_script_length: number;
    max_script_data_length: number;
  };
  contract_params: {
    contract_max_size: number;
    max_storage_slots: number;
  };
  fee_params: {
    gas_price_factor: number;
    gas_per_byte: number;
  };
}

export interface ChainConfig {
  chain_name: string;
  block_gas_limit: number;
  initial_state: InitialState;
  consensus_parameters: ConsensusParameters;
  gas_costs: GasCosts;
  consensus: Consensus;
}

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

interface TransactionParameters {
  contract_max_size: number;
  max_inputs: number;
  max_outputs: number;
  max_witnesses: number;
  max_gas_per_tx: number;
  max_script_length: number;
  max_script_data_length: number;
  max_storage_slots: number;
  max_predicate_length: number;
  max_predicate_data_length: number;
  max_gas_per_predicate: number;
  gas_price_factor: number;
  gas_per_byte: number;
  max_message_data_length: number;
  chain_id: number;
}
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
  k256: number;
  lb: number;
  log: number;
  lt: number;
  lw: number;
  mcpi: number;
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
  s256: number;
  sb: number;
  scwq: number;
  sll: number;
  slli: number;
  srl: number;
  srli: number;
  srw: number;
  sub: number;
  subi: number;
  sw: number;
  sww: number;
  swwq: number;
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
  call: {
    base: number;
    dep_per_unit: number;
  };
  ccp: {
    base: number;
    dep_per_unit: number;
  };
  csiz: {
    base: number;
    dep_per_unit: number;
  };
  ldc: {
    base: number;
    dep_per_unit: number;
  };
  logd: {
    base: number;
    dep_per_unit: number;
  };
  mcl: {
    base: number;
    dep_per_unit: number;
  };
  mcli: {
    base: number;
    dep_per_unit: number;
  };
  mcp: {
    base: number;
    dep_per_unit: number;
  };
  meq: {
    base: number;
    dep_per_unit: number;
  };
  retd: {
    base: number;
    dep_per_unit: number;
  };
  smo: {
    base: number;
    dep_per_unit: number;
  };
  srwq: {
    base: number;
    dep_per_unit: number;
  };
}

interface Consensus {
  PoA: {
    signing_key: string;
  };
}

export interface ChainConfig {
  chain_name: string;
  block_gas_limit: number;
  initial_state: InitialState;
  transaction_parameters: TransactionParameters;
  gas_costs: GasCosts;
  consensus: Consensus;
}

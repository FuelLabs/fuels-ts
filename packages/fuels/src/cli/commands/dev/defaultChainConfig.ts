/**
 * This is the `privateKey` of the `consensus.PoA.signing_key` below.
 * This key is responsible for validating the transactions.
 */
export const defaultConsensusKey =
  '0xa449b1ffee0e2205fa924c6740cc48b3b473aa28587df6dab12abc245d1f5298';

export const defaultChainConfig = {
  chain_name: 'local_testnet',
  block_gas_limit: 5000000000,
  initial_state: {
    coins: [
      {
        owner: '0x94ffcc53b892684acefaebc8a3d4a595e528a8cf664eeb3ef36f1020b0809d0d',
        amount: '0xFFFFFFFFFFFFFFFF',
        asset_id: '0x0000000000000000000000000000000000000000000000000000000000000000',
      },
      {
        owner: '0x09c0b2d1a486c439a87bcba6b46a7a1a23f3897cc83a94521a96da5c23bc58db',
        amount: '0xFFFFFFFFFFFFFFFF',
        asset_id: '0x0000000000000000000000000000000000000000000000000000000000000000',
      },
      {
        owner: '0x09c0b2d1a486c439a87bcba6b46a7a1a23f3897cc83a94521a96da5c23bc58db',
        amount: '0xFFFFFFFFFFFFFFFF',
        asset_id: '0x0101010101010101010101010101010101010101010101010101010101010101',
      },
      {
        owner: '0x09c0b2d1a486c439a87bcba6b46a7a1a23f3897cc83a94521a96da5c23bc58db',
        amount: '0xFFFFFFFFFFFFFFFF',
        asset_id: '0x0202020202020202020202020202020202020202020202020202020202020202',
      },
      {
        owner: '0x5d99ee966b42cd8fc7bdd1364b389153a9e78b42b7d4a691470674e817888d4e',
        amount: '0xFFFFFFFFFFFFFFFF',
        asset_id: '0x0000000000000000000000000000000000000000000000000000000000000000',
      },
      {
        owner: '0x5d99ee966b42cd8fc7bdd1364b389153a9e78b42b7d4a691470674e817888d4e',
        amount: '0xFFFFFFFFFFFFFFFF',
        asset_id: '0x0101010101010101010101010101010101010101010101010101010101010101',
      },
      {
        owner: '0x5d99ee966b42cd8fc7bdd1364b389153a9e78b42b7d4a691470674e817888d4e',
        amount: '0xFFFFFFFFFFFFFFFF',
        asset_id: '0x0202020202020202020202020202020202020202020202020202020202020202',
      },
      {
        owner: '0xbdaad6a89e073e177895b3e5a9ccd15806749eda134a6438dae32fc5b6601f3f',
        amount: '0xFFFFFFFFFFFFFFFF',
        asset_id: '0x0000000000000000000000000000000000000000000000000000000000000000',
      },
      {
        owner: '0xbdaad6a89e073e177895b3e5a9ccd15806749eda134a6438dae32fc5b6601f3f',
        amount: '0xFFFFFFFFFFFFFFFF',
        asset_id: '0x0101010101010101010101010101010101010101010101010101010101010101',
      },
      {
        owner: '0xbdaad6a89e073e177895b3e5a9ccd15806749eda134a6438dae32fc5b6601f3f',
        amount: '0xFFFFFFFFFFFFFFFF',
        asset_id: '0x0202020202020202020202020202020202020202020202020202020202020202',
      },
      {
        owner: '0x95a7aa6cc32743f8706c40ef49a7423b47da763bb4bbc055b1f07254dc729036',
        amount: '0xFFFFFFFFFFFFFFFF',
        asset_id: '0x0000000000000000000000000000000000000000000000000000000000000000',
      },
      {
        owner: '0x95a7aa6cc32743f8706c40ef49a7423b47da763bb4bbc055b1f07254dc729036',
        amount: '0xFFFFFFFFFFFFFFFF',
        asset_id: '0x0101010101010101010101010101010101010101010101010101010101010101',
      },
      {
        owner: '0x95a7aa6cc32743f8706c40ef49a7423b47da763bb4bbc055b1f07254dc729036',
        amount: '0xFFFFFFFFFFFFFFFF',
        asset_id: '0x0202020202020202020202020202020202020202020202020202020202020202',
      },
      {
        owner: '0xcee104acd38b940c8f1c62c6d7ea00a0ad2241d6dee0509a4bf27297508870d3',
        amount: '0xFFFFFFFFFFFFFFFF',
        asset_id: '0x0000000000000000000000000000000000000000000000000000000000000000',
      },
      {
        owner: '0xcee104acd38b940c8f1c62c6d7ea00a0ad2241d6dee0509a4bf27297508870d3',
        amount: '0xFFFFFFFFFFFFFFFF',
        asset_id: '0x0101010101010101010101010101010101010101010101010101010101010101',
      },
      {
        owner: '0xcee104acd38b940c8f1c62c6d7ea00a0ad2241d6dee0509a4bf27297508870d3',
        amount: '0xFFFFFFFFFFFFFFFF',
        asset_id: '0x0202020202020202020202020202020202020202020202020202020202020202',
      },
      {
        owner: '0x7e3626e306588eba79cafab73f0709e55ab8f4bdfe8c8b75034a430fc56ece89',
        amount: '0xFFFFFFFFFFFFFFFF',
        asset_id: '0x0000000000000000000000000000000000000000000000000000000000000000',
      },
      {
        owner: '0x7e3626e306588eba79cafab73f0709e55ab8f4bdfe8c8b75034a430fc56ece89',
        amount: '0xFFFFFFFFFFFFFFFF',
        asset_id: '0x0101010101010101010101010101010101010101010101010101010101010101',
      },
      {
        owner: '0x7e3626e306588eba79cafab73f0709e55ab8f4bdfe8c8b75034a430fc56ece89',
        amount: '0xFFFFFFFFFFFFFFFF',
        asset_id: '0x0202020202020202020202020202020202020202020202020202020202020202',
      },
      {
        owner: '0x1c31df52b6df56407dd95f83082e8beb9cfc9532ac111d5bd8491651d95ba775',
        amount: '0xFFFFFFFFFFFFFFFF',
        asset_id: '0x0000000000000000000000000000000000000000000000000000000000000000',
      },
      {
        owner: '0x1c31df52b6df56407dd95f83082e8beb9cfc9532ac111d5bd8491651d95ba775',
        amount: '0xFFFFFFFFFFFFFFFF',
        asset_id: '0x0101010101010101010101010101010101010101010101010101010101010101',
      },
      {
        owner: '0x1c31df52b6df56407dd95f83082e8beb9cfc9532ac111d5bd8491651d95ba775',
        amount: '0xFFFFFFFFFFFFFFFF',
        asset_id: '0x0202020202020202020202020202020202020202020202020202020202020202',
      },
      {
        owner: '0x09dd7a49174d6fcc9f4c6f7942c18060a935ddd03ee69b594189b8c3581276ea',
        amount: '0xFFFFFFFFFFFFFFFF',
        asset_id: '0x0000000000000000000000000000000000000000000000000000000000000000',
      },
      {
        owner: '0x09dd7a49174d6fcc9f4c6f7942c18060a935ddd03ee69b594189b8c3581276ea',
        amount: '0xFFFFFFFFFFFFFFFF',
        asset_id: '0x0101010101010101010101010101010101010101010101010101010101010101',
      },
      {
        owner: '0x09dd7a49174d6fcc9f4c6f7942c18060a935ddd03ee69b594189b8c3581276ea',
        amount: '0xFFFFFFFFFFFFFFFF',
        asset_id: '0x0202020202020202020202020202020202020202020202020202020202020202',
      },
      {
        owner: '0x86604282dc604481b809845be49667607c470644f6822fc01eb0d22f167e08cf',
        amount: '0xFFFFFFFFFFFFFFFF',
        asset_id: '0x0000000000000000000000000000000000000000000000000000000000000000',
      },
      {
        owner: '0x86604282dc604481b809845be49667607c470644f6822fc01eb0d22f167e08cf',
        amount: '0xFFFFFFFFFFFFFFFF',
        asset_id: '0x0101010101010101010101010101010101010101010101010101010101010101',
      },
      {
        owner: '0x86604282dc604481b809845be49667607c470644f6822fc01eb0d22f167e08cf',
        amount: '0xFFFFFFFFFFFFFFFF',
        asset_id: '0x0202020202020202020202020202020202020202020202020202020202020202',
      },
      {
        owner: '0xbca334a06d19db5041c78fe2f465b07be5bec828f38b7796b2877e7d1542c950',
        amount: '0xFFFFFFFFFFFFFFFF',
        asset_id: '0x0000000000000000000000000000000000000000000000000000000000000000',
      },
      {
        owner: '0xbca334a06d19db5041c78fe2f465b07be5bec828f38b7796b2877e7d1542c950',
        amount: '0xFFFFFFFFFFFFFFFF',
        asset_id: '0x0101010101010101010101010101010101010101010101010101010101010101',
      },
      {
        owner: '0xbca334a06d19db5041c78fe2f465b07be5bec828f38b7796b2877e7d1542c950',
        amount: '0xFFFFFFFFFFFFFFFF',
        asset_id: '0x0202020202020202020202020202020202020202020202020202020202020202',
      },
      {
        owner: '0xbd9a1dc8d3ec3521c43f6c2c01611b4d0204c7610204ff0178488c8738a30bd2',
        amount: '0xFFFFFFFFFFFFFFFF',
        asset_id: '0x0000000000000000000000000000000000000000000000000000000000000000',
      },
      {
        owner: '0xbd9a1dc8d3ec3521c43f6c2c01611b4d0204c7610204ff0178488c8738a30bd2',
        amount: '0xFFFFFFFFFFFFFFFF',
        asset_id: '0x0101010101010101010101010101010101010101010101010101010101010101',
      },
      {
        owner: '0xbd9a1dc8d3ec3521c43f6c2c01611b4d0204c7610204ff0178488c8738a30bd2',
        amount: '0xFFFFFFFFFFFFFFFF',
        asset_id: '0x0202020202020202020202020202020202020202020202020202020202020202',
      },
      {
        owner: '0xb32197cf75efe05bf453c26178139f09b391582065549c1422bc92555ecffb64',
        amount: '0xFFFFFFFFFFFFFFFF',
        asset_id: '0x0000000000000000000000000000000000000000000000000000000000000000',
      },
      {
        owner: '0xb32197cf75efe05bf453c26178139f09b391582065549c1422bc92555ecffb64',
        amount: '0xFFFFFFFFFFFFFFFF',
        asset_id: '0x0101010101010101010101010101010101010101010101010101010101010101',
      },
      {
        owner: '0xb32197cf75efe05bf453c26178139f09b391582065549c1422bc92555ecffb64',
        amount: '0xFFFFFFFFFFFFFFFF',
        asset_id: '0x0202020202020202020202020202020202020202020202020202020202020202',
      },
      {
        owner: '0x3b24509ed4ab3c7959f5c9391c1445c59290cdb5f13d6f780922f376b7029f30',
        amount: '0xFFFFFFFFFFFFFFFF',
        asset_id: '0x0000000000000000000000000000000000000000000000000000000000000000',
      },
      {
        owner: '0x3b24509ed4ab3c7959f5c9391c1445c59290cdb5f13d6f780922f376b7029f30',
        amount: '0xFFFFFFFFFFFFFFFF',
        asset_id: '0x0101010101010101010101010101010101010101010101010101010101010101',
      },
      {
        owner: '0x3b24509ed4ab3c7959f5c9391c1445c59290cdb5f13d6f780922f376b7029f30',
        amount: '0xFFFFFFFFFFFFFFFF',
        asset_id: '0x0202020202020202020202020202020202020202020202020202020202020202',
      },
      {
        owner: '0x77c6f40b7da70d885f68efaad7c661327482a63ea10dcb4271de819438254ae1',
        amount: '0xFFFFFFFFFFFFFFFF',
        asset_id: '0x0000000000000000000000000000000000000000000000000000000000000000',
      },
      {
        owner: '0x77c6f40b7da70d885f68efaad7c661327482a63ea10dcb4271de819438254ae1',
        amount: '0xFFFFFFFFFFFFFFFF',
        asset_id: '0x0101010101010101010101010101010101010101010101010101010101010101',
      },
      {
        owner: '0x77c6f40b7da70d885f68efaad7c661327482a63ea10dcb4271de819438254ae1',
        amount: '0xFFFFFFFFFFFFFFFF',
        asset_id: '0x0202020202020202020202020202020202020202020202020202020202020202',
      },
      {
        owner: '0x6a2c4691c547c43924650dbd30620b184b5fe3fb6dbe5c4446110b08f6f405bf',
        amount: '0xFFFFFFFFFFFFFFFF',
        asset_id: '0x0000000000000000000000000000000000000000000000000000000000000000',
      },
      {
        owner: '0x6a2c4691c547c43924650dbd30620b184b5fe3fb6dbe5c4446110b08f6f405bf',
        amount: '0xFFFFFFFFFFFFFFFF',
        asset_id: '0x0101010101010101010101010101010101010101010101010101010101010101',
      },
      {
        owner: '0x6a2c4691c547c43924650dbd30620b184b5fe3fb6dbe5c4446110b08f6f405bf',
        amount: '0xFFFFFFFFFFFFFFFF',
        asset_id: '0x0202020202020202020202020202020202020202020202020202020202020202',
      },
      {
        owner: '0x49075a7538e2c88ebe1926ce4d898198a2a4e790d14512943a9864bc536b3c82',
        amount: '0xFFFFFFFFFFFFFFFF',
        asset_id: '0x0000000000000000000000000000000000000000000000000000000000000000',
      },
      {
        owner: '0x49075a7538e2c88ebe1926ce4d898198a2a4e790d14512943a9864bc536b3c82',
        amount: '0xFFFFFFFFFFFFFFFF',
        asset_id: '0x0101010101010101010101010101010101010101010101010101010101010101',
      },
      {
        owner: '0x49075a7538e2c88ebe1926ce4d898198a2a4e790d14512943a9864bc536b3c82',
        amount: '0xFFFFFFFFFFFFFFFF',
        asset_id: '0x0202020202020202020202020202020202020202020202020202020202020202',
      },
    ],
    messages: [
      {
        sender: '0xc43454aa38dd91f88109a4b7aef5efb96ce34e3f24992fe0f81d233ca686f80f',
        recipient: '0x69a2b736b60159b43bb8a4f98c0589f6da5fa3a3d101e8e269c499eb942753ba',
        nonce: '0101010101010101010101010101010101010101010101010101010101010101',
        amount: '0x000000000000FFFF',
        data: '',
        da_height: '0x00',
      },
      {
        sender: '0x69a2b736b60159b43bb8a4f98c0589f6da5fa3a3d101e8e269c499eb942753ba',
        recipient: '0xc43454aa38dd91f88109a4b7aef5efb96ce34e3f24992fe0f81d233ca686f80f',
        nonce: '0e1ef2963832068b0e1ef2963832068b0e1ef2963832068b0e1ef2963832068b',
        amount: '0xb04f3c08f59b309e',
        data: '',
        da_height: '0x00',
      },
    ],
  },
  consensus_parameters: {
    tx_params: {
      max_inputs: 255,
      max_outputs: 255,
      max_witnesses: 255,
      max_gas_per_tx: 10000000,
      max_size: 17825792,
    },
    predicate_params: {
      max_predicate_length: 1048576,
      max_predicate_data_length: 1048576,
      max_gas_per_predicate: 10000000,
      max_message_data_length: 1048576,
    },
    script_params: {
      max_script_length: 1048576,
      max_script_data_length: 1048576,
    },
    contract_params: {
      contract_max_size: 16777216,
      max_storage_slots: 255,
    },
    fee_params: {
      gas_price_factor: 92,
      gas_per_byte: 4,
    },
  },
  gas_costs: {
    add: 1,
    addi: 1,
    aloc: 1,
    and: 1,
    andi: 1,
    bal: 13,
    bhei: 1,
    bhsh: 1,
    burn: 132,
    cb: 1,
    cfei: 1,
    cfsi: 1,
    croo: 16,
    div: 1,
    divi: 1,
    ecr1: 3000,
    eck1: 951,
    ed19: 3000,
    eq: 1,
    exp: 1,
    expi: 1,
    flag: 1,
    gm: 1,
    gt: 1,
    gtf: 1,
    ji: 1,
    jmp: 1,
    jne: 1,
    jnei: 1,
    jnzi: 1,
    jmpf: 1,
    jmpb: 1,
    jnzf: 1,
    jnzb: 1,
    jnef: 1,
    jneb: 1,
    lb: 1,
    log: 9,
    lt: 1,
    lw: 1,
    mint: 135,
    mlog: 1,
    modOp: 1,
    modi: 1,
    moveOp: 1,
    movi: 1,
    mroo: 2,
    mul: 1,
    muli: 1,
    mldv: 1,
    noop: 1,
    not: 1,
    or: 1,
    ori: 1,
    poph: 2,
    popl: 2,
    pshh: 2,
    pshl: 2,
    ret: 13,
    rvrt: 13,
    sb: 1,
    sll: 1,
    slli: 1,
    srl: 1,
    srli: 1,
    srw: 12,
    sub: 1,
    subi: 1,
    sw: 1,
    sww: 67,
    time: 1,
    tr: 105,
    tro: 60,
    wdcm: 1,
    wqcm: 1,
    wdop: 1,
    wqop: 1,
    wdml: 1,
    wqml: 1,
    wddv: 1,
    wqdv: 2,
    wdmd: 3,
    wqmd: 4,
    wdam: 2,
    wqam: 3,
    wdmm: 3,
    wqmm: 3,
    xor: 1,
    xori: 1,
    call: {
      LightOperation: {
        base: 144,
        units_per_gas: 214,
      },
    },
    ccp: {
      LightOperation: {
        base: 15,
        units_per_gas: 103,
      },
    },
    csiz: {
      LightOperation: {
        base: 17,
        units_per_gas: 790,
      },
    },
    k256: {
      LightOperation: {
        base: 11,
        units_per_gas: 214,
      },
    },
    ldc: {
      LightOperation: {
        base: 15,
        units_per_gas: 272,
      },
    },
    logd: {
      LightOperation: {
        base: 26,
        units_per_gas: 64,
      },
    },
    mcl: {
      LightOperation: {
        base: 1,
        units_per_gas: 3333,
      },
    },
    mcli: {
      LightOperation: {
        base: 1,
        units_per_gas: 3333,
      },
    },
    mcp: {
      LightOperation: {
        base: 1,
        units_per_gas: 2000,
      },
    },
    mcpi: {
      LightOperation: {
        base: 3,
        units_per_gas: 2000,
      },
    },
    meq: {
      LightOperation: {
        base: 1,
        units_per_gas: 2500,
      },
    },
    retd: {
      LightOperation: {
        base: 29,
        units_per_gas: 62,
      },
    },
    s256: {
      LightOperation: {
        base: 2,
        units_per_gas: 214,
      },
    },
    scwq: {
      LightOperation: {
        base: 13,
        units_per_gas: 5,
      },
    },
    smo: {
      LightOperation: {
        base: 209,
        units_per_gas: 55,
      },
    },
    srwq: {
      LightOperation: {
        base: 47,
        units_per_gas: 5,
      },
    },
    swwq: {
      LightOperation: {
        base: 44,
        units_per_gas: 5,
      },
    },
    contract_root: {
      LightOperation: {
        base: 75,
        units_per_gas: 1,
      },
    },
    state_root: {
      LightOperation: {
        base: 412,
        units_per_gas: 1,
      },
    },
    vm_initialization: {
      HeavyOperation: {
        base: 2000,
        gas_per_unit: 0,
      },
    },
    new_storage_per_byte: 1,
  },
  consensus: {
    PoA: {
      signing_key: '0x94ffcc53b892684acefaebc8a3d4a595e528a8cf664eeb3ef36f1020b0809d0d',
    },
  },
};

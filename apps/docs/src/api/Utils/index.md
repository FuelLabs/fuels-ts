# Module: @fuel-ts/utils

## Classes

- [DateTime](/api/Utils/DateTime.md)

## Variables

### defaultChainConfig

• `Const` **defaultChainConfig**: `Object` = `chainConfigJson`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `block_gas_limit` | `number` |
| `chain_name` | `string` |
| `consensus` | { `PoA`: { `signing_key`: `string` = "0x94ffcc53b892684acefaebc8a3d4a595e528a8cf664eeb3ef36f1020b0809d0d" }  } |
| `consensus.PoA` | { `signing_key`: `string` = "0x94ffcc53b892684acefaebc8a3d4a595e528a8cf664eeb3ef36f1020b0809d0d" } |
| `consensus.PoA.signing_key` | `string` |
| `consensus_parameters` | { `contract_params`: { `contract_max_size`: `number` = 16777216; `max_storage_slots`: `number` = 255 } ; `fee_params`: { `gas_per_byte`: `number` = 4; `gas_price_factor`: `number` = 92 } ; `predicate_params`: { `max_gas_per_predicate`: `number` = 10000000; `max_message_data_length`: `number` = 1048576; `max_predicate_data_length`: `number` = 1048576; `max_predicate_length`: `number` = 1048576 } ; `script_params`: { `max_script_data_length`: `number` = 1048576; `max_script_length`: `number` = 1048576 } ; `tx_params`: { `max_gas_per_tx`: `number` = 10000000; `max_inputs`: `number` = 255; `max_outputs`: `number` = 255; `max_size`: `number` = 17825792; `max_witnesses`: `number` = 255 }  } |
| `consensus_parameters.contract_params` | { `contract_max_size`: `number` = 16777216; `max_storage_slots`: `number` = 255 } |
| `consensus_parameters.contract_params.contract_max_size` | `number` |
| `consensus_parameters.contract_params.max_storage_slots` | `number` |
| `consensus_parameters.fee_params` | { `gas_per_byte`: `number` = 4; `gas_price_factor`: `number` = 92 } |
| `consensus_parameters.fee_params.gas_per_byte` | `number` |
| `consensus_parameters.fee_params.gas_price_factor` | `number` |
| `consensus_parameters.predicate_params` | { `max_gas_per_predicate`: `number` = 10000000; `max_message_data_length`: `number` = 1048576; `max_predicate_data_length`: `number` = 1048576; `max_predicate_length`: `number` = 1048576 } |
| `consensus_parameters.predicate_params.max_gas_per_predicate` | `number` |
| `consensus_parameters.predicate_params.max_message_data_length` | `number` |
| `consensus_parameters.predicate_params.max_predicate_data_length` | `number` |
| `consensus_parameters.predicate_params.max_predicate_length` | `number` |
| `consensus_parameters.script_params` | { `max_script_data_length`: `number` = 1048576; `max_script_length`: `number` = 1048576 } |
| `consensus_parameters.script_params.max_script_data_length` | `number` |
| `consensus_parameters.script_params.max_script_length` | `number` |
| `consensus_parameters.tx_params` | { `max_gas_per_tx`: `number` = 10000000; `max_inputs`: `number` = 255; `max_outputs`: `number` = 255; `max_size`: `number` = 17825792; `max_witnesses`: `number` = 255 } |
| `consensus_parameters.tx_params.max_gas_per_tx` | `number` |
| `consensus_parameters.tx_params.max_inputs` | `number` |
| `consensus_parameters.tx_params.max_outputs` | `number` |
| `consensus_parameters.tx_params.max_size` | `number` |
| `consensus_parameters.tx_params.max_witnesses` | `number` |
| `gas_costs` | { `add`: `number` = 1; `addi`: `number` = 1; `aloc`: `number` = 1; `and`: `number` = 1; `andi`: `number` = 1; `bal`: `number` = 13; `bhei`: `number` = 1; `bhsh`: `number` = 1; `burn`: `number` = 132; `call`: { `LightOperation`: { `base`: `number` = 144; `units_per_gas`: `number` = 214 }  } ; `cb`: `number` = 1; `ccp`: { `LightOperation`: { `base`: `number` = 15; `units_per_gas`: `number` = 103 }  } ; `cfei`: `number` = 1; `cfsi`: `number` = 1; `contract_root`: { `LightOperation`: { `base`: `number` = 75; `units_per_gas`: `number` = 1 }  } ; `croo`: `number` = 16; `csiz`: { `LightOperation`: { `base`: `number` = 17; `units_per_gas`: `number` = 790 }  } ; `div`: `number` = 1; `divi`: `number` = 1; `eck1`: `number` = 951; `ecr1`: `number` = 3000; `ed19`: `number` = 3000; `eq`: `number` = 1; `exp`: `number` = 1; `expi`: `number` = 1; `flag`: `number` = 1; `gm`: `number` = 1; `gt`: `number` = 1; `gtf`: `number` = 1; `ji`: `number` = 1; `jmp`: `number` = 1; `jmpb`: `number` = 1; `jmpf`: `number` = 1; `jne`: `number` = 1; `jneb`: `number` = 1; `jnef`: `number` = 1; `jnei`: `number` = 1; `jnzb`: `number` = 1; `jnzf`: `number` = 1; `jnzi`: `number` = 1; `k256`: { `LightOperation`: { `base`: `number` = 11; `units_per_gas`: `number` = 214 }  } ; `lb`: `number` = 1; `ldc`: { `LightOperation`: { `base`: `number` = 15; `units_per_gas`: `number` = 272 }  } ; `log`: `number` = 9; `logd`: { `LightOperation`: { `base`: `number` = 26; `units_per_gas`: `number` = 64 }  } ; `lt`: `number` = 1; `lw`: `number` = 1; `mcl`: { `LightOperation`: { `base`: `number` = 1; `units_per_gas`: `number` = 3333 }  } ; `mcli`: { `LightOperation`: { `base`: `number` = 1; `units_per_gas`: `number` = 3333 }  } ; `mcp`: { `LightOperation`: { `base`: `number` = 1; `units_per_gas`: `number` = 2000 }  } ; `mcpi`: { `LightOperation`: { `base`: `number` = 3; `units_per_gas`: `number` = 2000 }  } ; `meq`: { `LightOperation`: { `base`: `number` = 1; `units_per_gas`: `number` = 2500 }  } ; `mint`: `number` = 135; `mldv`: `number` = 1; `mlog`: `number` = 1; `modOp`: `number` = 1; `modi`: `number` = 1; `moveOp`: `number` = 1; `movi`: `number` = 1; `mroo`: `number` = 2; `mul`: `number` = 1; `muli`: `number` = 1; `new_storage_per_byte`: `number` = 1; `noop`: `number` = 1; `not`: `number` = 1; `or`: `number` = 1; `ori`: `number` = 1; `poph`: `number` = 2; `popl`: `number` = 2; `pshh`: `number` = 2; `pshl`: `number` = 2; `ret`: `number` = 13; `retd`: { `LightOperation`: { `base`: `number` = 29; `units_per_gas`: `number` = 62 }  } ; `rvrt`: `number` = 13; `s256`: { `LightOperation`: { `base`: `number` = 2; `units_per_gas`: `number` = 214 }  } ; `sb`: `number` = 1; `scwq`: { `LightOperation`: { `base`: `number` = 13; `units_per_gas`: `number` = 5 }  } ; `sll`: `number` = 1; `slli`: `number` = 1; `smo`: { `LightOperation`: { `base`: `number` = 209; `units_per_gas`: `number` = 55 }  } ; `srl`: `number` = 1; `srli`: `number` = 1; `srw`: `number` = 12; `srwq`: { `LightOperation`: { `base`: `number` = 47; `units_per_gas`: `number` = 5 }  } ; `state_root`: { `LightOperation`: { `base`: `number` = 412; `units_per_gas`: `number` = 1 }  } ; `sub`: `number` = 1; `subi`: `number` = 1; `sw`: `number` = 1; `sww`: `number` = 67; `swwq`: { `LightOperation`: { `base`: `number` = 44; `units_per_gas`: `number` = 5 }  } ; `time`: `number` = 1; `tr`: `number` = 105; `tro`: `number` = 60; `vm_initialization`: { `HeavyOperation`: { `base`: `number` = 2000; `gas_per_unit`: `number` = 0 }  } ; `wdam`: `number` = 2; `wdcm`: `number` = 1; `wddv`: `number` = 1; `wdmd`: `number` = 3; `wdml`: `number` = 1; `wdmm`: `number` = 3; `wdop`: `number` = 1; `wqam`: `number` = 3; `wqcm`: `number` = 1; `wqdv`: `number` = 2; `wqmd`: `number` = 4; `wqml`: `number` = 1; `wqmm`: `number` = 3; `wqop`: `number` = 1; `xor`: `number` = 1; `xori`: `number` = 1 } |
| `gas_costs.add` | `number` |
| `gas_costs.addi` | `number` |
| `gas_costs.aloc` | `number` |
| `gas_costs.and` | `number` |
| `gas_costs.andi` | `number` |
| `gas_costs.bal` | `number` |
| `gas_costs.bhei` | `number` |
| `gas_costs.bhsh` | `number` |
| `gas_costs.burn` | `number` |
| `gas_costs.call` | { `LightOperation`: { `base`: `number` = 144; `units_per_gas`: `number` = 214 }  } |
| `gas_costs.call.LightOperation` | { `base`: `number` = 144; `units_per_gas`: `number` = 214 } |
| `gas_costs.call.LightOperation.base` | `number` |
| `gas_costs.call.LightOperation.units_per_gas` | `number` |
| `gas_costs.cb` | `number` |
| `gas_costs.ccp` | { `LightOperation`: { `base`: `number` = 15; `units_per_gas`: `number` = 103 }  } |
| `gas_costs.ccp.LightOperation` | { `base`: `number` = 15; `units_per_gas`: `number` = 103 } |
| `gas_costs.ccp.LightOperation.base` | `number` |
| `gas_costs.ccp.LightOperation.units_per_gas` | `number` |
| `gas_costs.cfei` | `number` |
| `gas_costs.cfsi` | `number` |
| `gas_costs.contract_root` | { `LightOperation`: { `base`: `number` = 75; `units_per_gas`: `number` = 1 }  } |
| `gas_costs.contract_root.LightOperation` | { `base`: `number` = 75; `units_per_gas`: `number` = 1 } |
| `gas_costs.contract_root.LightOperation.base` | `number` |
| `gas_costs.contract_root.LightOperation.units_per_gas` | `number` |
| `gas_costs.croo` | `number` |
| `gas_costs.csiz` | { `LightOperation`: { `base`: `number` = 17; `units_per_gas`: `number` = 790 }  } |
| `gas_costs.csiz.LightOperation` | { `base`: `number` = 17; `units_per_gas`: `number` = 790 } |
| `gas_costs.csiz.LightOperation.base` | `number` |
| `gas_costs.csiz.LightOperation.units_per_gas` | `number` |
| `gas_costs.div` | `number` |
| `gas_costs.divi` | `number` |
| `gas_costs.eck1` | `number` |
| `gas_costs.ecr1` | `number` |
| `gas_costs.ed19` | `number` |
| `gas_costs.eq` | `number` |
| `gas_costs.exp` | `number` |
| `gas_costs.expi` | `number` |
| `gas_costs.flag` | `number` |
| `gas_costs.gm` | `number` |
| `gas_costs.gt` | `number` |
| `gas_costs.gtf` | `number` |
| `gas_costs.ji` | `number` |
| `gas_costs.jmp` | `number` |
| `gas_costs.jmpb` | `number` |
| `gas_costs.jmpf` | `number` |
| `gas_costs.jne` | `number` |
| `gas_costs.jneb` | `number` |
| `gas_costs.jnef` | `number` |
| `gas_costs.jnei` | `number` |
| `gas_costs.jnzb` | `number` |
| `gas_costs.jnzf` | `number` |
| `gas_costs.jnzi` | `number` |
| `gas_costs.k256` | { `LightOperation`: { `base`: `number` = 11; `units_per_gas`: `number` = 214 }  } |
| `gas_costs.k256.LightOperation` | { `base`: `number` = 11; `units_per_gas`: `number` = 214 } |
| `gas_costs.k256.LightOperation.base` | `number` |
| `gas_costs.k256.LightOperation.units_per_gas` | `number` |
| `gas_costs.lb` | `number` |
| `gas_costs.ldc` | { `LightOperation`: { `base`: `number` = 15; `units_per_gas`: `number` = 272 }  } |
| `gas_costs.ldc.LightOperation` | { `base`: `number` = 15; `units_per_gas`: `number` = 272 } |
| `gas_costs.ldc.LightOperation.base` | `number` |
| `gas_costs.ldc.LightOperation.units_per_gas` | `number` |
| `gas_costs.log` | `number` |
| `gas_costs.logd` | { `LightOperation`: { `base`: `number` = 26; `units_per_gas`: `number` = 64 }  } |
| `gas_costs.logd.LightOperation` | { `base`: `number` = 26; `units_per_gas`: `number` = 64 } |
| `gas_costs.logd.LightOperation.base` | `number` |
| `gas_costs.logd.LightOperation.units_per_gas` | `number` |
| `gas_costs.lt` | `number` |
| `gas_costs.lw` | `number` |
| `gas_costs.mcl` | { `LightOperation`: { `base`: `number` = 1; `units_per_gas`: `number` = 3333 }  } |
| `gas_costs.mcl.LightOperation` | { `base`: `number` = 1; `units_per_gas`: `number` = 3333 } |
| `gas_costs.mcl.LightOperation.base` | `number` |
| `gas_costs.mcl.LightOperation.units_per_gas` | `number` |
| `gas_costs.mcli` | { `LightOperation`: { `base`: `number` = 1; `units_per_gas`: `number` = 3333 }  } |
| `gas_costs.mcli.LightOperation` | { `base`: `number` = 1; `units_per_gas`: `number` = 3333 } |
| `gas_costs.mcli.LightOperation.base` | `number` |
| `gas_costs.mcli.LightOperation.units_per_gas` | `number` |
| `gas_costs.mcp` | { `LightOperation`: { `base`: `number` = 1; `units_per_gas`: `number` = 2000 }  } |
| `gas_costs.mcp.LightOperation` | { `base`: `number` = 1; `units_per_gas`: `number` = 2000 } |
| `gas_costs.mcp.LightOperation.base` | `number` |
| `gas_costs.mcp.LightOperation.units_per_gas` | `number` |
| `gas_costs.mcpi` | { `LightOperation`: { `base`: `number` = 3; `units_per_gas`: `number` = 2000 }  } |
| `gas_costs.mcpi.LightOperation` | { `base`: `number` = 3; `units_per_gas`: `number` = 2000 } |
| `gas_costs.mcpi.LightOperation.base` | `number` |
| `gas_costs.mcpi.LightOperation.units_per_gas` | `number` |
| `gas_costs.meq` | { `LightOperation`: { `base`: `number` = 1; `units_per_gas`: `number` = 2500 }  } |
| `gas_costs.meq.LightOperation` | { `base`: `number` = 1; `units_per_gas`: `number` = 2500 } |
| `gas_costs.meq.LightOperation.base` | `number` |
| `gas_costs.meq.LightOperation.units_per_gas` | `number` |
| `gas_costs.mint` | `number` |
| `gas_costs.mldv` | `number` |
| `gas_costs.mlog` | `number` |
| `gas_costs.modOp` | `number` |
| `gas_costs.modi` | `number` |
| `gas_costs.moveOp` | `number` |
| `gas_costs.movi` | `number` |
| `gas_costs.mroo` | `number` |
| `gas_costs.mul` | `number` |
| `gas_costs.muli` | `number` |
| `gas_costs.new_storage_per_byte` | `number` |
| `gas_costs.noop` | `number` |
| `gas_costs.not` | `number` |
| `gas_costs.or` | `number` |
| `gas_costs.ori` | `number` |
| `gas_costs.poph` | `number` |
| `gas_costs.popl` | `number` |
| `gas_costs.pshh` | `number` |
| `gas_costs.pshl` | `number` |
| `gas_costs.ret` | `number` |
| `gas_costs.retd` | { `LightOperation`: { `base`: `number` = 29; `units_per_gas`: `number` = 62 }  } |
| `gas_costs.retd.LightOperation` | { `base`: `number` = 29; `units_per_gas`: `number` = 62 } |
| `gas_costs.retd.LightOperation.base` | `number` |
| `gas_costs.retd.LightOperation.units_per_gas` | `number` |
| `gas_costs.rvrt` | `number` |
| `gas_costs.s256` | { `LightOperation`: { `base`: `number` = 2; `units_per_gas`: `number` = 214 }  } |
| `gas_costs.s256.LightOperation` | { `base`: `number` = 2; `units_per_gas`: `number` = 214 } |
| `gas_costs.s256.LightOperation.base` | `number` |
| `gas_costs.s256.LightOperation.units_per_gas` | `number` |
| `gas_costs.sb` | `number` |
| `gas_costs.scwq` | { `LightOperation`: { `base`: `number` = 13; `units_per_gas`: `number` = 5 }  } |
| `gas_costs.scwq.LightOperation` | { `base`: `number` = 13; `units_per_gas`: `number` = 5 } |
| `gas_costs.scwq.LightOperation.base` | `number` |
| `gas_costs.scwq.LightOperation.units_per_gas` | `number` |
| `gas_costs.sll` | `number` |
| `gas_costs.slli` | `number` |
| `gas_costs.smo` | { `LightOperation`: { `base`: `number` = 209; `units_per_gas`: `number` = 55 }  } |
| `gas_costs.smo.LightOperation` | { `base`: `number` = 209; `units_per_gas`: `number` = 55 } |
| `gas_costs.smo.LightOperation.base` | `number` |
| `gas_costs.smo.LightOperation.units_per_gas` | `number` |
| `gas_costs.srl` | `number` |
| `gas_costs.srli` | `number` |
| `gas_costs.srw` | `number` |
| `gas_costs.srwq` | { `LightOperation`: { `base`: `number` = 47; `units_per_gas`: `number` = 5 }  } |
| `gas_costs.srwq.LightOperation` | { `base`: `number` = 47; `units_per_gas`: `number` = 5 } |
| `gas_costs.srwq.LightOperation.base` | `number` |
| `gas_costs.srwq.LightOperation.units_per_gas` | `number` |
| `gas_costs.state_root` | { `LightOperation`: { `base`: `number` = 412; `units_per_gas`: `number` = 1 }  } |
| `gas_costs.state_root.LightOperation` | { `base`: `number` = 412; `units_per_gas`: `number` = 1 } |
| `gas_costs.state_root.LightOperation.base` | `number` |
| `gas_costs.state_root.LightOperation.units_per_gas` | `number` |
| `gas_costs.sub` | `number` |
| `gas_costs.subi` | `number` |
| `gas_costs.sw` | `number` |
| `gas_costs.sww` | `number` |
| `gas_costs.swwq` | { `LightOperation`: { `base`: `number` = 44; `units_per_gas`: `number` = 5 }  } |
| `gas_costs.swwq.LightOperation` | { `base`: `number` = 44; `units_per_gas`: `number` = 5 } |
| `gas_costs.swwq.LightOperation.base` | `number` |
| `gas_costs.swwq.LightOperation.units_per_gas` | `number` |
| `gas_costs.time` | `number` |
| `gas_costs.tr` | `number` |
| `gas_costs.tro` | `number` |
| `gas_costs.vm_initialization` | { `HeavyOperation`: { `base`: `number` = 2000; `gas_per_unit`: `number` = 0 }  } |
| `gas_costs.vm_initialization.HeavyOperation` | { `base`: `number` = 2000; `gas_per_unit`: `number` = 0 } |
| `gas_costs.vm_initialization.HeavyOperation.base` | `number` |
| `gas_costs.vm_initialization.HeavyOperation.gas_per_unit` | `number` |
| `gas_costs.wdam` | `number` |
| `gas_costs.wdcm` | `number` |
| `gas_costs.wddv` | `number` |
| `gas_costs.wdmd` | `number` |
| `gas_costs.wdml` | `number` |
| `gas_costs.wdmm` | `number` |
| `gas_costs.wdop` | `number` |
| `gas_costs.wqam` | `number` |
| `gas_costs.wqcm` | `number` |
| `gas_costs.wqdv` | `number` |
| `gas_costs.wqmd` | `number` |
| `gas_costs.wqml` | `number` |
| `gas_costs.wqmm` | `number` |
| `gas_costs.wqop` | `number` |
| `gas_costs.xor` | `number` |
| `gas_costs.xori` | `number` |
| `initial_state` | { `coins`: { `amount`: `string` = "0xFFFFFFFFFFFFFFFF"; `asset_id`: `string` = "0x0000000000000000000000000000000000000000000000000000000000000000"; `owner`: `string` = "0x94ffcc53b892684acefaebc8a3d4a595e528a8cf664eeb3ef36f1020b0809d0d" }[] ; `messages`: { `amount`: `string` = "0x000000000000FFFF"; `da_height`: `string` = "0x00"; `data`: `string` = ""; `nonce`: `string` = "0101010101010101010101010101010101010101010101010101010101010101"; `recipient`: `string` = "0x69a2b736b60159b43bb8a4f98c0589f6da5fa3a3d101e8e269c499eb942753ba"; `sender`: `string` = "0xc43454aa38dd91f88109a4b7aef5efb96ce34e3f24992fe0f81d233ca686f80f" }[]  } |
| `initial_state.coins` | { `amount`: `string` = "0xFFFFFFFFFFFFFFFF"; `asset_id`: `string` = "0x0000000000000000000000000000000000000000000000000000000000000000"; `owner`: `string` = "0x94ffcc53b892684acefaebc8a3d4a595e528a8cf664eeb3ef36f1020b0809d0d" }[] |
| `initial_state.messages` | { `amount`: `string` = "0x000000000000FFFF"; `da_height`: `string` = "0x00"; `data`: `string` = ""; `nonce`: `string` = "0101010101010101010101010101010101010101010101010101010101010101"; `recipient`: `string` = "0x69a2b736b60159b43bb8a4f98c0589f6da5fa3a3d101e8e269c499eb942753ba"; `sender`: `string` = "0xc43454aa38dd91f88109a4b7aef5efb96ce34e3f24992fe0f81d233ca686f80f" }[] |

#### Defined in

[packages/utils/src/utils/defaultChainConfig.ts:3](https://github.com/FuelLabs/fuels-ts/blob/ec261c53/packages/utils/src/utils/defaultChainConfig.ts#L3)

___

### defaultConsensusKey

• `Const` **defaultConsensusKey**: ``"0xa449b1ffee0e2205fa924c6740cc48b3b473aa28587df6dab12abc245d1f5298"``

#### Defined in

[packages/utils/src/utils/defaultChainConfig.ts:5](https://github.com/FuelLabs/fuels-ts/blob/ec261c53/packages/utils/src/utils/defaultChainConfig.ts#L5)

## Functions

### arrayify

▸ **arrayify**(`value`): `Uint8Array`

Converts a bytes-like value to a `Uint8Array`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | [`BytesLike`](/api/Interfaces/index.md#byteslike) | the value to convert to a Uint8Array |

#### Returns

`Uint8Array`

the Uint8Array

#### Defined in

[packages/utils/src/utils/arrayify.ts:10](https://github.com/FuelLabs/fuels-ts/blob/ec261c53/packages/utils/src/utils/arrayify.ts#L10)

___

### capitalizeString

▸ **capitalizeString**(`str`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |

#### Returns

`string`

#### Defined in

[packages/utils/src/utils/capitalizeString.ts:1](https://github.com/FuelLabs/fuels-ts/blob/ec261c53/packages/utils/src/utils/capitalizeString.ts#L1)

___

### chunkAndPadBytes

▸ **chunkAndPadBytes**(`bytes`, `chunkSize`): `Uint8Array`[]

Function to take a byte array and split into chunks of a given size

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `bytes` | `Uint8Array` | The byte array to chunk |
| `chunkSize` | `number` | The size of each chunk |

#### Returns

`Uint8Array`[]

An array of byte arrays of a specified size

#### Defined in

[packages/utils/src/utils/chunkAndPadBytes.ts:8](https://github.com/FuelLabs/fuels-ts/blob/ec261c53/packages/utils/src/utils/chunkAndPadBytes.ts#L8)

___

### concat

▸ **concat**(`arrays`): `Uint8Array`

Concatenates multiple BytesLike into a single Uint8Array.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arrays` | readonly [`BytesLike`](/api/Interfaces/index.md#byteslike)[] | The arrays to concatenate. |

#### Returns

`Uint8Array`

- The concatenated array.

#### Defined in

[packages/utils/src/utils/concat.ts:38](https://github.com/FuelLabs/fuels-ts/blob/ec261c53/packages/utils/src/utils/concat.ts#L38)

___

### concatBytes

▸ **concatBytes**(`arrays`): `Uint8Array`

Concatenates multiple Uint8Arrays into a single Uint8Array.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arrays` | readonly `Uint8Array`[] \| readonly `number`[][] | The arrays to concatenate. |

#### Returns

`Uint8Array`

- The concatenated array.

#### Defined in

[packages/utils/src/utils/concat.ts:11](https://github.com/FuelLabs/fuels-ts/blob/ec261c53/packages/utils/src/utils/concat.ts#L11)

___

### hexlify

▸ **hexlify**(`data`): `string`

Returns a hex representation of the inputted bytes.

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`BytesLike`](/api/Interfaces/index.md#byteslike) |

#### Returns

`string`

#### Defined in

[packages/utils/src/utils/hexlify.ts:10](https://github.com/FuelLabs/fuels-ts/blob/ec261c53/packages/utils/src/utils/hexlify.ts#L10)

___

### normalizeString

▸ **normalizeString**(`str`): `string`

Converts `some.string-value` into `SomeStringValue`.

Examples:
 my-simple.test —— MySimpleTest
 myFile.ts —— MyFileTs
 my-abi.json —— MyAbiJson

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |

#### Returns

`string`

#### Defined in

[packages/utils/src/utils/normalizeString.ts:11](https://github.com/FuelLabs/fuels-ts/blob/ec261c53/packages/utils/src/utils/normalizeString.ts#L11)

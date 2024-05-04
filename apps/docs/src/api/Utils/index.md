# Module: @fuel-ts/utils

## Classes

- [DateTime](/api/Utils/DateTime.md)

## Variables

### defaultConsensusKey

• `Const` **defaultConsensusKey**: ``"0xa449b1ffee0e2205fa924c6740cc48b3b473aa28587df6dab12abc245d1f5298"``

#### Defined in

[packages/utils/src/utils/defaultSnapshotConfigs.ts:11](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/utils/src/utils/defaultSnapshotConfigs.ts#L11)

___

### defaultSnapshotConfigs

• `Const` **defaultSnapshotConfigs**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `chainConfigJson` | { `chain_name`: `string` = "local\_testnet"; `consensus`: { `PoA`: { `signing_key`: `string` = "0x94ffcc53b892684acefaebc8a3d4a595e528a8cf664eeb3ef36f1020b0809d0d" }  } ; `consensus_parameters`: { `V1`: { `base_asset_id`: `string` = "0000000000000000000000000000000000000000000000000000000000000000"; `block_gas_limit`: `number` = 30000000; `chain_id`: `number` = 0; `contract_params`: { `V1`: { `contract_max_size`: `number` = 102400; `max_storage_slots`: `number` = 1760 }  } ; `fee_params`: { `V1`: { `gas_per_byte`: `number` = 63; `gas_price_factor`: `number` = 92 }  } ; `gas_costs`: { `V1`: { `add`: `number` = 2; `addi`: `number` = 2; `aloc`: `number` = 1; `and`: `number` = 2; `andi`: `number` = 2; `bal`: `number` = 366; `bhei`: `number` = 2; `bhsh`: `number` = 2; `burn`: `number` = 33949; `call`: { `LightOperation`: { `base`: `number` = 21687; `units_per_gas`: `number` = 4 }  } ; `cb`: `number` = 2; `ccp`: { `LightOperation`: { `base`: `number` = 59; `units_per_gas`: `number` = 20 }  } ; `cfei`: `number` = 2; `cfsi`: `number` = 2; `contract_root`: { `LightOperation`: { `base`: `number` = 45; `units_per_gas`: `number` = 1 }  } ; `croo`: { `LightOperation`: { `base`: `number` = 1; `units_per_gas`: `number` = 1 }  } ; `csiz`: { `LightOperation`: { `base`: `number` = 59; `units_per_gas`: `number` = 195 }  } ; `div`: `number` = 2; `divi`: `number` = 2; `eck1`: `number` = 3347; `ecr1`: `number` = 46165; `ed19`: `number` = 4210; `eq`: `number` = 2; `exp`: `number` = 2; `expi`: `number` = 2; `flag`: `number` = 1; `gm`: `number` = 2; `gt`: `number` = 2; `gtf`: `number` = 16; `ji`: `number` = 2; `jmp`: `number` = 2; `jmpb`: `number` = 2; `jmpf`: `number` = 2; `jne`: `number` = 2; `jneb`: `number` = 2; `jnef`: `number` = 2; `jnei`: `number` = 2; `jnzb`: `number` = 2; `jnzf`: `number` = 2; `jnzi`: `number` = 2; `k256`: { `LightOperation`: { `base`: `number` = 282; `units_per_gas`: `number` = 3 }  } ; `lb`: `number` = 2; `ldc`: { `LightOperation`: { `base`: `number` = 45; `units_per_gas`: `number` = 65 }  } ; `log`: `number` = 754; `logd`: { `LightOperation`: { `base`: `number` = 1134; `units_per_gas`: `number` = 2 }  } ; `lt`: `number` = 2; `lw`: `number` = 2; `mcl`: { `LightOperation`: { `base`: `number` = 3; `units_per_gas`: `number` = 523 }  } ; `mcli`: { `LightOperation`: { `base`: `number` = 3; `units_per_gas`: `number` = 526 }  } ; `mcp`: { `LightOperation`: { `base`: `number` = 3; `units_per_gas`: `number` = 448 }  } ; `mcpi`: { `LightOperation`: { `base`: `number` = 7; `units_per_gas`: `number` = 585 }  } ; `meq`: { `LightOperation`: { `base`: `number` = 11; `units_per_gas`: `number` = 1097 }  } ; `mint`: `number` = 35718; `mldv`: `number` = 4; `mlog`: `number` = 2; `mod`: `number` = 2; `modi`: `number` = 2; `move`: `number` = 2; `movi`: `number` = 2; `mroo`: `number` = 5; `mul`: `number` = 2; `muli`: `number` = 2; `new_storage_per_byte`: `number` = 63; `noop`: `number` = 1; `not`: `number` = 2; `or`: `number` = 2; `ori`: `number` = 2; `poph`: `number` = 3; `popl`: `number` = 3; `pshh`: `number` = 4; `pshl`: `number` = 4; `ret_contract`: `number` = 733; `retd_contract`: { `LightOperation`: { `base`: `number` = 1086; `units_per_gas`: `number` = 2 }  } ; `rvrt_contract`: `number` = 722; `s256`: { `LightOperation`: { `base`: `number` = 45; `units_per_gas`: `number` = 3 }  } ; `sb`: `number` = 2; `scwq`: { `HeavyOperation`: { `base`: `number` = 30375; `gas_per_unit`: `number` = 28628 }  } ; `sll`: `number` = 2; `slli`: `number` = 2; `smo`: { `LightOperation`: { `base`: `number` = 64196; `units_per_gas`: `number` = 1 }  } ; `srl`: `number` = 2; `srli`: `number` = 2; `srw`: `number` = 253; `srwq`: { `HeavyOperation`: { `base`: `number` = 262; `gas_per_unit`: `number` = 249 }  } ; `state_root`: { `HeavyOperation`: { `base`: `number` = 350; `gas_per_unit`: `number` = 176 }  } ; `sub`: `number` = 2; `subi`: `number` = 2; `sw`: `number` = 2; `sww`: `number` = 29053; `swwq`: { `HeavyOperation`: { `base`: `number` = 28484; `gas_per_unit`: `number` = 26613 }  } ; `time`: `number` = 79; `tr`: `number` = 46242; `tro`: `number` = 33251; `vm_initialization`: { `LightOperation`: { `base`: `number` = 1645; `units_per_gas`: `number` = 14 }  } ; `wdam`: `number` = 9; `wdcm`: `number` = 3; `wddv`: `number` = 5; `wdmd`: `number` = 11; `wdml`: `number` = 3; `wdmm`: `number` = 11; `wdop`: `number` = 3; `wqam`: `number` = 12; `wqcm`: `number` = 3; `wqdv`: `number` = 7; `wqmd`: `number` = 18; `wqml`: `number` = 4; `wqmm`: `number` = 11; `wqop`: `number` = 3; `xor`: `number` = 2; `xori`: `number` = 2 }  } ; `predicate_params`: { `V1`: { `max_gas_per_predicate`: `number` = 30000000; `max_message_data_length`: `number` = 102400; `max_predicate_data_length`: `number` = 102400; `max_predicate_length`: `number` = 102400 }  } ; `privileged_address`: `string` = "0000000000000000000000000000000000000000000000000000000000000000"; `script_params`: { `V1`: { `max_script_data_length`: `number` = 102400; `max_script_length`: `number` = 102400 }  } ; `tx_params`: { `V1`: { `max_bytecode_subsections`: `number` = 256; `max_gas_per_tx`: `number` = 30000000; `max_inputs`: `number` = 255; `max_outputs`: `number` = 255; `max_size`: `number` = 112640; `max_witnesses`: `number` = 255 }  }  }  }  } |
| `chainConfigJson.chain_name` | `string` |
| `chainConfigJson.consensus` | { `PoA`: { `signing_key`: `string` = "0x94ffcc53b892684acefaebc8a3d4a595e528a8cf664eeb3ef36f1020b0809d0d" }  } |
| `chainConfigJson.consensus.PoA` | { `signing_key`: `string` = "0x94ffcc53b892684acefaebc8a3d4a595e528a8cf664eeb3ef36f1020b0809d0d" } |
| `chainConfigJson.consensus.PoA.signing_key` | `string` |
| `chainConfigJson.consensus_parameters` | { `V1`: { `base_asset_id`: `string` = "0000000000000000000000000000000000000000000000000000000000000000"; `block_gas_limit`: `number` = 30000000; `chain_id`: `number` = 0; `contract_params`: { `V1`: { `contract_max_size`: `number` = 102400; `max_storage_slots`: `number` = 1760 }  } ; `fee_params`: { `V1`: { `gas_per_byte`: `number` = 63; `gas_price_factor`: `number` = 92 }  } ; `gas_costs`: { `V1`: { `add`: `number` = 2; `addi`: `number` = 2; `aloc`: `number` = 1; `and`: `number` = 2; `andi`: `number` = 2; `bal`: `number` = 366; `bhei`: `number` = 2; `bhsh`: `number` = 2; `burn`: `number` = 33949; `call`: { `LightOperation`: { `base`: `number` = 21687; `units_per_gas`: `number` = 4 }  } ; `cb`: `number` = 2; `ccp`: { `LightOperation`: { `base`: `number` = 59; `units_per_gas`: `number` = 20 }  } ; `cfei`: `number` = 2; `cfsi`: `number` = 2; `contract_root`: { `LightOperation`: { `base`: `number` = 45; `units_per_gas`: `number` = 1 }  } ; `croo`: { `LightOperation`: { `base`: `number` = 1; `units_per_gas`: `number` = 1 }  } ; `csiz`: { `LightOperation`: { `base`: `number` = 59; `units_per_gas`: `number` = 195 }  } ; `div`: `number` = 2; `divi`: `number` = 2; `eck1`: `number` = 3347; `ecr1`: `number` = 46165; `ed19`: `number` = 4210; `eq`: `number` = 2; `exp`: `number` = 2; `expi`: `number` = 2; `flag`: `number` = 1; `gm`: `number` = 2; `gt`: `number` = 2; `gtf`: `number` = 16; `ji`: `number` = 2; `jmp`: `number` = 2; `jmpb`: `number` = 2; `jmpf`: `number` = 2; `jne`: `number` = 2; `jneb`: `number` = 2; `jnef`: `number` = 2; `jnei`: `number` = 2; `jnzb`: `number` = 2; `jnzf`: `number` = 2; `jnzi`: `number` = 2; `k256`: { `LightOperation`: { `base`: `number` = 282; `units_per_gas`: `number` = 3 }  } ; `lb`: `number` = 2; `ldc`: { `LightOperation`: { `base`: `number` = 45; `units_per_gas`: `number` = 65 }  } ; `log`: `number` = 754; `logd`: { `LightOperation`: { `base`: `number` = 1134; `units_per_gas`: `number` = 2 }  } ; `lt`: `number` = 2; `lw`: `number` = 2; `mcl`: { `LightOperation`: { `base`: `number` = 3; `units_per_gas`: `number` = 523 }  } ; `mcli`: { `LightOperation`: { `base`: `number` = 3; `units_per_gas`: `number` = 526 }  } ; `mcp`: { `LightOperation`: { `base`: `number` = 3; `units_per_gas`: `number` = 448 }  } ; `mcpi`: { `LightOperation`: { `base`: `number` = 7; `units_per_gas`: `number` = 585 }  } ; `meq`: { `LightOperation`: { `base`: `number` = 11; `units_per_gas`: `number` = 1097 }  } ; `mint`: `number` = 35718; `mldv`: `number` = 4; `mlog`: `number` = 2; `mod`: `number` = 2; `modi`: `number` = 2; `move`: `number` = 2; `movi`: `number` = 2; `mroo`: `number` = 5; `mul`: `number` = 2; `muli`: `number` = 2; `new_storage_per_byte`: `number` = 63; `noop`: `number` = 1; `not`: `number` = 2; `or`: `number` = 2; `ori`: `number` = 2; `poph`: `number` = 3; `popl`: `number` = 3; `pshh`: `number` = 4; `pshl`: `number` = 4; `ret_contract`: `number` = 733; `retd_contract`: { `LightOperation`: { `base`: `number` = 1086; `units_per_gas`: `number` = 2 }  } ; `rvrt_contract`: `number` = 722; `s256`: { `LightOperation`: { `base`: `number` = 45; `units_per_gas`: `number` = 3 }  } ; `sb`: `number` = 2; `scwq`: { `HeavyOperation`: { `base`: `number` = 30375; `gas_per_unit`: `number` = 28628 }  } ; `sll`: `number` = 2; `slli`: `number` = 2; `smo`: { `LightOperation`: { `base`: `number` = 64196; `units_per_gas`: `number` = 1 }  } ; `srl`: `number` = 2; `srli`: `number` = 2; `srw`: `number` = 253; `srwq`: { `HeavyOperation`: { `base`: `number` = 262; `gas_per_unit`: `number` = 249 }  } ; `state_root`: { `HeavyOperation`: { `base`: `number` = 350; `gas_per_unit`: `number` = 176 }  } ; `sub`: `number` = 2; `subi`: `number` = 2; `sw`: `number` = 2; `sww`: `number` = 29053; `swwq`: { `HeavyOperation`: { `base`: `number` = 28484; `gas_per_unit`: `number` = 26613 }  } ; `time`: `number` = 79; `tr`: `number` = 46242; `tro`: `number` = 33251; `vm_initialization`: { `LightOperation`: { `base`: `number` = 1645; `units_per_gas`: `number` = 14 }  } ; `wdam`: `number` = 9; `wdcm`: `number` = 3; `wddv`: `number` = 5; `wdmd`: `number` = 11; `wdml`: `number` = 3; `wdmm`: `number` = 11; `wdop`: `number` = 3; `wqam`: `number` = 12; `wqcm`: `number` = 3; `wqdv`: `number` = 7; `wqmd`: `number` = 18; `wqml`: `number` = 4; `wqmm`: `number` = 11; `wqop`: `number` = 3; `xor`: `number` = 2; `xori`: `number` = 2 }  } ; `predicate_params`: { `V1`: { `max_gas_per_predicate`: `number` = 30000000; `max_message_data_length`: `number` = 102400; `max_predicate_data_length`: `number` = 102400; `max_predicate_length`: `number` = 102400 }  } ; `privileged_address`: `string` = "0000000000000000000000000000000000000000000000000000000000000000"; `script_params`: { `V1`: { `max_script_data_length`: `number` = 102400; `max_script_length`: `number` = 102400 }  } ; `tx_params`: { `V1`: { `max_bytecode_subsections`: `number` = 256; `max_gas_per_tx`: `number` = 30000000; `max_inputs`: `number` = 255; `max_outputs`: `number` = 255; `max_size`: `number` = 112640; `max_witnesses`: `number` = 255 }  }  }  } |
| `chainConfigJson.consensus_parameters.V1` | { `base_asset_id`: `string` = "0000000000000000000000000000000000000000000000000000000000000000"; `block_gas_limit`: `number` = 30000000; `chain_id`: `number` = 0; `contract_params`: { `V1`: { `contract_max_size`: `number` = 102400; `max_storage_slots`: `number` = 1760 }  } ; `fee_params`: { `V1`: { `gas_per_byte`: `number` = 63; `gas_price_factor`: `number` = 92 }  } ; `gas_costs`: { `V1`: { `add`: `number` = 2; `addi`: `number` = 2; `aloc`: `number` = 1; `and`: `number` = 2; `andi`: `number` = 2; `bal`: `number` = 366; `bhei`: `number` = 2; `bhsh`: `number` = 2; `burn`: `number` = 33949; `call`: { `LightOperation`: { `base`: `number` = 21687; `units_per_gas`: `number` = 4 }  } ; `cb`: `number` = 2; `ccp`: { `LightOperation`: { `base`: `number` = 59; `units_per_gas`: `number` = 20 }  } ; `cfei`: `number` = 2; `cfsi`: `number` = 2; `contract_root`: { `LightOperation`: { `base`: `number` = 45; `units_per_gas`: `number` = 1 }  } ; `croo`: { `LightOperation`: { `base`: `number` = 1; `units_per_gas`: `number` = 1 }  } ; `csiz`: { `LightOperation`: { `base`: `number` = 59; `units_per_gas`: `number` = 195 }  } ; `div`: `number` = 2; `divi`: `number` = 2; `eck1`: `number` = 3347; `ecr1`: `number` = 46165; `ed19`: `number` = 4210; `eq`: `number` = 2; `exp`: `number` = 2; `expi`: `number` = 2; `flag`: `number` = 1; `gm`: `number` = 2; `gt`: `number` = 2; `gtf`: `number` = 16; `ji`: `number` = 2; `jmp`: `number` = 2; `jmpb`: `number` = 2; `jmpf`: `number` = 2; `jne`: `number` = 2; `jneb`: `number` = 2; `jnef`: `number` = 2; `jnei`: `number` = 2; `jnzb`: `number` = 2; `jnzf`: `number` = 2; `jnzi`: `number` = 2; `k256`: { `LightOperation`: { `base`: `number` = 282; `units_per_gas`: `number` = 3 }  } ; `lb`: `number` = 2; `ldc`: { `LightOperation`: { `base`: `number` = 45; `units_per_gas`: `number` = 65 }  } ; `log`: `number` = 754; `logd`: { `LightOperation`: { `base`: `number` = 1134; `units_per_gas`: `number` = 2 }  } ; `lt`: `number` = 2; `lw`: `number` = 2; `mcl`: { `LightOperation`: { `base`: `number` = 3; `units_per_gas`: `number` = 523 }  } ; `mcli`: { `LightOperation`: { `base`: `number` = 3; `units_per_gas`: `number` = 526 }  } ; `mcp`: { `LightOperation`: { `base`: `number` = 3; `units_per_gas`: `number` = 448 }  } ; `mcpi`: { `LightOperation`: { `base`: `number` = 7; `units_per_gas`: `number` = 585 }  } ; `meq`: { `LightOperation`: { `base`: `number` = 11; `units_per_gas`: `number` = 1097 }  } ; `mint`: `number` = 35718; `mldv`: `number` = 4; `mlog`: `number` = 2; `mod`: `number` = 2; `modi`: `number` = 2; `move`: `number` = 2; `movi`: `number` = 2; `mroo`: `number` = 5; `mul`: `number` = 2; `muli`: `number` = 2; `new_storage_per_byte`: `number` = 63; `noop`: `number` = 1; `not`: `number` = 2; `or`: `number` = 2; `ori`: `number` = 2; `poph`: `number` = 3; `popl`: `number` = 3; `pshh`: `number` = 4; `pshl`: `number` = 4; `ret_contract`: `number` = 733; `retd_contract`: { `LightOperation`: { `base`: `number` = 1086; `units_per_gas`: `number` = 2 }  } ; `rvrt_contract`: `number` = 722; `s256`: { `LightOperation`: { `base`: `number` = 45; `units_per_gas`: `number` = 3 }  } ; `sb`: `number` = 2; `scwq`: { `HeavyOperation`: { `base`: `number` = 30375; `gas_per_unit`: `number` = 28628 }  } ; `sll`: `number` = 2; `slli`: `number` = 2; `smo`: { `LightOperation`: { `base`: `number` = 64196; `units_per_gas`: `number` = 1 }  } ; `srl`: `number` = 2; `srli`: `number` = 2; `srw`: `number` = 253; `srwq`: { `HeavyOperation`: { `base`: `number` = 262; `gas_per_unit`: `number` = 249 }  } ; `state_root`: { `HeavyOperation`: { `base`: `number` = 350; `gas_per_unit`: `number` = 176 }  } ; `sub`: `number` = 2; `subi`: `number` = 2; `sw`: `number` = 2; `sww`: `number` = 29053; `swwq`: { `HeavyOperation`: { `base`: `number` = 28484; `gas_per_unit`: `number` = 26613 }  } ; `time`: `number` = 79; `tr`: `number` = 46242; `tro`: `number` = 33251; `vm_initialization`: { `LightOperation`: { `base`: `number` = 1645; `units_per_gas`: `number` = 14 }  } ; `wdam`: `number` = 9; `wdcm`: `number` = 3; `wddv`: `number` = 5; `wdmd`: `number` = 11; `wdml`: `number` = 3; `wdmm`: `number` = 11; `wdop`: `number` = 3; `wqam`: `number` = 12; `wqcm`: `number` = 3; `wqdv`: `number` = 7; `wqmd`: `number` = 18; `wqml`: `number` = 4; `wqmm`: `number` = 11; `wqop`: `number` = 3; `xor`: `number` = 2; `xori`: `number` = 2 }  } ; `predicate_params`: { `V1`: { `max_gas_per_predicate`: `number` = 30000000; `max_message_data_length`: `number` = 102400; `max_predicate_data_length`: `number` = 102400; `max_predicate_length`: `number` = 102400 }  } ; `privileged_address`: `string` = "0000000000000000000000000000000000000000000000000000000000000000"; `script_params`: { `V1`: { `max_script_data_length`: `number` = 102400; `max_script_length`: `number` = 102400 }  } ; `tx_params`: { `V1`: { `max_bytecode_subsections`: `number` = 256; `max_gas_per_tx`: `number` = 30000000; `max_inputs`: `number` = 255; `max_outputs`: `number` = 255; `max_size`: `number` = 112640; `max_witnesses`: `number` = 255 }  }  } |
| `chainConfigJson.consensus_parameters.V1.base_asset_id` | `string` |
| `chainConfigJson.consensus_parameters.V1.block_gas_limit` | `number` |
| `chainConfigJson.consensus_parameters.V1.chain_id` | `number` |
| `chainConfigJson.consensus_parameters.V1.contract_params` | { `V1`: { `contract_max_size`: `number` = 102400; `max_storage_slots`: `number` = 1760 }  } |
| `chainConfigJson.consensus_parameters.V1.contract_params.V1` | { `contract_max_size`: `number` = 102400; `max_storage_slots`: `number` = 1760 } |
| `chainConfigJson.consensus_parameters.V1.contract_params.V1.contract_max_size` | `number` |
| `chainConfigJson.consensus_parameters.V1.contract_params.V1.max_storage_slots` | `number` |
| `chainConfigJson.consensus_parameters.V1.fee_params` | { `V1`: { `gas_per_byte`: `number` = 63; `gas_price_factor`: `number` = 92 }  } |
| `chainConfigJson.consensus_parameters.V1.fee_params.V1` | { `gas_per_byte`: `number` = 63; `gas_price_factor`: `number` = 92 } |
| `chainConfigJson.consensus_parameters.V1.fee_params.V1.gas_per_byte` | `number` |
| `chainConfigJson.consensus_parameters.V1.fee_params.V1.gas_price_factor` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs` | { `V1`: { `add`: `number` = 2; `addi`: `number` = 2; `aloc`: `number` = 1; `and`: `number` = 2; `andi`: `number` = 2; `bal`: `number` = 366; `bhei`: `number` = 2; `bhsh`: `number` = 2; `burn`: `number` = 33949; `call`: { `LightOperation`: { `base`: `number` = 21687; `units_per_gas`: `number` = 4 }  } ; `cb`: `number` = 2; `ccp`: { `LightOperation`: { `base`: `number` = 59; `units_per_gas`: `number` = 20 }  } ; `cfei`: `number` = 2; `cfsi`: `number` = 2; `contract_root`: { `LightOperation`: { `base`: `number` = 45; `units_per_gas`: `number` = 1 }  } ; `croo`: { `LightOperation`: { `base`: `number` = 1; `units_per_gas`: `number` = 1 }  } ; `csiz`: { `LightOperation`: { `base`: `number` = 59; `units_per_gas`: `number` = 195 }  } ; `div`: `number` = 2; `divi`: `number` = 2; `eck1`: `number` = 3347; `ecr1`: `number` = 46165; `ed19`: `number` = 4210; `eq`: `number` = 2; `exp`: `number` = 2; `expi`: `number` = 2; `flag`: `number` = 1; `gm`: `number` = 2; `gt`: `number` = 2; `gtf`: `number` = 16; `ji`: `number` = 2; `jmp`: `number` = 2; `jmpb`: `number` = 2; `jmpf`: `number` = 2; `jne`: `number` = 2; `jneb`: `number` = 2; `jnef`: `number` = 2; `jnei`: `number` = 2; `jnzb`: `number` = 2; `jnzf`: `number` = 2; `jnzi`: `number` = 2; `k256`: { `LightOperation`: { `base`: `number` = 282; `units_per_gas`: `number` = 3 }  } ; `lb`: `number` = 2; `ldc`: { `LightOperation`: { `base`: `number` = 45; `units_per_gas`: `number` = 65 }  } ; `log`: `number` = 754; `logd`: { `LightOperation`: { `base`: `number` = 1134; `units_per_gas`: `number` = 2 }  } ; `lt`: `number` = 2; `lw`: `number` = 2; `mcl`: { `LightOperation`: { `base`: `number` = 3; `units_per_gas`: `number` = 523 }  } ; `mcli`: { `LightOperation`: { `base`: `number` = 3; `units_per_gas`: `number` = 526 }  } ; `mcp`: { `LightOperation`: { `base`: `number` = 3; `units_per_gas`: `number` = 448 }  } ; `mcpi`: { `LightOperation`: { `base`: `number` = 7; `units_per_gas`: `number` = 585 }  } ; `meq`: { `LightOperation`: { `base`: `number` = 11; `units_per_gas`: `number` = 1097 }  } ; `mint`: `number` = 35718; `mldv`: `number` = 4; `mlog`: `number` = 2; `mod`: `number` = 2; `modi`: `number` = 2; `move`: `number` = 2; `movi`: `number` = 2; `mroo`: `number` = 5; `mul`: `number` = 2; `muli`: `number` = 2; `new_storage_per_byte`: `number` = 63; `noop`: `number` = 1; `not`: `number` = 2; `or`: `number` = 2; `ori`: `number` = 2; `poph`: `number` = 3; `popl`: `number` = 3; `pshh`: `number` = 4; `pshl`: `number` = 4; `ret_contract`: `number` = 733; `retd_contract`: { `LightOperation`: { `base`: `number` = 1086; `units_per_gas`: `number` = 2 }  } ; `rvrt_contract`: `number` = 722; `s256`: { `LightOperation`: { `base`: `number` = 45; `units_per_gas`: `number` = 3 }  } ; `sb`: `number` = 2; `scwq`: { `HeavyOperation`: { `base`: `number` = 30375; `gas_per_unit`: `number` = 28628 }  } ; `sll`: `number` = 2; `slli`: `number` = 2; `smo`: { `LightOperation`: { `base`: `number` = 64196; `units_per_gas`: `number` = 1 }  } ; `srl`: `number` = 2; `srli`: `number` = 2; `srw`: `number` = 253; `srwq`: { `HeavyOperation`: { `base`: `number` = 262; `gas_per_unit`: `number` = 249 }  } ; `state_root`: { `HeavyOperation`: { `base`: `number` = 350; `gas_per_unit`: `number` = 176 }  } ; `sub`: `number` = 2; `subi`: `number` = 2; `sw`: `number` = 2; `sww`: `number` = 29053; `swwq`: { `HeavyOperation`: { `base`: `number` = 28484; `gas_per_unit`: `number` = 26613 }  } ; `time`: `number` = 79; `tr`: `number` = 46242; `tro`: `number` = 33251; `vm_initialization`: { `LightOperation`: { `base`: `number` = 1645; `units_per_gas`: `number` = 14 }  } ; `wdam`: `number` = 9; `wdcm`: `number` = 3; `wddv`: `number` = 5; `wdmd`: `number` = 11; `wdml`: `number` = 3; `wdmm`: `number` = 11; `wdop`: `number` = 3; `wqam`: `number` = 12; `wqcm`: `number` = 3; `wqdv`: `number` = 7; `wqmd`: `number` = 18; `wqml`: `number` = 4; `wqmm`: `number` = 11; `wqop`: `number` = 3; `xor`: `number` = 2; `xori`: `number` = 2 }  } |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1` | { `add`: `number` = 2; `addi`: `number` = 2; `aloc`: `number` = 1; `and`: `number` = 2; `andi`: `number` = 2; `bal`: `number` = 366; `bhei`: `number` = 2; `bhsh`: `number` = 2; `burn`: `number` = 33949; `call`: { `LightOperation`: { `base`: `number` = 21687; `units_per_gas`: `number` = 4 }  } ; `cb`: `number` = 2; `ccp`: { `LightOperation`: { `base`: `number` = 59; `units_per_gas`: `number` = 20 }  } ; `cfei`: `number` = 2; `cfsi`: `number` = 2; `contract_root`: { `LightOperation`: { `base`: `number` = 45; `units_per_gas`: `number` = 1 }  } ; `croo`: { `LightOperation`: { `base`: `number` = 1; `units_per_gas`: `number` = 1 }  } ; `csiz`: { `LightOperation`: { `base`: `number` = 59; `units_per_gas`: `number` = 195 }  } ; `div`: `number` = 2; `divi`: `number` = 2; `eck1`: `number` = 3347; `ecr1`: `number` = 46165; `ed19`: `number` = 4210; `eq`: `number` = 2; `exp`: `number` = 2; `expi`: `number` = 2; `flag`: `number` = 1; `gm`: `number` = 2; `gt`: `number` = 2; `gtf`: `number` = 16; `ji`: `number` = 2; `jmp`: `number` = 2; `jmpb`: `number` = 2; `jmpf`: `number` = 2; `jne`: `number` = 2; `jneb`: `number` = 2; `jnef`: `number` = 2; `jnei`: `number` = 2; `jnzb`: `number` = 2; `jnzf`: `number` = 2; `jnzi`: `number` = 2; `k256`: { `LightOperation`: { `base`: `number` = 282; `units_per_gas`: `number` = 3 }  } ; `lb`: `number` = 2; `ldc`: { `LightOperation`: { `base`: `number` = 45; `units_per_gas`: `number` = 65 }  } ; `log`: `number` = 754; `logd`: { `LightOperation`: { `base`: `number` = 1134; `units_per_gas`: `number` = 2 }  } ; `lt`: `number` = 2; `lw`: `number` = 2; `mcl`: { `LightOperation`: { `base`: `number` = 3; `units_per_gas`: `number` = 523 }  } ; `mcli`: { `LightOperation`: { `base`: `number` = 3; `units_per_gas`: `number` = 526 }  } ; `mcp`: { `LightOperation`: { `base`: `number` = 3; `units_per_gas`: `number` = 448 }  } ; `mcpi`: { `LightOperation`: { `base`: `number` = 7; `units_per_gas`: `number` = 585 }  } ; `meq`: { `LightOperation`: { `base`: `number` = 11; `units_per_gas`: `number` = 1097 }  } ; `mint`: `number` = 35718; `mldv`: `number` = 4; `mlog`: `number` = 2; `mod`: `number` = 2; `modi`: `number` = 2; `move`: `number` = 2; `movi`: `number` = 2; `mroo`: `number` = 5; `mul`: `number` = 2; `muli`: `number` = 2; `new_storage_per_byte`: `number` = 63; `noop`: `number` = 1; `not`: `number` = 2; `or`: `number` = 2; `ori`: `number` = 2; `poph`: `number` = 3; `popl`: `number` = 3; `pshh`: `number` = 4; `pshl`: `number` = 4; `ret_contract`: `number` = 733; `retd_contract`: { `LightOperation`: { `base`: `number` = 1086; `units_per_gas`: `number` = 2 }  } ; `rvrt_contract`: `number` = 722; `s256`: { `LightOperation`: { `base`: `number` = 45; `units_per_gas`: `number` = 3 }  } ; `sb`: `number` = 2; `scwq`: { `HeavyOperation`: { `base`: `number` = 30375; `gas_per_unit`: `number` = 28628 }  } ; `sll`: `number` = 2; `slli`: `number` = 2; `smo`: { `LightOperation`: { `base`: `number` = 64196; `units_per_gas`: `number` = 1 }  } ; `srl`: `number` = 2; `srli`: `number` = 2; `srw`: `number` = 253; `srwq`: { `HeavyOperation`: { `base`: `number` = 262; `gas_per_unit`: `number` = 249 }  } ; `state_root`: { `HeavyOperation`: { `base`: `number` = 350; `gas_per_unit`: `number` = 176 }  } ; `sub`: `number` = 2; `subi`: `number` = 2; `sw`: `number` = 2; `sww`: `number` = 29053; `swwq`: { `HeavyOperation`: { `base`: `number` = 28484; `gas_per_unit`: `number` = 26613 }  } ; `time`: `number` = 79; `tr`: `number` = 46242; `tro`: `number` = 33251; `vm_initialization`: { `LightOperation`: { `base`: `number` = 1645; `units_per_gas`: `number` = 14 }  } ; `wdam`: `number` = 9; `wdcm`: `number` = 3; `wddv`: `number` = 5; `wdmd`: `number` = 11; `wdml`: `number` = 3; `wdmm`: `number` = 11; `wdop`: `number` = 3; `wqam`: `number` = 12; `wqcm`: `number` = 3; `wqdv`: `number` = 7; `wqmd`: `number` = 18; `wqml`: `number` = 4; `wqmm`: `number` = 11; `wqop`: `number` = 3; `xor`: `number` = 2; `xori`: `number` = 2 } |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.add` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.addi` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.aloc` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.and` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.andi` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.bal` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.bhei` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.bhsh` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.burn` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.call` | { `LightOperation`: { `base`: `number` = 21687; `units_per_gas`: `number` = 4 }  } |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.call.LightOperation` | { `base`: `number` = 21687; `units_per_gas`: `number` = 4 } |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.call.LightOperation.base` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.call.LightOperation.units_per_gas` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.cb` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.ccp` | { `LightOperation`: { `base`: `number` = 59; `units_per_gas`: `number` = 20 }  } |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.ccp.LightOperation` | { `base`: `number` = 59; `units_per_gas`: `number` = 20 } |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.ccp.LightOperation.base` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.ccp.LightOperation.units_per_gas` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.cfei` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.cfsi` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.contract_root` | { `LightOperation`: { `base`: `number` = 45; `units_per_gas`: `number` = 1 }  } |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.contract_root.LightOperation` | { `base`: `number` = 45; `units_per_gas`: `number` = 1 } |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.contract_root.LightOperation.base` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.contract_root.LightOperation.units_per_gas` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.croo` | { `LightOperation`: { `base`: `number` = 1; `units_per_gas`: `number` = 1 }  } |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.croo.LightOperation` | { `base`: `number` = 1; `units_per_gas`: `number` = 1 } |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.croo.LightOperation.base` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.croo.LightOperation.units_per_gas` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.csiz` | { `LightOperation`: { `base`: `number` = 59; `units_per_gas`: `number` = 195 }  } |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.csiz.LightOperation` | { `base`: `number` = 59; `units_per_gas`: `number` = 195 } |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.csiz.LightOperation.base` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.csiz.LightOperation.units_per_gas` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.div` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.divi` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.eck1` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.ecr1` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.ed19` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.eq` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.exp` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.expi` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.flag` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.gm` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.gt` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.gtf` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.ji` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.jmp` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.jmpb` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.jmpf` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.jne` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.jneb` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.jnef` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.jnei` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.jnzb` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.jnzf` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.jnzi` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.k256` | { `LightOperation`: { `base`: `number` = 282; `units_per_gas`: `number` = 3 }  } |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.k256.LightOperation` | { `base`: `number` = 282; `units_per_gas`: `number` = 3 } |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.k256.LightOperation.base` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.k256.LightOperation.units_per_gas` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.lb` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.ldc` | { `LightOperation`: { `base`: `number` = 45; `units_per_gas`: `number` = 65 }  } |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.ldc.LightOperation` | { `base`: `number` = 45; `units_per_gas`: `number` = 65 } |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.ldc.LightOperation.base` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.ldc.LightOperation.units_per_gas` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.log` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.logd` | { `LightOperation`: { `base`: `number` = 1134; `units_per_gas`: `number` = 2 }  } |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.logd.LightOperation` | { `base`: `number` = 1134; `units_per_gas`: `number` = 2 } |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.logd.LightOperation.base` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.logd.LightOperation.units_per_gas` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.lt` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.lw` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.mcl` | { `LightOperation`: { `base`: `number` = 3; `units_per_gas`: `number` = 523 }  } |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.mcl.LightOperation` | { `base`: `number` = 3; `units_per_gas`: `number` = 523 } |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.mcl.LightOperation.base` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.mcl.LightOperation.units_per_gas` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.mcli` | { `LightOperation`: { `base`: `number` = 3; `units_per_gas`: `number` = 526 }  } |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.mcli.LightOperation` | { `base`: `number` = 3; `units_per_gas`: `number` = 526 } |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.mcli.LightOperation.base` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.mcli.LightOperation.units_per_gas` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.mcp` | { `LightOperation`: { `base`: `number` = 3; `units_per_gas`: `number` = 448 }  } |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.mcp.LightOperation` | { `base`: `number` = 3; `units_per_gas`: `number` = 448 } |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.mcp.LightOperation.base` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.mcp.LightOperation.units_per_gas` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.mcpi` | { `LightOperation`: { `base`: `number` = 7; `units_per_gas`: `number` = 585 }  } |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.mcpi.LightOperation` | { `base`: `number` = 7; `units_per_gas`: `number` = 585 } |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.mcpi.LightOperation.base` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.mcpi.LightOperation.units_per_gas` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.meq` | { `LightOperation`: { `base`: `number` = 11; `units_per_gas`: `number` = 1097 }  } |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.meq.LightOperation` | { `base`: `number` = 11; `units_per_gas`: `number` = 1097 } |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.meq.LightOperation.base` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.meq.LightOperation.units_per_gas` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.mint` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.mldv` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.mlog` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.mod` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.modi` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.move` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.movi` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.mroo` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.mul` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.muli` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.new_storage_per_byte` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.noop` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.not` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.or` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.ori` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.poph` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.popl` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.pshh` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.pshl` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.ret_contract` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.retd_contract` | { `LightOperation`: { `base`: `number` = 1086; `units_per_gas`: `number` = 2 }  } |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.retd_contract.LightOperation` | { `base`: `number` = 1086; `units_per_gas`: `number` = 2 } |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.retd_contract.LightOperation.base` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.retd_contract.LightOperation.units_per_gas` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.rvrt_contract` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.s256` | { `LightOperation`: { `base`: `number` = 45; `units_per_gas`: `number` = 3 }  } |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.s256.LightOperation` | { `base`: `number` = 45; `units_per_gas`: `number` = 3 } |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.s256.LightOperation.base` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.s256.LightOperation.units_per_gas` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.sb` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.scwq` | { `HeavyOperation`: { `base`: `number` = 30375; `gas_per_unit`: `number` = 28628 }  } |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.scwq.HeavyOperation` | { `base`: `number` = 30375; `gas_per_unit`: `number` = 28628 } |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.scwq.HeavyOperation.base` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.scwq.HeavyOperation.gas_per_unit` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.sll` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.slli` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.smo` | { `LightOperation`: { `base`: `number` = 64196; `units_per_gas`: `number` = 1 }  } |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.smo.LightOperation` | { `base`: `number` = 64196; `units_per_gas`: `number` = 1 } |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.smo.LightOperation.base` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.smo.LightOperation.units_per_gas` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.srl` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.srli` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.srw` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.srwq` | { `HeavyOperation`: { `base`: `number` = 262; `gas_per_unit`: `number` = 249 }  } |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.srwq.HeavyOperation` | { `base`: `number` = 262; `gas_per_unit`: `number` = 249 } |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.srwq.HeavyOperation.base` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.srwq.HeavyOperation.gas_per_unit` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.state_root` | { `HeavyOperation`: { `base`: `number` = 350; `gas_per_unit`: `number` = 176 }  } |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.state_root.HeavyOperation` | { `base`: `number` = 350; `gas_per_unit`: `number` = 176 } |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.state_root.HeavyOperation.base` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.state_root.HeavyOperation.gas_per_unit` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.sub` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.subi` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.sw` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.sww` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.swwq` | { `HeavyOperation`: { `base`: `number` = 28484; `gas_per_unit`: `number` = 26613 }  } |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.swwq.HeavyOperation` | { `base`: `number` = 28484; `gas_per_unit`: `number` = 26613 } |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.swwq.HeavyOperation.base` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.swwq.HeavyOperation.gas_per_unit` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.time` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.tr` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.tro` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.vm_initialization` | { `LightOperation`: { `base`: `number` = 1645; `units_per_gas`: `number` = 14 }  } |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.vm_initialization.LightOperation` | { `base`: `number` = 1645; `units_per_gas`: `number` = 14 } |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.vm_initialization.LightOperation.base` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.vm_initialization.LightOperation.units_per_gas` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.wdam` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.wdcm` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.wddv` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.wdmd` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.wdml` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.wdmm` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.wdop` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.wqam` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.wqcm` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.wqdv` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.wqmd` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.wqml` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.wqmm` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.wqop` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.xor` | `number` |
| `chainConfigJson.consensus_parameters.V1.gas_costs.V1.xori` | `number` |
| `chainConfigJson.consensus_parameters.V1.predicate_params` | { `V1`: { `max_gas_per_predicate`: `number` = 30000000; `max_message_data_length`: `number` = 102400; `max_predicate_data_length`: `number` = 102400; `max_predicate_length`: `number` = 102400 }  } |
| `chainConfigJson.consensus_parameters.V1.predicate_params.V1` | { `max_gas_per_predicate`: `number` = 30000000; `max_message_data_length`: `number` = 102400; `max_predicate_data_length`: `number` = 102400; `max_predicate_length`: `number` = 102400 } |
| `chainConfigJson.consensus_parameters.V1.predicate_params.V1.max_gas_per_predicate` | `number` |
| `chainConfigJson.consensus_parameters.V1.predicate_params.V1.max_message_data_length` | `number` |
| `chainConfigJson.consensus_parameters.V1.predicate_params.V1.max_predicate_data_length` | `number` |
| `chainConfigJson.consensus_parameters.V1.predicate_params.V1.max_predicate_length` | `number` |
| `chainConfigJson.consensus_parameters.V1.privileged_address` | `string` |
| `chainConfigJson.consensus_parameters.V1.script_params` | { `V1`: { `max_script_data_length`: `number` = 102400; `max_script_length`: `number` = 102400 }  } |
| `chainConfigJson.consensus_parameters.V1.script_params.V1` | { `max_script_data_length`: `number` = 102400; `max_script_length`: `number` = 102400 } |
| `chainConfigJson.consensus_parameters.V1.script_params.V1.max_script_data_length` | `number` |
| `chainConfigJson.consensus_parameters.V1.script_params.V1.max_script_length` | `number` |
| `chainConfigJson.consensus_parameters.V1.tx_params` | { `V1`: { `max_bytecode_subsections`: `number` = 256; `max_gas_per_tx`: `number` = 30000000; `max_inputs`: `number` = 255; `max_outputs`: `number` = 255; `max_size`: `number` = 112640; `max_witnesses`: `number` = 255 }  } |
| `chainConfigJson.consensus_parameters.V1.tx_params.V1` | { `max_bytecode_subsections`: `number` = 256; `max_gas_per_tx`: `number` = 30000000; `max_inputs`: `number` = 255; `max_outputs`: `number` = 255; `max_size`: `number` = 112640; `max_witnesses`: `number` = 255 } |
| `chainConfigJson.consensus_parameters.V1.tx_params.V1.max_bytecode_subsections` | `number` |
| `chainConfigJson.consensus_parameters.V1.tx_params.V1.max_gas_per_tx` | `number` |
| `chainConfigJson.consensus_parameters.V1.tx_params.V1.max_inputs` | `number` |
| `chainConfigJson.consensus_parameters.V1.tx_params.V1.max_outputs` | `number` |
| `chainConfigJson.consensus_parameters.V1.tx_params.V1.max_size` | `number` |
| `chainConfigJson.consensus_parameters.V1.tx_params.V1.max_witnesses` | `number` |
| `metadataJson` | { `chain_config`: `string` = "chainConfig.json"; `table_encoding`: { `Json`: { `filepath`: `string` = "stateConfig.json" }  }  } |
| `metadataJson.chain_config` | `string` |
| `metadataJson.table_encoding` | { `Json`: { `filepath`: `string` = "stateConfig.json" }  } |
| `metadataJson.table_encoding.Json` | { `filepath`: `string` = "stateConfig.json" } |
| `metadataJson.table_encoding.Json.filepath` | `string` |
| `stateConfigJson` | { `block_height`: `number` = 0; `coins`: { `amount`: `number` = 18446744073709551615; `asset_id`: `string` = "0x0000000000000000000000000000000000000000000000000000000000000000"; `output_index`: `number` = 0; `owner`: `string` = "0x94ffcc53b892684acefaebc8a3d4a595e528a8cf664eeb3ef36f1020b0809d0d"; `tx_id`: `string` = "0x260eabfd50937e92939fd92687e9302a72e91c5065f64f853f2ccbe02396fe09d665"; `tx_pointer_block_height`: `number` = 0; `tx_pointer_tx_idx`: `number` = 0 }[] ; `contracts`: `never`[] = []; `da_block_height`: `number` = 0; `messages`: { `amount`: `number` = 18446744073709551615; `da_height`: `number` = 0; `data`: `string` = ""; `nonce`: `string` = "0101010101010101010101010101010101010101010101010101010101010101"; `recipient`: `string` = "0x69a2b736b60159b43bb8a4f98c0589f6da5fa3a3d101e8e269c499eb942753ba"; `sender`: `string` = "0xc43454aa38dd91f88109a4b7aef5efb96ce34e3f24992fe0f81d233ca686f80f" }[]  } |
| `stateConfigJson.block_height` | `number` |
| `stateConfigJson.coins` | { `amount`: `number` = 18446744073709551615; `asset_id`: `string` = "0x0000000000000000000000000000000000000000000000000000000000000000"; `output_index`: `number` = 0; `owner`: `string` = "0x94ffcc53b892684acefaebc8a3d4a595e528a8cf664eeb3ef36f1020b0809d0d"; `tx_id`: `string` = "0x260eabfd50937e92939fd92687e9302a72e91c5065f64f853f2ccbe02396fe09d665"; `tx_pointer_block_height`: `number` = 0; `tx_pointer_tx_idx`: `number` = 0 }[] |
| `stateConfigJson.contracts` | `never`[] |
| `stateConfigJson.da_block_height` | `number` |
| `stateConfigJson.messages` | { `amount`: `number` = 18446744073709551615; `da_height`: `number` = 0; `data`: `string` = ""; `nonce`: `string` = "0101010101010101010101010101010101010101010101010101010101010101"; `recipient`: `string` = "0x69a2b736b60159b43bb8a4f98c0589f6da5fa3a3d101e8e269c499eb942753ba"; `sender`: `string` = "0xc43454aa38dd91f88109a4b7aef5efb96ce34e3f24992fe0f81d233ca686f80f" }[] |

#### Defined in

[packages/utils/src/utils/defaultSnapshotConfigs.ts:5](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/utils/src/utils/defaultSnapshotConfigs.ts#L5)

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

[packages/utils/src/utils/arrayify.ts:10](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/utils/src/utils/arrayify.ts#L10)

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

[packages/utils/src/utils/capitalizeString.ts:1](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/utils/src/utils/capitalizeString.ts#L1)

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

[packages/utils/src/utils/chunkAndPadBytes.ts:8](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/utils/src/utils/chunkAndPadBytes.ts#L8)

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

[packages/utils/src/utils/concat.ts:38](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/utils/src/utils/concat.ts#L38)

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

[packages/utils/src/utils/concat.ts:11](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/utils/src/utils/concat.ts#L11)

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

[packages/utils/src/utils/hexlify.ts:10](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/utils/src/utils/hexlify.ts#L10)

___

### isDefined

▸ **isDefined**&lt;`T`\>(`value`): value is T

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `undefined` \| `T` |

#### Returns

value is T

#### Defined in

[packages/utils/src/utils/isDefined.ts:1](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/utils/src/utils/isDefined.ts#L1)

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

[packages/utils/src/utils/normalizeString.ts:11](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/utils/src/utils/normalizeString.ts#L11)

/* tslint:disable */
/* eslint-disable */
/**
*Adds two registers.
* @param {number} dst
* @param {number} lhs
* @param {number} rhs
* @returns {TypescriptInstruction}
*/
export function add(dst: number, lhs: number, rhs: number): TypescriptInstruction;
/**
*Bitwise ANDs two registers.
* @param {number} dst
* @param {number} lhs
* @param {number} rhs
* @returns {TypescriptInstruction}
*/
export function and(dst: number, lhs: number, rhs: number): TypescriptInstruction;
/**
*Divides two registers.
* @param {number} dst
* @param {number} lhs
* @param {number} rhs
* @returns {TypescriptInstruction}
*/
export function div(dst: number, lhs: number, rhs: number): TypescriptInstruction;
/**
*Compares two registers for equality.
* @param {number} dst
* @param {number} lhs
* @param {number} rhs
* @returns {TypescriptInstruction}
*/
export function eq(dst: number, lhs: number, rhs: number): TypescriptInstruction;
/**
*Raises one register to the power of another.
* @param {number} dst
* @param {number} lhs
* @param {number} rhs
* @returns {TypescriptInstruction}
*/
export function exp(dst: number, lhs: number, rhs: number): TypescriptInstruction;
/**
*Compares two registers for greater-than.
* @param {number} dst
* @param {number} lhs
* @param {number} rhs
* @returns {TypescriptInstruction}
*/
export function gt(dst: number, lhs: number, rhs: number): TypescriptInstruction;
/**
*Compares two registers for less-than.
* @param {number} dst
* @param {number} lhs
* @param {number} rhs
* @returns {TypescriptInstruction}
*/
export function lt(dst: number, lhs: number, rhs: number): TypescriptInstruction;
/**
*The integer logarithm of a register.
* @param {number} dst
* @param {number} lhs
* @param {number} rhs
* @returns {TypescriptInstruction}
*/
export function mlog(dst: number, lhs: number, rhs: number): TypescriptInstruction;
/**
*The integer root of a register.
* @param {number} dst
* @param {number} lhs
* @param {number} rhs
* @returns {TypescriptInstruction}
*/
export function mroo(dst: number, lhs: number, rhs: number): TypescriptInstruction;
/**
*Modulo remainder of two registers.
* @param {number} dst
* @param {number} lhs
* @param {number} rhs
* @returns {TypescriptInstruction}
*/
export function mod_(dst: number, lhs: number, rhs: number): TypescriptInstruction;
/**
*Copy from one register to another.
* @param {number} dst
* @param {number} src
* @returns {TypescriptInstruction}
*/
export function move_(dst: number, src: number): TypescriptInstruction;
/**
*Multiplies two registers.
* @param {number} dst
* @param {number} lhs
* @param {number} rhs
* @returns {TypescriptInstruction}
*/
export function mul(dst: number, lhs: number, rhs: number): TypescriptInstruction;
/**
*Bitwise NOT a register.
* @param {number} dst
* @param {number} arg
* @returns {TypescriptInstruction}
*/
export function not(dst: number, arg: number): TypescriptInstruction;
/**
*Bitwise ORs two registers.
* @param {number} dst
* @param {number} lhs
* @param {number} rhs
* @returns {TypescriptInstruction}
*/
export function or(dst: number, lhs: number, rhs: number): TypescriptInstruction;
/**
*Left shifts a register by a register.
* @param {number} dst
* @param {number} lhs
* @param {number} rhs
* @returns {TypescriptInstruction}
*/
export function sll(dst: number, lhs: number, rhs: number): TypescriptInstruction;
/**
*Right shifts a register by a register.
* @param {number} dst
* @param {number} lhs
* @param {number} rhs
* @returns {TypescriptInstruction}
*/
export function srl(dst: number, lhs: number, rhs: number): TypescriptInstruction;
/**
*Subtracts two registers.
* @param {number} dst
* @param {number} lhs
* @param {number} rhs
* @returns {TypescriptInstruction}
*/
export function sub(dst: number, lhs: number, rhs: number): TypescriptInstruction;
/**
*Bitwise XORs two registers.
* @param {number} dst
* @param {number} lhs
* @param {number} rhs
* @returns {TypescriptInstruction}
*/
export function xor(dst: number, lhs: number, rhs: number): TypescriptInstruction;
/**
*Fused multiply-divide with arbitrary precision intermediate step.
* @param {number} dst
* @param {number} mul_lhs
* @param {number} mul_rhs
* @param {number} divisor
* @returns {TypescriptInstruction}
*/
export function mldv(dst: number, mul_lhs: number, mul_rhs: number, divisor: number): TypescriptInstruction;
/**
*Return from context.
* @param {number} value
* @returns {TypescriptInstruction}
*/
export function ret(value: number): TypescriptInstruction;
/**
*Return from context with data.
* @param {number} addr
* @param {number} len
* @returns {TypescriptInstruction}
*/
export function retd(addr: number, len: number): TypescriptInstruction;
/**
*Allocate a number of bytes from the heap.
* @param {number} bytes
* @returns {TypescriptInstruction}
*/
export function aloc(bytes: number): TypescriptInstruction;
/**
*Clear a variable number of bytes in memory.
* @param {number} dst_addr
* @param {number} len
* @returns {TypescriptInstruction}
*/
export function mcl(dst_addr: number, len: number): TypescriptInstruction;
/**
*Copy a variable number of bytes in memory.
* @param {number} dst_addr
* @param {number} src_addr
* @param {number} len
* @returns {TypescriptInstruction}
*/
export function mcp(dst_addr: number, src_addr: number, len: number): TypescriptInstruction;
/**
*Compare bytes in memory.
* @param {number} result
* @param {number} lhs_addr
* @param {number} rhs_addr
* @param {number} len
* @returns {TypescriptInstruction}
*/
export function meq(result: number, lhs_addr: number, rhs_addr: number, len: number): TypescriptInstruction;
/**
*Get block header hash for height.
* @param {number} dst
* @param {number} heigth
* @returns {TypescriptInstruction}
*/
export function bhsh(dst: number, heigth: number): TypescriptInstruction;
/**
*Get current block height.
* @param {number} dst
* @returns {TypescriptInstruction}
*/
export function bhei(dst: number): TypescriptInstruction;
/**
*Burn coins of the current contract's asset ID.
* @param {number} count
* @returns {TypescriptInstruction}
*/
export function burn(count: number): TypescriptInstruction;
/**
*Call a contract.
* @param {number} target_struct
* @param {number} fwd_coins
* @param {number} asset_id_addr
* @param {number} fwd_gas
* @returns {TypescriptInstruction}
*/
export function call(target_struct: number, fwd_coins: number, asset_id_addr: number, fwd_gas: number): TypescriptInstruction;
/**
*Copy contract code for a contract.
* @param {number} dst_addr
* @param {number} contract_id_addr
* @param {number} offset
* @param {number} len
* @returns {TypescriptInstruction}
*/
export function ccp(dst_addr: number, contract_id_addr: number, offset: number, len: number): TypescriptInstruction;
/**
*Get code root of a contract.
* @param {number} dst_addr
* @param {number} contract_id_addr
* @returns {TypescriptInstruction}
*/
export function croo(dst_addr: number, contract_id_addr: number): TypescriptInstruction;
/**
*Get code size of a contract.
* @param {number} dst
* @param {number} contract_id_addr
* @returns {TypescriptInstruction}
*/
export function csiz(dst: number, contract_id_addr: number): TypescriptInstruction;
/**
*Get current block proposer's address.
* @param {number} dst
* @returns {TypescriptInstruction}
*/
export function cb(dst: number): TypescriptInstruction;
/**
*Load a contract's code as executable.
* @param {number} contract_id_addr
* @param {number} offset
* @param {number} len
* @returns {TypescriptInstruction}
*/
export function ldc(contract_id_addr: number, offset: number, len: number): TypescriptInstruction;
/**
*Log an event.
* @param {number} a
* @param {number} b
* @param {number} c
* @param {number} d
* @returns {TypescriptInstruction}
*/
export function log(a: number, b: number, c: number, d: number): TypescriptInstruction;
/**
*Log data.
* @param {number} a
* @param {number} b
* @param {number} addr
* @param {number} len
* @returns {TypescriptInstruction}
*/
export function logd(a: number, b: number, addr: number, len: number): TypescriptInstruction;
/**
*Mint coins of the current contract's asset ID.
* @param {number} amount
* @returns {TypescriptInstruction}
*/
export function mint(amount: number): TypescriptInstruction;
/**
*Halt execution, reverting state changes and returning a value.
* @param {number} value
* @returns {TypescriptInstruction}
*/
export function rvrt(value: number): TypescriptInstruction;
/**
*Clear a series of slots from contract storage.
* @param {number} key_addr
* @param {number} status
* @param {number} lenq
* @returns {TypescriptInstruction}
*/
export function scwq(key_addr: number, status: number, lenq: number): TypescriptInstruction;
/**
*Load a word from contract storage.
* @param {number} dst
* @param {number} status
* @param {number} key_addr
* @returns {TypescriptInstruction}
*/
export function srw(dst: number, status: number, key_addr: number): TypescriptInstruction;
/**
*Load a series of 32 byte slots from contract storage.
* @param {number} dst_addr
* @param {number} status
* @param {number} key_addr
* @param {number} lenq
* @returns {TypescriptInstruction}
*/
export function srwq(dst_addr: number, status: number, key_addr: number, lenq: number): TypescriptInstruction;
/**
*Store a word in contract storage.
* @param {number} key_addr
* @param {number} status
* @param {number} value
* @returns {TypescriptInstruction}
*/
export function sww(key_addr: number, status: number, value: number): TypescriptInstruction;
/**
*Store a series of 32 byte slots in contract storage.
* @param {number} key_addr
* @param {number} status
* @param {number} src_addr
* @param {number} lenq
* @returns {TypescriptInstruction}
*/
export function swwq(key_addr: number, status: number, src_addr: number, lenq: number): TypescriptInstruction;
/**
*Transfer coins to a contract unconditionally.
* @param {number} contract_id_addr
* @param {number} amount
* @param {number} asset_id_addr
* @returns {TypescriptInstruction}
*/
export function tr(contract_id_addr: number, amount: number, asset_id_addr: number): TypescriptInstruction;
/**
*Transfer coins to a variable output.
* @param {number} contract_id_addr
* @param {number} output_index
* @param {number} amount
* @param {number} asset_id_addr
* @returns {TypescriptInstruction}
*/
export function tro(contract_id_addr: number, output_index: number, amount: number, asset_id_addr: number): TypescriptInstruction;
/**
*The 64-byte public key (x, y) recovered from 64-byte signature on 32-byte message.
* @param {number} dst_addr
* @param {number} sig_addr
* @param {number} msg_hash_addr
* @returns {TypescriptInstruction}
*/
export function ecr(dst_addr: number, sig_addr: number, msg_hash_addr: number): TypescriptInstruction;
/**
*The keccak-256 hash of a slice.
* @param {number} dst_addr
* @param {number} src_addr
* @param {number} len
* @returns {TypescriptInstruction}
*/
export function k256(dst_addr: number, src_addr: number, len: number): TypescriptInstruction;
/**
*The SHA-2-256 hash of a slice.
* @param {number} dst_addr
* @param {number} src_addr
* @param {number} len
* @returns {TypescriptInstruction}
*/
export function s256(dst_addr: number, src_addr: number, len: number): TypescriptInstruction;
/**
*Get timestamp of block at given height.
* @param {number} dst
* @param {number} heigth
* @returns {TypescriptInstruction}
*/
export function time(dst: number, heigth: number): TypescriptInstruction;
/**
*Performs no operation.
* @returns {TypescriptInstruction}
*/
export function noop(): TypescriptInstruction;
/**
*Set flag register to a register.
* @param {number} value
* @returns {TypescriptInstruction}
*/
export function flag(value: number): TypescriptInstruction;
/**
*Get the balance of contract of an asset ID.
* @param {number} dst
* @param {number} asset_id_addr
* @param {number} contract_id_addr
* @returns {TypescriptInstruction}
*/
export function bal(dst: number, asset_id_addr: number, contract_id_addr: number): TypescriptInstruction;
/**
*Dynamic jump.
* @param {number} abs_target
* @returns {TypescriptInstruction}
*/
export function jmp(abs_target: number): TypescriptInstruction;
/**
*Conditional dynamic jump.
* @param {number} abs_target
* @param {number} lhs
* @param {number} rhs
* @returns {TypescriptInstruction}
*/
export function jne(abs_target: number, lhs: number, rhs: number): TypescriptInstruction;
/**
*Send a message to recipient address with call abi, coins, and output.
* @param {number} recipient_addr
* @param {number} data_addr
* @param {number} data_len
* @param {number} coins
* @returns {TypescriptInstruction}
*/
export function smo(recipient_addr: number, data_addr: number, data_len: number, coins: number): TypescriptInstruction;
/**
*Adds a register and an immediate value.
* @param {number} dst
* @param {number} lhs
* @param {number} rhs
* @returns {TypescriptInstruction}
*/
export function addi(dst: number, lhs: number, rhs: number): TypescriptInstruction;
/**
*Bitwise ANDs a register and an immediate value.
* @param {number} dst
* @param {number} lhs
* @param {number} rhs
* @returns {TypescriptInstruction}
*/
export function andi(dst: number, lhs: number, rhs: number): TypescriptInstruction;
/**
*Divides a register and an immediate value.
* @param {number} dst
* @param {number} lhs
* @param {number} rhs
* @returns {TypescriptInstruction}
*/
export function divi(dst: number, lhs: number, rhs: number): TypescriptInstruction;
/**
*Raises one register to the power of an immediate value.
* @param {number} dst
* @param {number} lhs
* @param {number} rhs
* @returns {TypescriptInstruction}
*/
export function expi(dst: number, lhs: number, rhs: number): TypescriptInstruction;
/**
*Modulo remainder of a register and an immediate value.
* @param {number} dst
* @param {number} lhs
* @param {number} rhs
* @returns {TypescriptInstruction}
*/
export function modi(dst: number, lhs: number, rhs: number): TypescriptInstruction;
/**
*Multiplies a register and an immediate value.
* @param {number} dst
* @param {number} lhs
* @param {number} rhs
* @returns {TypescriptInstruction}
*/
export function muli(dst: number, lhs: number, rhs: number): TypescriptInstruction;
/**
*Bitwise ORs a register and an immediate value.
* @param {number} dst
* @param {number} lhs
* @param {number} rhs
* @returns {TypescriptInstruction}
*/
export function ori(dst: number, lhs: number, rhs: number): TypescriptInstruction;
/**
*Left shifts a register by an immediate value.
* @param {number} dst
* @param {number} lhs
* @param {number} rhs
* @returns {TypescriptInstruction}
*/
export function slli(dst: number, lhs: number, rhs: number): TypescriptInstruction;
/**
*Right shifts a register by an immediate value.
* @param {number} dst
* @param {number} lhs
* @param {number} rhs
* @returns {TypescriptInstruction}
*/
export function srli(dst: number, lhs: number, rhs: number): TypescriptInstruction;
/**
*Subtracts a register and an immediate value.
* @param {number} dst
* @param {number} lhs
* @param {number} rhs
* @returns {TypescriptInstruction}
*/
export function subi(dst: number, lhs: number, rhs: number): TypescriptInstruction;
/**
*Bitwise XORs a register and an immediate value.
* @param {number} dst
* @param {number} lhs
* @param {number} rhs
* @returns {TypescriptInstruction}
*/
export function xori(dst: number, lhs: number, rhs: number): TypescriptInstruction;
/**
*Conditional jump.
* @param {number} cond_lhs
* @param {number} cond_rhs
* @param {number} abs_target
* @returns {TypescriptInstruction}
*/
export function jnei(cond_lhs: number, cond_rhs: number, abs_target: number): TypescriptInstruction;
/**
*A byte is loaded from the specified address offset by an immediate value.
* @param {number} dst
* @param {number} addr
* @param {number} offset
* @returns {TypescriptInstruction}
*/
export function lb(dst: number, addr: number, offset: number): TypescriptInstruction;
/**
*A word is loaded from the specified address offset by an immediate value.
* @param {number} dst
* @param {number} addr
* @param {number} offset
* @returns {TypescriptInstruction}
*/
export function lw(dst: number, addr: number, offset: number): TypescriptInstruction;
/**
*Write the least significant byte of a register to memory.
* @param {number} addr
* @param {number} value
* @param {number} offset
* @returns {TypescriptInstruction}
*/
export function sb(addr: number, value: number, offset: number): TypescriptInstruction;
/**
*Write a register to memory.
* @param {number} addr
* @param {number} value
* @param {number} offset
* @returns {TypescriptInstruction}
*/
export function sw(addr: number, value: number, offset: number): TypescriptInstruction;
/**
*Copy an immediate number of bytes in memory.
* @param {number} dst_addr
* @param {number} src_addr
* @param {number} len
* @returns {TypescriptInstruction}
*/
export function mcpi(dst_addr: number, src_addr: number, len: number): TypescriptInstruction;
/**
*Get transaction fields.
* @param {number} dst
* @param {number} arg
* @param {number} selector
* @returns {TypescriptInstruction}
*/
export function gtf(dst: number, arg: number, selector: number): TypescriptInstruction;
/**
*Clear an immediate number of bytes in memory.
* @param {number} addr
* @param {number} count
* @returns {TypescriptInstruction}
*/
export function mcli(addr: number, count: number): TypescriptInstruction;
/**
*Get metadata from memory.
* @param {number} dst
* @param {number} selector
* @returns {TypescriptInstruction}
*/
export function gm(dst: number, selector: number): TypescriptInstruction;
/**
*Copy immediate value into a register
* @param {number} dst
* @param {number} val
* @returns {TypescriptInstruction}
*/
export function movi(dst: number, val: number): TypescriptInstruction;
/**
*Conditional jump against zero.
* @param {number} cond_nz
* @param {number} abs_target
* @returns {TypescriptInstruction}
*/
export function jnzi(cond_nz: number, abs_target: number): TypescriptInstruction;
/**
*Unconditional dynamic relative jump forwards, with a constant offset.
* @param {number} dynamic
* @param {number} fixed
* @returns {TypescriptInstruction}
*/
export function jmpf(dynamic: number, fixed: number): TypescriptInstruction;
/**
*Unconditional dynamic relative jump backwards, with a constant offset.
* @param {number} dynamic
* @param {number} fixed
* @returns {TypescriptInstruction}
*/
export function jmpb(dynamic: number, fixed: number): TypescriptInstruction;
/**
*Dynamic relative jump forwards, conditional against zero, with a constant offset.
* @param {number} cond_nz
* @param {number} dynamic
* @param {number} fixed
* @returns {TypescriptInstruction}
*/
export function jnzf(cond_nz: number, dynamic: number, fixed: number): TypescriptInstruction;
/**
*Dynamic relative jump backwards, conditional against zero, with a constant offset.
* @param {number} cond_nz
* @param {number} dynamic
* @param {number} fixed
* @returns {TypescriptInstruction}
*/
export function jnzb(cond_nz: number, dynamic: number, fixed: number): TypescriptInstruction;
/**
*Dynamic relative jump forwards, conditional on comparsion, with a constant offset.
* @param {number} cond_lhs
* @param {number} cond_rhs
* @param {number} dynamic
* @param {number} fixed
* @returns {TypescriptInstruction}
*/
export function jnef(cond_lhs: number, cond_rhs: number, dynamic: number, fixed: number): TypescriptInstruction;
/**
*Dynamic relative jump backwards, conditional on comparsion, with a constant offset.
* @param {number} cond_lhs
* @param {number} cond_rhs
* @param {number} dynamic
* @param {number} fixed
* @returns {TypescriptInstruction}
*/
export function jneb(cond_lhs: number, cond_rhs: number, dynamic: number, fixed: number): TypescriptInstruction;
/**
*Jump.
* @param {number} abs_target
* @returns {TypescriptInstruction}
*/
export function ji(abs_target: number): TypescriptInstruction;
/**
*Extend the current call frame's stack by an immediate value.
* @param {number} amount
* @returns {TypescriptInstruction}
*/
export function cfei(amount: number): TypescriptInstruction;
/**
*Shrink the current call frame's stack by an immediate value.
* @param {number} amount
* @returns {TypescriptInstruction}
*/
export function cfsi(amount: number): TypescriptInstruction;
/**
*Extend the current call frame's stack
* @param {number} amount
* @returns {TypescriptInstruction}
*/
export function cfe(amount: number): TypescriptInstruction;
/**
*Shrink the current call frame's stack
* @param {number} amount
* @returns {TypescriptInstruction}
*/
export function cfs(amount: number): TypescriptInstruction;
/**
*Compare 128bit integers
* @param {number} dst
* @param {number} lhs
* @param {number} rhs
* @param {number} flags
* @returns {TypescriptInstruction}
*/
export function wdcm(dst: number, lhs: number, rhs: number, flags: number): TypescriptInstruction;
/**
*Compare 256bit integers
* @param {number} dst
* @param {number} lhs
* @param {number} rhs
* @param {number} flags
* @returns {TypescriptInstruction}
*/
export function wqcm(dst: number, lhs: number, rhs: number, flags: number): TypescriptInstruction;
/**
*Simple 128bit operations
* @param {number} dst
* @param {number} lhs
* @param {number} rhs
* @param {number} flags
* @returns {TypescriptInstruction}
*/
export function wdop(dst: number, lhs: number, rhs: number, flags: number): TypescriptInstruction;
/**
*Simple 256bit operations
* @param {number} dst
* @param {number} lhs
* @param {number} rhs
* @param {number} flags
* @returns {TypescriptInstruction}
*/
export function wqop(dst: number, lhs: number, rhs: number, flags: number): TypescriptInstruction;
/**
*Multiply 128bit
* @param {number} dst
* @param {number} lhs
* @param {number} rhs
* @param {number} flags
* @returns {TypescriptInstruction}
*/
export function wdml(dst: number, lhs: number, rhs: number, flags: number): TypescriptInstruction;
/**
*Multiply 256bit
* @param {number} dst
* @param {number} lhs
* @param {number} rhs
* @param {number} flags
* @returns {TypescriptInstruction}
*/
export function wqml(dst: number, lhs: number, rhs: number, flags: number): TypescriptInstruction;
/**
*Divide 128bit
* @param {number} dst
* @param {number} lhs
* @param {number} rhs
* @param {number} flags
* @returns {TypescriptInstruction}
*/
export function wddv(dst: number, lhs: number, rhs: number, flags: number): TypescriptInstruction;
/**
*Divide 256bit
* @param {number} dst
* @param {number} lhs
* @param {number} rhs
* @param {number} flags
* @returns {TypescriptInstruction}
*/
export function wqdv(dst: number, lhs: number, rhs: number, flags: number): TypescriptInstruction;
/**
*Fused multiply-divide 128bit
* @param {number} dst
* @param {number} mul_lhs
* @param {number} mul_rhs
* @param {number} divisor
* @returns {TypescriptInstruction}
*/
export function wdmd(dst: number, mul_lhs: number, mul_rhs: number, divisor: number): TypescriptInstruction;
/**
*Fused multiply-divide 256bit
* @param {number} dst
* @param {number} mul_lhs
* @param {number} mul_rhs
* @param {number} divisor
* @returns {TypescriptInstruction}
*/
export function wqmd(dst: number, mul_lhs: number, mul_rhs: number, divisor: number): TypescriptInstruction;
/**
*AddMod 128bit
* @param {number} dst
* @param {number} add_lhs
* @param {number} add_rhs
* @param {number} modulo
* @returns {TypescriptInstruction}
*/
export function wdam(dst: number, add_lhs: number, add_rhs: number, modulo: number): TypescriptInstruction;
/**
*AddMod 256bit
* @param {number} dst
* @param {number} add_lhs
* @param {number} add_rhs
* @param {number} modulo
* @returns {TypescriptInstruction}
*/
export function wqam(dst: number, add_lhs: number, add_rhs: number, modulo: number): TypescriptInstruction;
/**
*MulMod 128bit
* @param {number} dst
* @param {number} mul_lhs
* @param {number} mul_rhs
* @param {number} modulo
* @returns {TypescriptInstruction}
*/
export function wdmm(dst: number, mul_lhs: number, mul_rhs: number, modulo: number): TypescriptInstruction;
/**
*MulMod 256bit
* @param {number} dst
* @param {number} mul_lhs
* @param {number} mul_rhs
* @param {number} modulo
* @returns {TypescriptInstruction}
*/
export function wqmm(dst: number, mul_lhs: number, mul_rhs: number, modulo: number): TypescriptInstruction;
/**
* Construct a `GM` instruction from its arguments.
* @param {number} ra
* @param {number} args
* @returns {TypescriptInstruction}
*/
export function gm_args(ra: number, args: number): TypescriptInstruction;
/**
* Construct a `GM` instruction from its arguments.
* @param {number} ra
* @param {number} rb
* @param {number} args
* @returns {TypescriptInstruction}
*/
export function gtf_args(ra: number, rb: number, args: number): TypescriptInstruction;
/**
* Construct a `WDCM` instruction from its arguments.
* @param {number} ra
* @param {number} rb
* @param {number} rc
* @param {CompareArgs} args
* @returns {TypescriptInstruction}
*/
export function wdcm_args(ra: number, rb: number, rc: number, args: CompareArgs): TypescriptInstruction;
/**
* Construct a `WQCM` instruction from its arguments.
* @param {number} ra
* @param {number} rb
* @param {number} rc
* @param {CompareArgs} args
* @returns {TypescriptInstruction}
*/
export function wqcm_args(ra: number, rb: number, rc: number, args: CompareArgs): TypescriptInstruction;
/**
* Construct a `WDOP` instruction from its arguments.
* @param {number} ra
* @param {number} rb
* @param {number} rc
* @param {MathArgs} args
* @returns {TypescriptInstruction}
*/
export function wdop_args(ra: number, rb: number, rc: number, args: MathArgs): TypescriptInstruction;
/**
* Construct a `WQOP` instruction from its arguments.
* @param {number} ra
* @param {number} rb
* @param {number} rc
* @param {MathArgs} args
* @returns {TypescriptInstruction}
*/
export function wqop_args(ra: number, rb: number, rc: number, args: MathArgs): TypescriptInstruction;
/**
* Construct a `WDML` instruction from its arguments.
* @param {number} ra
* @param {number} rb
* @param {number} rc
* @param {MulArgs} args
* @returns {TypescriptInstruction}
*/
export function wdml_args(ra: number, rb: number, rc: number, args: MulArgs): TypescriptInstruction;
/**
* Construct a `WQML` instruction from its arguments.
* @param {number} ra
* @param {number} rb
* @param {number} rc
* @param {MulArgs} args
* @returns {TypescriptInstruction}
*/
export function wqml_args(ra: number, rb: number, rc: number, args: MulArgs): TypescriptInstruction;
/**
* Construct a `WDDV` instruction from its arguments.
* @param {number} ra
* @param {number} rb
* @param {number} rc
* @param {DivArgs} args
* @returns {TypescriptInstruction}
*/
export function wddv_arg(ra: number, rb: number, rc: number, args: DivArgs): TypescriptInstruction;
/**
* Construct a `WQDV` instruction from its arguments.
* @param {number} ra
* @param {number} rb
* @param {number} rc
* @param {DivArgs} args
* @returns {TypescriptInstruction}
*/
export function wqdv_args(ra: number, rb: number, rc: number, args: DivArgs): TypescriptInstruction;
/**
* Comparison mode used by WDCM and WQCM instructions.
*/
export enum CompareMode {
/**
* Equality (`==`)
*/
  EQ = 0,
/**
* Inequality (`!=`)
*/
  NE = 1,
/**
* Less than (`<`)
*/
  LT = 2,
/**
* Greater than (`>`)
*/
  GT = 3,
/**
* Less than or equals (`>=`)
*/
  LTE = 4,
/**
* Greater than or equals (`>=`)
*/
  GTE = 5,
/**
* Number of leading zeroes in lhs (`lzcnt`) (discards rhs)
*/
  LZC = 6,
}
/**
* The operation performed by WDOP and WQOP instructions, determined as
*/
export enum MathOp {
/**
* Add
*/
  ADD = 0,
/**
* Subtract
*/
  SUB = 1,
/**
* Invert bits (discards rhs)
*/
  NOT = 2,
/**
* Bitwise or
*/
  OR = 3,
/**
* Bitwise exclusive or
*/
  XOR = 4,
/**
* Bitwise and
*/
  AND = 5,
/**
* Shift left
*/
  SHL = 6,
/**
* Shift right
*/
  SHR = 7,
}
/**
* Argument list for GM (get metadata) instruction
*/
export enum GMArgs {
/**
* Get if caller is external.
*/
  IsCallerExternal = 1,
/**
* Get caller's contract ID.
*/
  GetCaller = 2,
/**
* Get index of current predicate.
*/
  GetVerifyingPredicate = 3,
/**
* Get the Chain ID this VM is operating within
*/
  GetChainId = 4,
}
/**
* Argument list for GTF (get tx fields) instruction
*/
export enum GTFArgs {
/**
* Set `$rA` to `tx.type`
*/
  Type = 1,
/**
* Set `$rA` to `tx.gasPrice`
*/
  ScriptGasPrice = 2,
/**
* Set `$rA` to `tx.gasLimit`
*/
  ScriptGasLimit = 3,
/**
* Set `$rA` to `tx.maturity`
*/
  ScriptMaturity = 4,
/**
* Set `$rA` to `tx.scriptLength`
*/
  ScriptLength = 5,
/**
* Set `$rA` to `tx.scriptDataLength`
*/
  ScriptDataLength = 6,
/**
* Set `$rA` to `tx.inputsCount`
*/
  ScriptInputsCount = 7,
/**
* Set `$rA` to `tx.outputsCount`
*/
  ScriptOutputsCount = 8,
/**
* Set `$rA` to `tx.witnessesCount`
*/
  ScriptWitnessesCound = 9,
/**
* Set `$rA` to `Memory address of tx.receiptsRoot`
*/
  ScriptReceiptsRoot = 10,
/**
* Set `$rA` to `Memory address of tx.script`
*/
  Script = 11,
/**
* Set `$rA` to `Memory address of tx.scriptData`
*/
  ScriptData = 12,
/**
* Set `$rA` to `Memory address of tx.inputs[$rB]`
*/
  ScriptInputAtIndex = 13,
/**
* Set `$rA` to `Memory address of t.outputs[$rB]`
*/
  ScriptOutputAtIndex = 14,
/**
* Set `$rA` to `Memory address of tx.witnesses[$rB]`
*/
  ScriptWitnessAtIndex = 15,
/**
* Set `$rA` to `tx.gasPrice`
*/
  CreateGasPrice = 16,
/**
* Set `$rA` to `tx.gasLimit`
*/
  CreateGasLimit = 17,
/**
* Set `$rA` to `tx.maturity`
*/
  CreateMaturity = 18,
/**
* Set `$rA` to `tx.bytecodeLength`
*/
  CreateBytecodeLength = 19,
/**
* Set `$rA` to `tx.bytecodeWitnessIndex`
*/
  CreateBytecodeWitnessIndex = 20,
/**
* Set `$rA` to `tx.storageSlotsCount`
*/
  CreateStorageSlotsCount = 21,
/**
* Set `$rA` to `tx.inputsCount`
*/
  CreateInputsCount = 22,
/**
* Set `$rA` to `tx.outputsCount`
*/
  CreateOutputsCount = 23,
/**
* Set `$rA` to `tx.witnessesCount`
*/
  CreateWitnessesCount = 24,
/**
* Set `$rA` to `Memory address of tx.salt`
*/
  CreateSalt = 25,
/**
* Set `$rA` to `Memory address of tx.storageSlots[$rB]`
*/
  CreateStorageSlotAtIndex = 26,
/**
* Set `$rA` to `Memory address of tx.inputs[$rB]`
*/
  CreateInputAtIndex = 27,
/**
* Set `$rA` to `Memory address of t.outputs[$rB]`
*/
  CreateOutputAtIndex = 28,
/**
* Set `$rA` to `Memory address of tx.witnesses[$rB]`
*/
  CreateWitnessAtIndex = 29,
/**
* Set `$rA` to `tx.inputs[$rB].type`
*/
  InputType = 257,
/**
* Set `$rA` to `Memory address of tx.inputs[$rB].txID`
*/
  InputCoinTxId = 258,
/**
* Set `$rA` to `tx.inputs[$rB].outputIndex`
*/
  InputCoinOutputIndex = 259,
/**
* Set `$rA` to `Memory address of tx.inputs[$rB].owner`
*/
  InputCoinOwner = 260,
/**
* Set `$rA` to `tx.inputs[$rB].amount`
*/
  InputCoinAmount = 261,
/**
* Set `$rA` to `Memory address of tx.inputs[$rB].asset_id`
*/
  InputCoinAssetId = 262,
/**
* Set `$rA` to `Memory address of tx.inputs[$rB].txPointer`
*/
  InputCoinTxPointer = 263,
/**
* Set `$rA` to `tx.inputs[$rB].witnessIndex`
*/
  InputCoinWitnessIndex = 264,
/**
* Set `$rA` to `tx.inputs[$rB].maturity`
*/
  InputCoinMaturity = 265,
/**
* Set `$rA` to `tx.inputs[$rB].predicateLength`
*/
  InputCoinPredicateLength = 266,
/**
* Set `$rA` to `tx.inputs[$rB].predicateDataLength`
*/
  InputCoinPredicateDataLength = 267,
/**
* Set `$rA` to `Memory address of tx.inputs[$rB].predicate`
*/
  InputCoinPredicate = 268,
/**
* Set `$rA` to `Memory address of tx.inputs[$rB].predicateData`
*/
  InputCoinPredicateData = 269,
/**
* Set `$rA` to `Memory address of tx.inputs[$rB].predicateGasUsed`
*/
  InputCoinPredicateGasUsed = 270,
/**
* Set `$rA` to `Memory address of tx.inputs[$rB].txID`
*/
  InputContractTxId = 271,
/**
* Set `$rA` to `tx.inputs[$rB].outputIndex`
*/
  InputContractOutputIndex = 272,
/**
* Set `$rA` to `Memory address of tx.inputs[$rB].balanceRoot`
*/
  InputContractBalanceRoot = 273,
/**
* Set `$rA` to `Memory address of tx.inputs[$rB].stateRoot`
*/
  InputContractStateRoot = 274,
/**
* Set `$rA` to `Memory address of tx.inputs[$rB].txPointer`
*/
  InputContractTxPointer = 275,
/**
* Set `$rA` to `Memory address of tx.inputs[$rB].contractID`
*/
  InputContractId = 276,
/**
* Set `$rA` to `Memory address of tx.inputs[$rB].sender`
*/
  InputMessageSender = 277,
/**
* Set `$rA` to `Memory address of tx.inputs[$rB].recipient`
*/
  InputMessageRecipient = 278,
/**
* Set `$rA` to `tx.inputs[$rB].amount`
*/
  InputMessageAmount = 279,
/**
* Set `$rA` to `Memory address of tx.inputs[$rB].nonce`
*/
  InputMessageNonce = 280,
/**
* Set `$rA` to `tx.inputs[$rB].witnessIndex`
*/
  InputMessageWitnessIndex = 281,
/**
* Set `$rA` to `tx.inputs[$rB].dataLength`
*/
  InputMessageDataLength = 282,
/**
* Set `$rA` to `tx.inputs[$rB].predicateLength`
*/
  InputMessagePredicateLength = 283,
/**
* Set `$rA` to `tx.inputs[$rB].predicateDataLength`
*/
  InputMessagePredicateDataLength = 284,
/**
* Set `$rA` to `Memory address of tx.inputs[$rB].data`
*/
  InputMessageData = 285,
/**
* Set `$rA` to `Memory address of tx.inputs[$rB].predicate`
*/
  InputMessagePredicate = 286,
/**
* Set `$rA` to `Memory address of tx.inputs[$rB].predicateData`
*/
  InputMessagePredicateData = 287,
/**
* Set `$rA` to `Memory address of tx.inputs[$rB].predicateGasUsed`
*/
  InputMessagePredicateGasUsed = 288,
/**
* Set `$rA` to `tx.outputs[$rB].type`
*/
  OutputType = 513,
/**
* Set `$rA` to `Memory address of tx.outputs[$rB].to`
*/
  OutputCoinTo = 514,
/**
* Set `$rA` to `tx.outputs[$rB].amount`
*/
  OutputCoinAmount = 515,
/**
* Set `$rA` to `Memory address of tx.outputs[$rB].asset_id`
*/
  OutputCoinAssetId = 516,
/**
* Set `$rA` to `tx.outputs[$rB].inputIndex`
*/
  OutputContractInputIndex = 517,
/**
* Set `$rA` to `Memory address of tx.outputs[$rB].balanceRoot`
*/
  OutputContractBalanceRoot = 518,
/**
* Set `$rA` to `Memory address of tx.outputs[$rB].stateRoot`
*/
  OutputContractStateRoot = 519,
/**
* Set `$rA` to `Memory address of tx.outputs[$rB].contractID`
*/
  OutputContractCreatedContractId = 520,
/**
* Set `$rA` to `Memory address of tx.outputs[$rB].stateRoot`
*/
  OutputContractCreatedStateRoot = 521,
/**
* Set `$rA` to `tx.witnesses[$rB].dataLength`
*/
  WitnessDataLength = 769,
/**
* Set `$rA` to `Memory address of tx.witnesses[$rB].data`
*/
  WitnessData = 770,
}
/**
* Panic reason representation for the interpreter.
*/
export enum PanicReason {
/**
* The byte can't be mapped to any known `PanicReason`.
*/
  UnknownPanicReason = 0,
/**
* Found `RVRT` instruction.
*/
  Revert = 1,
/**
* Execution ran out of gas.
*/
  OutOfGas = 2,
/**
* The transaction validity is violated.
*/
  TransactionValidity = 3,
/**
* Attempt to write outside interpreter memory boundaries.
*/
  MemoryOverflow = 4,
/**
* Overflow while executing arithmetic operation.
* These errors are ignored using the WRAPPING flag.
*/
  ArithmeticOverflow = 5,
/**
* Designed contract was not found in the storage.
*/
  ContractNotFound = 6,
/**
* Memory ownership rules are violated.
*/
  MemoryOwnership = 7,
/**
* The asset ID balance isn't enough for the instruction.
*/
  NotEnoughBalance = 8,
/**
* The interpreter is expected to be in internal context.
*/
  ExpectedInternalContext = 9,
/**
* The queried asset ID was not found in the state.
*/
  AssetIdNotFound = 10,
/**
* The provided input is not found in the transaction.
*/
  InputNotFound = 11,
/**
* The provided output is not found in the transaction.
*/
  OutputNotFound = 12,
/**
* The provided witness is not found in the transaction.
*/
  WitnessNotFound = 13,
/**
* The transaction maturity is not valid for this request.
*/
  TransactionMaturity = 14,
/**
* The metadata identifier is invalid.
*/
  InvalidMetadataIdentifier = 15,
/**
* The call structure is not valid.
*/
  MalformedCallStructure = 16,
/**
* The provided register does not allow write operations.
*/
  ReservedRegisterNotWritable = 17,
/**
* The execution resulted in an erroneous state of the interpreter.
*/
  ErrorFlag = 18,
/**
* The provided immediate value is not valid for this instruction.
*/
  InvalidImmediateValue = 19,
/**
* The provided transaction input is not of type `Coin`.
*/
  ExpectedCoinInput = 20,
/**
* The requested memory access exceeds the limits of the interpreter.
*/
  MaxMemoryAccess = 21,
/**
* Two segments of the interpreter memory should not intersect for write operations.
*/
  MemoryWriteOverlap = 22,
/**
* The requested contract is not listed in the transaction inputs.
*/
  ContractNotInInputs = 23,
/**
* The internal asset ID balance overflowed with the provided instruction.
*/
  InternalBalanceOverflow = 24,
/**
* The maximum allowed contract size is violated.
*/
  ContractMaxSize = 25,
/**
* This instruction expects the stack area to be unallocated for this call.
*/
  ExpectedUnallocatedStack = 26,
/**
* The maximum allowed number of static contracts was reached for this transaction.
*/
  MaxStaticContractsReached = 27,
/**
* The requested transfer amount cannot be zero.
*/
  TransferAmountCannotBeZero = 28,
/**
* The provided transaction output should be of type `Variable`.
*/
  ExpectedOutputVariable = 29,
/**
* The expected context of the stack parent is internal.
*/
  ExpectedParentInternalContext = 30,
/**
* The jump instruction cannot move backwards in predicate verification.
*/
  IllegalJump = 31,
/**
* The contract ID is already deployed and can't be overwritten.
*/
  ContractIdAlreadyDeployed = 32,
/**
* The loaded contract mismatch expectations.
*/
  ContractMismatch = 33,
/**
* Attempting to send message data longer than `MAX_MESSAGE_DATA_LENGTH`
*/
  MessageDataTooLong = 34,
/**
* Mathimatically invalid arguments where given to an arithmetic instruction.
* For instance, division by zero produces this.
* These errors are ignored using the UNSAFEMATH flag.
*/
  ArithmeticError = 35,
/**
* The contract instruction is not allowed in predicates.
*/
  ContractInstructionNotAllowed = 36,
}
/**
*Adds two registers.
*/
export class ADD {
  free(): void;
/**
* Construct the instruction from its parts.
* @param {RegId} dst
* @param {RegId} lhs
* @param {RegId} rhs
*/
  constructor(dst: RegId, lhs: RegId, rhs: RegId);
/**
* Access the ID for register A.
* @returns {RegId}
*/
  ra(): RegId;
/**
* Access the ID for register B.
* @returns {RegId}
*/
  rb(): RegId;
/**
* Access the ID for register C.
* @returns {RegId}
*/
  rc(): RegId;
}
/**
*Adds a register and an immediate value.
*/
export class ADDI {
  free(): void;
/**
* Construct the instruction from its parts.
* @param {RegId} dst
* @param {RegId} lhs
* @param {Imm12} rhs
*/
  constructor(dst: RegId, lhs: RegId, rhs: Imm12);
/**
* Access the ID for register A.
* @returns {RegId}
*/
  ra(): RegId;
/**
* Access the ID for register B.
* @returns {RegId}
*/
  rb(): RegId;
/**
* Access the 12-bit immediate value.
* @returns {Imm12}
*/
  imm12(): Imm12;
}
/**
*Allocate a number of bytes from the heap.
*/
export class ALOC {
  free(): void;
/**
* Construct the instruction from its parts.
* @param {RegId} bytes
*/
  constructor(bytes: RegId);
/**
* Access the ID for register A.
* @returns {RegId}
*/
  ra(): RegId;
}
/**
*Bitwise ANDs two registers.
*/
export class AND {
  free(): void;
/**
* Construct the instruction from its parts.
* @param {RegId} dst
* @param {RegId} lhs
* @param {RegId} rhs
*/
  constructor(dst: RegId, lhs: RegId, rhs: RegId);
/**
* Access the ID for register A.
* @returns {RegId}
*/
  ra(): RegId;
/**
* Access the ID for register B.
* @returns {RegId}
*/
  rb(): RegId;
/**
* Access the ID for register C.
* @returns {RegId}
*/
  rc(): RegId;
}
/**
*Bitwise ANDs a register and an immediate value.
*/
export class ANDI {
  free(): void;
/**
* Construct the instruction from its parts.
* @param {RegId} dst
* @param {RegId} lhs
* @param {Imm12} rhs
*/
  constructor(dst: RegId, lhs: RegId, rhs: Imm12);
/**
* Access the ID for register A.
* @returns {RegId}
*/
  ra(): RegId;
/**
* Access the ID for register B.
* @returns {RegId}
*/
  rb(): RegId;
/**
* Access the 12-bit immediate value.
* @returns {Imm12}
*/
  imm12(): Imm12;
}
/**
* FuelVM atomic array type.
*/
export class Address {
  free(): void;
/**
* Bytes constructor.
* @param {Uint8Array} bytes
* @returns {Address}
*/
  static from_bytes(bytes: Uint8Array): Address;
/**
* Zeroes bytes constructor.
* @returns {Address}
*/
  static zeroed(): Address;
/**
* The memory size of the type by the method.
* @returns {number}
*/
  size(): number;
}
/**
* FuelVM atomic array type.
*/
export class AssetId {
  free(): void;
/**
* Bytes constructor.
* @param {Uint8Array} bytes
* @returns {AssetId}
*/
  static from_bytes(bytes: Uint8Array): AssetId;
/**
* Zeroes bytes constructor.
* @returns {AssetId}
*/
  static zeroed(): AssetId;
/**
* The memory size of the type by the method.
* @returns {number}
*/
  size(): number;
}
/**
*Get the balance of contract of an asset ID.
*/
export class BAL {
  free(): void;
/**
* Construct the instruction from its parts.
* @param {RegId} dst
* @param {RegId} asset_id_addr
* @param {RegId} contract_id_addr
*/
  constructor(dst: RegId, asset_id_addr: RegId, contract_id_addr: RegId);
/**
* Access the ID for register A.
* @returns {RegId}
*/
  ra(): RegId;
/**
* Access the ID for register B.
* @returns {RegId}
*/
  rb(): RegId;
/**
* Access the ID for register C.
* @returns {RegId}
*/
  rc(): RegId;
}
/**
*Get current block height.
*/
export class BHEI {
  free(): void;
/**
* Construct the instruction from its parts.
* @param {RegId} dst
*/
  constructor(dst: RegId);
/**
* Access the ID for register A.
* @returns {RegId}
*/
  ra(): RegId;
}
/**
*Get block header hash for height.
*/
export class BHSH {
  free(): void;
/**
* Construct the instruction from its parts.
* @param {RegId} dst
* @param {RegId} heigth
*/
  constructor(dst: RegId, heigth: RegId);
/**
* Access the ID for register A.
* @returns {RegId}
*/
  ra(): RegId;
/**
* Access the ID for register B.
* @returns {RegId}
*/
  rb(): RegId;
}
/**
*Burn coins of the current contract's asset ID.
*/
export class BURN {
  free(): void;
/**
* Construct the instruction from its parts.
* @param {RegId} count
*/
  constructor(count: RegId);
/**
* Access the ID for register A.
* @returns {RegId}
*/
  ra(): RegId;
}
/**
* FuelVM atomic numeric type.
*/
export class BlockHeight {
  free(): void;
/**
* Number constructor.
* @param {number} number
*/
  constructor(number: number);
/**
* Convert to array of big endian bytes.
* @returns {Uint8Array}
*/
  to_bytes(): Uint8Array;
/**
* Convert to usize.
* @returns {number}
*/
  as_usize(): number;
}
/**
* FuelVM atomic array type.
*/
export class Bytes20 {
  free(): void;
/**
* Bytes constructor.
* @param {Uint8Array} bytes
* @returns {Bytes20}
*/
  static from_bytes(bytes: Uint8Array): Bytes20;
/**
* Zeroes bytes constructor.
* @returns {Bytes20}
*/
  static zeroed(): Bytes20;
/**
* The memory size of the type by the method.
* @returns {number}
*/
  size(): number;
}
/**
* FuelVM atomic array type.
*/
export class Bytes32 {
  free(): void;
/**
* Bytes constructor.
* @param {Uint8Array} bytes
* @returns {Bytes32}
*/
  static from_bytes(bytes: Uint8Array): Bytes32;
/**
* Zeroes bytes constructor.
* @returns {Bytes32}
*/
  static zeroed(): Bytes32;
/**
* The memory size of the type by the method.
* @returns {number}
*/
  size(): number;
}
/**
* FuelVM atomic array type.
*/
export class Bytes4 {
  free(): void;
/**
* Bytes constructor.
* @param {Uint8Array} bytes
* @returns {Bytes4}
*/
  static from_bytes(bytes: Uint8Array): Bytes4;
/**
* Zeroes bytes constructor.
* @returns {Bytes4}
*/
  static zeroed(): Bytes4;
/**
* The memory size of the type by the method.
* @returns {number}
*/
  size(): number;
}
/**
* FuelVM atomic type.
*/
export class Bytes64 {
  free(): void;
/**
* Bytes constructor.
* @param {Uint8Array} bytes
* @returns {Bytes64}
*/
  static from_bytes(bytes: Uint8Array): Bytes64;
/**
* Zeroes bytes constructor.
* @returns {Bytes64}
*/
  static zeroed(): Bytes64;
/**
* The memory size of the type by the method.
* @returns {number}
*/
  size(): number;
}
/**
* FuelVM atomic array type.
*/
export class Bytes8 {
  free(): void;
/**
* Bytes constructor.
* @param {Uint8Array} bytes
* @returns {Bytes8}
*/
  static from_bytes(bytes: Uint8Array): Bytes8;
/**
* Zeroes bytes constructor.
* @returns {Bytes8}
*/
  static zeroed(): Bytes8;
/**
* The memory size of the type by the method.
* @returns {number}
*/
  size(): number;
}
/**
*Call a contract.
*/
export class CALL {
  free(): void;
/**
* Construct the instruction from its parts.
* @param {RegId} target_struct
* @param {RegId} fwd_coins
* @param {RegId} asset_id_addr
* @param {RegId} fwd_gas
*/
  constructor(target_struct: RegId, fwd_coins: RegId, asset_id_addr: RegId, fwd_gas: RegId);
/**
* Access the ID for register A.
* @returns {RegId}
*/
  ra(): RegId;
/**
* Access the ID for register B.
* @returns {RegId}
*/
  rb(): RegId;
/**
* Access the ID for register C.
* @returns {RegId}
*/
  rc(): RegId;
/**
* Access the ID for register D.
* @returns {RegId}
*/
  rd(): RegId;
}
/**
*Get current block proposer's address.
*/
export class CB {
  free(): void;
/**
* Construct the instruction from its parts.
* @param {RegId} dst
*/
  constructor(dst: RegId);
/**
* Access the ID for register A.
* @returns {RegId}
*/
  ra(): RegId;
}
/**
*Copy contract code for a contract.
*/
export class CCP {
  free(): void;
/**
* Construct the instruction from its parts.
* @param {RegId} dst_addr
* @param {RegId} contract_id_addr
* @param {RegId} offset
* @param {RegId} len
*/
  constructor(dst_addr: RegId, contract_id_addr: RegId, offset: RegId, len: RegId);
/**
* Access the ID for register A.
* @returns {RegId}
*/
  ra(): RegId;
/**
* Access the ID for register B.
* @returns {RegId}
*/
  rb(): RegId;
/**
* Access the ID for register C.
* @returns {RegId}
*/
  rc(): RegId;
/**
* Access the ID for register D.
* @returns {RegId}
*/
  rd(): RegId;
}
/**
*Extend the current call frame's stack
*/
export class CFE {
  free(): void;
/**
* Construct the instruction from its parts.
* @param {RegId} amount
*/
  constructor(amount: RegId);
/**
* Access the ID for register A.
* @returns {RegId}
*/
  ra(): RegId;
}
/**
*Extend the current call frame's stack by an immediate value.
*/
export class CFEI {
  free(): void;
/**
* Construct the instruction from its parts.
* @param {Imm24} amount
*/
  constructor(amount: Imm24);
/**
* Access the 24-bit immediate value.
* @returns {Imm24}
*/
  imm24(): Imm24;
}
/**
*Shrink the current call frame's stack
*/
export class CFS {
  free(): void;
/**
* Construct the instruction from its parts.
* @param {RegId} amount
*/
  constructor(amount: RegId);
/**
* Access the ID for register A.
* @returns {RegId}
*/
  ra(): RegId;
}
/**
*Shrink the current call frame's stack by an immediate value.
*/
export class CFSI {
  free(): void;
/**
* Construct the instruction from its parts.
* @param {Imm24} amount
*/
  constructor(amount: Imm24);
/**
* Access the 24-bit immediate value.
* @returns {Imm24}
*/
  imm24(): Imm24;
}
/**
*Get code root of a contract.
*/
export class CROO {
  free(): void;
/**
* Construct the instruction from its parts.
* @param {RegId} dst_addr
* @param {RegId} contract_id_addr
*/
  constructor(dst_addr: RegId, contract_id_addr: RegId);
/**
* Access the ID for register A.
* @returns {RegId}
*/
  ra(): RegId;
/**
* Access the ID for register B.
* @returns {RegId}
*/
  rb(): RegId;
}
/**
*Get code size of a contract.
*/
export class CSIZ {
  free(): void;
/**
* Construct the instruction from its parts.
* @param {RegId} dst
* @param {RegId} contract_id_addr
*/
  constructor(dst: RegId, contract_id_addr: RegId);
/**
* Access the ID for register A.
* @returns {RegId}
*/
  ra(): RegId;
/**
* Access the ID for register B.
* @returns {RegId}
*/
  rb(): RegId;
}
/**
* FuelVM atomic numeric type.
*/
export class ChainId {
  free(): void;
/**
* Number constructor.
* @param {bigint} number
*/
  constructor(number: bigint);
/**
* Convert to array of big endian bytes.
* @returns {Uint8Array}
*/
  to_bytes(): Uint8Array;
/**
* Convert to usize.
* @returns {number}
*/
  as_usize(): number;
}
/**
* Arguments for WDCM and WQCM instructions.
*/
export class CompareArgs {
  free(): void;
/**
* Convert to immediate value.
* @returns {Imm06}
*/
  to_imm(): Imm06;
/**
* Construct from `Imm06`. Returns `None` if the value has reserved flags set.
* @param {Imm06} bits
* @returns {CompareArgs | undefined}
*/
  static from_imm(bits: Imm06): CompareArgs | undefined;
/**
* Load RHS from register if true, otherwise zero-extend register value
*/
  indirect_rhs: boolean;
/**
* Comparison mode
*/
  mode: number;
}
/**
* FuelVM atomic array type.
*/
export class ContractId {
  free(): void;
/**
* Bytes constructor.
* @param {Uint8Array} bytes
* @returns {ContractId}
*/
  static from_bytes(bytes: Uint8Array): ContractId;
/**
* Zeroes bytes constructor.
* @returns {ContractId}
*/
  static zeroed(): ContractId;
/**
* The memory size of the type by the method.
* @returns {number}
*/
  size(): number;
}
/**
*Divides two registers.
*/
export class DIV {
  free(): void;
/**
* Construct the instruction from its parts.
* @param {RegId} dst
* @param {RegId} lhs
* @param {RegId} rhs
*/
  constructor(dst: RegId, lhs: RegId, rhs: RegId);
/**
* Access the ID for register A.
* @returns {RegId}
*/
  ra(): RegId;
/**
* Access the ID for register B.
* @returns {RegId}
*/
  rb(): RegId;
/**
* Access the ID for register C.
* @returns {RegId}
*/
  rc(): RegId;
}
/**
*Divides a register and an immediate value.
*/
export class DIVI {
  free(): void;
/**
* Construct the instruction from its parts.
* @param {RegId} dst
* @param {RegId} lhs
* @param {Imm12} rhs
*/
  constructor(dst: RegId, lhs: RegId, rhs: Imm12);
/**
* Access the ID for register A.
* @returns {RegId}
*/
  ra(): RegId;
/**
* Access the ID for register B.
* @returns {RegId}
*/
  rb(): RegId;
/**
* Access the 12-bit immediate value.
* @returns {Imm12}
*/
  imm12(): Imm12;
}
/**
* Additional arguments for WMDV and WDDV instructions.
*/
export class DivArgs {
  free(): void;
/**
* Load RHS from register if true, otherwise zero-extend register value
*/
  indirect_rhs: boolean;
}
/**
*The 64-byte public key (x, y) recovered from 64-byte signature on 32-byte message.
*/
export class ECR {
  free(): void;
/**
* Construct the instruction from its parts.
* @param {RegId} dst_addr
* @param {RegId} sig_addr
* @param {RegId} msg_hash_addr
*/
  constructor(dst_addr: RegId, sig_addr: RegId, msg_hash_addr: RegId);
/**
* Access the ID for register A.
* @returns {RegId}
*/
  ra(): RegId;
/**
* Access the ID for register B.
* @returns {RegId}
*/
  rb(): RegId;
/**
* Access the ID for register C.
* @returns {RegId}
*/
  rc(): RegId;
}
/**
*Compares two registers for equality.
*/
export class EQ {
  free(): void;
/**
* Construct the instruction from its parts.
* @param {RegId} dst
* @param {RegId} lhs
* @param {RegId} rhs
*/
  constructor(dst: RegId, lhs: RegId, rhs: RegId);
/**
* Access the ID for register A.
* @returns {RegId}
*/
  ra(): RegId;
/**
* Access the ID for register B.
* @returns {RegId}
*/
  rb(): RegId;
/**
* Access the ID for register C.
* @returns {RegId}
*/
  rc(): RegId;
}
/**
*Raises one register to the power of another.
*/
export class EXP {
  free(): void;
/**
* Construct the instruction from its parts.
* @param {RegId} dst
* @param {RegId} lhs
* @param {RegId} rhs
*/
  constructor(dst: RegId, lhs: RegId, rhs: RegId);
/**
* Access the ID for register A.
* @returns {RegId}
*/
  ra(): RegId;
/**
* Access the ID for register B.
* @returns {RegId}
*/
  rb(): RegId;
/**
* Access the ID for register C.
* @returns {RegId}
*/
  rc(): RegId;
}
/**
*Raises one register to the power of an immediate value.
*/
export class EXPI {
  free(): void;
/**
* Construct the instruction from its parts.
* @param {RegId} dst
* @param {RegId} lhs
* @param {Imm12} rhs
*/
  constructor(dst: RegId, lhs: RegId, rhs: Imm12);
/**
* Access the ID for register A.
* @returns {RegId}
*/
  ra(): RegId;
/**
* Access the ID for register B.
* @returns {RegId}
*/
  rb(): RegId;
/**
* Access the 12-bit immediate value.
* @returns {Imm12}
*/
  imm12(): Imm12;
}
/**
*Set flag register to a register.
*/
export class FLAG {
  free(): void;
/**
* Construct the instruction from its parts.
* @param {RegId} value
*/
  constructor(value: RegId);
/**
* Access the ID for register A.
* @returns {RegId}
*/
  ra(): RegId;
}
/**
*Get metadata from memory.
*/
export class GM {
  free(): void;
/**
* Construct the instruction from its parts.
* @param {RegId} dst
* @param {Imm18} selector
*/
  constructor(dst: RegId, selector: Imm18);
/**
* Access the ID for register A.
* @returns {RegId}
*/
  ra(): RegId;
/**
* Access the 18-bit immediate value.
* @returns {Imm18}
*/
  imm18(): Imm18;
/**
* Construct a `GM` instruction from its arguments.
* @param {RegId} ra
* @param {number} args
* @returns {GM}
*/
  static from_args(ra: RegId, args: number): GM;
}
/**
*Compares two registers for greater-than.
*/
export class GT {
  free(): void;
/**
* Construct the instruction from its parts.
* @param {RegId} dst
* @param {RegId} lhs
* @param {RegId} rhs
*/
  constructor(dst: RegId, lhs: RegId, rhs: RegId);
/**
* Access the ID for register A.
* @returns {RegId}
*/
  ra(): RegId;
/**
* Access the ID for register B.
* @returns {RegId}
*/
  rb(): RegId;
/**
* Access the ID for register C.
* @returns {RegId}
*/
  rc(): RegId;
}
/**
*Get transaction fields.
*/
export class GTF {
  free(): void;
/**
* Construct the instruction from its parts.
* @param {RegId} dst
* @param {RegId} arg
* @param {Imm12} selector
*/
  constructor(dst: RegId, arg: RegId, selector: Imm12);
/**
* Access the ID for register A.
* @returns {RegId}
*/
  ra(): RegId;
/**
* Access the ID for register B.
* @returns {RegId}
*/
  rb(): RegId;
/**
* Access the 12-bit immediate value.
* @returns {Imm12}
*/
  imm12(): Imm12;
/**
* Construct a `GTF` instruction from its arguments.
* @param {RegId} ra
* @param {RegId} rb
* @param {number} args
* @returns {GTF}
*/
  static from_args(ra: RegId, rb: RegId, args: number): GTF;
}
/**
* Represents a 6-bit immediate value, guaranteed to be masked by construction.
*/
export class Imm06 {
  free(): void;
}
/**
* Represents a 12-bit immediate value, guaranteed to be masked by construction.
*/
export class Imm12 {
  free(): void;
}
/**
* Represents a 18-bit immediate value, guaranteed to be masked by construction.
*/
export class Imm18 {
  free(): void;
}
/**
* Represents a 24-bit immediate value, guaranteed to be masked by construction.
*/
export class Imm24 {
  free(): void;
}
/**
*Jump.
*/
export class JI {
  free(): void;
/**
* Construct the instruction from its parts.
* @param {Imm24} abs_target
*/
  constructor(abs_target: Imm24);
/**
* Access the 24-bit immediate value.
* @returns {Imm24}
*/
  imm24(): Imm24;
}
/**
*Dynamic jump.
*/
export class JMP {
  free(): void;
/**
* Construct the instruction from its parts.
* @param {RegId} abs_target
*/
  constructor(abs_target: RegId);
/**
* Access the ID for register A.
* @returns {RegId}
*/
  ra(): RegId;
}
/**
*Unconditional dynamic relative jump backwards, with a constant offset.
*/
export class JMPB {
  free(): void;
/**
* Construct the instruction from its parts.
* @param {RegId} dynamic
* @param {Imm18} fixed
*/
  constructor(dynamic: RegId, fixed: Imm18);
/**
* Access the ID for register A.
* @returns {RegId}
*/
  ra(): RegId;
/**
* Access the 18-bit immediate value.
* @returns {Imm18}
*/
  imm18(): Imm18;
}
/**
*Unconditional dynamic relative jump forwards, with a constant offset.
*/
export class JMPF {
  free(): void;
/**
* Construct the instruction from its parts.
* @param {RegId} dynamic
* @param {Imm18} fixed
*/
  constructor(dynamic: RegId, fixed: Imm18);
/**
* Access the ID for register A.
* @returns {RegId}
*/
  ra(): RegId;
/**
* Access the 18-bit immediate value.
* @returns {Imm18}
*/
  imm18(): Imm18;
}
/**
*Conditional dynamic jump.
*/
export class JNE {
  free(): void;
/**
* Construct the instruction from its parts.
* @param {RegId} abs_target
* @param {RegId} lhs
* @param {RegId} rhs
*/
  constructor(abs_target: RegId, lhs: RegId, rhs: RegId);
/**
* Access the ID for register A.
* @returns {RegId}
*/
  ra(): RegId;
/**
* Access the ID for register B.
* @returns {RegId}
*/
  rb(): RegId;
/**
* Access the ID for register C.
* @returns {RegId}
*/
  rc(): RegId;
}
/**
*Dynamic relative jump backwards, conditional on comparsion, with a constant offset.
*/
export class JNEB {
  free(): void;
/**
* Construct the instruction from its parts.
* @param {RegId} cond_lhs
* @param {RegId} cond_rhs
* @param {RegId} dynamic
* @param {Imm06} fixed
*/
  constructor(cond_lhs: RegId, cond_rhs: RegId, dynamic: RegId, fixed: Imm06);
/**
* Access the ID for register A.
* @returns {RegId}
*/
  ra(): RegId;
/**
* Access the ID for register B.
* @returns {RegId}
*/
  rb(): RegId;
/**
* Access the ID for register C.
* @returns {RegId}
*/
  rc(): RegId;
/**
* Access the 6-bit immediate value.
* @returns {Imm06}
*/
  imm06(): Imm06;
}
/**
*Dynamic relative jump forwards, conditional on comparsion, with a constant offset.
*/
export class JNEF {
  free(): void;
/**
* Construct the instruction from its parts.
* @param {RegId} cond_lhs
* @param {RegId} cond_rhs
* @param {RegId} dynamic
* @param {Imm06} fixed
*/
  constructor(cond_lhs: RegId, cond_rhs: RegId, dynamic: RegId, fixed: Imm06);
/**
* Access the ID for register A.
* @returns {RegId}
*/
  ra(): RegId;
/**
* Access the ID for register B.
* @returns {RegId}
*/
  rb(): RegId;
/**
* Access the ID for register C.
* @returns {RegId}
*/
  rc(): RegId;
/**
* Access the 6-bit immediate value.
* @returns {Imm06}
*/
  imm06(): Imm06;
}
/**
*Conditional jump.
*/
export class JNEI {
  free(): void;
/**
* Construct the instruction from its parts.
* @param {RegId} cond_lhs
* @param {RegId} cond_rhs
* @param {Imm12} abs_target
*/
  constructor(cond_lhs: RegId, cond_rhs: RegId, abs_target: Imm12);
/**
* Access the ID for register A.
* @returns {RegId}
*/
  ra(): RegId;
/**
* Access the ID for register B.
* @returns {RegId}
*/
  rb(): RegId;
/**
* Access the 12-bit immediate value.
* @returns {Imm12}
*/
  imm12(): Imm12;
}
/**
*Dynamic relative jump backwards, conditional against zero, with a constant offset.
*/
export class JNZB {
  free(): void;
/**
* Construct the instruction from its parts.
* @param {RegId} cond_nz
* @param {RegId} dynamic
* @param {Imm12} fixed
*/
  constructor(cond_nz: RegId, dynamic: RegId, fixed: Imm12);
/**
* Access the ID for register A.
* @returns {RegId}
*/
  ra(): RegId;
/**
* Access the ID for register B.
* @returns {RegId}
*/
  rb(): RegId;
/**
* Access the 12-bit immediate value.
* @returns {Imm12}
*/
  imm12(): Imm12;
}
/**
*Dynamic relative jump forwards, conditional against zero, with a constant offset.
*/
export class JNZF {
  free(): void;
/**
* Construct the instruction from its parts.
* @param {RegId} cond_nz
* @param {RegId} dynamic
* @param {Imm12} fixed
*/
  constructor(cond_nz: RegId, dynamic: RegId, fixed: Imm12);
/**
* Access the ID for register A.
* @returns {RegId}
*/
  ra(): RegId;
/**
* Access the ID for register B.
* @returns {RegId}
*/
  rb(): RegId;
/**
* Access the 12-bit immediate value.
* @returns {Imm12}
*/
  imm12(): Imm12;
}
/**
*Conditional jump against zero.
*/
export class JNZI {
  free(): void;
/**
* Construct the instruction from its parts.
* @param {RegId} cond_nz
* @param {Imm18} abs_target
*/
  constructor(cond_nz: RegId, abs_target: Imm18);
/**
* Access the ID for register A.
* @returns {RegId}
*/
  ra(): RegId;
/**
* Access the 18-bit immediate value.
* @returns {Imm18}
*/
  imm18(): Imm18;
}
/**
*The keccak-256 hash of a slice.
*/
export class K256 {
  free(): void;
/**
* Construct the instruction from its parts.
* @param {RegId} dst_addr
* @param {RegId} src_addr
* @param {RegId} len
*/
  constructor(dst_addr: RegId, src_addr: RegId, len: RegId);
/**
* Access the ID for register A.
* @returns {RegId}
*/
  ra(): RegId;
/**
* Access the ID for register B.
* @returns {RegId}
*/
  rb(): RegId;
/**
* Access the ID for register C.
* @returns {RegId}
*/
  rc(): RegId;
}
/**
*A byte is loaded from the specified address offset by an immediate value.
*/
export class LB {
  free(): void;
/**
* Construct the instruction from its parts.
* @param {RegId} dst
* @param {RegId} addr
* @param {Imm12} offset
*/
  constructor(dst: RegId, addr: RegId, offset: Imm12);
/**
* Access the ID for register A.
* @returns {RegId}
*/
  ra(): RegId;
/**
* Access the ID for register B.
* @returns {RegId}
*/
  rb(): RegId;
/**
* Access the 12-bit immediate value.
* @returns {Imm12}
*/
  imm12(): Imm12;
}
/**
*Load a contract's code as executable.
*/
export class LDC {
  free(): void;
/**
* Construct the instruction from its parts.
* @param {RegId} contract_id_addr
* @param {RegId} offset
* @param {RegId} len
*/
  constructor(contract_id_addr: RegId, offset: RegId, len: RegId);
/**
* Access the ID for register A.
* @returns {RegId}
*/
  ra(): RegId;
/**
* Access the ID for register B.
* @returns {RegId}
*/
  rb(): RegId;
/**
* Access the ID for register C.
* @returns {RegId}
*/
  rc(): RegId;
}
/**
*Log an event.
*/
export class LOG {
  free(): void;
/**
* Construct the instruction from its parts.
* @param {RegId} a
* @param {RegId} b
* @param {RegId} c
* @param {RegId} d
*/
  constructor(a: RegId, b: RegId, c: RegId, d: RegId);
/**
* Access the ID for register A.
* @returns {RegId}
*/
  ra(): RegId;
/**
* Access the ID for register B.
* @returns {RegId}
*/
  rb(): RegId;
/**
* Access the ID for register C.
* @returns {RegId}
*/
  rc(): RegId;
/**
* Access the ID for register D.
* @returns {RegId}
*/
  rd(): RegId;
}
/**
*Log data.
*/
export class LOGD {
  free(): void;
/**
* Construct the instruction from its parts.
* @param {RegId} a
* @param {RegId} b
* @param {RegId} addr
* @param {RegId} len
*/
  constructor(a: RegId, b: RegId, addr: RegId, len: RegId);
/**
* Access the ID for register A.
* @returns {RegId}
*/
  ra(): RegId;
/**
* Access the ID for register B.
* @returns {RegId}
*/
  rb(): RegId;
/**
* Access the ID for register C.
* @returns {RegId}
*/
  rc(): RegId;
/**
* Access the ID for register D.
* @returns {RegId}
*/
  rd(): RegId;
}
/**
*Compares two registers for less-than.
*/
export class LT {
  free(): void;
/**
* Construct the instruction from its parts.
* @param {RegId} dst
* @param {RegId} lhs
* @param {RegId} rhs
*/
  constructor(dst: RegId, lhs: RegId, rhs: RegId);
/**
* Access the ID for register A.
* @returns {RegId}
*/
  ra(): RegId;
/**
* Access the ID for register B.
* @returns {RegId}
*/
  rb(): RegId;
/**
* Access the ID for register C.
* @returns {RegId}
*/
  rc(): RegId;
}
/**
*A word is loaded from the specified address offset by an immediate value.
*/
export class LW {
  free(): void;
/**
* Construct the instruction from its parts.
* @param {RegId} dst
* @param {RegId} addr
* @param {Imm12} offset
*/
  constructor(dst: RegId, addr: RegId, offset: Imm12);
/**
* Access the ID for register A.
* @returns {RegId}
*/
  ra(): RegId;
/**
* Access the ID for register B.
* @returns {RegId}
*/
  rb(): RegId;
/**
* Access the 12-bit immediate value.
* @returns {Imm12}
*/
  imm12(): Imm12;
}
/**
*Clear a variable number of bytes in memory.
*/
export class MCL {
  free(): void;
/**
* Construct the instruction from its parts.
* @param {RegId} dst_addr
* @param {RegId} len
*/
  constructor(dst_addr: RegId, len: RegId);
/**
* Access the ID for register A.
* @returns {RegId}
*/
  ra(): RegId;
/**
* Access the ID for register B.
* @returns {RegId}
*/
  rb(): RegId;
}
/**
*Clear an immediate number of bytes in memory.
*/
export class MCLI {
  free(): void;
/**
* Construct the instruction from its parts.
* @param {RegId} addr
* @param {Imm18} count
*/
  constructor(addr: RegId, count: Imm18);
/**
* Access the ID for register A.
* @returns {RegId}
*/
  ra(): RegId;
/**
* Access the 18-bit immediate value.
* @returns {Imm18}
*/
  imm18(): Imm18;
}
/**
*Copy a variable number of bytes in memory.
*/
export class MCP {
  free(): void;
/**
* Construct the instruction from its parts.
* @param {RegId} dst_addr
* @param {RegId} src_addr
* @param {RegId} len
*/
  constructor(dst_addr: RegId, src_addr: RegId, len: RegId);
/**
* Access the ID for register A.
* @returns {RegId}
*/
  ra(): RegId;
/**
* Access the ID for register B.
* @returns {RegId}
*/
  rb(): RegId;
/**
* Access the ID for register C.
* @returns {RegId}
*/
  rc(): RegId;
}
/**
*Copy an immediate number of bytes in memory.
*/
export class MCPI {
  free(): void;
/**
* Construct the instruction from its parts.
* @param {RegId} dst_addr
* @param {RegId} src_addr
* @param {Imm12} len
*/
  constructor(dst_addr: RegId, src_addr: RegId, len: Imm12);
/**
* Access the ID for register A.
* @returns {RegId}
*/
  ra(): RegId;
/**
* Access the ID for register B.
* @returns {RegId}
*/
  rb(): RegId;
/**
* Access the 12-bit immediate value.
* @returns {Imm12}
*/
  imm12(): Imm12;
}
/**
*Compare bytes in memory.
*/
export class MEQ {
  free(): void;
/**
* Construct the instruction from its parts.
* @param {RegId} result
* @param {RegId} lhs_addr
* @param {RegId} rhs_addr
* @param {RegId} len
*/
  constructor(result: RegId, lhs_addr: RegId, rhs_addr: RegId, len: RegId);
/**
* Access the ID for register A.
* @returns {RegId}
*/
  ra(): RegId;
/**
* Access the ID for register B.
* @returns {RegId}
*/
  rb(): RegId;
/**
* Access the ID for register C.
* @returns {RegId}
*/
  rc(): RegId;
/**
* Access the ID for register D.
* @returns {RegId}
*/
  rd(): RegId;
}
/**
*Mint coins of the current contract's asset ID.
*/
export class MINT {
  free(): void;
/**
* Construct the instruction from its parts.
* @param {RegId} amount
*/
  constructor(amount: RegId);
/**
* Access the ID for register A.
* @returns {RegId}
*/
  ra(): RegId;
}
/**
*Fused multiply-divide with arbitrary precision intermediate step.
*/
export class MLDV {
  free(): void;
/**
* Construct the instruction from its parts.
* @param {RegId} dst
* @param {RegId} mul_lhs
* @param {RegId} mul_rhs
* @param {RegId} divisor
*/
  constructor(dst: RegId, mul_lhs: RegId, mul_rhs: RegId, divisor: RegId);
/**
* Access the ID for register A.
* @returns {RegId}
*/
  ra(): RegId;
/**
* Access the ID for register B.
* @returns {RegId}
*/
  rb(): RegId;
/**
* Access the ID for register C.
* @returns {RegId}
*/
  rc(): RegId;
/**
* Access the ID for register D.
* @returns {RegId}
*/
  rd(): RegId;
}
/**
*The integer logarithm of a register.
*/
export class MLOG {
  free(): void;
/**
* Construct the instruction from its parts.
* @param {RegId} dst
* @param {RegId} lhs
* @param {RegId} rhs
*/
  constructor(dst: RegId, lhs: RegId, rhs: RegId);
/**
* Access the ID for register A.
* @returns {RegId}
*/
  ra(): RegId;
/**
* Access the ID for register B.
* @returns {RegId}
*/
  rb(): RegId;
/**
* Access the ID for register C.
* @returns {RegId}
*/
  rc(): RegId;
}
/**
*Modulo remainder of two registers.
*/
export class MOD {
  free(): void;
/**
* Construct the instruction from its parts.
* @param {RegId} dst
* @param {RegId} lhs
* @param {RegId} rhs
*/
  constructor(dst: RegId, lhs: RegId, rhs: RegId);
/**
* Access the ID for register A.
* @returns {RegId}
*/
  ra(): RegId;
/**
* Access the ID for register B.
* @returns {RegId}
*/
  rb(): RegId;
/**
* Access the ID for register C.
* @returns {RegId}
*/
  rc(): RegId;
}
/**
*Modulo remainder of a register and an immediate value.
*/
export class MODI {
  free(): void;
/**
* Construct the instruction from its parts.
* @param {RegId} dst
* @param {RegId} lhs
* @param {Imm12} rhs
*/
  constructor(dst: RegId, lhs: RegId, rhs: Imm12);
/**
* Access the ID for register A.
* @returns {RegId}
*/
  ra(): RegId;
/**
* Access the ID for register B.
* @returns {RegId}
*/
  rb(): RegId;
/**
* Access the 12-bit immediate value.
* @returns {Imm12}
*/
  imm12(): Imm12;
}
/**
*Copy from one register to another.
*/
export class MOVE {
  free(): void;
/**
* Construct the instruction from its parts.
* @param {RegId} dst
* @param {RegId} src
*/
  constructor(dst: RegId, src: RegId);
/**
* Access the ID for register A.
* @returns {RegId}
*/
  ra(): RegId;
/**
* Access the ID for register B.
* @returns {RegId}
*/
  rb(): RegId;
}
/**
*Copy immediate value into a register
*/
export class MOVI {
  free(): void;
/**
* Construct the instruction from its parts.
* @param {RegId} dst
* @param {Imm18} val
*/
  constructor(dst: RegId, val: Imm18);
/**
* Access the ID for register A.
* @returns {RegId}
*/
  ra(): RegId;
/**
* Access the 18-bit immediate value.
* @returns {Imm18}
*/
  imm18(): Imm18;
}
/**
*The integer root of a register.
*/
export class MROO {
  free(): void;
/**
* Construct the instruction from its parts.
* @param {RegId} dst
* @param {RegId} lhs
* @param {RegId} rhs
*/
  constructor(dst: RegId, lhs: RegId, rhs: RegId);
/**
* Access the ID for register A.
* @returns {RegId}
*/
  ra(): RegId;
/**
* Access the ID for register B.
* @returns {RegId}
*/
  rb(): RegId;
/**
* Access the ID for register C.
* @returns {RegId}
*/
  rc(): RegId;
}
/**
*Multiplies two registers.
*/
export class MUL {
  free(): void;
/**
* Construct the instruction from its parts.
* @param {RegId} dst
* @param {RegId} lhs
* @param {RegId} rhs
*/
  constructor(dst: RegId, lhs: RegId, rhs: RegId);
/**
* Access the ID for register A.
* @returns {RegId}
*/
  ra(): RegId;
/**
* Access the ID for register B.
* @returns {RegId}
*/
  rb(): RegId;
/**
* Access the ID for register C.
* @returns {RegId}
*/
  rc(): RegId;
}
/**
*Multiplies a register and an immediate value.
*/
export class MULI {
  free(): void;
/**
* Construct the instruction from its parts.
* @param {RegId} dst
* @param {RegId} lhs
* @param {Imm12} rhs
*/
  constructor(dst: RegId, lhs: RegId, rhs: Imm12);
/**
* Access the ID for register A.
* @returns {RegId}
*/
  ra(): RegId;
/**
* Access the ID for register B.
* @returns {RegId}
*/
  rb(): RegId;
/**
* Access the 12-bit immediate value.
* @returns {Imm12}
*/
  imm12(): Imm12;
}
/**
* Additional arguments for WDOP and WQOP instructions.
*/
export class MathArgs {
  free(): void;
/**
* Load RHS from register if true, otherwise zero-extend register value
*/
  indirect_rhs: boolean;
/**
* The operation to perform
*/
  op: number;
}
/**
* FuelVM atomic array type.
*/
export class MessageId {
  free(): void;
/**
* Bytes constructor.
* @param {Uint8Array} bytes
* @returns {MessageId}
*/
  static from_bytes(bytes: Uint8Array): MessageId;
/**
* Zeroes bytes constructor.
* @returns {MessageId}
*/
  static zeroed(): MessageId;
/**
* The memory size of the type by the method.
* @returns {number}
*/
  size(): number;
}
/**
* Additional arguments for WDML and WQML instructions.
*/
export class MulArgs {
  free(): void;
/**
* Load LHSS from register if true, otherwise zero-extend register value
*/
  indirect_lhs: boolean;
/**
* Load RHS from register if true, otherwise zero-extend register value
*/
  indirect_rhs: boolean;
}
/**
*Performs no operation.
*/
export class NOOP {
  free(): void;
/**
* Construct the instruction.
*/
  constructor();
}
/**
*Bitwise NOT a register.
*/
export class NOT {
  free(): void;
/**
* Construct the instruction from its parts.
* @param {RegId} dst
* @param {RegId} arg
*/
  constructor(dst: RegId, arg: RegId);
/**
* Access the ID for register A.
* @returns {RegId}
*/
  ra(): RegId;
/**
* Access the ID for register B.
* @returns {RegId}
*/
  rb(): RegId;
}
/**
* FuelVM atomic array type.
*/
export class Nonce {
  free(): void;
/**
* Bytes constructor.
* @param {Uint8Array} bytes
* @returns {Nonce}
*/
  static from_bytes(bytes: Uint8Array): Nonce;
/**
* Zeroes bytes constructor.
* @returns {Nonce}
*/
  static zeroed(): Nonce;
/**
* The memory size of the type by the method.
* @returns {number}
*/
  size(): number;
}
/**
*Bitwise ORs two registers.
*/
export class OR {
  free(): void;
/**
* Construct the instruction from its parts.
* @param {RegId} dst
* @param {RegId} lhs
* @param {RegId} rhs
*/
  constructor(dst: RegId, lhs: RegId, rhs: RegId);
/**
* Access the ID for register A.
* @returns {RegId}
*/
  ra(): RegId;
/**
* Access the ID for register B.
* @returns {RegId}
*/
  rb(): RegId;
/**
* Access the ID for register C.
* @returns {RegId}
*/
  rc(): RegId;
}
/**
*Bitwise ORs a register and an immediate value.
*/
export class ORI {
  free(): void;
/**
* Construct the instruction from its parts.
* @param {RegId} dst
* @param {RegId} lhs
* @param {Imm12} rhs
*/
  constructor(dst: RegId, lhs: RegId, rhs: Imm12);
/**
* Access the ID for register A.
* @returns {RegId}
*/
  ra(): RegId;
/**
* Access the ID for register B.
* @returns {RegId}
*/
  rb(): RegId;
/**
* Access the 12-bit immediate value.
* @returns {Imm12}
*/
  imm12(): Imm12;
}
/**
* Describe a panic reason with the instruction that generated it
*/
export class PanicInstruction {
  free(): void;
/**
* Represents an error described by a reason and an instruction.
* @param {number} reason
* @param {number} instruction
*/
  constructor(reason: number, instruction: number);
/**
* Underlying panic reason
* @returns {number}
*/
  reason(): number;
/**
* Underlying instruction
* @returns {number}
*/
  instruction(): number;
}
/**
*Return from context.
*/
export class RET {
  free(): void;
/**
* Construct the instruction from its parts.
* @param {RegId} value
*/
  constructor(value: RegId);
/**
* Access the ID for register A.
* @returns {RegId}
*/
  ra(): RegId;
}
/**
*Return from context with data.
*/
export class RETD {
  free(): void;
/**
* Construct the instruction from its parts.
* @param {RegId} addr
* @param {RegId} len
*/
  constructor(addr: RegId, len: RegId);
/**
* Access the ID for register A.
* @returns {RegId}
*/
  ra(): RegId;
/**
* Access the ID for register B.
* @returns {RegId}
*/
  rb(): RegId;
}
/**
*Halt execution, reverting state changes and returning a value.
*/
export class RVRT {
  free(): void;
/**
* Construct the instruction from its parts.
* @param {RegId} value
*/
  constructor(value: RegId);
/**
* Access the ID for register A.
* @returns {RegId}
*/
  ra(): RegId;
}
/**
* Represents a 6-bit register ID, guaranteed to be masked by construction.
*/
export class RegId {
  free(): void;
/**
* Construct a register ID from the given value.
*
* Returns `None` if the value is outside the 6-bit value range.
* @param {number} u
* @returns {RegId | undefined}
*/
  static new_checked(u: number): RegId | undefined;
/**
* Received balance for this context.
* @returns {RegId}
*/
  static bal(): RegId;
/**
* Remaining gas in the context.
* @returns {RegId}
*/
  static cgas(): RegId;
/**
* Error codes for particular operations.
* @returns {RegId}
*/
  static err(): RegId;
/**
* Flags register.
* @returns {RegId}
*/
  static flag(): RegId;
/**
* Frame pointer. Memory address of beginning of current call frame.
* @returns {RegId}
*/
  static fp(): RegId;
/**
* Remaining gas globally.
* @returns {RegId}
*/
  static ggas(): RegId;
/**
* Heap pointer. Memory address below the current bottom of the heap (points to free
* memory).
* @returns {RegId}
*/
  static hp(): RegId;
/**
* Instructions start. Pointer to the start of the currently-executing code.
* @returns {RegId}
*/
  static is(): RegId;
/**
* Contains overflow/underflow of addition, subtraction, and multiplication.
* @returns {RegId}
*/
  static of(): RegId;
/**
* Contains one (1), for convenience.
* @returns {RegId}
*/
  static one(): RegId;
/**
* The program counter. Memory address of the current instruction.
* @returns {RegId}
*/
  static pc(): RegId;
/**
* Return value or pointer.
* @returns {RegId}
*/
  static ret(): RegId;
/**
* Return value length in bytes.
* @returns {RegId}
*/
  static retl(): RegId;
/**
* Stack pointer. Memory address on top of current writable stack area (points to
* free memory).
* @returns {RegId}
*/
  static sp(): RegId;
/**
* Stack start pointer. Memory address of bottom of current writable stack area.
* @returns {RegId}
*/
  static spp(): RegId;
/**
* Smallest writable register.
* @returns {RegId}
*/
  static writable(): RegId;
/**
* Contains zero (0), for convenience.
* @returns {RegId}
*/
  static zero(): RegId;
/**
* Construct a register ID from the given value.
*
* The given value will be masked to 6 bits.
* @param {number} u
*/
  constructor(u: number);
/**
* A const alternative to the `Into<u8>` implementation.
* @returns {number}
*/
  to_u8(): number;
}
/**
*The SHA-2-256 hash of a slice.
*/
export class S256 {
  free(): void;
/**
* Construct the instruction from its parts.
* @param {RegId} dst_addr
* @param {RegId} src_addr
* @param {RegId} len
*/
  constructor(dst_addr: RegId, src_addr: RegId, len: RegId);
/**
* Access the ID for register A.
* @returns {RegId}
*/
  ra(): RegId;
/**
* Access the ID for register B.
* @returns {RegId}
*/
  rb(): RegId;
/**
* Access the ID for register C.
* @returns {RegId}
*/
  rc(): RegId;
}
/**
*Write the least significant byte of a register to memory.
*/
export class SB {
  free(): void;
/**
* Construct the instruction from its parts.
* @param {RegId} addr
* @param {RegId} value
* @param {Imm12} offset
*/
  constructor(addr: RegId, value: RegId, offset: Imm12);
/**
* Access the ID for register A.
* @returns {RegId}
*/
  ra(): RegId;
/**
* Access the ID for register B.
* @returns {RegId}
*/
  rb(): RegId;
/**
* Access the 12-bit immediate value.
* @returns {Imm12}
*/
  imm12(): Imm12;
}
/**
*Clear a series of slots from contract storage.
*/
export class SCWQ {
  free(): void;
/**
* Construct the instruction from its parts.
* @param {RegId} key_addr
* @param {RegId} status
* @param {RegId} lenq
*/
  constructor(key_addr: RegId, status: RegId, lenq: RegId);
/**
* Access the ID for register A.
* @returns {RegId}
*/
  ra(): RegId;
/**
* Access the ID for register B.
* @returns {RegId}
*/
  rb(): RegId;
/**
* Access the ID for register C.
* @returns {RegId}
*/
  rc(): RegId;
}
/**
*Left shifts a register by a register.
*/
export class SLL {
  free(): void;
/**
* Construct the instruction from its parts.
* @param {RegId} dst
* @param {RegId} lhs
* @param {RegId} rhs
*/
  constructor(dst: RegId, lhs: RegId, rhs: RegId);
/**
* Access the ID for register A.
* @returns {RegId}
*/
  ra(): RegId;
/**
* Access the ID for register B.
* @returns {RegId}
*/
  rb(): RegId;
/**
* Access the ID for register C.
* @returns {RegId}
*/
  rc(): RegId;
}
/**
*Left shifts a register by an immediate value.
*/
export class SLLI {
  free(): void;
/**
* Construct the instruction from its parts.
* @param {RegId} dst
* @param {RegId} lhs
* @param {Imm12} rhs
*/
  constructor(dst: RegId, lhs: RegId, rhs: Imm12);
/**
* Access the ID for register A.
* @returns {RegId}
*/
  ra(): RegId;
/**
* Access the ID for register B.
* @returns {RegId}
*/
  rb(): RegId;
/**
* Access the 12-bit immediate value.
* @returns {Imm12}
*/
  imm12(): Imm12;
}
/**
*Send a message to recipient address with call abi, coins, and output.
*/
export class SMO {
  free(): void;
/**
* Construct the instruction from its parts.
* @param {RegId} recipient_addr
* @param {RegId} data_addr
* @param {RegId} data_len
* @param {RegId} coins
*/
  constructor(recipient_addr: RegId, data_addr: RegId, data_len: RegId, coins: RegId);
/**
* Access the ID for register A.
* @returns {RegId}
*/
  ra(): RegId;
/**
* Access the ID for register B.
* @returns {RegId}
*/
  rb(): RegId;
/**
* Access the ID for register C.
* @returns {RegId}
*/
  rc(): RegId;
/**
* Access the ID for register D.
* @returns {RegId}
*/
  rd(): RegId;
}
/**
*Right shifts a register by a register.
*/
export class SRL {
  free(): void;
/**
* Construct the instruction from its parts.
* @param {RegId} dst
* @param {RegId} lhs
* @param {RegId} rhs
*/
  constructor(dst: RegId, lhs: RegId, rhs: RegId);
/**
* Access the ID for register A.
* @returns {RegId}
*/
  ra(): RegId;
/**
* Access the ID for register B.
* @returns {RegId}
*/
  rb(): RegId;
/**
* Access the ID for register C.
* @returns {RegId}
*/
  rc(): RegId;
}
/**
*Right shifts a register by an immediate value.
*/
export class SRLI {
  free(): void;
/**
* Construct the instruction from its parts.
* @param {RegId} dst
* @param {RegId} lhs
* @param {Imm12} rhs
*/
  constructor(dst: RegId, lhs: RegId, rhs: Imm12);
/**
* Access the ID for register A.
* @returns {RegId}
*/
  ra(): RegId;
/**
* Access the ID for register B.
* @returns {RegId}
*/
  rb(): RegId;
/**
* Access the 12-bit immediate value.
* @returns {Imm12}
*/
  imm12(): Imm12;
}
/**
*Load a word from contract storage.
*/
export class SRW {
  free(): void;
/**
* Construct the instruction from its parts.
* @param {RegId} dst
* @param {RegId} status
* @param {RegId} key_addr
*/
  constructor(dst: RegId, status: RegId, key_addr: RegId);
/**
* Access the ID for register A.
* @returns {RegId}
*/
  ra(): RegId;
/**
* Access the ID for register B.
* @returns {RegId}
*/
  rb(): RegId;
/**
* Access the ID for register C.
* @returns {RegId}
*/
  rc(): RegId;
}
/**
*Load a series of 32 byte slots from contract storage.
*/
export class SRWQ {
  free(): void;
/**
* Construct the instruction from its parts.
* @param {RegId} dst_addr
* @param {RegId} status
* @param {RegId} key_addr
* @param {RegId} lenq
*/
  constructor(dst_addr: RegId, status: RegId, key_addr: RegId, lenq: RegId);
/**
* Access the ID for register A.
* @returns {RegId}
*/
  ra(): RegId;
/**
* Access the ID for register B.
* @returns {RegId}
*/
  rb(): RegId;
/**
* Access the ID for register C.
* @returns {RegId}
*/
  rc(): RegId;
/**
* Access the ID for register D.
* @returns {RegId}
*/
  rd(): RegId;
}
/**
*Subtracts two registers.
*/
export class SUB {
  free(): void;
/**
* Construct the instruction from its parts.
* @param {RegId} dst
* @param {RegId} lhs
* @param {RegId} rhs
*/
  constructor(dst: RegId, lhs: RegId, rhs: RegId);
/**
* Access the ID for register A.
* @returns {RegId}
*/
  ra(): RegId;
/**
* Access the ID for register B.
* @returns {RegId}
*/
  rb(): RegId;
/**
* Access the ID for register C.
* @returns {RegId}
*/
  rc(): RegId;
}
/**
*Subtracts a register and an immediate value.
*/
export class SUBI {
  free(): void;
/**
* Construct the instruction from its parts.
* @param {RegId} dst
* @param {RegId} lhs
* @param {Imm12} rhs
*/
  constructor(dst: RegId, lhs: RegId, rhs: Imm12);
/**
* Access the ID for register A.
* @returns {RegId}
*/
  ra(): RegId;
/**
* Access the ID for register B.
* @returns {RegId}
*/
  rb(): RegId;
/**
* Access the 12-bit immediate value.
* @returns {Imm12}
*/
  imm12(): Imm12;
}
/**
*Write a register to memory.
*/
export class SW {
  free(): void;
/**
* Construct the instruction from its parts.
* @param {RegId} addr
* @param {RegId} value
* @param {Imm12} offset
*/
  constructor(addr: RegId, value: RegId, offset: Imm12);
/**
* Access the ID for register A.
* @returns {RegId}
*/
  ra(): RegId;
/**
* Access the ID for register B.
* @returns {RegId}
*/
  rb(): RegId;
/**
* Access the 12-bit immediate value.
* @returns {Imm12}
*/
  imm12(): Imm12;
}
/**
*Store a word in contract storage.
*/
export class SWW {
  free(): void;
/**
* Construct the instruction from its parts.
* @param {RegId} key_addr
* @param {RegId} status
* @param {RegId} value
*/
  constructor(key_addr: RegId, status: RegId, value: RegId);
/**
* Access the ID for register A.
* @returns {RegId}
*/
  ra(): RegId;
/**
* Access the ID for register B.
* @returns {RegId}
*/
  rb(): RegId;
/**
* Access the ID for register C.
* @returns {RegId}
*/
  rc(): RegId;
}
/**
*Store a series of 32 byte slots in contract storage.
*/
export class SWWQ {
  free(): void;
/**
* Construct the instruction from its parts.
* @param {RegId} key_addr
* @param {RegId} status
* @param {RegId} src_addr
* @param {RegId} lenq
*/
  constructor(key_addr: RegId, status: RegId, src_addr: RegId, lenq: RegId);
/**
* Access the ID for register A.
* @returns {RegId}
*/
  ra(): RegId;
/**
* Access the ID for register B.
* @returns {RegId}
*/
  rb(): RegId;
/**
* Access the ID for register C.
* @returns {RegId}
*/
  rc(): RegId;
/**
* Access the ID for register D.
* @returns {RegId}
*/
  rd(): RegId;
}
/**
* FuelVM atomic array type.
*/
export class Salt {
  free(): void;
/**
* Bytes constructor.
* @param {Uint8Array} bytes
* @returns {Salt}
*/
  static from_bytes(bytes: Uint8Array): Salt;
/**
* Zeroes bytes constructor.
* @returns {Salt}
*/
  static zeroed(): Salt;
/**
* The memory size of the type by the method.
* @returns {number}
*/
  size(): number;
}
/**
*Get timestamp of block at given height.
*/
export class TIME {
  free(): void;
/**
* Construct the instruction from its parts.
* @param {RegId} dst
* @param {RegId} heigth
*/
  constructor(dst: RegId, heigth: RegId);
/**
* Access the ID for register A.
* @returns {RegId}
*/
  ra(): RegId;
/**
* Access the ID for register B.
* @returns {RegId}
*/
  rb(): RegId;
}
/**
*Transfer coins to a contract unconditionally.
*/
export class TR {
  free(): void;
/**
* Construct the instruction from its parts.
* @param {RegId} contract_id_addr
* @param {RegId} amount
* @param {RegId} asset_id_addr
*/
  constructor(contract_id_addr: RegId, amount: RegId, asset_id_addr: RegId);
/**
* Access the ID for register A.
* @returns {RegId}
*/
  ra(): RegId;
/**
* Access the ID for register B.
* @returns {RegId}
*/
  rb(): RegId;
/**
* Access the ID for register C.
* @returns {RegId}
*/
  rc(): RegId;
}
/**
*Transfer coins to a variable output.
*/
export class TRO {
  free(): void;
/**
* Construct the instruction from its parts.
* @param {RegId} contract_id_addr
* @param {RegId} output_index
* @param {RegId} amount
* @param {RegId} asset_id_addr
*/
  constructor(contract_id_addr: RegId, output_index: RegId, amount: RegId, asset_id_addr: RegId);
/**
* Access the ID for register A.
* @returns {RegId}
*/
  ra(): RegId;
/**
* Access the ID for register B.
* @returns {RegId}
*/
  rb(): RegId;
/**
* Access the ID for register C.
* @returns {RegId}
*/
  rc(): RegId;
/**
* Access the ID for register D.
* @returns {RegId}
*/
  rd(): RegId;
}
/**
* Representation of a single instruction for the interpreter.
*
* The opcode is represented in the tag (variant), or may be retrieved in the
* form of an `Opcode` byte using the `opcode` method.
*
* The register and immediate data associated with the instruction is represented
* within an inner unit type wrapper around the 3 remaining bytes.
*/
export class TypescriptInstruction {
  free(): void;
/**
* Convenience method for converting to bytes
* @returns {Uint8Array}
*/
  to_bytes(): Uint8Array;
/**
* Size of an instruction in bytes
* @returns {number}
*/
  static size(): number;
}
/**
*AddMod 128bit
*/
export class WDAM {
  free(): void;
/**
* Construct the instruction from its parts.
* @param {RegId} dst
* @param {RegId} add_lhs
* @param {RegId} add_rhs
* @param {RegId} modulo
*/
  constructor(dst: RegId, add_lhs: RegId, add_rhs: RegId, modulo: RegId);
/**
* Access the ID for register A.
* @returns {RegId}
*/
  ra(): RegId;
/**
* Access the ID for register B.
* @returns {RegId}
*/
  rb(): RegId;
/**
* Access the ID for register C.
* @returns {RegId}
*/
  rc(): RegId;
/**
* Access the ID for register D.
* @returns {RegId}
*/
  rd(): RegId;
}
/**
*Compare 128bit integers
*/
export class WDCM {
  free(): void;
/**
* Construct the instruction from its parts.
* @param {RegId} dst
* @param {RegId} lhs
* @param {RegId} rhs
* @param {Imm06} flags
*/
  constructor(dst: RegId, lhs: RegId, rhs: RegId, flags: Imm06);
/**
* Access the ID for register A.
* @returns {RegId}
*/
  ra(): RegId;
/**
* Access the ID for register B.
* @returns {RegId}
*/
  rb(): RegId;
/**
* Access the ID for register C.
* @returns {RegId}
*/
  rc(): RegId;
/**
* Access the 6-bit immediate value.
* @returns {Imm06}
*/
  imm06(): Imm06;
/**
* Construct a `WDCM` instruction from its arguments.
* @param {RegId} ra
* @param {RegId} rb
* @param {RegId} rc
* @param {CompareArgs} args
* @returns {WDCM}
*/
  static from_args(ra: RegId, rb: RegId, rc: RegId, args: CompareArgs): WDCM;
}
/**
*Divide 128bit
*/
export class WDDV {
  free(): void;
/**
* Construct the instruction from its parts.
* @param {RegId} dst
* @param {RegId} lhs
* @param {RegId} rhs
* @param {Imm06} flags
*/
  constructor(dst: RegId, lhs: RegId, rhs: RegId, flags: Imm06);
/**
* Access the ID for register A.
* @returns {RegId}
*/
  ra(): RegId;
/**
* Access the ID for register B.
* @returns {RegId}
*/
  rb(): RegId;
/**
* Access the ID for register C.
* @returns {RegId}
*/
  rc(): RegId;
/**
* Access the 6-bit immediate value.
* @returns {Imm06}
*/
  imm06(): Imm06;
/**
* Construct a `WDDV` instruction from its arguments.
* @param {RegId} ra
* @param {RegId} rb
* @param {RegId} rc
* @param {DivArgs} args
* @returns {WDDV}
*/
  static from_args(ra: RegId, rb: RegId, rc: RegId, args: DivArgs): WDDV;
}
/**
*Fused multiply-divide 128bit
*/
export class WDMD {
  free(): void;
/**
* Construct the instruction from its parts.
* @param {RegId} dst
* @param {RegId} mul_lhs
* @param {RegId} mul_rhs
* @param {RegId} divisor
*/
  constructor(dst: RegId, mul_lhs: RegId, mul_rhs: RegId, divisor: RegId);
/**
* Access the ID for register A.
* @returns {RegId}
*/
  ra(): RegId;
/**
* Access the ID for register B.
* @returns {RegId}
*/
  rb(): RegId;
/**
* Access the ID for register C.
* @returns {RegId}
*/
  rc(): RegId;
/**
* Access the ID for register D.
* @returns {RegId}
*/
  rd(): RegId;
}
/**
*Multiply 128bit
*/
export class WDML {
  free(): void;
/**
* Construct the instruction from its parts.
* @param {RegId} dst
* @param {RegId} lhs
* @param {RegId} rhs
* @param {Imm06} flags
*/
  constructor(dst: RegId, lhs: RegId, rhs: RegId, flags: Imm06);
/**
* Access the ID for register A.
* @returns {RegId}
*/
  ra(): RegId;
/**
* Access the ID for register B.
* @returns {RegId}
*/
  rb(): RegId;
/**
* Access the ID for register C.
* @returns {RegId}
*/
  rc(): RegId;
/**
* Access the 6-bit immediate value.
* @returns {Imm06}
*/
  imm06(): Imm06;
/**
* Construct a `WDML` instruction from its arguments.
* @param {RegId} ra
* @param {RegId} rb
* @param {RegId} rc
* @param {MulArgs} args
* @returns {WDML}
*/
  static from_args(ra: RegId, rb: RegId, rc: RegId, args: MulArgs): WDML;
}
/**
*MulMod 128bit
*/
export class WDMM {
  free(): void;
/**
* Construct the instruction from its parts.
* @param {RegId} dst
* @param {RegId} mul_lhs
* @param {RegId} mul_rhs
* @param {RegId} modulo
*/
  constructor(dst: RegId, mul_lhs: RegId, mul_rhs: RegId, modulo: RegId);
/**
* Access the ID for register A.
* @returns {RegId}
*/
  ra(): RegId;
/**
* Access the ID for register B.
* @returns {RegId}
*/
  rb(): RegId;
/**
* Access the ID for register C.
* @returns {RegId}
*/
  rc(): RegId;
/**
* Access the ID for register D.
* @returns {RegId}
*/
  rd(): RegId;
}
/**
*Simple 128bit operations
*/
export class WDOP {
  free(): void;
/**
* Construct the instruction from its parts.
* @param {RegId} dst
* @param {RegId} lhs
* @param {RegId} rhs
* @param {Imm06} flags
*/
  constructor(dst: RegId, lhs: RegId, rhs: RegId, flags: Imm06);
/**
* Access the ID for register A.
* @returns {RegId}
*/
  ra(): RegId;
/**
* Access the ID for register B.
* @returns {RegId}
*/
  rb(): RegId;
/**
* Access the ID for register C.
* @returns {RegId}
*/
  rc(): RegId;
/**
* Access the 6-bit immediate value.
* @returns {Imm06}
*/
  imm06(): Imm06;
/**
* Construct a `WDOP` instruction from its arguments.
* @param {RegId} ra
* @param {RegId} rb
* @param {RegId} rc
* @param {MathArgs} args
* @returns {WDOP}
*/
  static from_args(ra: RegId, rb: RegId, rc: RegId, args: MathArgs): WDOP;
}
/**
*AddMod 256bit
*/
export class WQAM {
  free(): void;
/**
* Construct the instruction from its parts.
* @param {RegId} dst
* @param {RegId} add_lhs
* @param {RegId} add_rhs
* @param {RegId} modulo
*/
  constructor(dst: RegId, add_lhs: RegId, add_rhs: RegId, modulo: RegId);
/**
* Access the ID for register A.
* @returns {RegId}
*/
  ra(): RegId;
/**
* Access the ID for register B.
* @returns {RegId}
*/
  rb(): RegId;
/**
* Access the ID for register C.
* @returns {RegId}
*/
  rc(): RegId;
/**
* Access the ID for register D.
* @returns {RegId}
*/
  rd(): RegId;
}
/**
*Compare 256bit integers
*/
export class WQCM {
  free(): void;
/**
* Construct the instruction from its parts.
* @param {RegId} dst
* @param {RegId} lhs
* @param {RegId} rhs
* @param {Imm06} flags
*/
  constructor(dst: RegId, lhs: RegId, rhs: RegId, flags: Imm06);
/**
* Access the ID for register A.
* @returns {RegId}
*/
  ra(): RegId;
/**
* Access the ID for register B.
* @returns {RegId}
*/
  rb(): RegId;
/**
* Access the ID for register C.
* @returns {RegId}
*/
  rc(): RegId;
/**
* Access the 6-bit immediate value.
* @returns {Imm06}
*/
  imm06(): Imm06;
/**
* Construct a `WQCM` instruction from its arguments.
* @param {RegId} ra
* @param {RegId} rb
* @param {RegId} rc
* @param {CompareArgs} args
* @returns {WQCM}
*/
  static from_args(ra: RegId, rb: RegId, rc: RegId, args: CompareArgs): WQCM;
}
/**
*Divide 256bit
*/
export class WQDV {
  free(): void;
/**
* Construct the instruction from its parts.
* @param {RegId} dst
* @param {RegId} lhs
* @param {RegId} rhs
* @param {Imm06} flags
*/
  constructor(dst: RegId, lhs: RegId, rhs: RegId, flags: Imm06);
/**
* Access the ID for register A.
* @returns {RegId}
*/
  ra(): RegId;
/**
* Access the ID for register B.
* @returns {RegId}
*/
  rb(): RegId;
/**
* Access the ID for register C.
* @returns {RegId}
*/
  rc(): RegId;
/**
* Access the 6-bit immediate value.
* @returns {Imm06}
*/
  imm06(): Imm06;
/**
* Construct a `WQDV` instruction from its arguments.
* @param {RegId} ra
* @param {RegId} rb
* @param {RegId} rc
* @param {DivArgs} args
* @returns {WQDV}
*/
  static from_args(ra: RegId, rb: RegId, rc: RegId, args: DivArgs): WQDV;
}
/**
*Fused multiply-divide 256bit
*/
export class WQMD {
  free(): void;
/**
* Construct the instruction from its parts.
* @param {RegId} dst
* @param {RegId} mul_lhs
* @param {RegId} mul_rhs
* @param {RegId} divisor
*/
  constructor(dst: RegId, mul_lhs: RegId, mul_rhs: RegId, divisor: RegId);
/**
* Access the ID for register A.
* @returns {RegId}
*/
  ra(): RegId;
/**
* Access the ID for register B.
* @returns {RegId}
*/
  rb(): RegId;
/**
* Access the ID for register C.
* @returns {RegId}
*/
  rc(): RegId;
/**
* Access the ID for register D.
* @returns {RegId}
*/
  rd(): RegId;
}
/**
*Multiply 256bit
*/
export class WQML {
  free(): void;
/**
* Construct the instruction from its parts.
* @param {RegId} dst
* @param {RegId} lhs
* @param {RegId} rhs
* @param {Imm06} flags
*/
  constructor(dst: RegId, lhs: RegId, rhs: RegId, flags: Imm06);
/**
* Access the ID for register A.
* @returns {RegId}
*/
  ra(): RegId;
/**
* Access the ID for register B.
* @returns {RegId}
*/
  rb(): RegId;
/**
* Access the ID for register C.
* @returns {RegId}
*/
  rc(): RegId;
/**
* Access the 6-bit immediate value.
* @returns {Imm06}
*/
  imm06(): Imm06;
/**
* Construct a `WQML` instruction from its arguments.
* @param {RegId} ra
* @param {RegId} rb
* @param {RegId} rc
* @param {MulArgs} args
* @returns {WQML}
*/
  static from_args(ra: RegId, rb: RegId, rc: RegId, args: MulArgs): WQML;
}
/**
*MulMod 256bit
*/
export class WQMM {
  free(): void;
/**
* Construct the instruction from its parts.
* @param {RegId} dst
* @param {RegId} mul_lhs
* @param {RegId} mul_rhs
* @param {RegId} modulo
*/
  constructor(dst: RegId, mul_lhs: RegId, mul_rhs: RegId, modulo: RegId);
/**
* Access the ID for register A.
* @returns {RegId}
*/
  ra(): RegId;
/**
* Access the ID for register B.
* @returns {RegId}
*/
  rb(): RegId;
/**
* Access the ID for register C.
* @returns {RegId}
*/
  rc(): RegId;
/**
* Access the ID for register D.
* @returns {RegId}
*/
  rd(): RegId;
}
/**
*Simple 256bit operations
*/
export class WQOP {
  free(): void;
/**
* Construct the instruction from its parts.
* @param {RegId} dst
* @param {RegId} lhs
* @param {RegId} rhs
* @param {Imm06} flags
*/
  constructor(dst: RegId, lhs: RegId, rhs: RegId, flags: Imm06);
/**
* Access the ID for register A.
* @returns {RegId}
*/
  ra(): RegId;
/**
* Access the ID for register B.
* @returns {RegId}
*/
  rb(): RegId;
/**
* Access the ID for register C.
* @returns {RegId}
*/
  rc(): RegId;
/**
* Access the 6-bit immediate value.
* @returns {Imm06}
*/
  imm06(): Imm06;
/**
* Construct a `WQOP` instruction from its arguments.
* @param {RegId} ra
* @param {RegId} rb
* @param {RegId} rc
* @param {MathArgs} args
* @returns {WQOP}
*/
  static from_args(ra: RegId, rb: RegId, rc: RegId, args: MathArgs): WQOP;
}
/**
*Bitwise XORs two registers.
*/
export class XOR {
  free(): void;
/**
* Construct the instruction from its parts.
* @param {RegId} dst
* @param {RegId} lhs
* @param {RegId} rhs
*/
  constructor(dst: RegId, lhs: RegId, rhs: RegId);
/**
* Access the ID for register A.
* @returns {RegId}
*/
  ra(): RegId;
/**
* Access the ID for register B.
* @returns {RegId}
*/
  rb(): RegId;
/**
* Access the ID for register C.
* @returns {RegId}
*/
  rc(): RegId;
}
/**
*Bitwise XORs a register and an immediate value.
*/
export class XORI {
  free(): void;
/**
* Construct the instruction from its parts.
* @param {RegId} dst
* @param {RegId} lhs
* @param {Imm12} rhs
*/
  constructor(dst: RegId, lhs: RegId, rhs: Imm12);
/**
* Access the ID for register A.
* @returns {RegId}
*/
  ra(): RegId;
/**
* Access the ID for register B.
* @returns {RegId}
*/
  rb(): RegId;
/**
* Access the 12-bit immediate value.
* @returns {Imm12}
*/
  imm12(): Imm12;
}

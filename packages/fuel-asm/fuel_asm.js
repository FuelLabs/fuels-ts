let imports = {};
imports['__wbindgen_placeholder__'] = module.exports;
let wasm;
const { TextDecoder } = require(`util`);

let cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

let cachedUint8Memory0 = null;

function getUint8Memory0() {
    if (cachedUint8Memory0 === null || cachedUint8Memory0.byteLength === 0) {
        cachedUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

function _assertClass(instance, klass) {
    if (!(instance instanceof klass)) {
        throw new Error(`expected instance of ${klass.name}`);
    }
    return instance.ptr;
}
/**
*Adds two registers.
* @param {number} dst
* @param {number} lhs
* @param {number} rhs
* @returns {TypescriptInstruction}
*/
module.exports.add = function(dst, lhs, rhs) {
    const ret = wasm.add(dst, lhs, rhs);
    return TypescriptInstruction.__wrap(ret);
};

/**
*Bitwise ANDs two registers.
* @param {number} dst
* @param {number} lhs
* @param {number} rhs
* @returns {TypescriptInstruction}
*/
module.exports.and = function(dst, lhs, rhs) {
    const ret = wasm.and(dst, lhs, rhs);
    return TypescriptInstruction.__wrap(ret);
};

/**
*Divides two registers.
* @param {number} dst
* @param {number} lhs
* @param {number} rhs
* @returns {TypescriptInstruction}
*/
module.exports.div = function(dst, lhs, rhs) {
    const ret = wasm.div(dst, lhs, rhs);
    return TypescriptInstruction.__wrap(ret);
};

/**
*Compares two registers for equality.
* @param {number} dst
* @param {number} lhs
* @param {number} rhs
* @returns {TypescriptInstruction}
*/
module.exports.eq = function(dst, lhs, rhs) {
    const ret = wasm.eq(dst, lhs, rhs);
    return TypescriptInstruction.__wrap(ret);
};

/**
*Raises one register to the power of another.
* @param {number} dst
* @param {number} lhs
* @param {number} rhs
* @returns {TypescriptInstruction}
*/
module.exports.exp = function(dst, lhs, rhs) {
    const ret = wasm.exp(dst, lhs, rhs);
    return TypescriptInstruction.__wrap(ret);
};

/**
*Compares two registers for greater-than.
* @param {number} dst
* @param {number} lhs
* @param {number} rhs
* @returns {TypescriptInstruction}
*/
module.exports.gt = function(dst, lhs, rhs) {
    const ret = wasm.gt(dst, lhs, rhs);
    return TypescriptInstruction.__wrap(ret);
};

/**
*Compares two registers for less-than.
* @param {number} dst
* @param {number} lhs
* @param {number} rhs
* @returns {TypescriptInstruction}
*/
module.exports.lt = function(dst, lhs, rhs) {
    const ret = wasm.lt(dst, lhs, rhs);
    return TypescriptInstruction.__wrap(ret);
};

/**
*The integer logarithm of a register.
* @param {number} dst
* @param {number} lhs
* @param {number} rhs
* @returns {TypescriptInstruction}
*/
module.exports.mlog = function(dst, lhs, rhs) {
    const ret = wasm.mlog(dst, lhs, rhs);
    return TypescriptInstruction.__wrap(ret);
};

/**
*The integer root of a register.
* @param {number} dst
* @param {number} lhs
* @param {number} rhs
* @returns {TypescriptInstruction}
*/
module.exports.mroo = function(dst, lhs, rhs) {
    const ret = wasm.mroo(dst, lhs, rhs);
    return TypescriptInstruction.__wrap(ret);
};

/**
*Modulo remainder of two registers.
* @param {number} dst
* @param {number} lhs
* @param {number} rhs
* @returns {TypescriptInstruction}
*/
module.exports.mod_ = function(dst, lhs, rhs) {
    const ret = wasm.mod_(dst, lhs, rhs);
    return TypescriptInstruction.__wrap(ret);
};

/**
*Copy from one register to another.
* @param {number} dst
* @param {number} src
* @returns {TypescriptInstruction}
*/
module.exports.move_ = function(dst, src) {
    const ret = wasm.move_(dst, src);
    return TypescriptInstruction.__wrap(ret);
};

/**
*Multiplies two registers.
* @param {number} dst
* @param {number} lhs
* @param {number} rhs
* @returns {TypescriptInstruction}
*/
module.exports.mul = function(dst, lhs, rhs) {
    const ret = wasm.mul(dst, lhs, rhs);
    return TypescriptInstruction.__wrap(ret);
};

/**
*Bitwise NOT a register.
* @param {number} dst
* @param {number} arg
* @returns {TypescriptInstruction}
*/
module.exports.not = function(dst, arg) {
    const ret = wasm.not(dst, arg);
    return TypescriptInstruction.__wrap(ret);
};

/**
*Bitwise ORs two registers.
* @param {number} dst
* @param {number} lhs
* @param {number} rhs
* @returns {TypescriptInstruction}
*/
module.exports.or = function(dst, lhs, rhs) {
    const ret = wasm.or(dst, lhs, rhs);
    return TypescriptInstruction.__wrap(ret);
};

/**
*Left shifts a register by a register.
* @param {number} dst
* @param {number} lhs
* @param {number} rhs
* @returns {TypescriptInstruction}
*/
module.exports.sll = function(dst, lhs, rhs) {
    const ret = wasm.sll(dst, lhs, rhs);
    return TypescriptInstruction.__wrap(ret);
};

/**
*Right shifts a register by a register.
* @param {number} dst
* @param {number} lhs
* @param {number} rhs
* @returns {TypescriptInstruction}
*/
module.exports.srl = function(dst, lhs, rhs) {
    const ret = wasm.srl(dst, lhs, rhs);
    return TypescriptInstruction.__wrap(ret);
};

/**
*Subtracts two registers.
* @param {number} dst
* @param {number} lhs
* @param {number} rhs
* @returns {TypescriptInstruction}
*/
module.exports.sub = function(dst, lhs, rhs) {
    const ret = wasm.sub(dst, lhs, rhs);
    return TypescriptInstruction.__wrap(ret);
};

/**
*Bitwise XORs two registers.
* @param {number} dst
* @param {number} lhs
* @param {number} rhs
* @returns {TypescriptInstruction}
*/
module.exports.xor = function(dst, lhs, rhs) {
    const ret = wasm.xor(dst, lhs, rhs);
    return TypescriptInstruction.__wrap(ret);
};

/**
*Fused multiply-divide with arbitrary precision intermediate step.
* @param {number} dst
* @param {number} mul_lhs
* @param {number} mul_rhs
* @param {number} divisor
* @returns {TypescriptInstruction}
*/
module.exports.mldv = function(dst, mul_lhs, mul_rhs, divisor) {
    const ret = wasm.mldv(dst, mul_lhs, mul_rhs, divisor);
    return TypescriptInstruction.__wrap(ret);
};

/**
*Return from context.
* @param {number} value
* @returns {TypescriptInstruction}
*/
module.exports.ret = function(value) {
    const ret = wasm.ret(value);
    return TypescriptInstruction.__wrap(ret);
};

/**
*Return from context with data.
* @param {number} addr
* @param {number} len
* @returns {TypescriptInstruction}
*/
module.exports.retd = function(addr, len) {
    const ret = wasm.retd(addr, len);
    return TypescriptInstruction.__wrap(ret);
};

/**
*Allocate a number of bytes from the heap.
* @param {number} bytes
* @returns {TypescriptInstruction}
*/
module.exports.aloc = function(bytes) {
    const ret = wasm.aloc(bytes);
    return TypescriptInstruction.__wrap(ret);
};

/**
*Clear a variable number of bytes in memory.
* @param {number} dst_addr
* @param {number} len
* @returns {TypescriptInstruction}
*/
module.exports.mcl = function(dst_addr, len) {
    const ret = wasm.mcl(dst_addr, len);
    return TypescriptInstruction.__wrap(ret);
};

/**
*Copy a variable number of bytes in memory.
* @param {number} dst_addr
* @param {number} src_addr
* @param {number} len
* @returns {TypescriptInstruction}
*/
module.exports.mcp = function(dst_addr, src_addr, len) {
    const ret = wasm.mcp(dst_addr, src_addr, len);
    return TypescriptInstruction.__wrap(ret);
};

/**
*Compare bytes in memory.
* @param {number} result
* @param {number} lhs_addr
* @param {number} rhs_addr
* @param {number} len
* @returns {TypescriptInstruction}
*/
module.exports.meq = function(result, lhs_addr, rhs_addr, len) {
    const ret = wasm.meq(result, lhs_addr, rhs_addr, len);
    return TypescriptInstruction.__wrap(ret);
};

/**
*Get block header hash for height.
* @param {number} dst
* @param {number} heigth
* @returns {TypescriptInstruction}
*/
module.exports.bhsh = function(dst, heigth) {
    const ret = wasm.bhsh(dst, heigth);
    return TypescriptInstruction.__wrap(ret);
};

/**
*Get current block height.
* @param {number} dst
* @returns {TypescriptInstruction}
*/
module.exports.bhei = function(dst) {
    const ret = wasm.bhei(dst);
    return TypescriptInstruction.__wrap(ret);
};

/**
*Burn coins of the current contract's asset ID.
* @param {number} count
* @returns {TypescriptInstruction}
*/
module.exports.burn = function(count) {
    const ret = wasm.burn(count);
    return TypescriptInstruction.__wrap(ret);
};

/**
*Call a contract.
* @param {number} target_struct
* @param {number} fwd_coins
* @param {number} asset_id_addr
* @param {number} fwd_gas
* @returns {TypescriptInstruction}
*/
module.exports.call = function(target_struct, fwd_coins, asset_id_addr, fwd_gas) {
    const ret = wasm.call(target_struct, fwd_coins, asset_id_addr, fwd_gas);
    return TypescriptInstruction.__wrap(ret);
};

/**
*Copy contract code for a contract.
* @param {number} dst_addr
* @param {number} contract_id_addr
* @param {number} offset
* @param {number} len
* @returns {TypescriptInstruction}
*/
module.exports.ccp = function(dst_addr, contract_id_addr, offset, len) {
    const ret = wasm.ccp(dst_addr, contract_id_addr, offset, len);
    return TypescriptInstruction.__wrap(ret);
};

/**
*Get code root of a contract.
* @param {number} dst_addr
* @param {number} contract_id_addr
* @returns {TypescriptInstruction}
*/
module.exports.croo = function(dst_addr, contract_id_addr) {
    const ret = wasm.croo(dst_addr, contract_id_addr);
    return TypescriptInstruction.__wrap(ret);
};

/**
*Get code size of a contract.
* @param {number} dst
* @param {number} contract_id_addr
* @returns {TypescriptInstruction}
*/
module.exports.csiz = function(dst, contract_id_addr) {
    const ret = wasm.csiz(dst, contract_id_addr);
    return TypescriptInstruction.__wrap(ret);
};

/**
*Get current block proposer's address.
* @param {number} dst
* @returns {TypescriptInstruction}
*/
module.exports.cb = function(dst) {
    const ret = wasm.cb(dst);
    return TypescriptInstruction.__wrap(ret);
};

/**
*Load a contract's code as executable.
* @param {number} contract_id_addr
* @param {number} offset
* @param {number} len
* @returns {TypescriptInstruction}
*/
module.exports.ldc = function(contract_id_addr, offset, len) {
    const ret = wasm.ldc(contract_id_addr, offset, len);
    return TypescriptInstruction.__wrap(ret);
};

/**
*Log an event.
* @param {number} a
* @param {number} b
* @param {number} c
* @param {number} d
* @returns {TypescriptInstruction}
*/
module.exports.log = function(a, b, c, d) {
    const ret = wasm.log(a, b, c, d);
    return TypescriptInstruction.__wrap(ret);
};

/**
*Log data.
* @param {number} a
* @param {number} b
* @param {number} addr
* @param {number} len
* @returns {TypescriptInstruction}
*/
module.exports.logd = function(a, b, addr, len) {
    const ret = wasm.logd(a, b, addr, len);
    return TypescriptInstruction.__wrap(ret);
};

/**
*Mint coins of the current contract's asset ID.
* @param {number} amount
* @returns {TypescriptInstruction}
*/
module.exports.mint = function(amount) {
    const ret = wasm.mint(amount);
    return TypescriptInstruction.__wrap(ret);
};

/**
*Halt execution, reverting state changes and returning a value.
* @param {number} value
* @returns {TypescriptInstruction}
*/
module.exports.rvrt = function(value) {
    const ret = wasm.rvrt(value);
    return TypescriptInstruction.__wrap(ret);
};

/**
*Clear a series of slots from contract storage.
* @param {number} key_addr
* @param {number} status
* @param {number} lenq
* @returns {TypescriptInstruction}
*/
module.exports.scwq = function(key_addr, status, lenq) {
    const ret = wasm.scwq(key_addr, status, lenq);
    return TypescriptInstruction.__wrap(ret);
};

/**
*Load a word from contract storage.
* @param {number} dst
* @param {number} status
* @param {number} key_addr
* @returns {TypescriptInstruction}
*/
module.exports.srw = function(dst, status, key_addr) {
    const ret = wasm.srw(dst, status, key_addr);
    return TypescriptInstruction.__wrap(ret);
};

/**
*Load a series of 32 byte slots from contract storage.
* @param {number} dst_addr
* @param {number} status
* @param {number} key_addr
* @param {number} lenq
* @returns {TypescriptInstruction}
*/
module.exports.srwq = function(dst_addr, status, key_addr, lenq) {
    const ret = wasm.srwq(dst_addr, status, key_addr, lenq);
    return TypescriptInstruction.__wrap(ret);
};

/**
*Store a word in contract storage.
* @param {number} key_addr
* @param {number} status
* @param {number} value
* @returns {TypescriptInstruction}
*/
module.exports.sww = function(key_addr, status, value) {
    const ret = wasm.sww(key_addr, status, value);
    return TypescriptInstruction.__wrap(ret);
};

/**
*Store a series of 32 byte slots in contract storage.
* @param {number} key_addr
* @param {number} status
* @param {number} src_addr
* @param {number} lenq
* @returns {TypescriptInstruction}
*/
module.exports.swwq = function(key_addr, status, src_addr, lenq) {
    const ret = wasm.swwq(key_addr, status, src_addr, lenq);
    return TypescriptInstruction.__wrap(ret);
};

/**
*Transfer coins to a contract unconditionally.
* @param {number} contract_id_addr
* @param {number} amount
* @param {number} asset_id_addr
* @returns {TypescriptInstruction}
*/
module.exports.tr = function(contract_id_addr, amount, asset_id_addr) {
    const ret = wasm.tr(contract_id_addr, amount, asset_id_addr);
    return TypescriptInstruction.__wrap(ret);
};

/**
*Transfer coins to a variable output.
* @param {number} contract_id_addr
* @param {number} output_index
* @param {number} amount
* @param {number} asset_id_addr
* @returns {TypescriptInstruction}
*/
module.exports.tro = function(contract_id_addr, output_index, amount, asset_id_addr) {
    const ret = wasm.tro(contract_id_addr, output_index, amount, asset_id_addr);
    return TypescriptInstruction.__wrap(ret);
};

/**
*The 64-byte public key (x, y) recovered from 64-byte signature on 32-byte message.
* @param {number} dst_addr
* @param {number} sig_addr
* @param {number} msg_hash_addr
* @returns {TypescriptInstruction}
*/
module.exports.ecr = function(dst_addr, sig_addr, msg_hash_addr) {
    const ret = wasm.ecr(dst_addr, sig_addr, msg_hash_addr);
    return TypescriptInstruction.__wrap(ret);
};

/**
*The keccak-256 hash of a slice.
* @param {number} dst_addr
* @param {number} src_addr
* @param {number} len
* @returns {TypescriptInstruction}
*/
module.exports.k256 = function(dst_addr, src_addr, len) {
    const ret = wasm.k256(dst_addr, src_addr, len);
    return TypescriptInstruction.__wrap(ret);
};

/**
*The SHA-2-256 hash of a slice.
* @param {number} dst_addr
* @param {number} src_addr
* @param {number} len
* @returns {TypescriptInstruction}
*/
module.exports.s256 = function(dst_addr, src_addr, len) {
    const ret = wasm.s256(dst_addr, src_addr, len);
    return TypescriptInstruction.__wrap(ret);
};

/**
*Get timestamp of block at given height.
* @param {number} dst
* @param {number} heigth
* @returns {TypescriptInstruction}
*/
module.exports.time = function(dst, heigth) {
    const ret = wasm.time(dst, heigth);
    return TypescriptInstruction.__wrap(ret);
};

/**
*Performs no operation.
* @returns {TypescriptInstruction}
*/
module.exports.noop = function() {
    const ret = wasm.noop();
    return TypescriptInstruction.__wrap(ret);
};

/**
*Set flag register to a register.
* @param {number} value
* @returns {TypescriptInstruction}
*/
module.exports.flag = function(value) {
    const ret = wasm.flag(value);
    return TypescriptInstruction.__wrap(ret);
};

/**
*Get the balance of contract of an asset ID.
* @param {number} dst
* @param {number} asset_id_addr
* @param {number} contract_id_addr
* @returns {TypescriptInstruction}
*/
module.exports.bal = function(dst, asset_id_addr, contract_id_addr) {
    const ret = wasm.bal(dst, asset_id_addr, contract_id_addr);
    return TypescriptInstruction.__wrap(ret);
};

/**
*Dynamic jump.
* @param {number} abs_target
* @returns {TypescriptInstruction}
*/
module.exports.jmp = function(abs_target) {
    const ret = wasm.jmp(abs_target);
    return TypescriptInstruction.__wrap(ret);
};

/**
*Conditional dynamic jump.
* @param {number} abs_target
* @param {number} lhs
* @param {number} rhs
* @returns {TypescriptInstruction}
*/
module.exports.jne = function(abs_target, lhs, rhs) {
    const ret = wasm.jne(abs_target, lhs, rhs);
    return TypescriptInstruction.__wrap(ret);
};

/**
*Send a message to recipient address with call abi, coins, and output.
* @param {number} recipient_addr
* @param {number} data_addr
* @param {number} data_len
* @param {number} coins
* @returns {TypescriptInstruction}
*/
module.exports.smo = function(recipient_addr, data_addr, data_len, coins) {
    const ret = wasm.smo(recipient_addr, data_addr, data_len, coins);
    return TypescriptInstruction.__wrap(ret);
};

/**
*Adds a register and an immediate value.
* @param {number} dst
* @param {number} lhs
* @param {number} rhs
* @returns {TypescriptInstruction}
*/
module.exports.addi = function(dst, lhs, rhs) {
    const ret = wasm.addi(dst, lhs, rhs);
    return TypescriptInstruction.__wrap(ret);
};

/**
*Bitwise ANDs a register and an immediate value.
* @param {number} dst
* @param {number} lhs
* @param {number} rhs
* @returns {TypescriptInstruction}
*/
module.exports.andi = function(dst, lhs, rhs) {
    const ret = wasm.andi(dst, lhs, rhs);
    return TypescriptInstruction.__wrap(ret);
};

/**
*Divides a register and an immediate value.
* @param {number} dst
* @param {number} lhs
* @param {number} rhs
* @returns {TypescriptInstruction}
*/
module.exports.divi = function(dst, lhs, rhs) {
    const ret = wasm.divi(dst, lhs, rhs);
    return TypescriptInstruction.__wrap(ret);
};

/**
*Raises one register to the power of an immediate value.
* @param {number} dst
* @param {number} lhs
* @param {number} rhs
* @returns {TypescriptInstruction}
*/
module.exports.expi = function(dst, lhs, rhs) {
    const ret = wasm.expi(dst, lhs, rhs);
    return TypescriptInstruction.__wrap(ret);
};

/**
*Modulo remainder of a register and an immediate value.
* @param {number} dst
* @param {number} lhs
* @param {number} rhs
* @returns {TypescriptInstruction}
*/
module.exports.modi = function(dst, lhs, rhs) {
    const ret = wasm.modi(dst, lhs, rhs);
    return TypescriptInstruction.__wrap(ret);
};

/**
*Multiplies a register and an immediate value.
* @param {number} dst
* @param {number} lhs
* @param {number} rhs
* @returns {TypescriptInstruction}
*/
module.exports.muli = function(dst, lhs, rhs) {
    const ret = wasm.muli(dst, lhs, rhs);
    return TypescriptInstruction.__wrap(ret);
};

/**
*Bitwise ORs a register and an immediate value.
* @param {number} dst
* @param {number} lhs
* @param {number} rhs
* @returns {TypescriptInstruction}
*/
module.exports.ori = function(dst, lhs, rhs) {
    const ret = wasm.ori(dst, lhs, rhs);
    return TypescriptInstruction.__wrap(ret);
};

/**
*Left shifts a register by an immediate value.
* @param {number} dst
* @param {number} lhs
* @param {number} rhs
* @returns {TypescriptInstruction}
*/
module.exports.slli = function(dst, lhs, rhs) {
    const ret = wasm.slli(dst, lhs, rhs);
    return TypescriptInstruction.__wrap(ret);
};

/**
*Right shifts a register by an immediate value.
* @param {number} dst
* @param {number} lhs
* @param {number} rhs
* @returns {TypescriptInstruction}
*/
module.exports.srli = function(dst, lhs, rhs) {
    const ret = wasm.srli(dst, lhs, rhs);
    return TypescriptInstruction.__wrap(ret);
};

/**
*Subtracts a register and an immediate value.
* @param {number} dst
* @param {number} lhs
* @param {number} rhs
* @returns {TypescriptInstruction}
*/
module.exports.subi = function(dst, lhs, rhs) {
    const ret = wasm.subi(dst, lhs, rhs);
    return TypescriptInstruction.__wrap(ret);
};

/**
*Bitwise XORs a register and an immediate value.
* @param {number} dst
* @param {number} lhs
* @param {number} rhs
* @returns {TypescriptInstruction}
*/
module.exports.xori = function(dst, lhs, rhs) {
    const ret = wasm.xori(dst, lhs, rhs);
    return TypescriptInstruction.__wrap(ret);
};

/**
*Conditional jump.
* @param {number} cond_lhs
* @param {number} cond_rhs
* @param {number} abs_target
* @returns {TypescriptInstruction}
*/
module.exports.jnei = function(cond_lhs, cond_rhs, abs_target) {
    const ret = wasm.jnei(cond_lhs, cond_rhs, abs_target);
    return TypescriptInstruction.__wrap(ret);
};

/**
*A byte is loaded from the specified address offset by an immediate value.
* @param {number} dst
* @param {number} addr
* @param {number} offset
* @returns {TypescriptInstruction}
*/
module.exports.lb = function(dst, addr, offset) {
    const ret = wasm.lb(dst, addr, offset);
    return TypescriptInstruction.__wrap(ret);
};

/**
*A word is loaded from the specified address offset by an immediate value.
* @param {number} dst
* @param {number} addr
* @param {number} offset
* @returns {TypescriptInstruction}
*/
module.exports.lw = function(dst, addr, offset) {
    const ret = wasm.lw(dst, addr, offset);
    return TypescriptInstruction.__wrap(ret);
};

/**
*Write the least significant byte of a register to memory.
* @param {number} addr
* @param {number} value
* @param {number} offset
* @returns {TypescriptInstruction}
*/
module.exports.sb = function(addr, value, offset) {
    const ret = wasm.sb(addr, value, offset);
    return TypescriptInstruction.__wrap(ret);
};

/**
*Write a register to memory.
* @param {number} addr
* @param {number} value
* @param {number} offset
* @returns {TypescriptInstruction}
*/
module.exports.sw = function(addr, value, offset) {
    const ret = wasm.sw(addr, value, offset);
    return TypescriptInstruction.__wrap(ret);
};

/**
*Copy an immediate number of bytes in memory.
* @param {number} dst_addr
* @param {number} src_addr
* @param {number} len
* @returns {TypescriptInstruction}
*/
module.exports.mcpi = function(dst_addr, src_addr, len) {
    const ret = wasm.mcpi(dst_addr, src_addr, len);
    return TypescriptInstruction.__wrap(ret);
};

/**
*Get transaction fields.
* @param {number} dst
* @param {number} arg
* @param {number} selector
* @returns {TypescriptInstruction}
*/
module.exports.gtf = function(dst, arg, selector) {
    const ret = wasm.gtf(dst, arg, selector);
    return TypescriptInstruction.__wrap(ret);
};

/**
*Clear an immediate number of bytes in memory.
* @param {number} addr
* @param {number} count
* @returns {TypescriptInstruction}
*/
module.exports.mcli = function(addr, count) {
    const ret = wasm.mcli(addr, count);
    return TypescriptInstruction.__wrap(ret);
};

/**
*Get metadata from memory.
* @param {number} dst
* @param {number} selector
* @returns {TypescriptInstruction}
*/
module.exports.gm = function(dst, selector) {
    const ret = wasm.gm(dst, selector);
    return TypescriptInstruction.__wrap(ret);
};

/**
*Copy immediate value into a register
* @param {number} dst
* @param {number} val
* @returns {TypescriptInstruction}
*/
module.exports.movi = function(dst, val) {
    const ret = wasm.movi(dst, val);
    return TypescriptInstruction.__wrap(ret);
};

/**
*Conditional jump against zero.
* @param {number} cond_nz
* @param {number} abs_target
* @returns {TypescriptInstruction}
*/
module.exports.jnzi = function(cond_nz, abs_target) {
    const ret = wasm.jnzi(cond_nz, abs_target);
    return TypescriptInstruction.__wrap(ret);
};

/**
*Unconditional dynamic relative jump forwards, with a constant offset.
* @param {number} dynamic
* @param {number} fixed
* @returns {TypescriptInstruction}
*/
module.exports.jmpf = function(dynamic, fixed) {
    const ret = wasm.jmpf(dynamic, fixed);
    return TypescriptInstruction.__wrap(ret);
};

/**
*Unconditional dynamic relative jump backwards, with a constant offset.
* @param {number} dynamic
* @param {number} fixed
* @returns {TypescriptInstruction}
*/
module.exports.jmpb = function(dynamic, fixed) {
    const ret = wasm.jmpb(dynamic, fixed);
    return TypescriptInstruction.__wrap(ret);
};

/**
*Dynamic relative jump forwards, conditional against zero, with a constant offset.
* @param {number} cond_nz
* @param {number} dynamic
* @param {number} fixed
* @returns {TypescriptInstruction}
*/
module.exports.jnzf = function(cond_nz, dynamic, fixed) {
    const ret = wasm.jnzf(cond_nz, dynamic, fixed);
    return TypescriptInstruction.__wrap(ret);
};

/**
*Dynamic relative jump backwards, conditional against zero, with a constant offset.
* @param {number} cond_nz
* @param {number} dynamic
* @param {number} fixed
* @returns {TypescriptInstruction}
*/
module.exports.jnzb = function(cond_nz, dynamic, fixed) {
    const ret = wasm.jnzb(cond_nz, dynamic, fixed);
    return TypescriptInstruction.__wrap(ret);
};

/**
*Dynamic relative jump forwards, conditional on comparsion, with a constant offset.
* @param {number} cond_lhs
* @param {number} cond_rhs
* @param {number} dynamic
* @param {number} fixed
* @returns {TypescriptInstruction}
*/
module.exports.jnef = function(cond_lhs, cond_rhs, dynamic, fixed) {
    const ret = wasm.jnef(cond_lhs, cond_rhs, dynamic, fixed);
    return TypescriptInstruction.__wrap(ret);
};

/**
*Dynamic relative jump backwards, conditional on comparsion, with a constant offset.
* @param {number} cond_lhs
* @param {number} cond_rhs
* @param {number} dynamic
* @param {number} fixed
* @returns {TypescriptInstruction}
*/
module.exports.jneb = function(cond_lhs, cond_rhs, dynamic, fixed) {
    const ret = wasm.jneb(cond_lhs, cond_rhs, dynamic, fixed);
    return TypescriptInstruction.__wrap(ret);
};

/**
*Jump.
* @param {number} abs_target
* @returns {TypescriptInstruction}
*/
module.exports.ji = function(abs_target) {
    const ret = wasm.ji(abs_target);
    return TypescriptInstruction.__wrap(ret);
};

/**
*Extend the current call frame's stack by an immediate value.
* @param {number} amount
* @returns {TypescriptInstruction}
*/
module.exports.cfei = function(amount) {
    const ret = wasm.cfei(amount);
    return TypescriptInstruction.__wrap(ret);
};

/**
*Shrink the current call frame's stack by an immediate value.
* @param {number} amount
* @returns {TypescriptInstruction}
*/
module.exports.cfsi = function(amount) {
    const ret = wasm.cfsi(amount);
    return TypescriptInstruction.__wrap(ret);
};

/**
*Extend the current call frame's stack
* @param {number} amount
* @returns {TypescriptInstruction}
*/
module.exports.cfe = function(amount) {
    const ret = wasm.cfe(amount);
    return TypescriptInstruction.__wrap(ret);
};

/**
*Shrink the current call frame's stack
* @param {number} amount
* @returns {TypescriptInstruction}
*/
module.exports.cfs = function(amount) {
    const ret = wasm.cfs(amount);
    return TypescriptInstruction.__wrap(ret);
};

/**
*Compare 128bit integers
* @param {number} dst
* @param {number} lhs
* @param {number} rhs
* @param {number} flags
* @returns {TypescriptInstruction}
*/
module.exports.wdcm = function(dst, lhs, rhs, flags) {
    const ret = wasm.wdcm(dst, lhs, rhs, flags);
    return TypescriptInstruction.__wrap(ret);
};

/**
*Compare 256bit integers
* @param {number} dst
* @param {number} lhs
* @param {number} rhs
* @param {number} flags
* @returns {TypescriptInstruction}
*/
module.exports.wqcm = function(dst, lhs, rhs, flags) {
    const ret = wasm.wqcm(dst, lhs, rhs, flags);
    return TypescriptInstruction.__wrap(ret);
};

/**
*Simple 128bit operations
* @param {number} dst
* @param {number} lhs
* @param {number} rhs
* @param {number} flags
* @returns {TypescriptInstruction}
*/
module.exports.wdop = function(dst, lhs, rhs, flags) {
    const ret = wasm.wdop(dst, lhs, rhs, flags);
    return TypescriptInstruction.__wrap(ret);
};

/**
*Simple 256bit operations
* @param {number} dst
* @param {number} lhs
* @param {number} rhs
* @param {number} flags
* @returns {TypescriptInstruction}
*/
module.exports.wqop = function(dst, lhs, rhs, flags) {
    const ret = wasm.wqop(dst, lhs, rhs, flags);
    return TypescriptInstruction.__wrap(ret);
};

/**
*Multiply 128bit
* @param {number} dst
* @param {number} lhs
* @param {number} rhs
* @param {number} flags
* @returns {TypescriptInstruction}
*/
module.exports.wdml = function(dst, lhs, rhs, flags) {
    const ret = wasm.wdml(dst, lhs, rhs, flags);
    return TypescriptInstruction.__wrap(ret);
};

/**
*Multiply 256bit
* @param {number} dst
* @param {number} lhs
* @param {number} rhs
* @param {number} flags
* @returns {TypescriptInstruction}
*/
module.exports.wqml = function(dst, lhs, rhs, flags) {
    const ret = wasm.wqml(dst, lhs, rhs, flags);
    return TypescriptInstruction.__wrap(ret);
};

/**
*Divide 128bit
* @param {number} dst
* @param {number} lhs
* @param {number} rhs
* @param {number} flags
* @returns {TypescriptInstruction}
*/
module.exports.wddv = function(dst, lhs, rhs, flags) {
    const ret = wasm.wddv(dst, lhs, rhs, flags);
    return TypescriptInstruction.__wrap(ret);
};

/**
*Divide 256bit
* @param {number} dst
* @param {number} lhs
* @param {number} rhs
* @param {number} flags
* @returns {TypescriptInstruction}
*/
module.exports.wqdv = function(dst, lhs, rhs, flags) {
    const ret = wasm.wqdv(dst, lhs, rhs, flags);
    return TypescriptInstruction.__wrap(ret);
};

/**
*Fused multiply-divide 128bit
* @param {number} dst
* @param {number} mul_lhs
* @param {number} mul_rhs
* @param {number} divisor
* @returns {TypescriptInstruction}
*/
module.exports.wdmd = function(dst, mul_lhs, mul_rhs, divisor) {
    const ret = wasm.wdmd(dst, mul_lhs, mul_rhs, divisor);
    return TypescriptInstruction.__wrap(ret);
};

/**
*Fused multiply-divide 256bit
* @param {number} dst
* @param {number} mul_lhs
* @param {number} mul_rhs
* @param {number} divisor
* @returns {TypescriptInstruction}
*/
module.exports.wqmd = function(dst, mul_lhs, mul_rhs, divisor) {
    const ret = wasm.wqmd(dst, mul_lhs, mul_rhs, divisor);
    return TypescriptInstruction.__wrap(ret);
};

/**
*AddMod 128bit
* @param {number} dst
* @param {number} add_lhs
* @param {number} add_rhs
* @param {number} modulo
* @returns {TypescriptInstruction}
*/
module.exports.wdam = function(dst, add_lhs, add_rhs, modulo) {
    const ret = wasm.wdam(dst, add_lhs, add_rhs, modulo);
    return TypescriptInstruction.__wrap(ret);
};

/**
*AddMod 256bit
* @param {number} dst
* @param {number} add_lhs
* @param {number} add_rhs
* @param {number} modulo
* @returns {TypescriptInstruction}
*/
module.exports.wqam = function(dst, add_lhs, add_rhs, modulo) {
    const ret = wasm.wqam(dst, add_lhs, add_rhs, modulo);
    return TypescriptInstruction.__wrap(ret);
};

/**
*MulMod 128bit
* @param {number} dst
* @param {number} mul_lhs
* @param {number} mul_rhs
* @param {number} modulo
* @returns {TypescriptInstruction}
*/
module.exports.wdmm = function(dst, mul_lhs, mul_rhs, modulo) {
    const ret = wasm.wdmm(dst, mul_lhs, mul_rhs, modulo);
    return TypescriptInstruction.__wrap(ret);
};

/**
*MulMod 256bit
* @param {number} dst
* @param {number} mul_lhs
* @param {number} mul_rhs
* @param {number} modulo
* @returns {TypescriptInstruction}
*/
module.exports.wqmm = function(dst, mul_lhs, mul_rhs, modulo) {
    const ret = wasm.wqmm(dst, mul_lhs, mul_rhs, modulo);
    return TypescriptInstruction.__wrap(ret);
};

let cachedInt32Memory0 = null;

function getInt32Memory0() {
    if (cachedInt32Memory0 === null || cachedInt32Memory0.byteLength === 0) {
        cachedInt32Memory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachedInt32Memory0;
}

function getArrayU8FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getUint8Memory0().subarray(ptr / 1, ptr / 1 + len);
}
/**
* Construct a `GM` instruction from its arguments.
* @param {number} ra
* @param {number} args
* @returns {TypescriptInstruction}
*/
module.exports.gm_args = function(ra, args) {
    const ret = wasm.gm_args(ra, args);
    return TypescriptInstruction.__wrap(ret);
};

/**
* Construct a `GM` instruction from its arguments.
* @param {number} ra
* @param {number} rb
* @param {number} args
* @returns {TypescriptInstruction}
*/
module.exports.gtf_args = function(ra, rb, args) {
    const ret = wasm.gtf_args(ra, rb, args);
    return TypescriptInstruction.__wrap(ret);
};

/**
* Construct a `WDCM` instruction from its arguments.
* @param {number} ra
* @param {number} rb
* @param {number} rc
* @param {CompareArgs} args
* @returns {TypescriptInstruction}
*/
module.exports.wdcm_args = function(ra, rb, rc, args) {
    _assertClass(args, CompareArgs);
    var ptr0 = args.__destroy_into_raw();
    const ret = wasm.wdcm_args(ra, rb, rc, ptr0);
    return TypescriptInstruction.__wrap(ret);
};

/**
* Construct a `WQCM` instruction from its arguments.
* @param {number} ra
* @param {number} rb
* @param {number} rc
* @param {CompareArgs} args
* @returns {TypescriptInstruction}
*/
module.exports.wqcm_args = function(ra, rb, rc, args) {
    _assertClass(args, CompareArgs);
    var ptr0 = args.__destroy_into_raw();
    const ret = wasm.wqcm_args(ra, rb, rc, ptr0);
    return TypescriptInstruction.__wrap(ret);
};

/**
* Construct a `WDOP` instruction from its arguments.
* @param {number} ra
* @param {number} rb
* @param {number} rc
* @param {MathArgs} args
* @returns {TypescriptInstruction}
*/
module.exports.wdop_args = function(ra, rb, rc, args) {
    _assertClass(args, MathArgs);
    var ptr0 = args.__destroy_into_raw();
    const ret = wasm.wdop_args(ra, rb, rc, ptr0);
    return TypescriptInstruction.__wrap(ret);
};

/**
* Construct a `WQOP` instruction from its arguments.
* @param {number} ra
* @param {number} rb
* @param {number} rc
* @param {MathArgs} args
* @returns {TypescriptInstruction}
*/
module.exports.wqop_args = function(ra, rb, rc, args) {
    _assertClass(args, MathArgs);
    var ptr0 = args.__destroy_into_raw();
    const ret = wasm.wqop_args(ra, rb, rc, ptr0);
    return TypescriptInstruction.__wrap(ret);
};

/**
* Construct a `WDML` instruction from its arguments.
* @param {number} ra
* @param {number} rb
* @param {number} rc
* @param {MulArgs} args
* @returns {TypescriptInstruction}
*/
module.exports.wdml_args = function(ra, rb, rc, args) {
    _assertClass(args, MulArgs);
    var ptr0 = args.__destroy_into_raw();
    const ret = wasm.wdml_args(ra, rb, rc, ptr0);
    return TypescriptInstruction.__wrap(ret);
};

/**
* Construct a `WQML` instruction from its arguments.
* @param {number} ra
* @param {number} rb
* @param {number} rc
* @param {MulArgs} args
* @returns {TypescriptInstruction}
*/
module.exports.wqml_args = function(ra, rb, rc, args) {
    _assertClass(args, MulArgs);
    var ptr0 = args.__destroy_into_raw();
    const ret = wasm.wqml_args(ra, rb, rc, ptr0);
    return TypescriptInstruction.__wrap(ret);
};

/**
* Construct a `WDDV` instruction from its arguments.
* @param {number} ra
* @param {number} rb
* @param {number} rc
* @param {DivArgs} args
* @returns {TypescriptInstruction}
*/
module.exports.wddv_arg = function(ra, rb, rc, args) {
    _assertClass(args, DivArgs);
    var ptr0 = args.__destroy_into_raw();
    const ret = wasm.wddv_arg(ra, rb, rc, ptr0);
    return TypescriptInstruction.__wrap(ret);
};

/**
* Construct a `WQDV` instruction from its arguments.
* @param {number} ra
* @param {number} rb
* @param {number} rc
* @param {DivArgs} args
* @returns {TypescriptInstruction}
*/
module.exports.wqdv_args = function(ra, rb, rc, args) {
    _assertClass(args, DivArgs);
    var ptr0 = args.__destroy_into_raw();
    const ret = wasm.wqdv_args(ra, rb, rc, ptr0);
    return TypescriptInstruction.__wrap(ret);
};

let WASM_VECTOR_LEN = 0;

function passArray8ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 1, 1) >>> 0;
    getUint8Memory0().set(arg, ptr / 1);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}
/**
* Comparison mode used by WDCM and WQCM instructions.
*/
module.exports.CompareMode = Object.freeze({
/**
* Equality (`==`)
*/
EQ:0,"0":"EQ",
/**
* Inequality (`!=`)
*/
NE:1,"1":"NE",
/**
* Less than (`<`)
*/
LT:2,"2":"LT",
/**
* Greater than (`>`)
*/
GT:3,"3":"GT",
/**
* Less than or equals (`>=`)
*/
LTE:4,"4":"LTE",
/**
* Greater than or equals (`>=`)
*/
GTE:5,"5":"GTE",
/**
* Number of leading zeroes in lhs (`lzcnt`) (discards rhs)
*/
LZC:6,"6":"LZC", });
/**
* The operation performed by WDOP and WQOP instructions, determined as
*/
module.exports.MathOp = Object.freeze({
/**
* Add
*/
ADD:0,"0":"ADD",
/**
* Subtract
*/
SUB:1,"1":"SUB",
/**
* Invert bits (discards rhs)
*/
NOT:2,"2":"NOT",
/**
* Bitwise or
*/
OR:3,"3":"OR",
/**
* Bitwise exclusive or
*/
XOR:4,"4":"XOR",
/**
* Bitwise and
*/
AND:5,"5":"AND",
/**
* Shift left
*/
SHL:6,"6":"SHL",
/**
* Shift right
*/
SHR:7,"7":"SHR", });
/**
* Argument list for GM (get metadata) instruction
*/
module.exports.GMArgs = Object.freeze({
/**
* Get if caller is external.
*/
IsCallerExternal:1,"1":"IsCallerExternal",
/**
* Get caller's contract ID.
*/
GetCaller:2,"2":"GetCaller",
/**
* Get index of current predicate.
*/
GetVerifyingPredicate:3,"3":"GetVerifyingPredicate",
/**
* Get the Chain ID this VM is operating within
*/
GetChainId:4,"4":"GetChainId", });
/**
* Argument list for GTF (get tx fields) instruction
*/
module.exports.GTFArgs = Object.freeze({
/**
* Set `$rA` to `tx.type`
*/
Type:1,"1":"Type",
/**
* Set `$rA` to `tx.gasPrice`
*/
ScriptGasPrice:2,"2":"ScriptGasPrice",
/**
* Set `$rA` to `tx.gasLimit`
*/
ScriptGasLimit:3,"3":"ScriptGasLimit",
/**
* Set `$rA` to `tx.maturity`
*/
ScriptMaturity:4,"4":"ScriptMaturity",
/**
* Set `$rA` to `tx.scriptLength`
*/
ScriptLength:5,"5":"ScriptLength",
/**
* Set `$rA` to `tx.scriptDataLength`
*/
ScriptDataLength:6,"6":"ScriptDataLength",
/**
* Set `$rA` to `tx.inputsCount`
*/
ScriptInputsCount:7,"7":"ScriptInputsCount",
/**
* Set `$rA` to `tx.outputsCount`
*/
ScriptOutputsCount:8,"8":"ScriptOutputsCount",
/**
* Set `$rA` to `tx.witnessesCount`
*/
ScriptWitnessesCound:9,"9":"ScriptWitnessesCound",
/**
* Set `$rA` to `Memory address of tx.receiptsRoot`
*/
ScriptReceiptsRoot:10,"10":"ScriptReceiptsRoot",
/**
* Set `$rA` to `Memory address of tx.script`
*/
Script:11,"11":"Script",
/**
* Set `$rA` to `Memory address of tx.scriptData`
*/
ScriptData:12,"12":"ScriptData",
/**
* Set `$rA` to `Memory address of tx.inputs[$rB]`
*/
ScriptInputAtIndex:13,"13":"ScriptInputAtIndex",
/**
* Set `$rA` to `Memory address of t.outputs[$rB]`
*/
ScriptOutputAtIndex:14,"14":"ScriptOutputAtIndex",
/**
* Set `$rA` to `Memory address of tx.witnesses[$rB]`
*/
ScriptWitnessAtIndex:15,"15":"ScriptWitnessAtIndex",
/**
* Set `$rA` to `tx.gasPrice`
*/
CreateGasPrice:16,"16":"CreateGasPrice",
/**
* Set `$rA` to `tx.gasLimit`
*/
CreateGasLimit:17,"17":"CreateGasLimit",
/**
* Set `$rA` to `tx.maturity`
*/
CreateMaturity:18,"18":"CreateMaturity",
/**
* Set `$rA` to `tx.bytecodeLength`
*/
CreateBytecodeLength:19,"19":"CreateBytecodeLength",
/**
* Set `$rA` to `tx.bytecodeWitnessIndex`
*/
CreateBytecodeWitnessIndex:20,"20":"CreateBytecodeWitnessIndex",
/**
* Set `$rA` to `tx.storageSlotsCount`
*/
CreateStorageSlotsCount:21,"21":"CreateStorageSlotsCount",
/**
* Set `$rA` to `tx.inputsCount`
*/
CreateInputsCount:22,"22":"CreateInputsCount",
/**
* Set `$rA` to `tx.outputsCount`
*/
CreateOutputsCount:23,"23":"CreateOutputsCount",
/**
* Set `$rA` to `tx.witnessesCount`
*/
CreateWitnessesCount:24,"24":"CreateWitnessesCount",
/**
* Set `$rA` to `Memory address of tx.salt`
*/
CreateSalt:25,"25":"CreateSalt",
/**
* Set `$rA` to `Memory address of tx.storageSlots[$rB]`
*/
CreateStorageSlotAtIndex:26,"26":"CreateStorageSlotAtIndex",
/**
* Set `$rA` to `Memory address of tx.inputs[$rB]`
*/
CreateInputAtIndex:27,"27":"CreateInputAtIndex",
/**
* Set `$rA` to `Memory address of t.outputs[$rB]`
*/
CreateOutputAtIndex:28,"28":"CreateOutputAtIndex",
/**
* Set `$rA` to `Memory address of tx.witnesses[$rB]`
*/
CreateWitnessAtIndex:29,"29":"CreateWitnessAtIndex",
/**
* Set `$rA` to `tx.inputs[$rB].type`
*/
InputType:257,"257":"InputType",
/**
* Set `$rA` to `Memory address of tx.inputs[$rB].txID`
*/
InputCoinTxId:258,"258":"InputCoinTxId",
/**
* Set `$rA` to `tx.inputs[$rB].outputIndex`
*/
InputCoinOutputIndex:259,"259":"InputCoinOutputIndex",
/**
* Set `$rA` to `Memory address of tx.inputs[$rB].owner`
*/
InputCoinOwner:260,"260":"InputCoinOwner",
/**
* Set `$rA` to `tx.inputs[$rB].amount`
*/
InputCoinAmount:261,"261":"InputCoinAmount",
/**
* Set `$rA` to `Memory address of tx.inputs[$rB].asset_id`
*/
InputCoinAssetId:262,"262":"InputCoinAssetId",
/**
* Set `$rA` to `Memory address of tx.inputs[$rB].txPointer`
*/
InputCoinTxPointer:263,"263":"InputCoinTxPointer",
/**
* Set `$rA` to `tx.inputs[$rB].witnessIndex`
*/
InputCoinWitnessIndex:264,"264":"InputCoinWitnessIndex",
/**
* Set `$rA` to `tx.inputs[$rB].maturity`
*/
InputCoinMaturity:265,"265":"InputCoinMaturity",
/**
* Set `$rA` to `tx.inputs[$rB].predicateLength`
*/
InputCoinPredicateLength:266,"266":"InputCoinPredicateLength",
/**
* Set `$rA` to `tx.inputs[$rB].predicateDataLength`
*/
InputCoinPredicateDataLength:267,"267":"InputCoinPredicateDataLength",
/**
* Set `$rA` to `Memory address of tx.inputs[$rB].predicate`
*/
InputCoinPredicate:268,"268":"InputCoinPredicate",
/**
* Set `$rA` to `Memory address of tx.inputs[$rB].predicateData`
*/
InputCoinPredicateData:269,"269":"InputCoinPredicateData",
/**
* Set `$rA` to `Memory address of tx.inputs[$rB].predicateGasUsed`
*/
InputCoinPredicateGasUsed:270,"270":"InputCoinPredicateGasUsed",
/**
* Set `$rA` to `Memory address of tx.inputs[$rB].txID`
*/
InputContractTxId:271,"271":"InputContractTxId",
/**
* Set `$rA` to `tx.inputs[$rB].outputIndex`
*/
InputContractOutputIndex:272,"272":"InputContractOutputIndex",
/**
* Set `$rA` to `Memory address of tx.inputs[$rB].balanceRoot`
*/
InputContractBalanceRoot:273,"273":"InputContractBalanceRoot",
/**
* Set `$rA` to `Memory address of tx.inputs[$rB].stateRoot`
*/
InputContractStateRoot:274,"274":"InputContractStateRoot",
/**
* Set `$rA` to `Memory address of tx.inputs[$rB].txPointer`
*/
InputContractTxPointer:275,"275":"InputContractTxPointer",
/**
* Set `$rA` to `Memory address of tx.inputs[$rB].contractID`
*/
InputContractId:276,"276":"InputContractId",
/**
* Set `$rA` to `Memory address of tx.inputs[$rB].sender`
*/
InputMessageSender:277,"277":"InputMessageSender",
/**
* Set `$rA` to `Memory address of tx.inputs[$rB].recipient`
*/
InputMessageRecipient:278,"278":"InputMessageRecipient",
/**
* Set `$rA` to `tx.inputs[$rB].amount`
*/
InputMessageAmount:279,"279":"InputMessageAmount",
/**
* Set `$rA` to `Memory address of tx.inputs[$rB].nonce`
*/
InputMessageNonce:280,"280":"InputMessageNonce",
/**
* Set `$rA` to `tx.inputs[$rB].witnessIndex`
*/
InputMessageWitnessIndex:281,"281":"InputMessageWitnessIndex",
/**
* Set `$rA` to `tx.inputs[$rB].dataLength`
*/
InputMessageDataLength:282,"282":"InputMessageDataLength",
/**
* Set `$rA` to `tx.inputs[$rB].predicateLength`
*/
InputMessagePredicateLength:283,"283":"InputMessagePredicateLength",
/**
* Set `$rA` to `tx.inputs[$rB].predicateDataLength`
*/
InputMessagePredicateDataLength:284,"284":"InputMessagePredicateDataLength",
/**
* Set `$rA` to `Memory address of tx.inputs[$rB].data`
*/
InputMessageData:285,"285":"InputMessageData",
/**
* Set `$rA` to `Memory address of tx.inputs[$rB].predicate`
*/
InputMessagePredicate:286,"286":"InputMessagePredicate",
/**
* Set `$rA` to `Memory address of tx.inputs[$rB].predicateData`
*/
InputMessagePredicateData:287,"287":"InputMessagePredicateData",
/**
* Set `$rA` to `Memory address of tx.inputs[$rB].predicateGasUsed`
*/
InputMessagePredicateGasUsed:288,"288":"InputMessagePredicateGasUsed",
/**
* Set `$rA` to `tx.outputs[$rB].type`
*/
OutputType:513,"513":"OutputType",
/**
* Set `$rA` to `Memory address of tx.outputs[$rB].to`
*/
OutputCoinTo:514,"514":"OutputCoinTo",
/**
* Set `$rA` to `tx.outputs[$rB].amount`
*/
OutputCoinAmount:515,"515":"OutputCoinAmount",
/**
* Set `$rA` to `Memory address of tx.outputs[$rB].asset_id`
*/
OutputCoinAssetId:516,"516":"OutputCoinAssetId",
/**
* Set `$rA` to `tx.outputs[$rB].inputIndex`
*/
OutputContractInputIndex:517,"517":"OutputContractInputIndex",
/**
* Set `$rA` to `Memory address of tx.outputs[$rB].balanceRoot`
*/
OutputContractBalanceRoot:518,"518":"OutputContractBalanceRoot",
/**
* Set `$rA` to `Memory address of tx.outputs[$rB].stateRoot`
*/
OutputContractStateRoot:519,"519":"OutputContractStateRoot",
/**
* Set `$rA` to `Memory address of tx.outputs[$rB].contractID`
*/
OutputContractCreatedContractId:520,"520":"OutputContractCreatedContractId",
/**
* Set `$rA` to `Memory address of tx.outputs[$rB].stateRoot`
*/
OutputContractCreatedStateRoot:521,"521":"OutputContractCreatedStateRoot",
/**
* Set `$rA` to `tx.witnesses[$rB].dataLength`
*/
WitnessDataLength:769,"769":"WitnessDataLength",
/**
* Set `$rA` to `Memory address of tx.witnesses[$rB].data`
*/
WitnessData:770,"770":"WitnessData", });
/**
* Panic reason representation for the interpreter.
*/
module.exports.PanicReason = Object.freeze({
/**
* The byte can't be mapped to any known `PanicReason`.
*/
UnknownPanicReason:0,"0":"UnknownPanicReason",
/**
* Found `RVRT` instruction.
*/
Revert:1,"1":"Revert",
/**
* Execution ran out of gas.
*/
OutOfGas:2,"2":"OutOfGas",
/**
* The transaction validity is violated.
*/
TransactionValidity:3,"3":"TransactionValidity",
/**
* Attempt to write outside interpreter memory boundaries.
*/
MemoryOverflow:4,"4":"MemoryOverflow",
/**
* Overflow while executing arithmetic operation.
* These errors are ignored using the WRAPPING flag.
*/
ArithmeticOverflow:5,"5":"ArithmeticOverflow",
/**
* Designed contract was not found in the storage.
*/
ContractNotFound:6,"6":"ContractNotFound",
/**
* Memory ownership rules are violated.
*/
MemoryOwnership:7,"7":"MemoryOwnership",
/**
* The asset ID balance isn't enough for the instruction.
*/
NotEnoughBalance:8,"8":"NotEnoughBalance",
/**
* The interpreter is expected to be in internal context.
*/
ExpectedInternalContext:9,"9":"ExpectedInternalContext",
/**
* The queried asset ID was not found in the state.
*/
AssetIdNotFound:10,"10":"AssetIdNotFound",
/**
* The provided input is not found in the transaction.
*/
InputNotFound:11,"11":"InputNotFound",
/**
* The provided output is not found in the transaction.
*/
OutputNotFound:12,"12":"OutputNotFound",
/**
* The provided witness is not found in the transaction.
*/
WitnessNotFound:13,"13":"WitnessNotFound",
/**
* The transaction maturity is not valid for this request.
*/
TransactionMaturity:14,"14":"TransactionMaturity",
/**
* The metadata identifier is invalid.
*/
InvalidMetadataIdentifier:15,"15":"InvalidMetadataIdentifier",
/**
* The call structure is not valid.
*/
MalformedCallStructure:16,"16":"MalformedCallStructure",
/**
* The provided register does not allow write operations.
*/
ReservedRegisterNotWritable:17,"17":"ReservedRegisterNotWritable",
/**
* The execution resulted in an erroneous state of the interpreter.
*/
ErrorFlag:18,"18":"ErrorFlag",
/**
* The provided immediate value is not valid for this instruction.
*/
InvalidImmediateValue:19,"19":"InvalidImmediateValue",
/**
* The provided transaction input is not of type `Coin`.
*/
ExpectedCoinInput:20,"20":"ExpectedCoinInput",
/**
* The requested memory access exceeds the limits of the interpreter.
*/
MaxMemoryAccess:21,"21":"MaxMemoryAccess",
/**
* Two segments of the interpreter memory should not intersect for write operations.
*/
MemoryWriteOverlap:22,"22":"MemoryWriteOverlap",
/**
* The requested contract is not listed in the transaction inputs.
*/
ContractNotInInputs:23,"23":"ContractNotInInputs",
/**
* The internal asset ID balance overflowed with the provided instruction.
*/
InternalBalanceOverflow:24,"24":"InternalBalanceOverflow",
/**
* The maximum allowed contract size is violated.
*/
ContractMaxSize:25,"25":"ContractMaxSize",
/**
* This instruction expects the stack area to be unallocated for this call.
*/
ExpectedUnallocatedStack:26,"26":"ExpectedUnallocatedStack",
/**
* The maximum allowed number of static contracts was reached for this transaction.
*/
MaxStaticContractsReached:27,"27":"MaxStaticContractsReached",
/**
* The requested transfer amount cannot be zero.
*/
TransferAmountCannotBeZero:28,"28":"TransferAmountCannotBeZero",
/**
* The provided transaction output should be of type `Variable`.
*/
ExpectedOutputVariable:29,"29":"ExpectedOutputVariable",
/**
* The expected context of the stack parent is internal.
*/
ExpectedParentInternalContext:30,"30":"ExpectedParentInternalContext",
/**
* The jump instruction cannot move backwards in predicate verification.
*/
IllegalJump:31,"31":"IllegalJump",
/**
* The contract ID is already deployed and can't be overwritten.
*/
ContractIdAlreadyDeployed:32,"32":"ContractIdAlreadyDeployed",
/**
* The loaded contract mismatch expectations.
*/
ContractMismatch:33,"33":"ContractMismatch",
/**
* Attempting to send message data longer than `MAX_MESSAGE_DATA_LENGTH`
*/
MessageDataTooLong:34,"34":"MessageDataTooLong",
/**
* Mathimatically invalid arguments where given to an arithmetic instruction.
* For instance, division by zero produces this.
* These errors are ignored using the UNSAFEMATH flag.
*/
ArithmeticError:35,"35":"ArithmeticError",
/**
* The contract instruction is not allowed in predicates.
*/
ContractInstructionNotAllowed:36,"36":"ContractInstructionNotAllowed", });
/**
*Adds two registers.
*/
class ADD {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(ADD.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_add_free(ptr);
    }
    /**
    * Construct the instruction from its parts.
    * @param {RegId} dst
    * @param {RegId} lhs
    * @param {RegId} rhs
    */
    constructor(dst, lhs, rhs) {
        _assertClass(dst, RegId);
        var ptr0 = dst.__destroy_into_raw();
        _assertClass(lhs, RegId);
        var ptr1 = lhs.__destroy_into_raw();
        _assertClass(rhs, RegId);
        var ptr2 = rhs.__destroy_into_raw();
        const ret = wasm.add_new(ptr0, ptr1, ptr2);
        return ADD.__wrap(ret);
    }
    /**
    * Access the ID for register A.
    * @returns {RegId}
    */
    ra() {
        const ret = wasm.add_ra(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register B.
    * @returns {RegId}
    */
    rb() {
        const ret = wasm.add_rb(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register C.
    * @returns {RegId}
    */
    rc() {
        const ret = wasm.add_rc(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
}
module.exports.ADD = ADD;
/**
*Adds a register and an immediate value.
*/
class ADDI {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(ADDI.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_addi_free(ptr);
    }
    /**
    * Construct the instruction from its parts.
    * @param {RegId} dst
    * @param {RegId} lhs
    * @param {Imm12} rhs
    */
    constructor(dst, lhs, rhs) {
        _assertClass(dst, RegId);
        var ptr0 = dst.__destroy_into_raw();
        _assertClass(lhs, RegId);
        var ptr1 = lhs.__destroy_into_raw();
        _assertClass(rhs, Imm12);
        var ptr2 = rhs.__destroy_into_raw();
        const ret = wasm.addi_new(ptr0, ptr1, ptr2);
        return ADDI.__wrap(ret);
    }
    /**
    * Access the ID for register A.
    * @returns {RegId}
    */
    ra() {
        const ret = wasm.add_ra(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register B.
    * @returns {RegId}
    */
    rb() {
        const ret = wasm.add_rb(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the 12-bit immediate value.
    * @returns {Imm12}
    */
    imm12() {
        const ret = wasm.addi_imm12(this.__wbg_ptr);
        return Imm12.__wrap(ret);
    }
}
module.exports.ADDI = ADDI;
/**
*Allocate a number of bytes from the heap.
*/
class ALOC {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(ALOC.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_aloc_free(ptr);
    }
    /**
    * Construct the instruction from its parts.
    * @param {RegId} bytes
    */
    constructor(bytes) {
        _assertClass(bytes, RegId);
        var ptr0 = bytes.__destroy_into_raw();
        const ret = wasm.aloc_new(ptr0);
        return ALOC.__wrap(ret);
    }
    /**
    * Access the ID for register A.
    * @returns {RegId}
    */
    ra() {
        const ret = wasm.add_ra(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
}
module.exports.ALOC = ALOC;
/**
*Bitwise ANDs two registers.
*/
class AND {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(AND.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_and_free(ptr);
    }
    /**
    * Construct the instruction from its parts.
    * @param {RegId} dst
    * @param {RegId} lhs
    * @param {RegId} rhs
    */
    constructor(dst, lhs, rhs) {
        _assertClass(dst, RegId);
        var ptr0 = dst.__destroy_into_raw();
        _assertClass(lhs, RegId);
        var ptr1 = lhs.__destroy_into_raw();
        _assertClass(rhs, RegId);
        var ptr2 = rhs.__destroy_into_raw();
        const ret = wasm.add_new(ptr0, ptr1, ptr2);
        return AND.__wrap(ret);
    }
    /**
    * Access the ID for register A.
    * @returns {RegId}
    */
    ra() {
        const ret = wasm.add_ra(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register B.
    * @returns {RegId}
    */
    rb() {
        const ret = wasm.add_rb(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register C.
    * @returns {RegId}
    */
    rc() {
        const ret = wasm.add_rc(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
}
module.exports.AND = AND;
/**
*Bitwise ANDs a register and an immediate value.
*/
class ANDI {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(ANDI.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_andi_free(ptr);
    }
    /**
    * Construct the instruction from its parts.
    * @param {RegId} dst
    * @param {RegId} lhs
    * @param {Imm12} rhs
    */
    constructor(dst, lhs, rhs) {
        _assertClass(dst, RegId);
        var ptr0 = dst.__destroy_into_raw();
        _assertClass(lhs, RegId);
        var ptr1 = lhs.__destroy_into_raw();
        _assertClass(rhs, Imm12);
        var ptr2 = rhs.__destroy_into_raw();
        const ret = wasm.addi_new(ptr0, ptr1, ptr2);
        return ANDI.__wrap(ret);
    }
    /**
    * Access the ID for register A.
    * @returns {RegId}
    */
    ra() {
        const ret = wasm.add_ra(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register B.
    * @returns {RegId}
    */
    rb() {
        const ret = wasm.add_rb(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the 12-bit immediate value.
    * @returns {Imm12}
    */
    imm12() {
        const ret = wasm.addi_imm12(this.__wbg_ptr);
        return Imm12.__wrap(ret);
    }
}
module.exports.ANDI = ANDI;
/**
* FuelVM atomic array type.
*/
class Address {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Address.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_address_free(ptr);
    }
    /**
    * Bytes constructor.
    * @param {Uint8Array} bytes
    * @returns {Address}
    */
    static from_bytes(bytes) {
        const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.address_from_bytes(ptr0, len0);
        return Address.__wrap(ret);
    }
    /**
    * Zeroes bytes constructor.
    * @returns {Address}
    */
    static zeroed() {
        const ret = wasm.address_zeroed();
        return Address.__wrap(ret);
    }
    /**
    * The memory size of the type by the method.
    * @returns {number}
    */
    size() {
        const ret = wasm.address_size(this.__wbg_ptr);
        return ret >>> 0;
    }
}
module.exports.Address = Address;
/**
* FuelVM atomic array type.
*/
class AssetId {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(AssetId.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_assetid_free(ptr);
    }
    /**
    * Bytes constructor.
    * @param {Uint8Array} bytes
    * @returns {AssetId}
    */
    static from_bytes(bytes) {
        const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.assetid_from_bytes(ptr0, len0);
        return AssetId.__wrap(ret);
    }
    /**
    * Zeroes bytes constructor.
    * @returns {AssetId}
    */
    static zeroed() {
        const ret = wasm.address_zeroed();
        return AssetId.__wrap(ret);
    }
    /**
    * The memory size of the type by the method.
    * @returns {number}
    */
    size() {
        const ret = wasm.address_size(this.__wbg_ptr);
        return ret >>> 0;
    }
}
module.exports.AssetId = AssetId;
/**
*Get the balance of contract of an asset ID.
*/
class BAL {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(BAL.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_bal_free(ptr);
    }
    /**
    * Construct the instruction from its parts.
    * @param {RegId} dst
    * @param {RegId} asset_id_addr
    * @param {RegId} contract_id_addr
    */
    constructor(dst, asset_id_addr, contract_id_addr) {
        _assertClass(dst, RegId);
        var ptr0 = dst.__destroy_into_raw();
        _assertClass(asset_id_addr, RegId);
        var ptr1 = asset_id_addr.__destroy_into_raw();
        _assertClass(contract_id_addr, RegId);
        var ptr2 = contract_id_addr.__destroy_into_raw();
        const ret = wasm.add_new(ptr0, ptr1, ptr2);
        return BAL.__wrap(ret);
    }
    /**
    * Access the ID for register A.
    * @returns {RegId}
    */
    ra() {
        const ret = wasm.add_ra(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register B.
    * @returns {RegId}
    */
    rb() {
        const ret = wasm.add_rb(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register C.
    * @returns {RegId}
    */
    rc() {
        const ret = wasm.add_rc(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
}
module.exports.BAL = BAL;
/**
*Get current block height.
*/
class BHEI {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(BHEI.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_bhei_free(ptr);
    }
    /**
    * Construct the instruction from its parts.
    * @param {RegId} dst
    */
    constructor(dst) {
        _assertClass(dst, RegId);
        var ptr0 = dst.__destroy_into_raw();
        const ret = wasm.aloc_new(ptr0);
        return BHEI.__wrap(ret);
    }
    /**
    * Access the ID for register A.
    * @returns {RegId}
    */
    ra() {
        const ret = wasm.add_ra(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
}
module.exports.BHEI = BHEI;
/**
*Get block header hash for height.
*/
class BHSH {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(BHSH.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_bhsh_free(ptr);
    }
    /**
    * Construct the instruction from its parts.
    * @param {RegId} dst
    * @param {RegId} heigth
    */
    constructor(dst, heigth) {
        _assertClass(dst, RegId);
        var ptr0 = dst.__destroy_into_raw();
        _assertClass(heigth, RegId);
        var ptr1 = heigth.__destroy_into_raw();
        const ret = wasm.bhsh_new(ptr0, ptr1);
        return BHSH.__wrap(ret);
    }
    /**
    * Access the ID for register A.
    * @returns {RegId}
    */
    ra() {
        const ret = wasm.add_ra(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register B.
    * @returns {RegId}
    */
    rb() {
        const ret = wasm.add_rb(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
}
module.exports.BHSH = BHSH;
/**
*Burn coins of the current contract's asset ID.
*/
class BURN {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(BURN.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_burn_free(ptr);
    }
    /**
    * Construct the instruction from its parts.
    * @param {RegId} count
    */
    constructor(count) {
        _assertClass(count, RegId);
        var ptr0 = count.__destroy_into_raw();
        const ret = wasm.aloc_new(ptr0);
        return BURN.__wrap(ret);
    }
    /**
    * Access the ID for register A.
    * @returns {RegId}
    */
    ra() {
        const ret = wasm.add_ra(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
}
module.exports.BURN = BURN;
/**
* FuelVM atomic numeric type.
*/
class BlockHeight {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(BlockHeight.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_blockheight_free(ptr);
    }
    /**
    * Number constructor.
    * @param {number} number
    */
    constructor(number) {
        const ret = wasm.blockheight_from_number(number);
        return BlockHeight.__wrap(ret);
    }
    /**
    * Convert to array of big endian bytes.
    * @returns {Uint8Array}
    */
    to_bytes() {
        try {
            const ptr = this.__destroy_into_raw();
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.blockheight_to_bytes(retptr, ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * Convert to usize.
    * @returns {number}
    */
    as_usize() {
        const ret = wasm.blockheight_as_usize(this.__wbg_ptr);
        return ret >>> 0;
    }
}
module.exports.BlockHeight = BlockHeight;
/**
* FuelVM atomic array type.
*/
class Bytes20 {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Bytes20.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_bytes20_free(ptr);
    }
    /**
    * Bytes constructor.
    * @param {Uint8Array} bytes
    * @returns {Bytes20}
    */
    static from_bytes(bytes) {
        const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.bytes20_from_bytes(ptr0, len0);
        return Bytes20.__wrap(ret);
    }
    /**
    * Zeroes bytes constructor.
    * @returns {Bytes20}
    */
    static zeroed() {
        const ret = wasm.bytes20_zeroed();
        return Bytes20.__wrap(ret);
    }
    /**
    * The memory size of the type by the method.
    * @returns {number}
    */
    size() {
        const ret = wasm.bytes20_size(this.__wbg_ptr);
        return ret >>> 0;
    }
}
module.exports.Bytes20 = Bytes20;
/**
* FuelVM atomic array type.
*/
class Bytes32 {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Bytes32.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_bytes32_free(ptr);
    }
    /**
    * Bytes constructor.
    * @param {Uint8Array} bytes
    * @returns {Bytes32}
    */
    static from_bytes(bytes) {
        const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.bytes32_from_bytes(ptr0, len0);
        return Bytes32.__wrap(ret);
    }
    /**
    * Zeroes bytes constructor.
    * @returns {Bytes32}
    */
    static zeroed() {
        const ret = wasm.address_zeroed();
        return Bytes32.__wrap(ret);
    }
    /**
    * The memory size of the type by the method.
    * @returns {number}
    */
    size() {
        const ret = wasm.address_size(this.__wbg_ptr);
        return ret >>> 0;
    }
}
module.exports.Bytes32 = Bytes32;
/**
* FuelVM atomic array type.
*/
class Bytes4 {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Bytes4.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_bytes4_free(ptr);
    }
    /**
    * Bytes constructor.
    * @param {Uint8Array} bytes
    * @returns {Bytes4}
    */
    static from_bytes(bytes) {
        const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.bytes4_from_bytes(ptr0, len0);
        return Bytes4.__wrap(ret);
    }
    /**
    * Zeroes bytes constructor.
    * @returns {Bytes4}
    */
    static zeroed() {
        const ret = wasm.bytes4_zeroed();
        return Bytes4.__wrap(ret);
    }
    /**
    * The memory size of the type by the method.
    * @returns {number}
    */
    size() {
        const ret = wasm.bytes4_size(this.__wbg_ptr);
        return ret >>> 0;
    }
}
module.exports.Bytes4 = Bytes4;
/**
* FuelVM atomic type.
*/
class Bytes64 {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Bytes64.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_bytes64_free(ptr);
    }
    /**
    * Bytes constructor.
    * @param {Uint8Array} bytes
    * @returns {Bytes64}
    */
    static from_bytes(bytes) {
        const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.bytes64_from_bytes(ptr0, len0);
        return Bytes64.__wrap(ret);
    }
    /**
    * Zeroes bytes constructor.
    * @returns {Bytes64}
    */
    static zeroed() {
        const ret = wasm.bytes64_zeroed();
        return Bytes64.__wrap(ret);
    }
    /**
    * The memory size of the type by the method.
    * @returns {number}
    */
    size() {
        const ret = wasm.bytes64_size(this.__wbg_ptr);
        return ret >>> 0;
    }
}
module.exports.Bytes64 = Bytes64;
/**
* FuelVM atomic array type.
*/
class Bytes8 {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Bytes8.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_bytes8_free(ptr);
    }
    /**
    * Bytes constructor.
    * @param {Uint8Array} bytes
    * @returns {Bytes8}
    */
    static from_bytes(bytes) {
        const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.bytes8_from_bytes(ptr0, len0);
        return Bytes8.__wrap(ret);
    }
    /**
    * Zeroes bytes constructor.
    * @returns {Bytes8}
    */
    static zeroed() {
        const ret = wasm.bytes8_zeroed();
        return Bytes8.__wrap(ret);
    }
    /**
    * The memory size of the type by the method.
    * @returns {number}
    */
    size() {
        const ret = wasm.bytes8_size(this.__wbg_ptr);
        return ret >>> 0;
    }
}
module.exports.Bytes8 = Bytes8;
/**
*Call a contract.
*/
class CALL {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(CALL.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_call_free(ptr);
    }
    /**
    * Construct the instruction from its parts.
    * @param {RegId} target_struct
    * @param {RegId} fwd_coins
    * @param {RegId} asset_id_addr
    * @param {RegId} fwd_gas
    */
    constructor(target_struct, fwd_coins, asset_id_addr, fwd_gas) {
        _assertClass(target_struct, RegId);
        var ptr0 = target_struct.__destroy_into_raw();
        _assertClass(fwd_coins, RegId);
        var ptr1 = fwd_coins.__destroy_into_raw();
        _assertClass(asset_id_addr, RegId);
        var ptr2 = asset_id_addr.__destroy_into_raw();
        _assertClass(fwd_gas, RegId);
        var ptr3 = fwd_gas.__destroy_into_raw();
        const ret = wasm.call_new(ptr0, ptr1, ptr2, ptr3);
        return CALL.__wrap(ret);
    }
    /**
    * Access the ID for register A.
    * @returns {RegId}
    */
    ra() {
        const ret = wasm.add_ra(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register B.
    * @returns {RegId}
    */
    rb() {
        const ret = wasm.add_rb(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register C.
    * @returns {RegId}
    */
    rc() {
        const ret = wasm.add_rc(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register D.
    * @returns {RegId}
    */
    rd() {
        const ret = wasm.call_rd(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
}
module.exports.CALL = CALL;
/**
*Get current block proposer's address.
*/
class CB {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(CB.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_cb_free(ptr);
    }
    /**
    * Construct the instruction from its parts.
    * @param {RegId} dst
    */
    constructor(dst) {
        _assertClass(dst, RegId);
        var ptr0 = dst.__destroy_into_raw();
        const ret = wasm.aloc_new(ptr0);
        return CB.__wrap(ret);
    }
    /**
    * Access the ID for register A.
    * @returns {RegId}
    */
    ra() {
        const ret = wasm.add_ra(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
}
module.exports.CB = CB;
/**
*Copy contract code for a contract.
*/
class CCP {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(CCP.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_ccp_free(ptr);
    }
    /**
    * Construct the instruction from its parts.
    * @param {RegId} dst_addr
    * @param {RegId} contract_id_addr
    * @param {RegId} offset
    * @param {RegId} len
    */
    constructor(dst_addr, contract_id_addr, offset, len) {
        _assertClass(dst_addr, RegId);
        var ptr0 = dst_addr.__destroy_into_raw();
        _assertClass(contract_id_addr, RegId);
        var ptr1 = contract_id_addr.__destroy_into_raw();
        _assertClass(offset, RegId);
        var ptr2 = offset.__destroy_into_raw();
        _assertClass(len, RegId);
        var ptr3 = len.__destroy_into_raw();
        const ret = wasm.call_new(ptr0, ptr1, ptr2, ptr3);
        return CCP.__wrap(ret);
    }
    /**
    * Access the ID for register A.
    * @returns {RegId}
    */
    ra() {
        const ret = wasm.add_ra(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register B.
    * @returns {RegId}
    */
    rb() {
        const ret = wasm.add_rb(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register C.
    * @returns {RegId}
    */
    rc() {
        const ret = wasm.add_rc(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register D.
    * @returns {RegId}
    */
    rd() {
        const ret = wasm.call_rd(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
}
module.exports.CCP = CCP;
/**
*Extend the current call frame's stack
*/
class CFE {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(CFE.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_cfe_free(ptr);
    }
    /**
    * Construct the instruction from its parts.
    * @param {RegId} amount
    */
    constructor(amount) {
        _assertClass(amount, RegId);
        var ptr0 = amount.__destroy_into_raw();
        const ret = wasm.aloc_new(ptr0);
        return CFE.__wrap(ret);
    }
    /**
    * Access the ID for register A.
    * @returns {RegId}
    */
    ra() {
        const ret = wasm.add_ra(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
}
module.exports.CFE = CFE;
/**
*Extend the current call frame's stack by an immediate value.
*/
class CFEI {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(CFEI.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_cfei_free(ptr);
    }
    /**
    * Construct the instruction from its parts.
    * @param {Imm24} amount
    */
    constructor(amount) {
        _assertClass(amount, Imm24);
        var ptr0 = amount.__destroy_into_raw();
        const ret = wasm.cfei_new(ptr0);
        return CFEI.__wrap(ret);
    }
    /**
    * Access the 24-bit immediate value.
    * @returns {Imm24}
    */
    imm24() {
        const ret = wasm.cfei_imm24(this.__wbg_ptr);
        return Imm24.__wrap(ret);
    }
}
module.exports.CFEI = CFEI;
/**
*Shrink the current call frame's stack
*/
class CFS {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(CFS.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_cfs_free(ptr);
    }
    /**
    * Construct the instruction from its parts.
    * @param {RegId} amount
    */
    constructor(amount) {
        _assertClass(amount, RegId);
        var ptr0 = amount.__destroy_into_raw();
        const ret = wasm.aloc_new(ptr0);
        return CFS.__wrap(ret);
    }
    /**
    * Access the ID for register A.
    * @returns {RegId}
    */
    ra() {
        const ret = wasm.add_ra(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
}
module.exports.CFS = CFS;
/**
*Shrink the current call frame's stack by an immediate value.
*/
class CFSI {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(CFSI.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_cfsi_free(ptr);
    }
    /**
    * Construct the instruction from its parts.
    * @param {Imm24} amount
    */
    constructor(amount) {
        _assertClass(amount, Imm24);
        var ptr0 = amount.__destroy_into_raw();
        const ret = wasm.cfei_new(ptr0);
        return CFSI.__wrap(ret);
    }
    /**
    * Access the 24-bit immediate value.
    * @returns {Imm24}
    */
    imm24() {
        const ret = wasm.cfei_imm24(this.__wbg_ptr);
        return Imm24.__wrap(ret);
    }
}
module.exports.CFSI = CFSI;
/**
*Get code root of a contract.
*/
class CROO {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(CROO.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_croo_free(ptr);
    }
    /**
    * Construct the instruction from its parts.
    * @param {RegId} dst_addr
    * @param {RegId} contract_id_addr
    */
    constructor(dst_addr, contract_id_addr) {
        _assertClass(dst_addr, RegId);
        var ptr0 = dst_addr.__destroy_into_raw();
        _assertClass(contract_id_addr, RegId);
        var ptr1 = contract_id_addr.__destroy_into_raw();
        const ret = wasm.bhsh_new(ptr0, ptr1);
        return CROO.__wrap(ret);
    }
    /**
    * Access the ID for register A.
    * @returns {RegId}
    */
    ra() {
        const ret = wasm.add_ra(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register B.
    * @returns {RegId}
    */
    rb() {
        const ret = wasm.add_rb(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
}
module.exports.CROO = CROO;
/**
*Get code size of a contract.
*/
class CSIZ {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(CSIZ.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_csiz_free(ptr);
    }
    /**
    * Construct the instruction from its parts.
    * @param {RegId} dst
    * @param {RegId} contract_id_addr
    */
    constructor(dst, contract_id_addr) {
        _assertClass(dst, RegId);
        var ptr0 = dst.__destroy_into_raw();
        _assertClass(contract_id_addr, RegId);
        var ptr1 = contract_id_addr.__destroy_into_raw();
        const ret = wasm.bhsh_new(ptr0, ptr1);
        return CSIZ.__wrap(ret);
    }
    /**
    * Access the ID for register A.
    * @returns {RegId}
    */
    ra() {
        const ret = wasm.add_ra(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register B.
    * @returns {RegId}
    */
    rb() {
        const ret = wasm.add_rb(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
}
module.exports.CSIZ = CSIZ;
/**
* FuelVM atomic numeric type.
*/
class ChainId {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(ChainId.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_chainid_free(ptr);
    }
    /**
    * Number constructor.
    * @param {bigint} number
    */
    constructor(number) {
        const ret = wasm.chainid_from_number(number);
        return ChainId.__wrap(ret);
    }
    /**
    * Convert to array of big endian bytes.
    * @returns {Uint8Array}
    */
    to_bytes() {
        try {
            const ptr = this.__destroy_into_raw();
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.chainid_to_bytes(retptr, ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * Convert to usize.
    * @returns {number}
    */
    as_usize() {
        const ret = wasm.chainid_as_usize(this.__wbg_ptr);
        return ret >>> 0;
    }
}
module.exports.ChainId = ChainId;
/**
* Arguments for WDCM and WQCM instructions.
*/
class CompareArgs {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(CompareArgs.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_compareargs_free(ptr);
    }
    /**
    * Comparison mode
    * @returns {number}
    */
    get mode() {
        const ret = wasm.__wbg_get_compareargs_mode(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
    * Comparison mode
    * @param {number} arg0
    */
    set mode(arg0) {
        wasm.__wbg_set_compareargs_mode(this.__wbg_ptr, arg0);
    }
    /**
    * Load RHS from register if true, otherwise zero-extend register value
    * @returns {boolean}
    */
    get indirect_rhs() {
        const ret = wasm.__wbg_get_compareargs_indirect_rhs(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
    * Load RHS from register if true, otherwise zero-extend register value
    * @param {boolean} arg0
    */
    set indirect_rhs(arg0) {
        wasm.__wbg_set_compareargs_indirect_rhs(this.__wbg_ptr, arg0);
    }
    /**
    * Convert to immediate value.
    * @returns {Imm06}
    */
    to_imm() {
        const ptr = this.__destroy_into_raw();
        const ret = wasm.compareargs_to_imm(ptr);
        return Imm06.__wrap(ret);
    }
    /**
    * Construct from `Imm06`. Returns `None` if the value has reserved flags set.
    * @param {Imm06} bits
    * @returns {CompareArgs | undefined}
    */
    static from_imm(bits) {
        _assertClass(bits, Imm06);
        var ptr0 = bits.__destroy_into_raw();
        const ret = wasm.compareargs_from_imm(ptr0);
        return ret === 0 ? undefined : CompareArgs.__wrap(ret);
    }
}
module.exports.CompareArgs = CompareArgs;
/**
* FuelVM atomic array type.
*/
class ContractId {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(ContractId.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_contractid_free(ptr);
    }
    /**
    * Bytes constructor.
    * @param {Uint8Array} bytes
    * @returns {ContractId}
    */
    static from_bytes(bytes) {
        const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.contractid_from_bytes(ptr0, len0);
        return ContractId.__wrap(ret);
    }
    /**
    * Zeroes bytes constructor.
    * @returns {ContractId}
    */
    static zeroed() {
        const ret = wasm.address_zeroed();
        return ContractId.__wrap(ret);
    }
    /**
    * The memory size of the type by the method.
    * @returns {number}
    */
    size() {
        const ret = wasm.address_size(this.__wbg_ptr);
        return ret >>> 0;
    }
}
module.exports.ContractId = ContractId;
/**
*Divides two registers.
*/
class DIV {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(DIV.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_div_free(ptr);
    }
    /**
    * Construct the instruction from its parts.
    * @param {RegId} dst
    * @param {RegId} lhs
    * @param {RegId} rhs
    */
    constructor(dst, lhs, rhs) {
        _assertClass(dst, RegId);
        var ptr0 = dst.__destroy_into_raw();
        _assertClass(lhs, RegId);
        var ptr1 = lhs.__destroy_into_raw();
        _assertClass(rhs, RegId);
        var ptr2 = rhs.__destroy_into_raw();
        const ret = wasm.add_new(ptr0, ptr1, ptr2);
        return DIV.__wrap(ret);
    }
    /**
    * Access the ID for register A.
    * @returns {RegId}
    */
    ra() {
        const ret = wasm.add_ra(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register B.
    * @returns {RegId}
    */
    rb() {
        const ret = wasm.add_rb(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register C.
    * @returns {RegId}
    */
    rc() {
        const ret = wasm.add_rc(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
}
module.exports.DIV = DIV;
/**
*Divides a register and an immediate value.
*/
class DIVI {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(DIVI.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_divi_free(ptr);
    }
    /**
    * Construct the instruction from its parts.
    * @param {RegId} dst
    * @param {RegId} lhs
    * @param {Imm12} rhs
    */
    constructor(dst, lhs, rhs) {
        _assertClass(dst, RegId);
        var ptr0 = dst.__destroy_into_raw();
        _assertClass(lhs, RegId);
        var ptr1 = lhs.__destroy_into_raw();
        _assertClass(rhs, Imm12);
        var ptr2 = rhs.__destroy_into_raw();
        const ret = wasm.addi_new(ptr0, ptr1, ptr2);
        return DIVI.__wrap(ret);
    }
    /**
    * Access the ID for register A.
    * @returns {RegId}
    */
    ra() {
        const ret = wasm.add_ra(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register B.
    * @returns {RegId}
    */
    rb() {
        const ret = wasm.add_rb(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the 12-bit immediate value.
    * @returns {Imm12}
    */
    imm12() {
        const ret = wasm.addi_imm12(this.__wbg_ptr);
        return Imm12.__wrap(ret);
    }
}
module.exports.DIVI = DIVI;
/**
* Additional arguments for WMDV and WDDV instructions.
*/
class DivArgs {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_divargs_free(ptr);
    }
    /**
    * Load RHS from register if true, otherwise zero-extend register value
    * @returns {boolean}
    */
    get indirect_rhs() {
        const ret = wasm.__wbg_get_divargs_indirect_rhs(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
    * Load RHS from register if true, otherwise zero-extend register value
    * @param {boolean} arg0
    */
    set indirect_rhs(arg0) {
        wasm.__wbg_set_divargs_indirect_rhs(this.__wbg_ptr, arg0);
    }
}
module.exports.DivArgs = DivArgs;
/**
*The 64-byte public key (x, y) recovered from 64-byte signature on 32-byte message.
*/
class ECR {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(ECR.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_ecr_free(ptr);
    }
    /**
    * Construct the instruction from its parts.
    * @param {RegId} dst_addr
    * @param {RegId} sig_addr
    * @param {RegId} msg_hash_addr
    */
    constructor(dst_addr, sig_addr, msg_hash_addr) {
        _assertClass(dst_addr, RegId);
        var ptr0 = dst_addr.__destroy_into_raw();
        _assertClass(sig_addr, RegId);
        var ptr1 = sig_addr.__destroy_into_raw();
        _assertClass(msg_hash_addr, RegId);
        var ptr2 = msg_hash_addr.__destroy_into_raw();
        const ret = wasm.add_new(ptr0, ptr1, ptr2);
        return ECR.__wrap(ret);
    }
    /**
    * Access the ID for register A.
    * @returns {RegId}
    */
    ra() {
        const ret = wasm.add_ra(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register B.
    * @returns {RegId}
    */
    rb() {
        const ret = wasm.add_rb(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register C.
    * @returns {RegId}
    */
    rc() {
        const ret = wasm.add_rc(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
}
module.exports.ECR = ECR;
/**
*Compares two registers for equality.
*/
class EQ {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(EQ.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_eq_free(ptr);
    }
    /**
    * Construct the instruction from its parts.
    * @param {RegId} dst
    * @param {RegId} lhs
    * @param {RegId} rhs
    */
    constructor(dst, lhs, rhs) {
        _assertClass(dst, RegId);
        var ptr0 = dst.__destroy_into_raw();
        _assertClass(lhs, RegId);
        var ptr1 = lhs.__destroy_into_raw();
        _assertClass(rhs, RegId);
        var ptr2 = rhs.__destroy_into_raw();
        const ret = wasm.add_new(ptr0, ptr1, ptr2);
        return EQ.__wrap(ret);
    }
    /**
    * Access the ID for register A.
    * @returns {RegId}
    */
    ra() {
        const ret = wasm.add_ra(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register B.
    * @returns {RegId}
    */
    rb() {
        const ret = wasm.add_rb(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register C.
    * @returns {RegId}
    */
    rc() {
        const ret = wasm.add_rc(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
}
module.exports.EQ = EQ;
/**
*Raises one register to the power of another.
*/
class EXP {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(EXP.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_exp_free(ptr);
    }
    /**
    * Construct the instruction from its parts.
    * @param {RegId} dst
    * @param {RegId} lhs
    * @param {RegId} rhs
    */
    constructor(dst, lhs, rhs) {
        _assertClass(dst, RegId);
        var ptr0 = dst.__destroy_into_raw();
        _assertClass(lhs, RegId);
        var ptr1 = lhs.__destroy_into_raw();
        _assertClass(rhs, RegId);
        var ptr2 = rhs.__destroy_into_raw();
        const ret = wasm.add_new(ptr0, ptr1, ptr2);
        return EXP.__wrap(ret);
    }
    /**
    * Access the ID for register A.
    * @returns {RegId}
    */
    ra() {
        const ret = wasm.add_ra(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register B.
    * @returns {RegId}
    */
    rb() {
        const ret = wasm.add_rb(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register C.
    * @returns {RegId}
    */
    rc() {
        const ret = wasm.add_rc(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
}
module.exports.EXP = EXP;
/**
*Raises one register to the power of an immediate value.
*/
class EXPI {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(EXPI.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_expi_free(ptr);
    }
    /**
    * Construct the instruction from its parts.
    * @param {RegId} dst
    * @param {RegId} lhs
    * @param {Imm12} rhs
    */
    constructor(dst, lhs, rhs) {
        _assertClass(dst, RegId);
        var ptr0 = dst.__destroy_into_raw();
        _assertClass(lhs, RegId);
        var ptr1 = lhs.__destroy_into_raw();
        _assertClass(rhs, Imm12);
        var ptr2 = rhs.__destroy_into_raw();
        const ret = wasm.addi_new(ptr0, ptr1, ptr2);
        return EXPI.__wrap(ret);
    }
    /**
    * Access the ID for register A.
    * @returns {RegId}
    */
    ra() {
        const ret = wasm.add_ra(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register B.
    * @returns {RegId}
    */
    rb() {
        const ret = wasm.add_rb(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the 12-bit immediate value.
    * @returns {Imm12}
    */
    imm12() {
        const ret = wasm.addi_imm12(this.__wbg_ptr);
        return Imm12.__wrap(ret);
    }
}
module.exports.EXPI = EXPI;
/**
*Set flag register to a register.
*/
class FLAG {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(FLAG.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_flag_free(ptr);
    }
    /**
    * Construct the instruction from its parts.
    * @param {RegId} value
    */
    constructor(value) {
        _assertClass(value, RegId);
        var ptr0 = value.__destroy_into_raw();
        const ret = wasm.aloc_new(ptr0);
        return FLAG.__wrap(ret);
    }
    /**
    * Access the ID for register A.
    * @returns {RegId}
    */
    ra() {
        const ret = wasm.add_ra(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
}
module.exports.FLAG = FLAG;
/**
*Get metadata from memory.
*/
class GM {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(GM.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_gm_free(ptr);
    }
    /**
    * Construct the instruction from its parts.
    * @param {RegId} dst
    * @param {Imm18} selector
    */
    constructor(dst, selector) {
        _assertClass(dst, RegId);
        var ptr0 = dst.__destroy_into_raw();
        _assertClass(selector, Imm18);
        var ptr1 = selector.__destroy_into_raw();
        const ret = wasm.gm_new(ptr0, ptr1);
        return GM.__wrap(ret);
    }
    /**
    * Access the ID for register A.
    * @returns {RegId}
    */
    ra() {
        const ret = wasm.add_ra(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the 18-bit immediate value.
    * @returns {Imm18}
    */
    imm18() {
        const ret = wasm.gm_imm18(this.__wbg_ptr);
        return Imm18.__wrap(ret);
    }
    /**
    * Construct a `GM` instruction from its arguments.
    * @param {RegId} ra
    * @param {number} args
    * @returns {GM}
    */
    static from_args(ra, args) {
        _assertClass(ra, RegId);
        var ptr0 = ra.__destroy_into_raw();
        const ret = wasm.gm_from_args(ptr0, args);
        return GM.__wrap(ret);
    }
}
module.exports.GM = GM;
/**
*Compares two registers for greater-than.
*/
class GT {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(GT.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_gt_free(ptr);
    }
    /**
    * Construct the instruction from its parts.
    * @param {RegId} dst
    * @param {RegId} lhs
    * @param {RegId} rhs
    */
    constructor(dst, lhs, rhs) {
        _assertClass(dst, RegId);
        var ptr0 = dst.__destroy_into_raw();
        _assertClass(lhs, RegId);
        var ptr1 = lhs.__destroy_into_raw();
        _assertClass(rhs, RegId);
        var ptr2 = rhs.__destroy_into_raw();
        const ret = wasm.add_new(ptr0, ptr1, ptr2);
        return GT.__wrap(ret);
    }
    /**
    * Access the ID for register A.
    * @returns {RegId}
    */
    ra() {
        const ret = wasm.add_ra(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register B.
    * @returns {RegId}
    */
    rb() {
        const ret = wasm.add_rb(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register C.
    * @returns {RegId}
    */
    rc() {
        const ret = wasm.add_rc(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
}
module.exports.GT = GT;
/**
*Get transaction fields.
*/
class GTF {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(GTF.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_gtf_free(ptr);
    }
    /**
    * Construct the instruction from its parts.
    * @param {RegId} dst
    * @param {RegId} arg
    * @param {Imm12} selector
    */
    constructor(dst, arg, selector) {
        _assertClass(dst, RegId);
        var ptr0 = dst.__destroy_into_raw();
        _assertClass(arg, RegId);
        var ptr1 = arg.__destroy_into_raw();
        _assertClass(selector, Imm12);
        var ptr2 = selector.__destroy_into_raw();
        const ret = wasm.addi_new(ptr0, ptr1, ptr2);
        return GTF.__wrap(ret);
    }
    /**
    * Access the ID for register A.
    * @returns {RegId}
    */
    ra() {
        const ret = wasm.add_ra(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register B.
    * @returns {RegId}
    */
    rb() {
        const ret = wasm.add_rb(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the 12-bit immediate value.
    * @returns {Imm12}
    */
    imm12() {
        const ret = wasm.addi_imm12(this.__wbg_ptr);
        return Imm12.__wrap(ret);
    }
    /**
    * Construct a `GTF` instruction from its arguments.
    * @param {RegId} ra
    * @param {RegId} rb
    * @param {number} args
    * @returns {GTF}
    */
    static from_args(ra, rb, args) {
        _assertClass(ra, RegId);
        var ptr0 = ra.__destroy_into_raw();
        _assertClass(rb, RegId);
        var ptr1 = rb.__destroy_into_raw();
        const ret = wasm.gtf_from_args(ptr0, ptr1, args);
        return GTF.__wrap(ret);
    }
}
module.exports.GTF = GTF;
/**
* Represents a 6-bit immediate value, guaranteed to be masked by construction.
*/
class Imm06 {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Imm06.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_imm06_free(ptr);
    }
}
module.exports.Imm06 = Imm06;
/**
* Represents a 12-bit immediate value, guaranteed to be masked by construction.
*/
class Imm12 {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Imm12.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_imm12_free(ptr);
    }
}
module.exports.Imm12 = Imm12;
/**
* Represents a 18-bit immediate value, guaranteed to be masked by construction.
*/
class Imm18 {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Imm18.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_imm18_free(ptr);
    }
}
module.exports.Imm18 = Imm18;
/**
* Represents a 24-bit immediate value, guaranteed to be masked by construction.
*/
class Imm24 {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Imm24.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_imm24_free(ptr);
    }
}
module.exports.Imm24 = Imm24;
/**
*Jump.
*/
class JI {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(JI.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_ji_free(ptr);
    }
    /**
    * Construct the instruction from its parts.
    * @param {Imm24} abs_target
    */
    constructor(abs_target) {
        _assertClass(abs_target, Imm24);
        var ptr0 = abs_target.__destroy_into_raw();
        const ret = wasm.cfei_new(ptr0);
        return JI.__wrap(ret);
    }
    /**
    * Access the 24-bit immediate value.
    * @returns {Imm24}
    */
    imm24() {
        const ret = wasm.cfei_imm24(this.__wbg_ptr);
        return Imm24.__wrap(ret);
    }
}
module.exports.JI = JI;
/**
*Dynamic jump.
*/
class JMP {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(JMP.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_jmp_free(ptr);
    }
    /**
    * Construct the instruction from its parts.
    * @param {RegId} abs_target
    */
    constructor(abs_target) {
        _assertClass(abs_target, RegId);
        var ptr0 = abs_target.__destroy_into_raw();
        const ret = wasm.aloc_new(ptr0);
        return JMP.__wrap(ret);
    }
    /**
    * Access the ID for register A.
    * @returns {RegId}
    */
    ra() {
        const ret = wasm.add_ra(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
}
module.exports.JMP = JMP;
/**
*Unconditional dynamic relative jump backwards, with a constant offset.
*/
class JMPB {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(JMPB.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_jmpb_free(ptr);
    }
    /**
    * Construct the instruction from its parts.
    * @param {RegId} dynamic
    * @param {Imm18} fixed
    */
    constructor(dynamic, fixed) {
        _assertClass(dynamic, RegId);
        var ptr0 = dynamic.__destroy_into_raw();
        _assertClass(fixed, Imm18);
        var ptr1 = fixed.__destroy_into_raw();
        const ret = wasm.gm_new(ptr0, ptr1);
        return JMPB.__wrap(ret);
    }
    /**
    * Access the ID for register A.
    * @returns {RegId}
    */
    ra() {
        const ret = wasm.add_ra(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the 18-bit immediate value.
    * @returns {Imm18}
    */
    imm18() {
        const ret = wasm.gm_imm18(this.__wbg_ptr);
        return Imm18.__wrap(ret);
    }
}
module.exports.JMPB = JMPB;
/**
*Unconditional dynamic relative jump forwards, with a constant offset.
*/
class JMPF {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(JMPF.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_jmpf_free(ptr);
    }
    /**
    * Construct the instruction from its parts.
    * @param {RegId} dynamic
    * @param {Imm18} fixed
    */
    constructor(dynamic, fixed) {
        _assertClass(dynamic, RegId);
        var ptr0 = dynamic.__destroy_into_raw();
        _assertClass(fixed, Imm18);
        var ptr1 = fixed.__destroy_into_raw();
        const ret = wasm.gm_new(ptr0, ptr1);
        return JMPF.__wrap(ret);
    }
    /**
    * Access the ID for register A.
    * @returns {RegId}
    */
    ra() {
        const ret = wasm.add_ra(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the 18-bit immediate value.
    * @returns {Imm18}
    */
    imm18() {
        const ret = wasm.gm_imm18(this.__wbg_ptr);
        return Imm18.__wrap(ret);
    }
}
module.exports.JMPF = JMPF;
/**
*Conditional dynamic jump.
*/
class JNE {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(JNE.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_jne_free(ptr);
    }
    /**
    * Construct the instruction from its parts.
    * @param {RegId} abs_target
    * @param {RegId} lhs
    * @param {RegId} rhs
    */
    constructor(abs_target, lhs, rhs) {
        _assertClass(abs_target, RegId);
        var ptr0 = abs_target.__destroy_into_raw();
        _assertClass(lhs, RegId);
        var ptr1 = lhs.__destroy_into_raw();
        _assertClass(rhs, RegId);
        var ptr2 = rhs.__destroy_into_raw();
        const ret = wasm.add_new(ptr0, ptr1, ptr2);
        return JNE.__wrap(ret);
    }
    /**
    * Access the ID for register A.
    * @returns {RegId}
    */
    ra() {
        const ret = wasm.add_ra(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register B.
    * @returns {RegId}
    */
    rb() {
        const ret = wasm.add_rb(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register C.
    * @returns {RegId}
    */
    rc() {
        const ret = wasm.add_rc(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
}
module.exports.JNE = JNE;
/**
*Dynamic relative jump backwards, conditional on comparsion, with a constant offset.
*/
class JNEB {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(JNEB.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_jneb_free(ptr);
    }
    /**
    * Construct the instruction from its parts.
    * @param {RegId} cond_lhs
    * @param {RegId} cond_rhs
    * @param {RegId} dynamic
    * @param {Imm06} fixed
    */
    constructor(cond_lhs, cond_rhs, dynamic, fixed) {
        _assertClass(cond_lhs, RegId);
        var ptr0 = cond_lhs.__destroy_into_raw();
        _assertClass(cond_rhs, RegId);
        var ptr1 = cond_rhs.__destroy_into_raw();
        _assertClass(dynamic, RegId);
        var ptr2 = dynamic.__destroy_into_raw();
        _assertClass(fixed, Imm06);
        var ptr3 = fixed.__destroy_into_raw();
        const ret = wasm.call_new(ptr0, ptr1, ptr2, ptr3);
        return JNEB.__wrap(ret);
    }
    /**
    * Access the ID for register A.
    * @returns {RegId}
    */
    ra() {
        const ret = wasm.add_ra(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register B.
    * @returns {RegId}
    */
    rb() {
        const ret = wasm.add_rb(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register C.
    * @returns {RegId}
    */
    rc() {
        const ret = wasm.add_rc(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the 6-bit immediate value.
    * @returns {Imm06}
    */
    imm06() {
        const ret = wasm.call_rd(this.__wbg_ptr);
        return Imm06.__wrap(ret);
    }
}
module.exports.JNEB = JNEB;
/**
*Dynamic relative jump forwards, conditional on comparsion, with a constant offset.
*/
class JNEF {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(JNEF.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_jnef_free(ptr);
    }
    /**
    * Construct the instruction from its parts.
    * @param {RegId} cond_lhs
    * @param {RegId} cond_rhs
    * @param {RegId} dynamic
    * @param {Imm06} fixed
    */
    constructor(cond_lhs, cond_rhs, dynamic, fixed) {
        _assertClass(cond_lhs, RegId);
        var ptr0 = cond_lhs.__destroy_into_raw();
        _assertClass(cond_rhs, RegId);
        var ptr1 = cond_rhs.__destroy_into_raw();
        _assertClass(dynamic, RegId);
        var ptr2 = dynamic.__destroy_into_raw();
        _assertClass(fixed, Imm06);
        var ptr3 = fixed.__destroy_into_raw();
        const ret = wasm.call_new(ptr0, ptr1, ptr2, ptr3);
        return JNEF.__wrap(ret);
    }
    /**
    * Access the ID for register A.
    * @returns {RegId}
    */
    ra() {
        const ret = wasm.add_ra(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register B.
    * @returns {RegId}
    */
    rb() {
        const ret = wasm.add_rb(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register C.
    * @returns {RegId}
    */
    rc() {
        const ret = wasm.add_rc(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the 6-bit immediate value.
    * @returns {Imm06}
    */
    imm06() {
        const ret = wasm.call_rd(this.__wbg_ptr);
        return Imm06.__wrap(ret);
    }
}
module.exports.JNEF = JNEF;
/**
*Conditional jump.
*/
class JNEI {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(JNEI.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_jnei_free(ptr);
    }
    /**
    * Construct the instruction from its parts.
    * @param {RegId} cond_lhs
    * @param {RegId} cond_rhs
    * @param {Imm12} abs_target
    */
    constructor(cond_lhs, cond_rhs, abs_target) {
        _assertClass(cond_lhs, RegId);
        var ptr0 = cond_lhs.__destroy_into_raw();
        _assertClass(cond_rhs, RegId);
        var ptr1 = cond_rhs.__destroy_into_raw();
        _assertClass(abs_target, Imm12);
        var ptr2 = abs_target.__destroy_into_raw();
        const ret = wasm.addi_new(ptr0, ptr1, ptr2);
        return JNEI.__wrap(ret);
    }
    /**
    * Access the ID for register A.
    * @returns {RegId}
    */
    ra() {
        const ret = wasm.add_ra(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register B.
    * @returns {RegId}
    */
    rb() {
        const ret = wasm.add_rb(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the 12-bit immediate value.
    * @returns {Imm12}
    */
    imm12() {
        const ret = wasm.addi_imm12(this.__wbg_ptr);
        return Imm12.__wrap(ret);
    }
}
module.exports.JNEI = JNEI;
/**
*Dynamic relative jump backwards, conditional against zero, with a constant offset.
*/
class JNZB {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(JNZB.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_jnzb_free(ptr);
    }
    /**
    * Construct the instruction from its parts.
    * @param {RegId} cond_nz
    * @param {RegId} dynamic
    * @param {Imm12} fixed
    */
    constructor(cond_nz, dynamic, fixed) {
        _assertClass(cond_nz, RegId);
        var ptr0 = cond_nz.__destroy_into_raw();
        _assertClass(dynamic, RegId);
        var ptr1 = dynamic.__destroy_into_raw();
        _assertClass(fixed, Imm12);
        var ptr2 = fixed.__destroy_into_raw();
        const ret = wasm.addi_new(ptr0, ptr1, ptr2);
        return JNZB.__wrap(ret);
    }
    /**
    * Access the ID for register A.
    * @returns {RegId}
    */
    ra() {
        const ret = wasm.add_ra(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register B.
    * @returns {RegId}
    */
    rb() {
        const ret = wasm.add_rb(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the 12-bit immediate value.
    * @returns {Imm12}
    */
    imm12() {
        const ret = wasm.addi_imm12(this.__wbg_ptr);
        return Imm12.__wrap(ret);
    }
}
module.exports.JNZB = JNZB;
/**
*Dynamic relative jump forwards, conditional against zero, with a constant offset.
*/
class JNZF {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(JNZF.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_jnzf_free(ptr);
    }
    /**
    * Construct the instruction from its parts.
    * @param {RegId} cond_nz
    * @param {RegId} dynamic
    * @param {Imm12} fixed
    */
    constructor(cond_nz, dynamic, fixed) {
        _assertClass(cond_nz, RegId);
        var ptr0 = cond_nz.__destroy_into_raw();
        _assertClass(dynamic, RegId);
        var ptr1 = dynamic.__destroy_into_raw();
        _assertClass(fixed, Imm12);
        var ptr2 = fixed.__destroy_into_raw();
        const ret = wasm.addi_new(ptr0, ptr1, ptr2);
        return JNZF.__wrap(ret);
    }
    /**
    * Access the ID for register A.
    * @returns {RegId}
    */
    ra() {
        const ret = wasm.add_ra(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register B.
    * @returns {RegId}
    */
    rb() {
        const ret = wasm.add_rb(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the 12-bit immediate value.
    * @returns {Imm12}
    */
    imm12() {
        const ret = wasm.addi_imm12(this.__wbg_ptr);
        return Imm12.__wrap(ret);
    }
}
module.exports.JNZF = JNZF;
/**
*Conditional jump against zero.
*/
class JNZI {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(JNZI.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_jnzi_free(ptr);
    }
    /**
    * Construct the instruction from its parts.
    * @param {RegId} cond_nz
    * @param {Imm18} abs_target
    */
    constructor(cond_nz, abs_target) {
        _assertClass(cond_nz, RegId);
        var ptr0 = cond_nz.__destroy_into_raw();
        _assertClass(abs_target, Imm18);
        var ptr1 = abs_target.__destroy_into_raw();
        const ret = wasm.gm_new(ptr0, ptr1);
        return JNZI.__wrap(ret);
    }
    /**
    * Access the ID for register A.
    * @returns {RegId}
    */
    ra() {
        const ret = wasm.add_ra(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the 18-bit immediate value.
    * @returns {Imm18}
    */
    imm18() {
        const ret = wasm.gm_imm18(this.__wbg_ptr);
        return Imm18.__wrap(ret);
    }
}
module.exports.JNZI = JNZI;
/**
*The keccak-256 hash of a slice.
*/
class K256 {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(K256.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_k256_free(ptr);
    }
    /**
    * Construct the instruction from its parts.
    * @param {RegId} dst_addr
    * @param {RegId} src_addr
    * @param {RegId} len
    */
    constructor(dst_addr, src_addr, len) {
        _assertClass(dst_addr, RegId);
        var ptr0 = dst_addr.__destroy_into_raw();
        _assertClass(src_addr, RegId);
        var ptr1 = src_addr.__destroy_into_raw();
        _assertClass(len, RegId);
        var ptr2 = len.__destroy_into_raw();
        const ret = wasm.add_new(ptr0, ptr1, ptr2);
        return K256.__wrap(ret);
    }
    /**
    * Access the ID for register A.
    * @returns {RegId}
    */
    ra() {
        const ret = wasm.add_ra(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register B.
    * @returns {RegId}
    */
    rb() {
        const ret = wasm.add_rb(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register C.
    * @returns {RegId}
    */
    rc() {
        const ret = wasm.add_rc(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
}
module.exports.K256 = K256;
/**
*A byte is loaded from the specified address offset by an immediate value.
*/
class LB {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(LB.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_lb_free(ptr);
    }
    /**
    * Construct the instruction from its parts.
    * @param {RegId} dst
    * @param {RegId} addr
    * @param {Imm12} offset
    */
    constructor(dst, addr, offset) {
        _assertClass(dst, RegId);
        var ptr0 = dst.__destroy_into_raw();
        _assertClass(addr, RegId);
        var ptr1 = addr.__destroy_into_raw();
        _assertClass(offset, Imm12);
        var ptr2 = offset.__destroy_into_raw();
        const ret = wasm.addi_new(ptr0, ptr1, ptr2);
        return LB.__wrap(ret);
    }
    /**
    * Access the ID for register A.
    * @returns {RegId}
    */
    ra() {
        const ret = wasm.add_ra(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register B.
    * @returns {RegId}
    */
    rb() {
        const ret = wasm.add_rb(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the 12-bit immediate value.
    * @returns {Imm12}
    */
    imm12() {
        const ret = wasm.addi_imm12(this.__wbg_ptr);
        return Imm12.__wrap(ret);
    }
}
module.exports.LB = LB;
/**
*Load a contract's code as executable.
*/
class LDC {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(LDC.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_ldc_free(ptr);
    }
    /**
    * Construct the instruction from its parts.
    * @param {RegId} contract_id_addr
    * @param {RegId} offset
    * @param {RegId} len
    */
    constructor(contract_id_addr, offset, len) {
        _assertClass(contract_id_addr, RegId);
        var ptr0 = contract_id_addr.__destroy_into_raw();
        _assertClass(offset, RegId);
        var ptr1 = offset.__destroy_into_raw();
        _assertClass(len, RegId);
        var ptr2 = len.__destroy_into_raw();
        const ret = wasm.add_new(ptr0, ptr1, ptr2);
        return LDC.__wrap(ret);
    }
    /**
    * Access the ID for register A.
    * @returns {RegId}
    */
    ra() {
        const ret = wasm.add_ra(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register B.
    * @returns {RegId}
    */
    rb() {
        const ret = wasm.add_rb(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register C.
    * @returns {RegId}
    */
    rc() {
        const ret = wasm.add_rc(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
}
module.exports.LDC = LDC;
/**
*Log an event.
*/
class LOG {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(LOG.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_log_free(ptr);
    }
    /**
    * Construct the instruction from its parts.
    * @param {RegId} a
    * @param {RegId} b
    * @param {RegId} c
    * @param {RegId} d
    */
    constructor(a, b, c, d) {
        _assertClass(a, RegId);
        var ptr0 = a.__destroy_into_raw();
        _assertClass(b, RegId);
        var ptr1 = b.__destroy_into_raw();
        _assertClass(c, RegId);
        var ptr2 = c.__destroy_into_raw();
        _assertClass(d, RegId);
        var ptr3 = d.__destroy_into_raw();
        const ret = wasm.call_new(ptr0, ptr1, ptr2, ptr3);
        return LOG.__wrap(ret);
    }
    /**
    * Access the ID for register A.
    * @returns {RegId}
    */
    ra() {
        const ret = wasm.add_ra(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register B.
    * @returns {RegId}
    */
    rb() {
        const ret = wasm.add_rb(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register C.
    * @returns {RegId}
    */
    rc() {
        const ret = wasm.add_rc(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register D.
    * @returns {RegId}
    */
    rd() {
        const ret = wasm.call_rd(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
}
module.exports.LOG = LOG;
/**
*Log data.
*/
class LOGD {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(LOGD.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_logd_free(ptr);
    }
    /**
    * Construct the instruction from its parts.
    * @param {RegId} a
    * @param {RegId} b
    * @param {RegId} addr
    * @param {RegId} len
    */
    constructor(a, b, addr, len) {
        _assertClass(a, RegId);
        var ptr0 = a.__destroy_into_raw();
        _assertClass(b, RegId);
        var ptr1 = b.__destroy_into_raw();
        _assertClass(addr, RegId);
        var ptr2 = addr.__destroy_into_raw();
        _assertClass(len, RegId);
        var ptr3 = len.__destroy_into_raw();
        const ret = wasm.call_new(ptr0, ptr1, ptr2, ptr3);
        return LOGD.__wrap(ret);
    }
    /**
    * Access the ID for register A.
    * @returns {RegId}
    */
    ra() {
        const ret = wasm.add_ra(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register B.
    * @returns {RegId}
    */
    rb() {
        const ret = wasm.add_rb(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register C.
    * @returns {RegId}
    */
    rc() {
        const ret = wasm.add_rc(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register D.
    * @returns {RegId}
    */
    rd() {
        const ret = wasm.call_rd(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
}
module.exports.LOGD = LOGD;
/**
*Compares two registers for less-than.
*/
class LT {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(LT.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_lt_free(ptr);
    }
    /**
    * Construct the instruction from its parts.
    * @param {RegId} dst
    * @param {RegId} lhs
    * @param {RegId} rhs
    */
    constructor(dst, lhs, rhs) {
        _assertClass(dst, RegId);
        var ptr0 = dst.__destroy_into_raw();
        _assertClass(lhs, RegId);
        var ptr1 = lhs.__destroy_into_raw();
        _assertClass(rhs, RegId);
        var ptr2 = rhs.__destroy_into_raw();
        const ret = wasm.add_new(ptr0, ptr1, ptr2);
        return LT.__wrap(ret);
    }
    /**
    * Access the ID for register A.
    * @returns {RegId}
    */
    ra() {
        const ret = wasm.add_ra(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register B.
    * @returns {RegId}
    */
    rb() {
        const ret = wasm.add_rb(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register C.
    * @returns {RegId}
    */
    rc() {
        const ret = wasm.add_rc(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
}
module.exports.LT = LT;
/**
*A word is loaded from the specified address offset by an immediate value.
*/
class LW {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(LW.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_lw_free(ptr);
    }
    /**
    * Construct the instruction from its parts.
    * @param {RegId} dst
    * @param {RegId} addr
    * @param {Imm12} offset
    */
    constructor(dst, addr, offset) {
        _assertClass(dst, RegId);
        var ptr0 = dst.__destroy_into_raw();
        _assertClass(addr, RegId);
        var ptr1 = addr.__destroy_into_raw();
        _assertClass(offset, Imm12);
        var ptr2 = offset.__destroy_into_raw();
        const ret = wasm.addi_new(ptr0, ptr1, ptr2);
        return LW.__wrap(ret);
    }
    /**
    * Access the ID for register A.
    * @returns {RegId}
    */
    ra() {
        const ret = wasm.add_ra(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register B.
    * @returns {RegId}
    */
    rb() {
        const ret = wasm.add_rb(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the 12-bit immediate value.
    * @returns {Imm12}
    */
    imm12() {
        const ret = wasm.addi_imm12(this.__wbg_ptr);
        return Imm12.__wrap(ret);
    }
}
module.exports.LW = LW;
/**
*Clear a variable number of bytes in memory.
*/
class MCL {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(MCL.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_mcl_free(ptr);
    }
    /**
    * Construct the instruction from its parts.
    * @param {RegId} dst_addr
    * @param {RegId} len
    */
    constructor(dst_addr, len) {
        _assertClass(dst_addr, RegId);
        var ptr0 = dst_addr.__destroy_into_raw();
        _assertClass(len, RegId);
        var ptr1 = len.__destroy_into_raw();
        const ret = wasm.bhsh_new(ptr0, ptr1);
        return MCL.__wrap(ret);
    }
    /**
    * Access the ID for register A.
    * @returns {RegId}
    */
    ra() {
        const ret = wasm.add_ra(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register B.
    * @returns {RegId}
    */
    rb() {
        const ret = wasm.add_rb(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
}
module.exports.MCL = MCL;
/**
*Clear an immediate number of bytes in memory.
*/
class MCLI {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(MCLI.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_mcli_free(ptr);
    }
    /**
    * Construct the instruction from its parts.
    * @param {RegId} addr
    * @param {Imm18} count
    */
    constructor(addr, count) {
        _assertClass(addr, RegId);
        var ptr0 = addr.__destroy_into_raw();
        _assertClass(count, Imm18);
        var ptr1 = count.__destroy_into_raw();
        const ret = wasm.gm_new(ptr0, ptr1);
        return MCLI.__wrap(ret);
    }
    /**
    * Access the ID for register A.
    * @returns {RegId}
    */
    ra() {
        const ret = wasm.add_ra(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the 18-bit immediate value.
    * @returns {Imm18}
    */
    imm18() {
        const ret = wasm.gm_imm18(this.__wbg_ptr);
        return Imm18.__wrap(ret);
    }
}
module.exports.MCLI = MCLI;
/**
*Copy a variable number of bytes in memory.
*/
class MCP {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(MCP.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_mcp_free(ptr);
    }
    /**
    * Construct the instruction from its parts.
    * @param {RegId} dst_addr
    * @param {RegId} src_addr
    * @param {RegId} len
    */
    constructor(dst_addr, src_addr, len) {
        _assertClass(dst_addr, RegId);
        var ptr0 = dst_addr.__destroy_into_raw();
        _assertClass(src_addr, RegId);
        var ptr1 = src_addr.__destroy_into_raw();
        _assertClass(len, RegId);
        var ptr2 = len.__destroy_into_raw();
        const ret = wasm.add_new(ptr0, ptr1, ptr2);
        return MCP.__wrap(ret);
    }
    /**
    * Access the ID for register A.
    * @returns {RegId}
    */
    ra() {
        const ret = wasm.add_ra(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register B.
    * @returns {RegId}
    */
    rb() {
        const ret = wasm.add_rb(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register C.
    * @returns {RegId}
    */
    rc() {
        const ret = wasm.add_rc(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
}
module.exports.MCP = MCP;
/**
*Copy an immediate number of bytes in memory.
*/
class MCPI {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(MCPI.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_mcpi_free(ptr);
    }
    /**
    * Construct the instruction from its parts.
    * @param {RegId} dst_addr
    * @param {RegId} src_addr
    * @param {Imm12} len
    */
    constructor(dst_addr, src_addr, len) {
        _assertClass(dst_addr, RegId);
        var ptr0 = dst_addr.__destroy_into_raw();
        _assertClass(src_addr, RegId);
        var ptr1 = src_addr.__destroy_into_raw();
        _assertClass(len, Imm12);
        var ptr2 = len.__destroy_into_raw();
        const ret = wasm.addi_new(ptr0, ptr1, ptr2);
        return MCPI.__wrap(ret);
    }
    /**
    * Access the ID for register A.
    * @returns {RegId}
    */
    ra() {
        const ret = wasm.add_ra(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register B.
    * @returns {RegId}
    */
    rb() {
        const ret = wasm.add_rb(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the 12-bit immediate value.
    * @returns {Imm12}
    */
    imm12() {
        const ret = wasm.addi_imm12(this.__wbg_ptr);
        return Imm12.__wrap(ret);
    }
}
module.exports.MCPI = MCPI;
/**
*Compare bytes in memory.
*/
class MEQ {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(MEQ.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_meq_free(ptr);
    }
    /**
    * Construct the instruction from its parts.
    * @param {RegId} result
    * @param {RegId} lhs_addr
    * @param {RegId} rhs_addr
    * @param {RegId} len
    */
    constructor(result, lhs_addr, rhs_addr, len) {
        _assertClass(result, RegId);
        var ptr0 = result.__destroy_into_raw();
        _assertClass(lhs_addr, RegId);
        var ptr1 = lhs_addr.__destroy_into_raw();
        _assertClass(rhs_addr, RegId);
        var ptr2 = rhs_addr.__destroy_into_raw();
        _assertClass(len, RegId);
        var ptr3 = len.__destroy_into_raw();
        const ret = wasm.call_new(ptr0, ptr1, ptr2, ptr3);
        return MEQ.__wrap(ret);
    }
    /**
    * Access the ID for register A.
    * @returns {RegId}
    */
    ra() {
        const ret = wasm.add_ra(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register B.
    * @returns {RegId}
    */
    rb() {
        const ret = wasm.add_rb(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register C.
    * @returns {RegId}
    */
    rc() {
        const ret = wasm.add_rc(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register D.
    * @returns {RegId}
    */
    rd() {
        const ret = wasm.call_rd(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
}
module.exports.MEQ = MEQ;
/**
*Mint coins of the current contract's asset ID.
*/
class MINT {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(MINT.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_mint_free(ptr);
    }
    /**
    * Construct the instruction from its parts.
    * @param {RegId} amount
    */
    constructor(amount) {
        _assertClass(amount, RegId);
        var ptr0 = amount.__destroy_into_raw();
        const ret = wasm.aloc_new(ptr0);
        return MINT.__wrap(ret);
    }
    /**
    * Access the ID for register A.
    * @returns {RegId}
    */
    ra() {
        const ret = wasm.add_ra(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
}
module.exports.MINT = MINT;
/**
*Fused multiply-divide with arbitrary precision intermediate step.
*/
class MLDV {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(MLDV.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_mldv_free(ptr);
    }
    /**
    * Construct the instruction from its parts.
    * @param {RegId} dst
    * @param {RegId} mul_lhs
    * @param {RegId} mul_rhs
    * @param {RegId} divisor
    */
    constructor(dst, mul_lhs, mul_rhs, divisor) {
        _assertClass(dst, RegId);
        var ptr0 = dst.__destroy_into_raw();
        _assertClass(mul_lhs, RegId);
        var ptr1 = mul_lhs.__destroy_into_raw();
        _assertClass(mul_rhs, RegId);
        var ptr2 = mul_rhs.__destroy_into_raw();
        _assertClass(divisor, RegId);
        var ptr3 = divisor.__destroy_into_raw();
        const ret = wasm.call_new(ptr0, ptr1, ptr2, ptr3);
        return MLDV.__wrap(ret);
    }
    /**
    * Access the ID for register A.
    * @returns {RegId}
    */
    ra() {
        const ret = wasm.add_ra(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register B.
    * @returns {RegId}
    */
    rb() {
        const ret = wasm.add_rb(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register C.
    * @returns {RegId}
    */
    rc() {
        const ret = wasm.add_rc(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register D.
    * @returns {RegId}
    */
    rd() {
        const ret = wasm.call_rd(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
}
module.exports.MLDV = MLDV;
/**
*The integer logarithm of a register.
*/
class MLOG {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(MLOG.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_mlog_free(ptr);
    }
    /**
    * Construct the instruction from its parts.
    * @param {RegId} dst
    * @param {RegId} lhs
    * @param {RegId} rhs
    */
    constructor(dst, lhs, rhs) {
        _assertClass(dst, RegId);
        var ptr0 = dst.__destroy_into_raw();
        _assertClass(lhs, RegId);
        var ptr1 = lhs.__destroy_into_raw();
        _assertClass(rhs, RegId);
        var ptr2 = rhs.__destroy_into_raw();
        const ret = wasm.add_new(ptr0, ptr1, ptr2);
        return MLOG.__wrap(ret);
    }
    /**
    * Access the ID for register A.
    * @returns {RegId}
    */
    ra() {
        const ret = wasm.add_ra(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register B.
    * @returns {RegId}
    */
    rb() {
        const ret = wasm.add_rb(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register C.
    * @returns {RegId}
    */
    rc() {
        const ret = wasm.add_rc(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
}
module.exports.MLOG = MLOG;
/**
*Modulo remainder of two registers.
*/
class MOD {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(MOD.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_mod_free(ptr);
    }
    /**
    * Construct the instruction from its parts.
    * @param {RegId} dst
    * @param {RegId} lhs
    * @param {RegId} rhs
    */
    constructor(dst, lhs, rhs) {
        _assertClass(dst, RegId);
        var ptr0 = dst.__destroy_into_raw();
        _assertClass(lhs, RegId);
        var ptr1 = lhs.__destroy_into_raw();
        _assertClass(rhs, RegId);
        var ptr2 = rhs.__destroy_into_raw();
        const ret = wasm.add_new(ptr0, ptr1, ptr2);
        return MOD.__wrap(ret);
    }
    /**
    * Access the ID for register A.
    * @returns {RegId}
    */
    ra() {
        const ret = wasm.add_ra(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register B.
    * @returns {RegId}
    */
    rb() {
        const ret = wasm.add_rb(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register C.
    * @returns {RegId}
    */
    rc() {
        const ret = wasm.add_rc(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
}
module.exports.MOD = MOD;
/**
*Modulo remainder of a register and an immediate value.
*/
class MODI {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(MODI.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_modi_free(ptr);
    }
    /**
    * Construct the instruction from its parts.
    * @param {RegId} dst
    * @param {RegId} lhs
    * @param {Imm12} rhs
    */
    constructor(dst, lhs, rhs) {
        _assertClass(dst, RegId);
        var ptr0 = dst.__destroy_into_raw();
        _assertClass(lhs, RegId);
        var ptr1 = lhs.__destroy_into_raw();
        _assertClass(rhs, Imm12);
        var ptr2 = rhs.__destroy_into_raw();
        const ret = wasm.addi_new(ptr0, ptr1, ptr2);
        return MODI.__wrap(ret);
    }
    /**
    * Access the ID for register A.
    * @returns {RegId}
    */
    ra() {
        const ret = wasm.add_ra(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register B.
    * @returns {RegId}
    */
    rb() {
        const ret = wasm.add_rb(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the 12-bit immediate value.
    * @returns {Imm12}
    */
    imm12() {
        const ret = wasm.addi_imm12(this.__wbg_ptr);
        return Imm12.__wrap(ret);
    }
}
module.exports.MODI = MODI;
/**
*Copy from one register to another.
*/
class MOVE {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(MOVE.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_move_free(ptr);
    }
    /**
    * Construct the instruction from its parts.
    * @param {RegId} dst
    * @param {RegId} src
    */
    constructor(dst, src) {
        _assertClass(dst, RegId);
        var ptr0 = dst.__destroy_into_raw();
        _assertClass(src, RegId);
        var ptr1 = src.__destroy_into_raw();
        const ret = wasm.bhsh_new(ptr0, ptr1);
        return MOVE.__wrap(ret);
    }
    /**
    * Access the ID for register A.
    * @returns {RegId}
    */
    ra() {
        const ret = wasm.add_ra(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register B.
    * @returns {RegId}
    */
    rb() {
        const ret = wasm.add_rb(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
}
module.exports.MOVE = MOVE;
/**
*Copy immediate value into a register
*/
class MOVI {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(MOVI.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_movi_free(ptr);
    }
    /**
    * Construct the instruction from its parts.
    * @param {RegId} dst
    * @param {Imm18} val
    */
    constructor(dst, val) {
        _assertClass(dst, RegId);
        var ptr0 = dst.__destroy_into_raw();
        _assertClass(val, Imm18);
        var ptr1 = val.__destroy_into_raw();
        const ret = wasm.gm_new(ptr0, ptr1);
        return MOVI.__wrap(ret);
    }
    /**
    * Access the ID for register A.
    * @returns {RegId}
    */
    ra() {
        const ret = wasm.add_ra(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the 18-bit immediate value.
    * @returns {Imm18}
    */
    imm18() {
        const ret = wasm.gm_imm18(this.__wbg_ptr);
        return Imm18.__wrap(ret);
    }
}
module.exports.MOVI = MOVI;
/**
*The integer root of a register.
*/
class MROO {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(MROO.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_mroo_free(ptr);
    }
    /**
    * Construct the instruction from its parts.
    * @param {RegId} dst
    * @param {RegId} lhs
    * @param {RegId} rhs
    */
    constructor(dst, lhs, rhs) {
        _assertClass(dst, RegId);
        var ptr0 = dst.__destroy_into_raw();
        _assertClass(lhs, RegId);
        var ptr1 = lhs.__destroy_into_raw();
        _assertClass(rhs, RegId);
        var ptr2 = rhs.__destroy_into_raw();
        const ret = wasm.add_new(ptr0, ptr1, ptr2);
        return MROO.__wrap(ret);
    }
    /**
    * Access the ID for register A.
    * @returns {RegId}
    */
    ra() {
        const ret = wasm.add_ra(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register B.
    * @returns {RegId}
    */
    rb() {
        const ret = wasm.add_rb(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register C.
    * @returns {RegId}
    */
    rc() {
        const ret = wasm.add_rc(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
}
module.exports.MROO = MROO;
/**
*Multiplies two registers.
*/
class MUL {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(MUL.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_mul_free(ptr);
    }
    /**
    * Construct the instruction from its parts.
    * @param {RegId} dst
    * @param {RegId} lhs
    * @param {RegId} rhs
    */
    constructor(dst, lhs, rhs) {
        _assertClass(dst, RegId);
        var ptr0 = dst.__destroy_into_raw();
        _assertClass(lhs, RegId);
        var ptr1 = lhs.__destroy_into_raw();
        _assertClass(rhs, RegId);
        var ptr2 = rhs.__destroy_into_raw();
        const ret = wasm.add_new(ptr0, ptr1, ptr2);
        return MUL.__wrap(ret);
    }
    /**
    * Access the ID for register A.
    * @returns {RegId}
    */
    ra() {
        const ret = wasm.add_ra(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register B.
    * @returns {RegId}
    */
    rb() {
        const ret = wasm.add_rb(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register C.
    * @returns {RegId}
    */
    rc() {
        const ret = wasm.add_rc(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
}
module.exports.MUL = MUL;
/**
*Multiplies a register and an immediate value.
*/
class MULI {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(MULI.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_muli_free(ptr);
    }
    /**
    * Construct the instruction from its parts.
    * @param {RegId} dst
    * @param {RegId} lhs
    * @param {Imm12} rhs
    */
    constructor(dst, lhs, rhs) {
        _assertClass(dst, RegId);
        var ptr0 = dst.__destroy_into_raw();
        _assertClass(lhs, RegId);
        var ptr1 = lhs.__destroy_into_raw();
        _assertClass(rhs, Imm12);
        var ptr2 = rhs.__destroy_into_raw();
        const ret = wasm.addi_new(ptr0, ptr1, ptr2);
        return MULI.__wrap(ret);
    }
    /**
    * Access the ID for register A.
    * @returns {RegId}
    */
    ra() {
        const ret = wasm.add_ra(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register B.
    * @returns {RegId}
    */
    rb() {
        const ret = wasm.add_rb(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the 12-bit immediate value.
    * @returns {Imm12}
    */
    imm12() {
        const ret = wasm.addi_imm12(this.__wbg_ptr);
        return Imm12.__wrap(ret);
    }
}
module.exports.MULI = MULI;
/**
* Additional arguments for WDOP and WQOP instructions.
*/
class MathArgs {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_mathargs_free(ptr);
    }
    /**
    * The operation to perform
    * @returns {number}
    */
    get op() {
        const ret = wasm.__wbg_get_mathargs_op(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
    * The operation to perform
    * @param {number} arg0
    */
    set op(arg0) {
        wasm.__wbg_set_mathargs_op(this.__wbg_ptr, arg0);
    }
    /**
    * Load RHS from register if true, otherwise zero-extend register value
    * @returns {boolean}
    */
    get indirect_rhs() {
        const ret = wasm.__wbg_get_compareargs_indirect_rhs(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
    * Load RHS from register if true, otherwise zero-extend register value
    * @param {boolean} arg0
    */
    set indirect_rhs(arg0) {
        wasm.__wbg_set_compareargs_indirect_rhs(this.__wbg_ptr, arg0);
    }
}
module.exports.MathArgs = MathArgs;
/**
* FuelVM atomic array type.
*/
class MessageId {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(MessageId.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_messageid_free(ptr);
    }
    /**
    * Bytes constructor.
    * @param {Uint8Array} bytes
    * @returns {MessageId}
    */
    static from_bytes(bytes) {
        const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.messageid_from_bytes(ptr0, len0);
        return MessageId.__wrap(ret);
    }
    /**
    * Zeroes bytes constructor.
    * @returns {MessageId}
    */
    static zeroed() {
        const ret = wasm.address_zeroed();
        return MessageId.__wrap(ret);
    }
    /**
    * The memory size of the type by the method.
    * @returns {number}
    */
    size() {
        const ret = wasm.address_size(this.__wbg_ptr);
        return ret >>> 0;
    }
}
module.exports.MessageId = MessageId;
/**
* Additional arguments for WDML and WQML instructions.
*/
class MulArgs {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_mulargs_free(ptr);
    }
    /**
    * Load LHSS from register if true, otherwise zero-extend register value
    * @returns {boolean}
    */
    get indirect_lhs() {
        const ret = wasm.__wbg_get_divargs_indirect_rhs(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
    * Load LHSS from register if true, otherwise zero-extend register value
    * @param {boolean} arg0
    */
    set indirect_lhs(arg0) {
        wasm.__wbg_set_divargs_indirect_rhs(this.__wbg_ptr, arg0);
    }
    /**
    * Load RHS from register if true, otherwise zero-extend register value
    * @returns {boolean}
    */
    get indirect_rhs() {
        const ret = wasm.__wbg_get_compareargs_indirect_rhs(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
    * Load RHS from register if true, otherwise zero-extend register value
    * @param {boolean} arg0
    */
    set indirect_rhs(arg0) {
        wasm.__wbg_set_compareargs_indirect_rhs(this.__wbg_ptr, arg0);
    }
}
module.exports.MulArgs = MulArgs;
/**
*Performs no operation.
*/
class NOOP {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(NOOP.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_noop_free(ptr);
    }
    /**
    * Construct the instruction.
    */
    constructor() {
        const ret = wasm.noop_new();
        return NOOP.__wrap(ret);
    }
}
module.exports.NOOP = NOOP;
/**
*Bitwise NOT a register.
*/
class NOT {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(NOT.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_not_free(ptr);
    }
    /**
    * Construct the instruction from its parts.
    * @param {RegId} dst
    * @param {RegId} arg
    */
    constructor(dst, arg) {
        _assertClass(dst, RegId);
        var ptr0 = dst.__destroy_into_raw();
        _assertClass(arg, RegId);
        var ptr1 = arg.__destroy_into_raw();
        const ret = wasm.bhsh_new(ptr0, ptr1);
        return NOT.__wrap(ret);
    }
    /**
    * Access the ID for register A.
    * @returns {RegId}
    */
    ra() {
        const ret = wasm.add_ra(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register B.
    * @returns {RegId}
    */
    rb() {
        const ret = wasm.add_rb(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
}
module.exports.NOT = NOT;
/**
* FuelVM atomic array type.
*/
class Nonce {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Nonce.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_nonce_free(ptr);
    }
    /**
    * Bytes constructor.
    * @param {Uint8Array} bytes
    * @returns {Nonce}
    */
    static from_bytes(bytes) {
        const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.nonce_from_bytes(ptr0, len0);
        return Nonce.__wrap(ret);
    }
    /**
    * Zeroes bytes constructor.
    * @returns {Nonce}
    */
    static zeroed() {
        const ret = wasm.address_zeroed();
        return Nonce.__wrap(ret);
    }
    /**
    * The memory size of the type by the method.
    * @returns {number}
    */
    size() {
        const ret = wasm.address_size(this.__wbg_ptr);
        return ret >>> 0;
    }
}
module.exports.Nonce = Nonce;
/**
*Bitwise ORs two registers.
*/
class OR {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(OR.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_or_free(ptr);
    }
    /**
    * Construct the instruction from its parts.
    * @param {RegId} dst
    * @param {RegId} lhs
    * @param {RegId} rhs
    */
    constructor(dst, lhs, rhs) {
        _assertClass(dst, RegId);
        var ptr0 = dst.__destroy_into_raw();
        _assertClass(lhs, RegId);
        var ptr1 = lhs.__destroy_into_raw();
        _assertClass(rhs, RegId);
        var ptr2 = rhs.__destroy_into_raw();
        const ret = wasm.add_new(ptr0, ptr1, ptr2);
        return OR.__wrap(ret);
    }
    /**
    * Access the ID for register A.
    * @returns {RegId}
    */
    ra() {
        const ret = wasm.add_ra(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register B.
    * @returns {RegId}
    */
    rb() {
        const ret = wasm.add_rb(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register C.
    * @returns {RegId}
    */
    rc() {
        const ret = wasm.add_rc(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
}
module.exports.OR = OR;
/**
*Bitwise ORs a register and an immediate value.
*/
class ORI {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(ORI.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_ori_free(ptr);
    }
    /**
    * Construct the instruction from its parts.
    * @param {RegId} dst
    * @param {RegId} lhs
    * @param {Imm12} rhs
    */
    constructor(dst, lhs, rhs) {
        _assertClass(dst, RegId);
        var ptr0 = dst.__destroy_into_raw();
        _assertClass(lhs, RegId);
        var ptr1 = lhs.__destroy_into_raw();
        _assertClass(rhs, Imm12);
        var ptr2 = rhs.__destroy_into_raw();
        const ret = wasm.addi_new(ptr0, ptr1, ptr2);
        return ORI.__wrap(ret);
    }
    /**
    * Access the ID for register A.
    * @returns {RegId}
    */
    ra() {
        const ret = wasm.add_ra(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register B.
    * @returns {RegId}
    */
    rb() {
        const ret = wasm.add_rb(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the 12-bit immediate value.
    * @returns {Imm12}
    */
    imm12() {
        const ret = wasm.addi_imm12(this.__wbg_ptr);
        return Imm12.__wrap(ret);
    }
}
module.exports.ORI = ORI;
/**
* Describe a panic reason with the instruction that generated it
*/
class PanicInstruction {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(PanicInstruction.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_panicinstruction_free(ptr);
    }
    /**
    * Represents an error described by a reason and an instruction.
    * @param {number} reason
    * @param {number} instruction
    */
    constructor(reason, instruction) {
        const ret = wasm.panicinstruction_error_typescript(reason, instruction);
        return PanicInstruction.__wrap(ret);
    }
    /**
    * Underlying panic reason
    * @returns {number}
    */
    reason() {
        const ret = wasm.panicinstruction_reason(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
    * Underlying instruction
    * @returns {number}
    */
    instruction() {
        const ret = wasm.panicinstruction_instruction(this.__wbg_ptr);
        return ret >>> 0;
    }
}
module.exports.PanicInstruction = PanicInstruction;
/**
*Return from context.
*/
class RET {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(RET.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_ret_free(ptr);
    }
    /**
    * Construct the instruction from its parts.
    * @param {RegId} value
    */
    constructor(value) {
        _assertClass(value, RegId);
        var ptr0 = value.__destroy_into_raw();
        const ret = wasm.aloc_new(ptr0);
        return RET.__wrap(ret);
    }
    /**
    * Access the ID for register A.
    * @returns {RegId}
    */
    ra() {
        const ret = wasm.add_ra(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
}
module.exports.RET = RET;
/**
*Return from context with data.
*/
class RETD {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(RETD.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_retd_free(ptr);
    }
    /**
    * Construct the instruction from its parts.
    * @param {RegId} addr
    * @param {RegId} len
    */
    constructor(addr, len) {
        _assertClass(addr, RegId);
        var ptr0 = addr.__destroy_into_raw();
        _assertClass(len, RegId);
        var ptr1 = len.__destroy_into_raw();
        const ret = wasm.bhsh_new(ptr0, ptr1);
        return RETD.__wrap(ret);
    }
    /**
    * Access the ID for register A.
    * @returns {RegId}
    */
    ra() {
        const ret = wasm.add_ra(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register B.
    * @returns {RegId}
    */
    rb() {
        const ret = wasm.add_rb(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
}
module.exports.RETD = RETD;
/**
*Halt execution, reverting state changes and returning a value.
*/
class RVRT {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(RVRT.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_rvrt_free(ptr);
    }
    /**
    * Construct the instruction from its parts.
    * @param {RegId} value
    */
    constructor(value) {
        _assertClass(value, RegId);
        var ptr0 = value.__destroy_into_raw();
        const ret = wasm.aloc_new(ptr0);
        return RVRT.__wrap(ret);
    }
    /**
    * Access the ID for register A.
    * @returns {RegId}
    */
    ra() {
        const ret = wasm.add_ra(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
}
module.exports.RVRT = RVRT;
/**
* Represents a 6-bit register ID, guaranteed to be masked by construction.
*/
class RegId {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(RegId.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_regid_free(ptr);
    }
    /**
    * Construct a register ID from the given value.
    *
    * Returns `None` if the value is outside the 6-bit value range.
    * @param {number} u
    * @returns {RegId | undefined}
    */
    static new_checked(u) {
        const ret = wasm.regid_new_checked(u);
        return ret === 0 ? undefined : RegId.__wrap(ret);
    }
    /**
    * Received balance for this context.
    * @returns {RegId}
    */
    static bal() {
        const ret = wasm.regid_bal();
        return RegId.__wrap(ret);
    }
    /**
    * Remaining gas in the context.
    * @returns {RegId}
    */
    static cgas() {
        const ret = wasm.regid_cgas();
        return RegId.__wrap(ret);
    }
    /**
    * Error codes for particular operations.
    * @returns {RegId}
    */
    static err() {
        const ret = wasm.regid_err();
        return RegId.__wrap(ret);
    }
    /**
    * Flags register.
    * @returns {RegId}
    */
    static flag() {
        const ret = wasm.regid_flag();
        return RegId.__wrap(ret);
    }
    /**
    * Frame pointer. Memory address of beginning of current call frame.
    * @returns {RegId}
    */
    static fp() {
        const ret = wasm.regid_fp();
        return RegId.__wrap(ret);
    }
    /**
    * Remaining gas globally.
    * @returns {RegId}
    */
    static ggas() {
        const ret = wasm.regid_ggas();
        return RegId.__wrap(ret);
    }
    /**
    * Heap pointer. Memory address below the current bottom of the heap (points to free
    * memory).
    * @returns {RegId}
    */
    static hp() {
        const ret = wasm.regid_hp();
        return RegId.__wrap(ret);
    }
    /**
    * Instructions start. Pointer to the start of the currently-executing code.
    * @returns {RegId}
    */
    static is() {
        const ret = wasm.regid_is();
        return RegId.__wrap(ret);
    }
    /**
    * Contains overflow/underflow of addition, subtraction, and multiplication.
    * @returns {RegId}
    */
    static of() {
        const ret = wasm.regid_of();
        return RegId.__wrap(ret);
    }
    /**
    * Contains one (1), for convenience.
    * @returns {RegId}
    */
    static one() {
        const ret = wasm.regid_one();
        return RegId.__wrap(ret);
    }
    /**
    * The program counter. Memory address of the current instruction.
    * @returns {RegId}
    */
    static pc() {
        const ret = wasm.regid_pc();
        return RegId.__wrap(ret);
    }
    /**
    * Return value or pointer.
    * @returns {RegId}
    */
    static ret() {
        const ret = wasm.regid_ret();
        return RegId.__wrap(ret);
    }
    /**
    * Return value length in bytes.
    * @returns {RegId}
    */
    static retl() {
        const ret = wasm.regid_retl();
        return RegId.__wrap(ret);
    }
    /**
    * Stack pointer. Memory address on top of current writable stack area (points to
    * free memory).
    * @returns {RegId}
    */
    static sp() {
        const ret = wasm.regid_sp();
        return RegId.__wrap(ret);
    }
    /**
    * Stack start pointer. Memory address of bottom of current writable stack area.
    * @returns {RegId}
    */
    static spp() {
        const ret = wasm.regid_spp();
        return RegId.__wrap(ret);
    }
    /**
    * Smallest writable register.
    * @returns {RegId}
    */
    static writable() {
        const ret = wasm.regid_writable();
        return RegId.__wrap(ret);
    }
    /**
    * Contains zero (0), for convenience.
    * @returns {RegId}
    */
    static zero() {
        const ret = wasm.regid_zero();
        return RegId.__wrap(ret);
    }
    /**
    * Construct a register ID from the given value.
    *
    * The given value will be masked to 6 bits.
    * @param {number} u
    */
    constructor(u) {
        const ret = wasm.regid_new_typescript(u);
        return RegId.__wrap(ret);
    }
    /**
    * A const alternative to the `Into<u8>` implementation.
    * @returns {number}
    */
    to_u8() {
        const ptr = this.__destroy_into_raw();
        const ret = wasm.regid_to_u8(ptr);
        return ret;
    }
}
module.exports.RegId = RegId;
/**
*The SHA-2-256 hash of a slice.
*/
class S256 {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(S256.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_s256_free(ptr);
    }
    /**
    * Construct the instruction from its parts.
    * @param {RegId} dst_addr
    * @param {RegId} src_addr
    * @param {RegId} len
    */
    constructor(dst_addr, src_addr, len) {
        _assertClass(dst_addr, RegId);
        var ptr0 = dst_addr.__destroy_into_raw();
        _assertClass(src_addr, RegId);
        var ptr1 = src_addr.__destroy_into_raw();
        _assertClass(len, RegId);
        var ptr2 = len.__destroy_into_raw();
        const ret = wasm.add_new(ptr0, ptr1, ptr2);
        return S256.__wrap(ret);
    }
    /**
    * Access the ID for register A.
    * @returns {RegId}
    */
    ra() {
        const ret = wasm.add_ra(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register B.
    * @returns {RegId}
    */
    rb() {
        const ret = wasm.add_rb(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register C.
    * @returns {RegId}
    */
    rc() {
        const ret = wasm.add_rc(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
}
module.exports.S256 = S256;
/**
*Write the least significant byte of a register to memory.
*/
class SB {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(SB.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_sb_free(ptr);
    }
    /**
    * Construct the instruction from its parts.
    * @param {RegId} addr
    * @param {RegId} value
    * @param {Imm12} offset
    */
    constructor(addr, value, offset) {
        _assertClass(addr, RegId);
        var ptr0 = addr.__destroy_into_raw();
        _assertClass(value, RegId);
        var ptr1 = value.__destroy_into_raw();
        _assertClass(offset, Imm12);
        var ptr2 = offset.__destroy_into_raw();
        const ret = wasm.addi_new(ptr0, ptr1, ptr2);
        return SB.__wrap(ret);
    }
    /**
    * Access the ID for register A.
    * @returns {RegId}
    */
    ra() {
        const ret = wasm.add_ra(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register B.
    * @returns {RegId}
    */
    rb() {
        const ret = wasm.add_rb(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the 12-bit immediate value.
    * @returns {Imm12}
    */
    imm12() {
        const ret = wasm.addi_imm12(this.__wbg_ptr);
        return Imm12.__wrap(ret);
    }
}
module.exports.SB = SB;
/**
*Clear a series of slots from contract storage.
*/
class SCWQ {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(SCWQ.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_scwq_free(ptr);
    }
    /**
    * Construct the instruction from its parts.
    * @param {RegId} key_addr
    * @param {RegId} status
    * @param {RegId} lenq
    */
    constructor(key_addr, status, lenq) {
        _assertClass(key_addr, RegId);
        var ptr0 = key_addr.__destroy_into_raw();
        _assertClass(status, RegId);
        var ptr1 = status.__destroy_into_raw();
        _assertClass(lenq, RegId);
        var ptr2 = lenq.__destroy_into_raw();
        const ret = wasm.add_new(ptr0, ptr1, ptr2);
        return SCWQ.__wrap(ret);
    }
    /**
    * Access the ID for register A.
    * @returns {RegId}
    */
    ra() {
        const ret = wasm.add_ra(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register B.
    * @returns {RegId}
    */
    rb() {
        const ret = wasm.add_rb(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register C.
    * @returns {RegId}
    */
    rc() {
        const ret = wasm.add_rc(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
}
module.exports.SCWQ = SCWQ;
/**
*Left shifts a register by a register.
*/
class SLL {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(SLL.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_sll_free(ptr);
    }
    /**
    * Construct the instruction from its parts.
    * @param {RegId} dst
    * @param {RegId} lhs
    * @param {RegId} rhs
    */
    constructor(dst, lhs, rhs) {
        _assertClass(dst, RegId);
        var ptr0 = dst.__destroy_into_raw();
        _assertClass(lhs, RegId);
        var ptr1 = lhs.__destroy_into_raw();
        _assertClass(rhs, RegId);
        var ptr2 = rhs.__destroy_into_raw();
        const ret = wasm.add_new(ptr0, ptr1, ptr2);
        return SLL.__wrap(ret);
    }
    /**
    * Access the ID for register A.
    * @returns {RegId}
    */
    ra() {
        const ret = wasm.add_ra(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register B.
    * @returns {RegId}
    */
    rb() {
        const ret = wasm.add_rb(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register C.
    * @returns {RegId}
    */
    rc() {
        const ret = wasm.add_rc(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
}
module.exports.SLL = SLL;
/**
*Left shifts a register by an immediate value.
*/
class SLLI {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(SLLI.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_slli_free(ptr);
    }
    /**
    * Construct the instruction from its parts.
    * @param {RegId} dst
    * @param {RegId} lhs
    * @param {Imm12} rhs
    */
    constructor(dst, lhs, rhs) {
        _assertClass(dst, RegId);
        var ptr0 = dst.__destroy_into_raw();
        _assertClass(lhs, RegId);
        var ptr1 = lhs.__destroy_into_raw();
        _assertClass(rhs, Imm12);
        var ptr2 = rhs.__destroy_into_raw();
        const ret = wasm.addi_new(ptr0, ptr1, ptr2);
        return SLLI.__wrap(ret);
    }
    /**
    * Access the ID for register A.
    * @returns {RegId}
    */
    ra() {
        const ret = wasm.add_ra(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register B.
    * @returns {RegId}
    */
    rb() {
        const ret = wasm.add_rb(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the 12-bit immediate value.
    * @returns {Imm12}
    */
    imm12() {
        const ret = wasm.addi_imm12(this.__wbg_ptr);
        return Imm12.__wrap(ret);
    }
}
module.exports.SLLI = SLLI;
/**
*Send a message to recipient address with call abi, coins, and output.
*/
class SMO {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(SMO.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_smo_free(ptr);
    }
    /**
    * Construct the instruction from its parts.
    * @param {RegId} recipient_addr
    * @param {RegId} data_addr
    * @param {RegId} data_len
    * @param {RegId} coins
    */
    constructor(recipient_addr, data_addr, data_len, coins) {
        _assertClass(recipient_addr, RegId);
        var ptr0 = recipient_addr.__destroy_into_raw();
        _assertClass(data_addr, RegId);
        var ptr1 = data_addr.__destroy_into_raw();
        _assertClass(data_len, RegId);
        var ptr2 = data_len.__destroy_into_raw();
        _assertClass(coins, RegId);
        var ptr3 = coins.__destroy_into_raw();
        const ret = wasm.call_new(ptr0, ptr1, ptr2, ptr3);
        return SMO.__wrap(ret);
    }
    /**
    * Access the ID for register A.
    * @returns {RegId}
    */
    ra() {
        const ret = wasm.add_ra(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register B.
    * @returns {RegId}
    */
    rb() {
        const ret = wasm.add_rb(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register C.
    * @returns {RegId}
    */
    rc() {
        const ret = wasm.add_rc(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register D.
    * @returns {RegId}
    */
    rd() {
        const ret = wasm.call_rd(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
}
module.exports.SMO = SMO;
/**
*Right shifts a register by a register.
*/
class SRL {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(SRL.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_srl_free(ptr);
    }
    /**
    * Construct the instruction from its parts.
    * @param {RegId} dst
    * @param {RegId} lhs
    * @param {RegId} rhs
    */
    constructor(dst, lhs, rhs) {
        _assertClass(dst, RegId);
        var ptr0 = dst.__destroy_into_raw();
        _assertClass(lhs, RegId);
        var ptr1 = lhs.__destroy_into_raw();
        _assertClass(rhs, RegId);
        var ptr2 = rhs.__destroy_into_raw();
        const ret = wasm.add_new(ptr0, ptr1, ptr2);
        return SRL.__wrap(ret);
    }
    /**
    * Access the ID for register A.
    * @returns {RegId}
    */
    ra() {
        const ret = wasm.add_ra(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register B.
    * @returns {RegId}
    */
    rb() {
        const ret = wasm.add_rb(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register C.
    * @returns {RegId}
    */
    rc() {
        const ret = wasm.add_rc(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
}
module.exports.SRL = SRL;
/**
*Right shifts a register by an immediate value.
*/
class SRLI {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(SRLI.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_srli_free(ptr);
    }
    /**
    * Construct the instruction from its parts.
    * @param {RegId} dst
    * @param {RegId} lhs
    * @param {Imm12} rhs
    */
    constructor(dst, lhs, rhs) {
        _assertClass(dst, RegId);
        var ptr0 = dst.__destroy_into_raw();
        _assertClass(lhs, RegId);
        var ptr1 = lhs.__destroy_into_raw();
        _assertClass(rhs, Imm12);
        var ptr2 = rhs.__destroy_into_raw();
        const ret = wasm.addi_new(ptr0, ptr1, ptr2);
        return SRLI.__wrap(ret);
    }
    /**
    * Access the ID for register A.
    * @returns {RegId}
    */
    ra() {
        const ret = wasm.add_ra(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register B.
    * @returns {RegId}
    */
    rb() {
        const ret = wasm.add_rb(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the 12-bit immediate value.
    * @returns {Imm12}
    */
    imm12() {
        const ret = wasm.addi_imm12(this.__wbg_ptr);
        return Imm12.__wrap(ret);
    }
}
module.exports.SRLI = SRLI;
/**
*Load a word from contract storage.
*/
class SRW {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(SRW.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_srw_free(ptr);
    }
    /**
    * Construct the instruction from its parts.
    * @param {RegId} dst
    * @param {RegId} status
    * @param {RegId} key_addr
    */
    constructor(dst, status, key_addr) {
        _assertClass(dst, RegId);
        var ptr0 = dst.__destroy_into_raw();
        _assertClass(status, RegId);
        var ptr1 = status.__destroy_into_raw();
        _assertClass(key_addr, RegId);
        var ptr2 = key_addr.__destroy_into_raw();
        const ret = wasm.add_new(ptr0, ptr1, ptr2);
        return SRW.__wrap(ret);
    }
    /**
    * Access the ID for register A.
    * @returns {RegId}
    */
    ra() {
        const ret = wasm.add_ra(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register B.
    * @returns {RegId}
    */
    rb() {
        const ret = wasm.add_rb(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register C.
    * @returns {RegId}
    */
    rc() {
        const ret = wasm.add_rc(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
}
module.exports.SRW = SRW;
/**
*Load a series of 32 byte slots from contract storage.
*/
class SRWQ {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(SRWQ.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_srwq_free(ptr);
    }
    /**
    * Construct the instruction from its parts.
    * @param {RegId} dst_addr
    * @param {RegId} status
    * @param {RegId} key_addr
    * @param {RegId} lenq
    */
    constructor(dst_addr, status, key_addr, lenq) {
        _assertClass(dst_addr, RegId);
        var ptr0 = dst_addr.__destroy_into_raw();
        _assertClass(status, RegId);
        var ptr1 = status.__destroy_into_raw();
        _assertClass(key_addr, RegId);
        var ptr2 = key_addr.__destroy_into_raw();
        _assertClass(lenq, RegId);
        var ptr3 = lenq.__destroy_into_raw();
        const ret = wasm.call_new(ptr0, ptr1, ptr2, ptr3);
        return SRWQ.__wrap(ret);
    }
    /**
    * Access the ID for register A.
    * @returns {RegId}
    */
    ra() {
        const ret = wasm.add_ra(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register B.
    * @returns {RegId}
    */
    rb() {
        const ret = wasm.add_rb(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register C.
    * @returns {RegId}
    */
    rc() {
        const ret = wasm.add_rc(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register D.
    * @returns {RegId}
    */
    rd() {
        const ret = wasm.call_rd(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
}
module.exports.SRWQ = SRWQ;
/**
*Subtracts two registers.
*/
class SUB {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(SUB.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_sub_free(ptr);
    }
    /**
    * Construct the instruction from its parts.
    * @param {RegId} dst
    * @param {RegId} lhs
    * @param {RegId} rhs
    */
    constructor(dst, lhs, rhs) {
        _assertClass(dst, RegId);
        var ptr0 = dst.__destroy_into_raw();
        _assertClass(lhs, RegId);
        var ptr1 = lhs.__destroy_into_raw();
        _assertClass(rhs, RegId);
        var ptr2 = rhs.__destroy_into_raw();
        const ret = wasm.add_new(ptr0, ptr1, ptr2);
        return SUB.__wrap(ret);
    }
    /**
    * Access the ID for register A.
    * @returns {RegId}
    */
    ra() {
        const ret = wasm.add_ra(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register B.
    * @returns {RegId}
    */
    rb() {
        const ret = wasm.add_rb(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register C.
    * @returns {RegId}
    */
    rc() {
        const ret = wasm.add_rc(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
}
module.exports.SUB = SUB;
/**
*Subtracts a register and an immediate value.
*/
class SUBI {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(SUBI.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_subi_free(ptr);
    }
    /**
    * Construct the instruction from its parts.
    * @param {RegId} dst
    * @param {RegId} lhs
    * @param {Imm12} rhs
    */
    constructor(dst, lhs, rhs) {
        _assertClass(dst, RegId);
        var ptr0 = dst.__destroy_into_raw();
        _assertClass(lhs, RegId);
        var ptr1 = lhs.__destroy_into_raw();
        _assertClass(rhs, Imm12);
        var ptr2 = rhs.__destroy_into_raw();
        const ret = wasm.addi_new(ptr0, ptr1, ptr2);
        return SUBI.__wrap(ret);
    }
    /**
    * Access the ID for register A.
    * @returns {RegId}
    */
    ra() {
        const ret = wasm.add_ra(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register B.
    * @returns {RegId}
    */
    rb() {
        const ret = wasm.add_rb(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the 12-bit immediate value.
    * @returns {Imm12}
    */
    imm12() {
        const ret = wasm.addi_imm12(this.__wbg_ptr);
        return Imm12.__wrap(ret);
    }
}
module.exports.SUBI = SUBI;
/**
*Write a register to memory.
*/
class SW {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(SW.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_sw_free(ptr);
    }
    /**
    * Construct the instruction from its parts.
    * @param {RegId} addr
    * @param {RegId} value
    * @param {Imm12} offset
    */
    constructor(addr, value, offset) {
        _assertClass(addr, RegId);
        var ptr0 = addr.__destroy_into_raw();
        _assertClass(value, RegId);
        var ptr1 = value.__destroy_into_raw();
        _assertClass(offset, Imm12);
        var ptr2 = offset.__destroy_into_raw();
        const ret = wasm.addi_new(ptr0, ptr1, ptr2);
        return SW.__wrap(ret);
    }
    /**
    * Access the ID for register A.
    * @returns {RegId}
    */
    ra() {
        const ret = wasm.add_ra(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register B.
    * @returns {RegId}
    */
    rb() {
        const ret = wasm.add_rb(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the 12-bit immediate value.
    * @returns {Imm12}
    */
    imm12() {
        const ret = wasm.addi_imm12(this.__wbg_ptr);
        return Imm12.__wrap(ret);
    }
}
module.exports.SW = SW;
/**
*Store a word in contract storage.
*/
class SWW {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(SWW.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_sww_free(ptr);
    }
    /**
    * Construct the instruction from its parts.
    * @param {RegId} key_addr
    * @param {RegId} status
    * @param {RegId} value
    */
    constructor(key_addr, status, value) {
        _assertClass(key_addr, RegId);
        var ptr0 = key_addr.__destroy_into_raw();
        _assertClass(status, RegId);
        var ptr1 = status.__destroy_into_raw();
        _assertClass(value, RegId);
        var ptr2 = value.__destroy_into_raw();
        const ret = wasm.add_new(ptr0, ptr1, ptr2);
        return SWW.__wrap(ret);
    }
    /**
    * Access the ID for register A.
    * @returns {RegId}
    */
    ra() {
        const ret = wasm.add_ra(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register B.
    * @returns {RegId}
    */
    rb() {
        const ret = wasm.add_rb(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register C.
    * @returns {RegId}
    */
    rc() {
        const ret = wasm.add_rc(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
}
module.exports.SWW = SWW;
/**
*Store a series of 32 byte slots in contract storage.
*/
class SWWQ {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(SWWQ.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_swwq_free(ptr);
    }
    /**
    * Construct the instruction from its parts.
    * @param {RegId} key_addr
    * @param {RegId} status
    * @param {RegId} src_addr
    * @param {RegId} lenq
    */
    constructor(key_addr, status, src_addr, lenq) {
        _assertClass(key_addr, RegId);
        var ptr0 = key_addr.__destroy_into_raw();
        _assertClass(status, RegId);
        var ptr1 = status.__destroy_into_raw();
        _assertClass(src_addr, RegId);
        var ptr2 = src_addr.__destroy_into_raw();
        _assertClass(lenq, RegId);
        var ptr3 = lenq.__destroy_into_raw();
        const ret = wasm.call_new(ptr0, ptr1, ptr2, ptr3);
        return SWWQ.__wrap(ret);
    }
    /**
    * Access the ID for register A.
    * @returns {RegId}
    */
    ra() {
        const ret = wasm.add_ra(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register B.
    * @returns {RegId}
    */
    rb() {
        const ret = wasm.add_rb(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register C.
    * @returns {RegId}
    */
    rc() {
        const ret = wasm.add_rc(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register D.
    * @returns {RegId}
    */
    rd() {
        const ret = wasm.call_rd(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
}
module.exports.SWWQ = SWWQ;
/**
* FuelVM atomic array type.
*/
class Salt {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Salt.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_salt_free(ptr);
    }
    /**
    * Bytes constructor.
    * @param {Uint8Array} bytes
    * @returns {Salt}
    */
    static from_bytes(bytes) {
        const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.salt_from_bytes(ptr0, len0);
        return Salt.__wrap(ret);
    }
    /**
    * Zeroes bytes constructor.
    * @returns {Salt}
    */
    static zeroed() {
        const ret = wasm.address_zeroed();
        return Salt.__wrap(ret);
    }
    /**
    * The memory size of the type by the method.
    * @returns {number}
    */
    size() {
        const ret = wasm.address_size(this.__wbg_ptr);
        return ret >>> 0;
    }
}
module.exports.Salt = Salt;
/**
*Get timestamp of block at given height.
*/
class TIME {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(TIME.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_time_free(ptr);
    }
    /**
    * Construct the instruction from its parts.
    * @param {RegId} dst
    * @param {RegId} heigth
    */
    constructor(dst, heigth) {
        _assertClass(dst, RegId);
        var ptr0 = dst.__destroy_into_raw();
        _assertClass(heigth, RegId);
        var ptr1 = heigth.__destroy_into_raw();
        const ret = wasm.bhsh_new(ptr0, ptr1);
        return TIME.__wrap(ret);
    }
    /**
    * Access the ID for register A.
    * @returns {RegId}
    */
    ra() {
        const ret = wasm.add_ra(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register B.
    * @returns {RegId}
    */
    rb() {
        const ret = wasm.add_rb(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
}
module.exports.TIME = TIME;
/**
*Transfer coins to a contract unconditionally.
*/
class TR {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(TR.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_tr_free(ptr);
    }
    /**
    * Construct the instruction from its parts.
    * @param {RegId} contract_id_addr
    * @param {RegId} amount
    * @param {RegId} asset_id_addr
    */
    constructor(contract_id_addr, amount, asset_id_addr) {
        _assertClass(contract_id_addr, RegId);
        var ptr0 = contract_id_addr.__destroy_into_raw();
        _assertClass(amount, RegId);
        var ptr1 = amount.__destroy_into_raw();
        _assertClass(asset_id_addr, RegId);
        var ptr2 = asset_id_addr.__destroy_into_raw();
        const ret = wasm.add_new(ptr0, ptr1, ptr2);
        return TR.__wrap(ret);
    }
    /**
    * Access the ID for register A.
    * @returns {RegId}
    */
    ra() {
        const ret = wasm.add_ra(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register B.
    * @returns {RegId}
    */
    rb() {
        const ret = wasm.add_rb(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register C.
    * @returns {RegId}
    */
    rc() {
        const ret = wasm.add_rc(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
}
module.exports.TR = TR;
/**
*Transfer coins to a variable output.
*/
class TRO {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(TRO.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_tro_free(ptr);
    }
    /**
    * Construct the instruction from its parts.
    * @param {RegId} contract_id_addr
    * @param {RegId} output_index
    * @param {RegId} amount
    * @param {RegId} asset_id_addr
    */
    constructor(contract_id_addr, output_index, amount, asset_id_addr) {
        _assertClass(contract_id_addr, RegId);
        var ptr0 = contract_id_addr.__destroy_into_raw();
        _assertClass(output_index, RegId);
        var ptr1 = output_index.__destroy_into_raw();
        _assertClass(amount, RegId);
        var ptr2 = amount.__destroy_into_raw();
        _assertClass(asset_id_addr, RegId);
        var ptr3 = asset_id_addr.__destroy_into_raw();
        const ret = wasm.call_new(ptr0, ptr1, ptr2, ptr3);
        return TRO.__wrap(ret);
    }
    /**
    * Access the ID for register A.
    * @returns {RegId}
    */
    ra() {
        const ret = wasm.add_ra(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register B.
    * @returns {RegId}
    */
    rb() {
        const ret = wasm.add_rb(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register C.
    * @returns {RegId}
    */
    rc() {
        const ret = wasm.add_rc(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register D.
    * @returns {RegId}
    */
    rd() {
        const ret = wasm.call_rd(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
}
module.exports.TRO = TRO;
/**
* Representation of a single instruction for the interpreter.
*
* The opcode is represented in the tag (variant), or may be retrieved in the
* form of an `Opcode` byte using the `opcode` method.
*
* The register and immediate data associated with the instruction is represented
* within an inner unit type wrapper around the 3 remaining bytes.
*/
class TypescriptInstruction {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(TypescriptInstruction.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_typescriptinstruction_free(ptr);
    }
    /**
    * Convenience method for converting to bytes
    * @returns {Uint8Array}
    */
    to_bytes() {
        try {
            const ptr = this.__destroy_into_raw();
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.typescriptinstruction_to_bytes(retptr, ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * Size of an instruction in bytes
    * @returns {number}
    */
    static size() {
        const ret = wasm.typescriptinstruction_size();
        return ret >>> 0;
    }
}
module.exports.TypescriptInstruction = TypescriptInstruction;
/**
*AddMod 128bit
*/
class WDAM {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(WDAM.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_wdam_free(ptr);
    }
    /**
    * Construct the instruction from its parts.
    * @param {RegId} dst
    * @param {RegId} add_lhs
    * @param {RegId} add_rhs
    * @param {RegId} modulo
    */
    constructor(dst, add_lhs, add_rhs, modulo) {
        _assertClass(dst, RegId);
        var ptr0 = dst.__destroy_into_raw();
        _assertClass(add_lhs, RegId);
        var ptr1 = add_lhs.__destroy_into_raw();
        _assertClass(add_rhs, RegId);
        var ptr2 = add_rhs.__destroy_into_raw();
        _assertClass(modulo, RegId);
        var ptr3 = modulo.__destroy_into_raw();
        const ret = wasm.call_new(ptr0, ptr1, ptr2, ptr3);
        return WDAM.__wrap(ret);
    }
    /**
    * Access the ID for register A.
    * @returns {RegId}
    */
    ra() {
        const ret = wasm.add_ra(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register B.
    * @returns {RegId}
    */
    rb() {
        const ret = wasm.add_rb(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register C.
    * @returns {RegId}
    */
    rc() {
        const ret = wasm.add_rc(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register D.
    * @returns {RegId}
    */
    rd() {
        const ret = wasm.call_rd(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
}
module.exports.WDAM = WDAM;
/**
*Compare 128bit integers
*/
class WDCM {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(WDCM.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_wdcm_free(ptr);
    }
    /**
    * Construct the instruction from its parts.
    * @param {RegId} dst
    * @param {RegId} lhs
    * @param {RegId} rhs
    * @param {Imm06} flags
    */
    constructor(dst, lhs, rhs, flags) {
        _assertClass(dst, RegId);
        var ptr0 = dst.__destroy_into_raw();
        _assertClass(lhs, RegId);
        var ptr1 = lhs.__destroy_into_raw();
        _assertClass(rhs, RegId);
        var ptr2 = rhs.__destroy_into_raw();
        _assertClass(flags, Imm06);
        var ptr3 = flags.__destroy_into_raw();
        const ret = wasm.call_new(ptr0, ptr1, ptr2, ptr3);
        return WDCM.__wrap(ret);
    }
    /**
    * Access the ID for register A.
    * @returns {RegId}
    */
    ra() {
        const ret = wasm.add_ra(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register B.
    * @returns {RegId}
    */
    rb() {
        const ret = wasm.add_rb(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register C.
    * @returns {RegId}
    */
    rc() {
        const ret = wasm.add_rc(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the 6-bit immediate value.
    * @returns {Imm06}
    */
    imm06() {
        const ret = wasm.call_rd(this.__wbg_ptr);
        return Imm06.__wrap(ret);
    }
    /**
    * Construct a `WDCM` instruction from its arguments.
    * @param {RegId} ra
    * @param {RegId} rb
    * @param {RegId} rc
    * @param {CompareArgs} args
    * @returns {WDCM}
    */
    static from_args(ra, rb, rc, args) {
        _assertClass(ra, RegId);
        var ptr0 = ra.__destroy_into_raw();
        _assertClass(rb, RegId);
        var ptr1 = rb.__destroy_into_raw();
        _assertClass(rc, RegId);
        var ptr2 = rc.__destroy_into_raw();
        _assertClass(args, CompareArgs);
        var ptr3 = args.__destroy_into_raw();
        const ret = wasm.wdcm_from_args(ptr0, ptr1, ptr2, ptr3);
        return WDCM.__wrap(ret);
    }
}
module.exports.WDCM = WDCM;
/**
*Divide 128bit
*/
class WDDV {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(WDDV.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_wddv_free(ptr);
    }
    /**
    * Construct the instruction from its parts.
    * @param {RegId} dst
    * @param {RegId} lhs
    * @param {RegId} rhs
    * @param {Imm06} flags
    */
    constructor(dst, lhs, rhs, flags) {
        _assertClass(dst, RegId);
        var ptr0 = dst.__destroy_into_raw();
        _assertClass(lhs, RegId);
        var ptr1 = lhs.__destroy_into_raw();
        _assertClass(rhs, RegId);
        var ptr2 = rhs.__destroy_into_raw();
        _assertClass(flags, Imm06);
        var ptr3 = flags.__destroy_into_raw();
        const ret = wasm.call_new(ptr0, ptr1, ptr2, ptr3);
        return WDDV.__wrap(ret);
    }
    /**
    * Access the ID for register A.
    * @returns {RegId}
    */
    ra() {
        const ret = wasm.add_ra(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register B.
    * @returns {RegId}
    */
    rb() {
        const ret = wasm.add_rb(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register C.
    * @returns {RegId}
    */
    rc() {
        const ret = wasm.add_rc(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the 6-bit immediate value.
    * @returns {Imm06}
    */
    imm06() {
        const ret = wasm.call_rd(this.__wbg_ptr);
        return Imm06.__wrap(ret);
    }
    /**
    * Construct a `WDDV` instruction from its arguments.
    * @param {RegId} ra
    * @param {RegId} rb
    * @param {RegId} rc
    * @param {DivArgs} args
    * @returns {WDDV}
    */
    static from_args(ra, rb, rc, args) {
        _assertClass(ra, RegId);
        var ptr0 = ra.__destroy_into_raw();
        _assertClass(rb, RegId);
        var ptr1 = rb.__destroy_into_raw();
        _assertClass(rc, RegId);
        var ptr2 = rc.__destroy_into_raw();
        _assertClass(args, DivArgs);
        var ptr3 = args.__destroy_into_raw();
        const ret = wasm.wddv_from_args(ptr0, ptr1, ptr2, ptr3);
        return WDDV.__wrap(ret);
    }
}
module.exports.WDDV = WDDV;
/**
*Fused multiply-divide 128bit
*/
class WDMD {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(WDMD.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_wdmd_free(ptr);
    }
    /**
    * Construct the instruction from its parts.
    * @param {RegId} dst
    * @param {RegId} mul_lhs
    * @param {RegId} mul_rhs
    * @param {RegId} divisor
    */
    constructor(dst, mul_lhs, mul_rhs, divisor) {
        _assertClass(dst, RegId);
        var ptr0 = dst.__destroy_into_raw();
        _assertClass(mul_lhs, RegId);
        var ptr1 = mul_lhs.__destroy_into_raw();
        _assertClass(mul_rhs, RegId);
        var ptr2 = mul_rhs.__destroy_into_raw();
        _assertClass(divisor, RegId);
        var ptr3 = divisor.__destroy_into_raw();
        const ret = wasm.call_new(ptr0, ptr1, ptr2, ptr3);
        return WDMD.__wrap(ret);
    }
    /**
    * Access the ID for register A.
    * @returns {RegId}
    */
    ra() {
        const ret = wasm.add_ra(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register B.
    * @returns {RegId}
    */
    rb() {
        const ret = wasm.add_rb(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register C.
    * @returns {RegId}
    */
    rc() {
        const ret = wasm.add_rc(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register D.
    * @returns {RegId}
    */
    rd() {
        const ret = wasm.call_rd(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
}
module.exports.WDMD = WDMD;
/**
*Multiply 128bit
*/
class WDML {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(WDML.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_wdml_free(ptr);
    }
    /**
    * Construct the instruction from its parts.
    * @param {RegId} dst
    * @param {RegId} lhs
    * @param {RegId} rhs
    * @param {Imm06} flags
    */
    constructor(dst, lhs, rhs, flags) {
        _assertClass(dst, RegId);
        var ptr0 = dst.__destroy_into_raw();
        _assertClass(lhs, RegId);
        var ptr1 = lhs.__destroy_into_raw();
        _assertClass(rhs, RegId);
        var ptr2 = rhs.__destroy_into_raw();
        _assertClass(flags, Imm06);
        var ptr3 = flags.__destroy_into_raw();
        const ret = wasm.call_new(ptr0, ptr1, ptr2, ptr3);
        return WDML.__wrap(ret);
    }
    /**
    * Access the ID for register A.
    * @returns {RegId}
    */
    ra() {
        const ret = wasm.add_ra(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register B.
    * @returns {RegId}
    */
    rb() {
        const ret = wasm.add_rb(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register C.
    * @returns {RegId}
    */
    rc() {
        const ret = wasm.add_rc(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the 6-bit immediate value.
    * @returns {Imm06}
    */
    imm06() {
        const ret = wasm.call_rd(this.__wbg_ptr);
        return Imm06.__wrap(ret);
    }
    /**
    * Construct a `WDML` instruction from its arguments.
    * @param {RegId} ra
    * @param {RegId} rb
    * @param {RegId} rc
    * @param {MulArgs} args
    * @returns {WDML}
    */
    static from_args(ra, rb, rc, args) {
        _assertClass(ra, RegId);
        var ptr0 = ra.__destroy_into_raw();
        _assertClass(rb, RegId);
        var ptr1 = rb.__destroy_into_raw();
        _assertClass(rc, RegId);
        var ptr2 = rc.__destroy_into_raw();
        _assertClass(args, MulArgs);
        var ptr3 = args.__destroy_into_raw();
        const ret = wasm.wdml_from_args(ptr0, ptr1, ptr2, ptr3);
        return WDML.__wrap(ret);
    }
}
module.exports.WDML = WDML;
/**
*MulMod 128bit
*/
class WDMM {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(WDMM.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_wdmm_free(ptr);
    }
    /**
    * Construct the instruction from its parts.
    * @param {RegId} dst
    * @param {RegId} mul_lhs
    * @param {RegId} mul_rhs
    * @param {RegId} modulo
    */
    constructor(dst, mul_lhs, mul_rhs, modulo) {
        _assertClass(dst, RegId);
        var ptr0 = dst.__destroy_into_raw();
        _assertClass(mul_lhs, RegId);
        var ptr1 = mul_lhs.__destroy_into_raw();
        _assertClass(mul_rhs, RegId);
        var ptr2 = mul_rhs.__destroy_into_raw();
        _assertClass(modulo, RegId);
        var ptr3 = modulo.__destroy_into_raw();
        const ret = wasm.call_new(ptr0, ptr1, ptr2, ptr3);
        return WDMM.__wrap(ret);
    }
    /**
    * Access the ID for register A.
    * @returns {RegId}
    */
    ra() {
        const ret = wasm.add_ra(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register B.
    * @returns {RegId}
    */
    rb() {
        const ret = wasm.add_rb(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register C.
    * @returns {RegId}
    */
    rc() {
        const ret = wasm.add_rc(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register D.
    * @returns {RegId}
    */
    rd() {
        const ret = wasm.call_rd(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
}
module.exports.WDMM = WDMM;
/**
*Simple 128bit operations
*/
class WDOP {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(WDOP.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_wdop_free(ptr);
    }
    /**
    * Construct the instruction from its parts.
    * @param {RegId} dst
    * @param {RegId} lhs
    * @param {RegId} rhs
    * @param {Imm06} flags
    */
    constructor(dst, lhs, rhs, flags) {
        _assertClass(dst, RegId);
        var ptr0 = dst.__destroy_into_raw();
        _assertClass(lhs, RegId);
        var ptr1 = lhs.__destroy_into_raw();
        _assertClass(rhs, RegId);
        var ptr2 = rhs.__destroy_into_raw();
        _assertClass(flags, Imm06);
        var ptr3 = flags.__destroy_into_raw();
        const ret = wasm.call_new(ptr0, ptr1, ptr2, ptr3);
        return WDOP.__wrap(ret);
    }
    /**
    * Access the ID for register A.
    * @returns {RegId}
    */
    ra() {
        const ret = wasm.add_ra(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register B.
    * @returns {RegId}
    */
    rb() {
        const ret = wasm.add_rb(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register C.
    * @returns {RegId}
    */
    rc() {
        const ret = wasm.add_rc(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the 6-bit immediate value.
    * @returns {Imm06}
    */
    imm06() {
        const ret = wasm.call_rd(this.__wbg_ptr);
        return Imm06.__wrap(ret);
    }
    /**
    * Construct a `WDOP` instruction from its arguments.
    * @param {RegId} ra
    * @param {RegId} rb
    * @param {RegId} rc
    * @param {MathArgs} args
    * @returns {WDOP}
    */
    static from_args(ra, rb, rc, args) {
        _assertClass(ra, RegId);
        var ptr0 = ra.__destroy_into_raw();
        _assertClass(rb, RegId);
        var ptr1 = rb.__destroy_into_raw();
        _assertClass(rc, RegId);
        var ptr2 = rc.__destroy_into_raw();
        _assertClass(args, MathArgs);
        var ptr3 = args.__destroy_into_raw();
        const ret = wasm.wdop_from_args(ptr0, ptr1, ptr2, ptr3);
        return WDOP.__wrap(ret);
    }
}
module.exports.WDOP = WDOP;
/**
*AddMod 256bit
*/
class WQAM {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(WQAM.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_wqam_free(ptr);
    }
    /**
    * Construct the instruction from its parts.
    * @param {RegId} dst
    * @param {RegId} add_lhs
    * @param {RegId} add_rhs
    * @param {RegId} modulo
    */
    constructor(dst, add_lhs, add_rhs, modulo) {
        _assertClass(dst, RegId);
        var ptr0 = dst.__destroy_into_raw();
        _assertClass(add_lhs, RegId);
        var ptr1 = add_lhs.__destroy_into_raw();
        _assertClass(add_rhs, RegId);
        var ptr2 = add_rhs.__destroy_into_raw();
        _assertClass(modulo, RegId);
        var ptr3 = modulo.__destroy_into_raw();
        const ret = wasm.call_new(ptr0, ptr1, ptr2, ptr3);
        return WQAM.__wrap(ret);
    }
    /**
    * Access the ID for register A.
    * @returns {RegId}
    */
    ra() {
        const ret = wasm.add_ra(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register B.
    * @returns {RegId}
    */
    rb() {
        const ret = wasm.add_rb(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register C.
    * @returns {RegId}
    */
    rc() {
        const ret = wasm.add_rc(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register D.
    * @returns {RegId}
    */
    rd() {
        const ret = wasm.call_rd(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
}
module.exports.WQAM = WQAM;
/**
*Compare 256bit integers
*/
class WQCM {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(WQCM.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_wqcm_free(ptr);
    }
    /**
    * Construct the instruction from its parts.
    * @param {RegId} dst
    * @param {RegId} lhs
    * @param {RegId} rhs
    * @param {Imm06} flags
    */
    constructor(dst, lhs, rhs, flags) {
        _assertClass(dst, RegId);
        var ptr0 = dst.__destroy_into_raw();
        _assertClass(lhs, RegId);
        var ptr1 = lhs.__destroy_into_raw();
        _assertClass(rhs, RegId);
        var ptr2 = rhs.__destroy_into_raw();
        _assertClass(flags, Imm06);
        var ptr3 = flags.__destroy_into_raw();
        const ret = wasm.call_new(ptr0, ptr1, ptr2, ptr3);
        return WQCM.__wrap(ret);
    }
    /**
    * Access the ID for register A.
    * @returns {RegId}
    */
    ra() {
        const ret = wasm.add_ra(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register B.
    * @returns {RegId}
    */
    rb() {
        const ret = wasm.add_rb(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register C.
    * @returns {RegId}
    */
    rc() {
        const ret = wasm.add_rc(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the 6-bit immediate value.
    * @returns {Imm06}
    */
    imm06() {
        const ret = wasm.call_rd(this.__wbg_ptr);
        return Imm06.__wrap(ret);
    }
    /**
    * Construct a `WQCM` instruction from its arguments.
    * @param {RegId} ra
    * @param {RegId} rb
    * @param {RegId} rc
    * @param {CompareArgs} args
    * @returns {WQCM}
    */
    static from_args(ra, rb, rc, args) {
        _assertClass(ra, RegId);
        var ptr0 = ra.__destroy_into_raw();
        _assertClass(rb, RegId);
        var ptr1 = rb.__destroy_into_raw();
        _assertClass(rc, RegId);
        var ptr2 = rc.__destroy_into_raw();
        _assertClass(args, CompareArgs);
        var ptr3 = args.__destroy_into_raw();
        const ret = wasm.wdcm_from_args(ptr0, ptr1, ptr2, ptr3);
        return WQCM.__wrap(ret);
    }
}
module.exports.WQCM = WQCM;
/**
*Divide 256bit
*/
class WQDV {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(WQDV.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_wqdv_free(ptr);
    }
    /**
    * Construct the instruction from its parts.
    * @param {RegId} dst
    * @param {RegId} lhs
    * @param {RegId} rhs
    * @param {Imm06} flags
    */
    constructor(dst, lhs, rhs, flags) {
        _assertClass(dst, RegId);
        var ptr0 = dst.__destroy_into_raw();
        _assertClass(lhs, RegId);
        var ptr1 = lhs.__destroy_into_raw();
        _assertClass(rhs, RegId);
        var ptr2 = rhs.__destroy_into_raw();
        _assertClass(flags, Imm06);
        var ptr3 = flags.__destroy_into_raw();
        const ret = wasm.call_new(ptr0, ptr1, ptr2, ptr3);
        return WQDV.__wrap(ret);
    }
    /**
    * Access the ID for register A.
    * @returns {RegId}
    */
    ra() {
        const ret = wasm.add_ra(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register B.
    * @returns {RegId}
    */
    rb() {
        const ret = wasm.add_rb(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register C.
    * @returns {RegId}
    */
    rc() {
        const ret = wasm.add_rc(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the 6-bit immediate value.
    * @returns {Imm06}
    */
    imm06() {
        const ret = wasm.call_rd(this.__wbg_ptr);
        return Imm06.__wrap(ret);
    }
    /**
    * Construct a `WQDV` instruction from its arguments.
    * @param {RegId} ra
    * @param {RegId} rb
    * @param {RegId} rc
    * @param {DivArgs} args
    * @returns {WQDV}
    */
    static from_args(ra, rb, rc, args) {
        _assertClass(ra, RegId);
        var ptr0 = ra.__destroy_into_raw();
        _assertClass(rb, RegId);
        var ptr1 = rb.__destroy_into_raw();
        _assertClass(rc, RegId);
        var ptr2 = rc.__destroy_into_raw();
        _assertClass(args, DivArgs);
        var ptr3 = args.__destroy_into_raw();
        const ret = wasm.wddv_from_args(ptr0, ptr1, ptr2, ptr3);
        return WQDV.__wrap(ret);
    }
}
module.exports.WQDV = WQDV;
/**
*Fused multiply-divide 256bit
*/
class WQMD {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(WQMD.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_wqmd_free(ptr);
    }
    /**
    * Construct the instruction from its parts.
    * @param {RegId} dst
    * @param {RegId} mul_lhs
    * @param {RegId} mul_rhs
    * @param {RegId} divisor
    */
    constructor(dst, mul_lhs, mul_rhs, divisor) {
        _assertClass(dst, RegId);
        var ptr0 = dst.__destroy_into_raw();
        _assertClass(mul_lhs, RegId);
        var ptr1 = mul_lhs.__destroy_into_raw();
        _assertClass(mul_rhs, RegId);
        var ptr2 = mul_rhs.__destroy_into_raw();
        _assertClass(divisor, RegId);
        var ptr3 = divisor.__destroy_into_raw();
        const ret = wasm.call_new(ptr0, ptr1, ptr2, ptr3);
        return WQMD.__wrap(ret);
    }
    /**
    * Access the ID for register A.
    * @returns {RegId}
    */
    ra() {
        const ret = wasm.add_ra(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register B.
    * @returns {RegId}
    */
    rb() {
        const ret = wasm.add_rb(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register C.
    * @returns {RegId}
    */
    rc() {
        const ret = wasm.add_rc(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register D.
    * @returns {RegId}
    */
    rd() {
        const ret = wasm.call_rd(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
}
module.exports.WQMD = WQMD;
/**
*Multiply 256bit
*/
class WQML {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(WQML.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_wqml_free(ptr);
    }
    /**
    * Construct the instruction from its parts.
    * @param {RegId} dst
    * @param {RegId} lhs
    * @param {RegId} rhs
    * @param {Imm06} flags
    */
    constructor(dst, lhs, rhs, flags) {
        _assertClass(dst, RegId);
        var ptr0 = dst.__destroy_into_raw();
        _assertClass(lhs, RegId);
        var ptr1 = lhs.__destroy_into_raw();
        _assertClass(rhs, RegId);
        var ptr2 = rhs.__destroy_into_raw();
        _assertClass(flags, Imm06);
        var ptr3 = flags.__destroy_into_raw();
        const ret = wasm.call_new(ptr0, ptr1, ptr2, ptr3);
        return WQML.__wrap(ret);
    }
    /**
    * Access the ID for register A.
    * @returns {RegId}
    */
    ra() {
        const ret = wasm.add_ra(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register B.
    * @returns {RegId}
    */
    rb() {
        const ret = wasm.add_rb(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register C.
    * @returns {RegId}
    */
    rc() {
        const ret = wasm.add_rc(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the 6-bit immediate value.
    * @returns {Imm06}
    */
    imm06() {
        const ret = wasm.call_rd(this.__wbg_ptr);
        return Imm06.__wrap(ret);
    }
    /**
    * Construct a `WQML` instruction from its arguments.
    * @param {RegId} ra
    * @param {RegId} rb
    * @param {RegId} rc
    * @param {MulArgs} args
    * @returns {WQML}
    */
    static from_args(ra, rb, rc, args) {
        _assertClass(ra, RegId);
        var ptr0 = ra.__destroy_into_raw();
        _assertClass(rb, RegId);
        var ptr1 = rb.__destroy_into_raw();
        _assertClass(rc, RegId);
        var ptr2 = rc.__destroy_into_raw();
        _assertClass(args, MulArgs);
        var ptr3 = args.__destroy_into_raw();
        const ret = wasm.wdml_from_args(ptr0, ptr1, ptr2, ptr3);
        return WQML.__wrap(ret);
    }
}
module.exports.WQML = WQML;
/**
*MulMod 256bit
*/
class WQMM {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(WQMM.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_wqmm_free(ptr);
    }
    /**
    * Construct the instruction from its parts.
    * @param {RegId} dst
    * @param {RegId} mul_lhs
    * @param {RegId} mul_rhs
    * @param {RegId} modulo
    */
    constructor(dst, mul_lhs, mul_rhs, modulo) {
        _assertClass(dst, RegId);
        var ptr0 = dst.__destroy_into_raw();
        _assertClass(mul_lhs, RegId);
        var ptr1 = mul_lhs.__destroy_into_raw();
        _assertClass(mul_rhs, RegId);
        var ptr2 = mul_rhs.__destroy_into_raw();
        _assertClass(modulo, RegId);
        var ptr3 = modulo.__destroy_into_raw();
        const ret = wasm.call_new(ptr0, ptr1, ptr2, ptr3);
        return WQMM.__wrap(ret);
    }
    /**
    * Access the ID for register A.
    * @returns {RegId}
    */
    ra() {
        const ret = wasm.add_ra(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register B.
    * @returns {RegId}
    */
    rb() {
        const ret = wasm.add_rb(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register C.
    * @returns {RegId}
    */
    rc() {
        const ret = wasm.add_rc(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register D.
    * @returns {RegId}
    */
    rd() {
        const ret = wasm.call_rd(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
}
module.exports.WQMM = WQMM;
/**
*Simple 256bit operations
*/
class WQOP {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(WQOP.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_wqop_free(ptr);
    }
    /**
    * Construct the instruction from its parts.
    * @param {RegId} dst
    * @param {RegId} lhs
    * @param {RegId} rhs
    * @param {Imm06} flags
    */
    constructor(dst, lhs, rhs, flags) {
        _assertClass(dst, RegId);
        var ptr0 = dst.__destroy_into_raw();
        _assertClass(lhs, RegId);
        var ptr1 = lhs.__destroy_into_raw();
        _assertClass(rhs, RegId);
        var ptr2 = rhs.__destroy_into_raw();
        _assertClass(flags, Imm06);
        var ptr3 = flags.__destroy_into_raw();
        const ret = wasm.call_new(ptr0, ptr1, ptr2, ptr3);
        return WQOP.__wrap(ret);
    }
    /**
    * Access the ID for register A.
    * @returns {RegId}
    */
    ra() {
        const ret = wasm.add_ra(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register B.
    * @returns {RegId}
    */
    rb() {
        const ret = wasm.add_rb(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register C.
    * @returns {RegId}
    */
    rc() {
        const ret = wasm.add_rc(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the 6-bit immediate value.
    * @returns {Imm06}
    */
    imm06() {
        const ret = wasm.call_rd(this.__wbg_ptr);
        return Imm06.__wrap(ret);
    }
    /**
    * Construct a `WQOP` instruction from its arguments.
    * @param {RegId} ra
    * @param {RegId} rb
    * @param {RegId} rc
    * @param {MathArgs} args
    * @returns {WQOP}
    */
    static from_args(ra, rb, rc, args) {
        _assertClass(ra, RegId);
        var ptr0 = ra.__destroy_into_raw();
        _assertClass(rb, RegId);
        var ptr1 = rb.__destroy_into_raw();
        _assertClass(rc, RegId);
        var ptr2 = rc.__destroy_into_raw();
        _assertClass(args, MathArgs);
        var ptr3 = args.__destroy_into_raw();
        const ret = wasm.wdop_from_args(ptr0, ptr1, ptr2, ptr3);
        return WQOP.__wrap(ret);
    }
}
module.exports.WQOP = WQOP;
/**
*Bitwise XORs two registers.
*/
class XOR {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(XOR.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_xor_free(ptr);
    }
    /**
    * Construct the instruction from its parts.
    * @param {RegId} dst
    * @param {RegId} lhs
    * @param {RegId} rhs
    */
    constructor(dst, lhs, rhs) {
        _assertClass(dst, RegId);
        var ptr0 = dst.__destroy_into_raw();
        _assertClass(lhs, RegId);
        var ptr1 = lhs.__destroy_into_raw();
        _assertClass(rhs, RegId);
        var ptr2 = rhs.__destroy_into_raw();
        const ret = wasm.add_new(ptr0, ptr1, ptr2);
        return XOR.__wrap(ret);
    }
    /**
    * Access the ID for register A.
    * @returns {RegId}
    */
    ra() {
        const ret = wasm.add_ra(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register B.
    * @returns {RegId}
    */
    rb() {
        const ret = wasm.add_rb(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register C.
    * @returns {RegId}
    */
    rc() {
        const ret = wasm.add_rc(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
}
module.exports.XOR = XOR;
/**
*Bitwise XORs a register and an immediate value.
*/
class XORI {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(XORI.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_xori_free(ptr);
    }
    /**
    * Construct the instruction from its parts.
    * @param {RegId} dst
    * @param {RegId} lhs
    * @param {Imm12} rhs
    */
    constructor(dst, lhs, rhs) {
        _assertClass(dst, RegId);
        var ptr0 = dst.__destroy_into_raw();
        _assertClass(lhs, RegId);
        var ptr1 = lhs.__destroy_into_raw();
        _assertClass(rhs, Imm12);
        var ptr2 = rhs.__destroy_into_raw();
        const ret = wasm.addi_new(ptr0, ptr1, ptr2);
        return XORI.__wrap(ret);
    }
    /**
    * Access the ID for register A.
    * @returns {RegId}
    */
    ra() {
        const ret = wasm.add_ra(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the ID for register B.
    * @returns {RegId}
    */
    rb() {
        const ret = wasm.add_rb(this.__wbg_ptr);
        return RegId.__wrap(ret);
    }
    /**
    * Access the 12-bit immediate value.
    * @returns {Imm12}
    */
    imm12() {
        const ret = wasm.addi_imm12(this.__wbg_ptr);
        return Imm12.__wrap(ret);
    }
}
module.exports.XORI = XORI;

module.exports.__wbindgen_throw = function(arg0, arg1) {
    throw new Error(getStringFromWasm0(arg0, arg1));
};

const path = require('path').join(__dirname, 'fuel_asm_bg.wasm');
const bytes = require('fs').readFileSync(path);

const wasmModule = new WebAssembly.Module(bytes);
const wasmInstance = new WebAssembly.Instance(wasmModule, imports);
wasm = wasmInstance.exports;
module.exports.__wasm = wasm;


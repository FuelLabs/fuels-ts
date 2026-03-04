// #region main
import { FuelAsm } from 'fuels';

// @ts-expect-error method reference missing in DTS
await FuelAsm.initWasm();

const programBytes = Uint8Array.from([
  ...FuelAsm.move_(0x10, 0x01).to_bytes(), // set r[0x10] := $one
  ...FuelAsm.slli(0x20, 0x10, 5).to_bytes(), // set r[0x20] := `r[0x10] << 5 == 32`
  ...FuelAsm.slli(0x21, 0x10, 6).to_bytes(), // set r[0x21] := `r[0x10] << 6 == 64`
  ...FuelAsm.aloc(0x21).to_bytes(), // alloc `r[0x21] == 64` to the heap
  ...FuelAsm.addi(0x10, 0x07, 1).to_bytes(), // set r[0x10] := `$hp + 1` (allocated heap)
  ...FuelAsm.move_(0x11, 0x04).to_bytes(), // set r[0x11] := $ssp
  ...FuelAsm.add(0x12, 0x04, 0x20).to_bytes(), // set r[0x12] := `$ssp + r[0x20]`
  ...FuelAsm.eck1(0x10, 0x11, 0x12).to_bytes(), // recover public key in memory[r[0x10], 64]
  ...FuelAsm.ret(0x01).to_bytes(), // return `1`
]);

console.log('Bytes', programBytes);
// #endregion main

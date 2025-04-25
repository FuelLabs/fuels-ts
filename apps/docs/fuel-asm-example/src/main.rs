// #region main
use fuel_asm::*;

fn main() {

  let program = vec![
    op::move_(0x10, 0x01),      // set r[0x10] := $one
    op::slli(0x20, 0x10, 5),    // set r[0x20] := `r[0x10] << 5 == 32`
    op::slli(0x21, 0x10, 6),    // set r[0x21] := `r[0x10] << 6 == 64`
    op::aloc(0x21),             // alloc `r[0x21] == 64` to the heap
    op::addi(0x10, 0x07, 1),    // set r[0x10] := `$hp + 1` (allocated heap)
    op::move_(0x11, 0x04),      // set r[0x11] := $ssp
    op::add(0x12, 0x04, 0x20),  // set r[0x12] := `$ssp + r[0x20]`
    op::eck1(0x10, 0x11, 0x12), // recover public key in memory[r[0x10], 64]
    op::ret(0x01),              // return `1`
  ];

  let bytes: Vec<u8> = program.iter().copied().collect();

  println!("Bytes: {:#?}", bytes);

}
// #endregion main

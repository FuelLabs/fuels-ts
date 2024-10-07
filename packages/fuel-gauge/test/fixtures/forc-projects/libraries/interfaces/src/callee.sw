library;

use std::bytes::Bytes;

abi IBaseCallee {
    #[storage(read, write)]
    fn hook(sender: Identity, amount_0: u64, amount_1: u64, data: Bytes);
}

contract;

use std::{b512::B512, tx::{tx_witness_data}};

abi ConditionalLoopContract {
    fn loop();
}

impl ConditionalLoopContract for Contract {
    fn loop() {
        let witness:B512 = tx_witness_data(0).unwrap();

        let mut to_loop = 5;

        if witness != B512::zero() {
            to_loop = 10;
        }

        let mut i = 0;

        while (i <= to_loop) {
            i = i + 1;
        }
    }
}

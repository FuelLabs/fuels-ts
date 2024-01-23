contract;

use std::logging::log;

use advanced_logging_other_contract_abi::AdvancedLoggingOtherContract;

impl AbiEncode for str[25] {
    fn abi_encode(self, ref mut buffer: Buffer) {
        let s = from_str_array(self);

        let len = s.len();
        let ptr = s.as_ptr();

        let mut i = 0;
        while i < len {
            let byte = ptr.add::<u8>(i).read::<u8>();
            buffer.push(byte);
            i += 1;
        }
    }
}

impl AbiEncode for str[34] {
    fn abi_encode(self, ref mut buffer: Buffer) {
        let s = from_str_array(self);

        let len = s.len();
        let ptr = s.as_ptr();

        let mut i = 0;
        while i < len {
            let byte = ptr.add::<u8>(i).read::<u8>();
            buffer.push(byte);
            i += 1;
        }
    }
}

impl AdvancedLoggingOtherContract for Contract {
    fn msg_from_other_contract(a: u8) {
        log(__to_str_array("Hello from other Contract"));
        log(__to_str_array("Received value from main Contract:"));
        log(a);
    }
}

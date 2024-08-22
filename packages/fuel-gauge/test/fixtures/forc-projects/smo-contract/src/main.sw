contract;

use std::bytes::Bytes;
use std::string::String;
use std::message::send_typed_message;

abi SMOContract {
    #[payable]
    fn send_typed_message_bool(recipient: b256, msg_data: bool, coins: u64);
}

impl SMOContract for Contract {
    #[payable]
    fn send_typed_message_bool(recipient: b256, msg_data: bool, coins: u64) {
        send_typed_message(recipient, msg_data, coins);
    }
}

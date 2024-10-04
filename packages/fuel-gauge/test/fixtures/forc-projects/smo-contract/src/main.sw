contract;

use std::message::send_typed_message;
use std::bytes::Bytes;

abi SMOContract {
    #[payable]
    fn send_typed_message_bool(recipient: b256, msg_data: bool, coins: u64);
    #[payable]
    fn send_typed_message_u8(recipient: b256, msg_data: u8, coins: u64);
    #[payable]
    fn send_typed_message_bytes(recipient: b256, msg_data: Bytes, coins: u64);
}

impl SMOContract for Contract {
    #[payable]
    fn send_typed_message_bool(recipient: b256, msg_data: bool, coins: u64) {
        send_typed_message(recipient, msg_data, coins);
    }
    #[payable]
    fn send_typed_message_u8(recipient: b256, msg_data: u8, coins: u64) {
        send_typed_message(recipient, msg_data, coins);
    }
    #[payable]
    fn send_typed_message_bytes(recipient: b256, msg_data: Bytes, coins: u64) {
        send_typed_message(recipient, msg_data, coins);
    }
}

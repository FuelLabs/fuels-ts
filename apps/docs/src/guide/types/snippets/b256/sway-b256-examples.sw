contract;

// B256 is a primitive 256-bit type in Sway

// 1. Declaring a b256 literal
const MY_ADDRESS: b256 = 0xbebd3baab326f895289ecbd4210cf886ce41952316441ae4cac35f00f0e882a6;

// 2. Converting between b256 and Address
use std::address::Address;

fn example_address_conversion() -> b256 {
    // Create Address from b256
    let addr: Address = Address::from(MY_ADDRESS);
    
    // Convert back to b256
    let back_to_b256: b256 = addr.into();
    
    back_to_b256
}

// 3. Converting between b256 and ContractId
use std::contract_id::ContractId;

fn example_contract_id() -> ContractId {
    let contract_id: ContractId = ContractId::from(MY_ADDRESS);
    contract_id
}

// 4. Using Identity enum (Address or ContractId)
use std::call_frames::msg_sender;

fn check_caller() {
    let sender: Identity = msg_sender().unwrap();
    
    // Pattern matching on Identity
    match sender {
        Identity::Address(addr) => {
            // Handle address (e.g., wallet)
            log(addr);
        },
        Identity::ContractId(contract_id) => {
            // Handle contract ID (e.g., another contract)
            log(contract_id);
        },
    }
}

// 5. b256 in function parameters and returns
fn process_hash(input_hash: b256) -> b256 {
    // Process the b256 value
    input_hash
}

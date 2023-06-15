// #region liquidity-pool-contract
contract;

use std::{
    call_frames::{
        contract_id,
        msg_asset_id,
    },
    context::msg_amount,
    token::{
        mint_to_address,
        transfer_to_address,
    },
};

abi LiquidityPool {
    #[storage(write)]
    fn set_base_token(base_token_id: b256) -> ();

    #[storage(read), payable]
    fn deposit(recipient: Address);

    #[storage(read), payable]
    fn withdraw(recipient: Address);
}

storage {
    base_token: b256 = 0x0000000000000000000000000000000000000000000000000000000000000000,
}

impl LiquidityPool for Contract {
    #[storage(write)]
    fn set_base_token(base_token_id: b256) {
        storage.base_token.write(base_token_id);
    }

    #[storage(read), payable]
    fn deposit(recipient: Address) {
        log(msg_asset_id());
        log(msg_amount());
        log(msg_amount());
        assert(ContractId::from(storage.base_token.read()) == msg_asset_id());
        assert(0 < msg_amount());

        // Mint two times the amount.
        let amount_to_mint = msg_amount() * 2;

        // Mint some LP token based upon the amount of the base token.
        mint_to_address(amount_to_mint, recipient);
    }

    #[storage(read), payable]
    fn withdraw(recipient: Address) {
        assert(contract_id() == msg_asset_id());
        assert(0 < msg_amount());

        // Amount to withdraw.
        let amount_to_transfer = msg_amount() / 2;

        // Transfer base token to recipient.
        transfer_to_address(amount_to_transfer, ContractId::from(storage.base_token.read()), recipient);
    }
}
// #endregion liquidity-pool-contract

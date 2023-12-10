// #region liquidity-pool-contract
contract;

use std::constants::ZERO_B256;

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
    base_token: AssetId = AssetId {
        value: 0x0000000000000000000000000000000000000000000000000000000000000000,
    },
}

impl LiquidityPool for Contract {
    #[storage(write)]
    fn set_base_token(base_token_id: b256) {
        storage
            .base_token
            .write(AssetId {
                value: base_token_id,
            });
    }

    #[storage(read), payable]
    fn deposit(recipient: Address) {
        log(msg_asset_id());
        log(msg_amount());
        log(msg_amount());
        assert(storage.base_token.read() == msg_asset_id());
        assert(0 < msg_amount());

        // Mint two times the amount.
        let amount_to_mint = msg_amount() * 2;

        // Mint some LP token based upon the amount of the base token.
        mint_to_address(recipient, ZERO_B256, amount_to_mint);
    }

    #[storage(read), payable]
    fn withdraw(recipient: Address) {
        assert(0 < msg_amount());

        // Amount to withdraw.
        let amount_to_transfer = msg_amount() / 2;

        // Transfer base token to recipient.
        transfer_to_address(recipient, storage.base_token.read(), amount_to_transfer);
    }
}
// #endregion liquidity-pool-contract

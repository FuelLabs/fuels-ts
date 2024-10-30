// #region deposit-and-withdraw-cookbook-1
contract;

use std::{asset::{mint_to, transfer,}, call_frames::{msg_asset_id,}, context::msg_amount,};
use std::constants::ZERO_B256;

abi LiquidityPool {
    #[payable]
    fn deposit(recipient: Address);
    #[payable]
    fn withdraw(recipient: Address);
}

configurable {
    TOKEN: AssetId = AssetId::from(0x0000000000000000000000000000000000000000000000000000000000000000),
}

impl LiquidityPool for Contract {
    #[payable]
    fn deposit(recipient: Address) {
        assert(TOKEN == msg_asset_id());
        assert(0 < msg_amount());

        // Mint two times the amount.
        let amount_to_mint = msg_amount() * 2;

        // Mint some LP token based upon the amount of the base token.
        mint_to(Identity::Address(recipient), ZERO_B256, amount_to_mint);
    }

    #[payable]
    fn withdraw(recipient: Address) {
        assert(0 < msg_amount());

        // Amount to withdraw.
        let amount_to_transfer = msg_amount() / 2;

        // Transfer base token to recipient.
        transfer(Identity::Address(recipient), TOKEN, amount_to_transfer);
    }
}
// #endregion deposit-and-withdraw-cookbook-1

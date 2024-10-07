contract;

use standards::{
    src20::{
        SetDecimalsEvent,
        SetNameEvent,
        SetSymbolEvent,
        SRC20,
        TotalSupplyEvent,
    },
    src3::SRC3,
};
use std::{
    asset::{
        burn,
        mint_to,
    },
    auth::msg_sender,
    call_frames::msg_asset_id,
    constants::DEFAULT_SUB_ID,
    context::msg_amount,
    hash::Hash,
    storage::storage_string::*,
    string::String,
};

// In this example, all assets minted from this contract have the same decimals, name, and symbol
configurable {
    /// The decimals of every asset minted by this contract.
    DECIMALS: u8 = 9u8,
    /// The name of every asset minted by this contract.
    NAME: str[13] = __to_str_array("TorresToken00"),
    /// The symbol of every asset minted by this contract.
    SYMBOL: str[2] = __to_str_array("EA"),
}

storage {
    /// The total number of distinguishable assets this contract has minted.
    total_assets: u64 = 0,
    /// The total supply of a particular asset.
    total_supply: StorageMap<AssetId, u64> = StorageMap {},
}

impl SRC3 for Contract {
    /// Unconditionally mints new assets using the `sub_id` sub-identifier.
    ///
    /// # Arguments
    ///
    /// * `recipient`: [Identity] - The user to which the newly minted asset is transferred to.
    /// * `sub_id`: [Option<SubId>] - The sub-identifier of the newly minted asset.
    /// * `amount`: [u64] - The quantity of coins to mint.
    ///
    /// # Number of Storage Accesses
    ///
    /// * Reads: `2`
    /// * Writes: `2`
    ///
    /// # Examples
    ///
    /// ```sway
    /// use src3::SRC3;
    /// use std::constants::DEFAULT_SUB_ID;
    ///
    /// fn foo(contract_id: ContractId) {
    ///     let contract_abi = abi(SRC3, contract_id);
    ///     contract_abi.mint(Identity::ContractId(contract_id), Some(DEFAULT_SUB_ID), 100);
    /// }
    /// ```
    #[storage(read, write)]
    fn mint(recipient: Identity, sub_id: Option<SubId>, amount: u64) {
        let sub_id = match sub_id {
            Some(s) => s,
            None => DEFAULT_SUB_ID,
        };
        let asset_id = AssetId::new(ContractId::this(), sub_id);

        // If this SubId is new, increment the total number of distinguishable assets this contract has minted.
        let asset_supply = storage.total_supply.get(asset_id).try_read();
        match asset_supply {
            None => {
                storage.total_assets.write(storage.total_assets.read() + 1)
            },
            _ => {},
        }

        // Increment total supply of the asset and mint to the recipient.
        let new_supply = amount + asset_supply.unwrap_or(0);
        storage.total_supply.insert(asset_id, new_supply);

        mint_to(recipient, sub_id, amount);

        TotalSupplyEvent::new(asset_id, new_supply, msg_sender().unwrap())
            .log();
    }

    /// Unconditionally burns assets sent with the `sub_id` sub-identifier.
    ///
    /// # Arguments
    ///
    /// * `sub_id`: [SubId] - The sub-identifier of the asset to burn.
    /// * `amount`: [u64] - The quantity of coins to burn.
    ///
    /// # Number of Storage Accesses
    ///
    /// * Reads: `1`
    /// * Writes: `1`
    ///
    /// # Reverts
    ///
    /// * When the transaction did not include at least `amount` coins.
    /// * When the asset included in the transaction does not have the SubId `sub_id`.
    ///
    /// # Examples
    ///
    /// ```sway
    /// use src3::SRC3;
    /// use std::constants::DEFAULT_SUB_ID;
    ///
    /// fn foo(contract_id: ContractId, asset_id: AssetId) {
    ///     let contract_abi = abi(SRC3, contract_id);
    ///     contract_abi {
    ///         gas: 10000,
    ///         coins: 100,
    ///         asset_id: asset_id,
    ///     }.burn(DEFAULT_SUB_ID, 100);
    /// }
    /// ```
    #[payable]
    #[storage(read, write)]
    fn burn(sub_id: SubId, amount: u64) {
        let asset_id = AssetId::new(ContractId::this(), sub_id);
        require(msg_amount() == amount, "Incorrect amount provided");
        require(msg_asset_id() == asset_id, "Incorrect asset provided");

        // Decrement total supply of the asset and burn.
        let new_supply = storage.total_supply.get(asset_id).read() - amount;
        storage.total_supply.insert(asset_id, new_supply);

        burn(sub_id, amount);

        TotalSupplyEvent::new(asset_id, new_supply, msg_sender().unwrap())
            .log();
    }
}

// SRC3 extends SRC20, so this must be included
impl SRC20 for Contract {
    #[storage(read)]
    fn total_assets() -> u64 {
        storage.total_assets.read()
    }

    #[storage(read)]
    fn total_supply(asset: AssetId) -> Option<u64> {
        storage.total_supply.get(asset).try_read()
    }

    #[storage(read)]
    fn name(asset: AssetId) -> Option<String> {
        match storage.total_supply.get(asset).try_read() {
            Some(_) => Some(String::from_ascii_str(from_str_array(NAME))),
            None => None,
        }
    }

    #[storage(read)]
    fn symbol(asset: AssetId) -> Option<String> {
        match storage.total_supply.get(asset).try_read() {
            Some(_) => Some(String::from_ascii_str(from_str_array(SYMBOL))),
            None => None,
        }
    }

    #[storage(read)]
    fn decimals(asset: AssetId) -> Option<u8> {
        match storage.total_supply.get(asset).try_read() {
            Some(_) => Some(DECIMALS),
            None => None,
        }
    }
}

abi SetSRC20Data {
    #[storage(read)]
    fn set_src20_data(asset: AssetId);
}

impl SetSRC20Data for Contract {
    #[storage(read)]
    fn set_src20_data(asset: AssetId) {
        // NOTE: There are no checks for if the caller has permissions to update the metadata
        // If this asset does not exist, revert
        if storage.total_supply.get(asset).try_read().is_none() {
            revert(0);
        }
        let sender = msg_sender().unwrap();
        let name = Some(String::from_ascii_str(from_str_array(NAME)));
        let symbol = Some(String::from_ascii_str(from_str_array(SYMBOL)));

        SetNameEvent::new(asset, name, sender).log();
        SetSymbolEvent::new(asset, symbol, sender).log();
        SetDecimalsEvent::new(asset, DECIMALS, sender).log();
    }
}

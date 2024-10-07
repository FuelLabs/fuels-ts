contract;

use standards::src20::{SetDecimalsEvent, SetNameEvent, SetSymbolEvent, SRC20, TotalSupplyEvent,};
use std::{hash::Hash, storage::storage_string::*, string::String};

storage {
    /// The total number of distinguishable assets minted by this contract.
    total_assets: u64 = 0,
    /// The total supply of coins for a specific asset minted by this contract.
    total_supply: StorageMap<AssetId, u64> = StorageMap {},
    /// The name of a specific asset minted by this contract.
    name: StorageMap<AssetId, StorageString> = StorageMap {},
    /// The symbol of a specific asset minted by this contract.
    symbol: StorageMap<AssetId, StorageString> = StorageMap {},
    /// The decimals of a specific asset minted by this contract.
    decimals: StorageMap<AssetId, u8> = StorageMap {},
}

impl SRC20 for Contract {
    /// Returns the total number of individual assets minted  by this contract.
    ///
    /// # Additional Information
    ///
    /// For this single asset contract, this is always one.
    ///
    /// # Returns
    ///
    /// * [u64] - The number of assets that this contract has minted.
    ///
    /// # Number of Storage Accesses
    ///
    /// * Reads: `1`
    ///
    /// # Examples
    ///
    /// ```sway
    /// use src20::SRC20;
    ///
    /// fn foo(contract_id: ContractId) {
    ///     let src_20_abi = abi(SRC20, contract_id);
    ///     let assets = src_20_abi.total_assets();
    ///     assert(assets == 1);
    /// }
    /// ```
    #[storage(read)]
    fn total_assets() -> u64 {
        storage.total_assets.read()
    }

    /// Returns the total supply of coins for an asset.
    ///
    /// # Arguments
    ///
    /// * `asset`: [AssetId] - The asset of which to query the total supply.
    ///
    /// # Returns
    ///
    /// * [Option<u64>] - The total supply of an `asset`.
    ///
    /// # Number of Storage Accesses
    ///
    /// * Reads: `1`
    ///
    /// # Examples
    ///
    /// ```sway
    /// use src20::SRC20;
    /// use std::constants::DEFAULT_SUB_ID;
    ///
    /// fn foo(contract_id: ContractId) {
    ///     let src_20_abi = abi(SRC20, contract_id);
    ///     let supply = src_20_abi.total_supply(DEFAULT_SUB_ID);
    ///     assert(supply.unwrap() != 0);
    /// }
    /// ```
    #[storage(read)]
    fn total_supply(asset: AssetId) -> Option<u64> {
        storage.total_supply.get(asset).try_read()
    }

    /// Returns the name of an asset.
    ///
    /// # Arguments
    ///
    /// * `asset`: [AssetId] - The asset of which to query the name.
    ///
    /// # Returns
    ///
    /// * [Option<String>] - The name of `asset`.
    ///
    /// # Number of Storage Accesses
    ///
    /// * Reads: `1`
    ///
    /// # Examples
    ///
    /// ```sway
    /// use src20::SRC20;
    /// use std::constants::DEFAULT_SUB_ID;
    ///
    /// fn foo(contract_id: ContractId) {
    ///     let src_20_abi = abi(SRC20, contract_id);
    ///     let name = src_20_abi.name(DEFAULT_SUB_ID);
    ///     assert(name.is_some());
    /// }
    /// ```
    #[storage(read)]
    fn name(asset: AssetId) -> Option<String> {
        storage.name.get(asset).read_slice()
    }

    /// Returns the symbol of am asset.
    ///
    /// # Arguments
    ///
    /// * `asset`: [AssetId] - The asset of which to query the symbol.
    ///
    /// # Returns
    ///
    /// * [Option<String>] - The symbol of `asset`.
    ///
    /// # Number of Storage Accesses
    ///
    /// * Reads: `1`
    ///
    /// # Examples
    ///
    /// ```sway
    /// use src20::SRC20;
    /// use std::constants::DEFAULT_SUB_ID;
    ///
    /// fn foo(contract_id: ContractId) {
    ///     let src_20_abi = abi(SRC20, contract_id);
    ///     let symbol = src_20_abi.symbol(DEFAULT_SUB_ID);
    ///     assert(symbol.is_some());
    /// }
    /// ```
    #[storage(read)]
    fn symbol(asset: AssetId) -> Option<String> {
        storage.symbol.get(asset).read_slice()
    }

    /// Returns the number of decimals an asset uses.
    ///
    /// # Arguments
    ///
    /// * `asset`: [AssetId] - The asset of which to query the decimals.
    ///
    /// # Returns
    ///
    /// * [Option<u8>] - The decimal precision used by `asset`.
    ///
    /// # Number of Storage Accesses
    ///
    /// * Reads: `1`
    ///
    /// # Examples
    ///
    /// ```sway
    /// use src20::SRC20;
    /// use std::constants::DEFAULT_SUB_ID;
    ///
    /// fn foo(contract_id: ContractId) {
    ///     let src_20_abi = abi(SRC20, contract_id);
    ///     let decimals = src_20_abi.decimals(DEFAULT_SUB_ID);
    ///     assert(decimals.unwrap() == 9u8);
    /// }
    /// ```
    #[storage(read)]
    fn decimals(asset: AssetId) -> Option<u8> {
        storage.decimals.get(asset).try_read()
    }
}

abi SetSRC20Data {
    #[storage(read, write)]
    fn set_src20_data(
        asset: AssetId,
        total_supply: u64,
        name: Option<String>,
        symbol: Option<String>,
        decimals: u8,
    );
}

impl SetSRC20Data for Contract {
    #[storage(read, write)]
    fn set_src20_data(
        asset: AssetId,
        supply: u64,
        name: Option<String>,
        symbol: Option<String>,
        decimals: u8,
    ) {
        // NOTE: There are no checks for if the caller has permissions to update the metadata
        // If this asset does not exist, revert
        if storage.total_supply.get(asset).try_read().is_none() {
            revert(0);
        }
        let sender = msg_sender().unwrap();

        match name {
            Some(unwrapped_name) => {
                storage.name.get(asset).write_slice(unwrapped_name);
                SetNameEvent::new(asset, name, sender).log();
            },
            None => {
                let _ = storage.name.get(asset).clear();
                SetNameEvent::new(asset, name, sender).log();
            }
        }

        match symbol {
            Some(unwrapped_symbol) => {
                storage.symbol.get(asset).write_slice(unwrapped_symbol);
                SetSymbolEvent::new(asset, symbol, sender).log();
            },
            None => {
                let _ = storage.symbol.get(asset).clear();
                SetSymbolEvent::new(asset, symbol, sender).log();
            }
        }

        storage.decimals.get(asset).write(decimals);
        SetDecimalsEvent::new(asset, decimals, sender).log();

        storage.total_supply.get(asset).write(supply);
        TotalSupplyEvent::new(asset, supply, sender).log();
    }
}

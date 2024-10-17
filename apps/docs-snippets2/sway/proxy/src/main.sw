contract;

mod interface;

use interface::OwnedProxy;
use ::sway_libs::{
    ownership::errors::InitializationError,
    upgradability::{
        _proxy_owner,
        _proxy_target,
        _set_proxy_owner,
        _set_proxy_target,
        only_proxy_owner,
    },
};
use standards::{src14::{SRC14, SRC14Extension}, src5::State};
use std::execution::run_external;

configurable {
    /// The initial value of `storage::SRC14.target`.
    INITIAL_TARGET: Option<ContractId> = None,
    /// The initial value of `storage::SRC14.proxy_owner`.
    INITIAL_OWNER: State = State::Uninitialized,
}

storage {
    SRC14 {
        /// The [ContractId] of the target contract.
        ///
        /// # Additional Information
        ///
        /// `target` is stored at sha256("storage_SRC14_0")
        target in 0x7bb458adc1d118713319a5baa00a2d049dd64d2916477d2688d76970c898cd55: Option<ContractId> = None,
        /// The [State] of the proxy owner.
        ///
        /// # Additional Information
        ///
        /// `proxy_owner` is stored at sha256("storage_SRC14_1")
        proxy_owner in 0xbb79927b15d9259ea316f2ecb2297d6cc8851888a98278c0a2e03e1a091ea754: State = State::Uninitialized,
    },
}

impl SRC14 for Contract {
    /// Change the target contract of the proxy contract.
    ///
    /// # Additional Information
    ///
    /// This method can only be called by the `proxy_owner`.
    ///
    /// # Arguments
    ///
    /// * `new_target`: [ContractId] - The new proxy contract to which all fallback calls will be passed.
    ///
    /// # Reverts
    ///
    /// * When not called by `proxy_owner`.
    ///
    /// # Number of Storage Accesses
    ///
    /// * Reads: `1`
    /// * Write: `1`
    #[storage(read, write)]
    fn set_proxy_target(new_target: ContractId) {
        only_proxy_owner();
        _set_proxy_target(new_target);
    }

    /// Returns the target contract of the proxy contract.
    ///
    /// # Returns
    ///
    /// * [Option<ContractId>] - The new proxy contract to which all fallback calls will be passed or `None`.
    ///
    /// # Number of Storage Accesses
    ///
    /// * Reads: `1`
    #[storage(read)]
    fn proxy_target() -> Option<ContractId> {
        _proxy_target()
    }
}

impl SRC14Extension for Contract {
    /// Returns the owner of the proxy contract.
    ///
    /// # Returns
    ///
    /// * [State] - Represents the state of ownership for this contract.
    ///
    /// # Number of Storage Accesses
    ///
    /// * Reads: `1`
    #[storage(read)]
    fn proxy_owner() -> State {
        _proxy_owner()
    }
}

impl OwnedProxy for Contract {
    /// Initializes the proxy contract.
    ///
    /// # Additional Information
    ///
    /// This method sets the storage values using the values of the configurable constants `INITIAL_TARGET` and `INITIAL_OWNER`.
    /// This then allows methods that write to storage to be called.
    /// This method can only be called once.
    ///
    /// # Reverts
    ///
    /// * When `storage::SRC14.proxy_owner` is not [State::Uninitialized].
    ///
    /// # Number of Storage Accesses
    ///
    /// * Writes: `2`
    #[storage(write)]
    fn initialize_proxy() {
        require(
            _proxy_owner() == State::Uninitialized,
            InitializationError::CannotReinitialized,
        );

        storage::SRC14.target.write(INITIAL_TARGET);
        storage::SRC14.proxy_owner.write(INITIAL_OWNER);
    }

    /// Changes proxy ownership to the passed State.
    ///
    /// # Additional Information
    ///
    /// This method can be used to transfer ownership between Identities or to revoke ownership.
    ///
    /// # Arguments
    ///
    /// * `new_proxy_owner`: [State] - The new state of the proxy ownership.
    ///
    /// # Reverts
    ///
    /// * When the sender is not the current proxy owner.
    /// * When the new state of the proxy ownership is [State::Uninitialized].
    ///
    /// # Number of Storage Accesses
    ///
    /// * Reads: `1`
    /// * Writes: `1`
    #[storage(write)]
    fn set_proxy_owner(new_proxy_owner: State) {
        _set_proxy_owner(new_proxy_owner);
    }
}

/// Loads and runs the target contract's code within the proxy contract's context.
///
/// # Additional Information
///
/// Used when a method that does not exist in the proxy contract is called.
#[fallback]
#[storage(read)]
fn fallback() {
    run_external(_proxy_target().expect("FallbackError::TargetNotSet"))
}

library;

use standards::src5::State;

abi OwnedProxy {
    #[storage(write)]
    fn initialize_proxy();

    #[storage(write)]
    fn set_proxy_owner(new_proxy_owner: State);
}

library;

// The order of the modules is important because of the dependencies between them.
pub mod data_source;
pub mod wormhole_light;
pub mod price;
pub mod accumulator_update;
pub mod batch_attestation_update;
pub mod governance_payload;
pub mod governance_instruction;
pub mod update_type;

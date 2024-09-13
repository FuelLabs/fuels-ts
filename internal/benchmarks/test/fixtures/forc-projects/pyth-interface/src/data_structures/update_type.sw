library;

use std::{array_conversions::u32::*, bytes::Bytes};

use ::data_structures::{
    accumulator_update::AccumulatorUpdate,
    batch_attestation_update::BatchAttestationUpdate,
};

const ACCUMULATOR_MAGIC: u32 = 0x504e4155;

pub enum UpdateType {
    Accumulator: AccumulatorUpdate,
    BatchAttestation: BatchAttestationUpdate,
}

impl UpdateType {
    pub fn determine_type(data: Bytes) -> Self {
        let (magic, _) = data.split_at(4); //TODO: Convert to u32 for comparison with const ACCUMULATOR_MAGIC. Use raw_ptr.read::<u32>()? Remove accumulator_magic_bytes()
        if data.len() > 4 && magic == accumulator_magic_bytes() {
            UpdateType::Accumulator(AccumulatorUpdate::new(data))
        } else {
            UpdateType::BatchAttestation((BatchAttestationUpdate::new(data)))
        }
    }
}

pub fn accumulator_magic_bytes() -> Bytes {
    let accumulator_magic_array = ACCUMULATOR_MAGIC.to_be_bytes();

    let mut accumulator_magic_bytes = Bytes::with_capacity(4);
    accumulator_magic_bytes.push(accumulator_magic_array[0]);
    accumulator_magic_bytes.push(accumulator_magic_array[1]);
    accumulator_magic_bytes.push(accumulator_magic_array[2]);
    accumulator_magic_bytes.push(accumulator_magic_array[3]);

    accumulator_magic_bytes
}

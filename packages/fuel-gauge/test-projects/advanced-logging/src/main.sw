contract;

use std::*;
use std::logging::log;
use std::contract_id::ContractId;

enum GameState {
    Playing: u8,
    GameOver: u8,
}

pub enum Difficulty {
    Easy: bool,
    Medium: bool,
    Hard: bool,
}

pub struct Game {
    score: u8,
    time_left: u8,
    ammo: u8,
    game_id: u64,
    state: GameState,
    contract_Id: ContractId,
    difficulty: Difficulty,
}

abi AdvancedLogging {
    fn test_function() -> bool;
}

impl AdvancedLogging for Contract {
    fn test_function() -> bool {
        let state = GameState::Playing(1);
        let id = 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF;
        let contract_id = ContractId::from(id);
        let game_ref = Game {
            score: 0,
            time_left: 100,
            ammo: 10,
            game_id: 10_11_12u64,
            state: GameState::Playing(1),
            contract_Id: ContractId::from(0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF00FFFFFFFFFFFFFFFFFFFFFFFFFFFFF),
            difficulty: Difficulty::Medium(true),
        };

        log("Game State");
        log(state);

        log("Contract Id");
        log(contract_id);

        log("Game Ref");
        log(game_ref);
        

        log("Game Ref Score");
        log(game_ref.score);

        log("Direct Game");
        log(Game {
            score: 101,
            time_left: 12,
            ammo: 3,
            game_id: 13_14_15u64,
            state: state,
            contract_Id: contract_id,
            difficulty: Difficulty::Hard(true),
        });

        true
    }
}

contract;

use std::*;
use std::revert::require;
use std::logging::log;
use std::contract_id::ContractId;

use advanced_logging_other_contract_abi::AdvancedLoggingOtherContract;

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
    fn test_function_with_require(a: u64, b: u64) -> bool;
    fn test_log_from_other_contract(a: u8, contract_id: b256) -> bool;
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

        log(__to_str_array("Game State"));
        log(state);

        log(__to_str_array("Contract Id"));
        log(contract_id);

        log(__to_str_array("Game Ref"));
        log(game_ref);

        log(__to_str_array("Game Ref Score"));
        log(game_ref.score);

        log(__to_str_array("Direct Game"));
        log(Game {
            score: 101,
            time_left: 12,
            ammo: 3,
            game_id: 13_14_15u64,
            state: state,
            contract_Id: contract_id,
            difficulty: Difficulty::Hard(true),
        });

        if 1 == 1 {
            log(__to_str_array("Was True"));
        }

        if 1 == 2 {
            log(__to_str_array("The Sky is falling"));
        }

        true
    }

    fn test_function_with_require(a: u64, b: u64) -> bool {
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
        require(a == b, game_ref);

        log(__to_str_array("Hello Tester"));
        log(state);

        true
    }

    fn test_log_from_other_contract(a: u8, contract_id: b256) -> bool {
        let other_contract = abi(AdvancedLoggingOtherContract, contract_id);
        log(__to_str_array("Hello from main Contract"));
        other_contract.msg_from_other_contract(a);
        true
    }
}

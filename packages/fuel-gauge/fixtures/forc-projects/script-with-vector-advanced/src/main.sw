script;

use std::logging::log;

struct Date {
    day: u8,
    month: u8,
    year: u64,
}

struct ImportantDates {
    dates: Vec<Date>,
    tag: u8,
    lag: u8,
}

pub enum StateError {
    Void: (),
    Pending: (),
    Completed: (),
}

pub enum UserError {
    InsufficientPermissions: (),
    Unauthorized: (),
}

pub enum Error {
    StateError: StateError,
    UserError: UserError,
}

struct Struct {
    scores: Vec<u8>,
    important_dates: Vec<ImportantDates>,
    errors: Vec<Error>,
}

fn main(inputs: Vec<Struct>) -> bool {
    let input_1 = inputs.get(0).unwrap();

    let important_dates_1 = input_1.important_dates.get(0).unwrap();

    if important_dates_1.tag != 1 {
        return false;
    }

    let dates_1 = important_dates_1.dates.get(0).unwrap();

    if dates_1.day != 29 {
        return false;
    }

    log(dates_1.month);

    if dates_1.month != 12 {
        return false;
    }

    log(dates_1.year);

    if dates_1.year != 2020 {
        return false;
    }

    true
}

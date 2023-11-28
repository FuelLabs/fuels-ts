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

fn main(input: Vec<ImportantDates>) -> bool {
    let important_dates = input.get(0).unwrap();

    log(important_dates.tag);
    log(important_dates.lag);

    let dates_1 = important_dates.dates.get(0).unwrap();
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

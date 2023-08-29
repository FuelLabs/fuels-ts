script;

struct Score {
    user: u8,
    points: u8,
}

configurable {
    SHOULD_RETURN: bool = true,
}

fn main(score: Score) -> bool {
    return SHOULD_RETURN;
}

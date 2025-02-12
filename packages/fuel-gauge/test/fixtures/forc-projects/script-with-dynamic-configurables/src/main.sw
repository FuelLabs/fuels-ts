script;

configurable {
    BOOL: bool = true,
    U8: u8 = 8,
    STR: str = "sway",
    STR_2: str = "forc",
    STR_3: str = "fuel",
    LAST_U8: u8 = 16,
}

fn main(
    some_bool: bool,
    some_u8: u8,
    some_str: str,
    some_str_2: str,
    some_str_3: str,
    some_last_u8: u8,
) -> bool {
    some_bool == BOOL && some_u8 == U8 && some_str == STR && some_str_2 == STR_2 && some_str_3 == STR_3 && some_last_u8 == LAST_U8
}

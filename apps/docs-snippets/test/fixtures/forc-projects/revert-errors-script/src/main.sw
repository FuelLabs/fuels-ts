script;

fn main() -> bool {
    require(false, __to_str_array("This is a revert error"));
    return true;
}

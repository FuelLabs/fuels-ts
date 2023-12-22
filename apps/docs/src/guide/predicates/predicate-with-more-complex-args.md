# Predicate with more complex arguments

## Predicate with multiple arguments

You can pass more than one argument to a predicate. For example, this is a predicate that evaluates to `true` if the two arguments are not equal:

<<< @/../../../packages/fuel-gauge/test/fixtures/forc-projects/predicate-multi-args/src/main.sw#predicate-multi-args-sw{rust:line-numbers}

You can pass the two arguments to this predicate like this:

<<< @/../../../packages/fuel-gauge/src/predicate/predicate-arguments.test.ts#predicate-multi-args{ts:line-numbers}

## Predicate with a Struct argument

You can also pass a struct as an argument to a predicate. This is one such predicate that expects a struct as an argument:

<<< @/../../../packages/fuel-gauge/test/fixtures/forc-projects/predicate-main-args-struct/src/main.sw#Predicate-main-args{rust:line-numbers}

You can pass a struct as an argument to this predicate like this:

<<< @/../../../packages/fuel-gauge/src/predicate/predicate-arguments.test.ts#predicate-struct-arg{ts:line-numbers}

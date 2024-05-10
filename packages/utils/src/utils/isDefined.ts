export function isDefined<T>(value: T | undefined): value is T {
	return value !== undefined;
}

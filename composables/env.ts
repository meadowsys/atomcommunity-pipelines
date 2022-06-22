declare const __production__: boolean;
const prod = __production__;

export function is_development() {
	return !prod;
}

export function is_production() {
	return prod;
}

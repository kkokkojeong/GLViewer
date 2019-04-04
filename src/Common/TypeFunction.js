export function defined(value) {
    return value !== undefined && value !== null;
}
export function defaultValue(a, b) {
    if (defined(a)) {
        return a;
    }
    return b;
}
//# sourceMappingURL=TypeFunction.js.map
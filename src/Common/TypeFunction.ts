export function defined(value: any) {
  return value !== undefined && value !== null;
}

export function defaultValue(a: any, b: any) {
  if (defined(a)) {
    return a;
  }
  return b;
}

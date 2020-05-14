export function getISOTimestamp() {
  const unformatted = new Date();
  return unformatted.toISOString();
}

export function getErrorMessage(error: any) {
  return ((error as any) || {}).message;
}

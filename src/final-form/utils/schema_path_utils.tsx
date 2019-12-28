export function getFieldName(path: string) {
  return path;
}

export function getSchemaSubPath(currentPath: string, key: string) {
  return `${currentPath}${currentPath === "" ? "" : "."}${key}`;
}

export function getDataSubPath(currentPath: string, key: string) {
  return `${currentPath}${currentPath === "" ? "" : "."}${key}`;
}

export function getUiSubPath(currentPath: string, key: string) {
  return `${currentPath}${currentPath === "" ? "" : "."}${key}`;
}

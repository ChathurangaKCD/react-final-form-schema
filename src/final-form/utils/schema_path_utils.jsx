export function getFieldName(path) {
  return path;
}

export function getSchemaSubPath(currentPath, key) {
  return `${currentPath}${currentPath === "" ? "" : "."}${key}`;
}

export function getDataSubPath(currentPath, key) {
  return `${currentPath}${currentPath === "" ? "" : "."}${key}`;
}

export function getUiSubPath(currentPath, key) {
  return `${currentPath}${currentPath === "" ? "" : "."}${key}`;
}

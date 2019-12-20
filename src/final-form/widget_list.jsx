const defaultWidgets = {
  checkboxes: undefined,
  radio: undefined,
  range: undefined
};

export function getWidgets(customWidgets = {}) {
  return { ...defaultWidgets, ...customWidgets };
}

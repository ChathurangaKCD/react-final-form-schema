import React from "react";
import { UnsupportedField } from "../components/unsupported_field";

export function CustomCompRenderer({ schema, path, uiPath, level }) {
  const { title, properties: schemaObj } = schema;
  return <UnsupportedField />;
}

import React from "react";
import { UnsupportedField } from "../components/unsupported_field";
import { ArrayRenderer } from "./array_renderer";
import { ObjectRenderer } from "./object_renderer";
import { FieldRenderer } from "./field_renderer";
import { CustomCompRenderer } from "./custom_comp_renderer";
import { useFormSchema } from "../schema_context";

/**
 * Render whole/sub schema
 * @param {*} param0
 */
export function SchemaRenderer({
  dataPath = "",
  schemaPath = "",
  uiPath = "",
  level = 0
}) {
  console.log("SchemaRenderer", schemaPath, dataPath, uiPath);
  const { schema, uiSchema } = useFormSchema(schemaPath, uiPath);
  const props = { dataPath, schemaPath, uiPath, level };
  if (schema.field) {
    return <CustomCompRenderer {...props} />;
  } else if (schema.type) {
    switch (schema.type) {
      case "object":
        return <ObjectRenderer key={dataPath} {...props} />;
      case "array":
        return <ArrayRenderer key={dataPath} {...props} />;
      default:
        return <FieldRenderer key={dataPath} {...props} />;
    }
  }
  return (
    <UnsupportedField schema={schema} uiSchema={uiSchema} path={schemaPath} />
  );
}

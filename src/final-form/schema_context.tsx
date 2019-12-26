import React, { useMemo, useContext, useRef } from "react";
import _get from "lodash.get";
import {
  SchemaContextProps,
  SchemaContextValue,
  Schema,
  UiSchema
} from "./interfaces";

const FormSchemaContext = React.createContext<SchemaContextValue>(
  (null as unknown) as SchemaContextValue
);

export function SchemaContextProvider({
  schema,
  uiSchema = null,
  defs = null,
  children
}: SchemaContextProps) {
  const countRef = useRef(0);
  if (!schema) throw new Error("SCHEMA_REQUIRED");
  const contextVal = useMemo(() => {
    countRef.current !== 0 && console.warn("Schema Context Changed");
    countRef.current++;
    return { schema, uiSchema };
  }, [schema, uiSchema]);
  return (
    <FormSchemaContext.Provider value={contextVal}>
      {children}
    </FormSchemaContext.Provider>
  );
}

export function useFormSchema(path = "", uiPath = "") {
  const { schema, uiSchema } = useContext(FormSchemaContext);
  return useMemo(() => {
    const subSchema: Schema = path ? _get(schema, path) : schema;
    const uiSubSchema: UiSchema = uiPath ? _get(uiSchema, uiPath) : uiSchema;
    const schemas = { schema: subSchema, uiSchema: uiSubSchema };
    return schemas;
  }, [path, uiPath, schema, uiSchema]);
}

import React, { useMemo, useContext, useRef } from "react";
import _get from "lodash.get";
const FormSchemaContext = React.createContext(null);

export function SchemaContextProvider({
  schema,
  uiSchema = null,
  defs = null,
  children
}) {
  const countRef = useRef(0);
  if (!schema) throw new Error("SCHEMA_REQUIRED");
  const contextVal = useMemo(() => {
    countRef.current !== 0 && console.warn("Schema Context Changed");
    countRef.current++;
    return { schema, uiSchema, defs };
  }, [schema, uiSchema, defs]);
  return (
    <FormSchemaContext.Provider value={contextVal}>
      {children}
    </FormSchemaContext.Provider>
  );
}

export function useFormSchema(path = "", uiPath = "") {
  const { schema, uiSchema } = useContext(FormSchemaContext);
  return useMemo(() => {
    const subSchema = path ? _get(schema, path) : schema;
    const uiSubSchema = uiPath ? _get(uiSchema, uiPath) : uiSchema;
    const schemas = { schema: subSchema, uiSchema: uiSubSchema };
    console.log(path, uiPath, schemas);
    return schemas;
  }, [path, uiPath, schema, uiSchema]);
}

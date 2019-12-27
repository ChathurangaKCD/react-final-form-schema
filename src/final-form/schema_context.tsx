import Ajv from "ajv";
import _get from "lodash.get";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import {
  Schema,
  SchemaContextProps,
  SchemaContextValue,
  UiSchema
} from "./interfaces";

const ajv = new Ajv();

const FormSchemaContext = React.createContext<SchemaContextValue>(
  (null as unknown) as SchemaContextValue
);

export function SchemaContextProvider({
  schema,
  uiSchema = null,
  defs = null,
  children
}: SchemaContextProps) {
  if (!schema) throw new Error("SCHEMA_REQUIRED");
  const [valid, setValidity] = useState(true);
  useEffect(() => {
    const valid = ajv.validateSchema(schema);
    setValidity(true);
    console.log("Validity", valid);
    return setValidity(true);
  }, [schema]);
  const countRef = useRef(0);
  const contextVal = useMemo(() => {
    countRef.current !== 0 && console.warn("Schema Context Changed");
    countRef.current++;
    return { schema, uiSchema };
  }, [schema, uiSchema]);
  if (!valid) return <h5>"Schema Error"</h5>;
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

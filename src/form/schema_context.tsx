import Ajv from "ajv";
import _get from "lodash.get";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import {
  Schema,
  SchemaContextProps,
  SchemaContextValue,
  UiSchema
} from "./interfaces";
import { Widget, WrapperTypes } from "../registry/widgets.interfaces";

const ajv = new Ajv();

const FormSchemaContext = React.createContext<SchemaContextValue>(
  (null as unknown) as SchemaContextValue
);

export function SchemaContextProvider({
  schema,
  uiSchema = null,
  widgets,
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
    return { schema, uiSchema, widgets };
  }, [schema, uiSchema, widgets]);
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

interface IUseWidget {
  type: string;
  widget?: string;
}

export function useWidget<T>({ type, widget }: IUseWidget): Widget<T> {
  const { widgets } = useContext(FormSchemaContext);
  const Comp = _get(widgets, `${type}.${widget || "default"}`);
  if (!Comp) console.log("Undefined", type, widget);
  return Comp as Widget<T>;
}

export function useWrapper<T>(wrapperType: WrapperTypes): React.FC<T> {
  return useWidget({ type: "wrapper", widget: wrapperType });
}

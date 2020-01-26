import _get from 'lodash.get';
import React, { useContext, useMemo, useRef } from 'react';
import {
  Schema,
  SchemaContextProps,
  SchemaContextValue,
  UiSchema,
} from '../interfaces/form.interfaces';
import { Widget, WrapperTypes } from '../interfaces/widgets.interfaces';

const FormSchemaContext = React.createContext<SchemaContextValue>(
  (null as unknown) as SchemaContextValue
);

export function SchemaContextProvider({
  schema: schema,
  uiSchema,
  widgets,
  defs = null,
  children,
}: SchemaContextProps) {
  if (!schema) throw new Error('SCHEMA_REQUIRED');
  const countRef = useRef(0);
  const contextVal = useMemo(() => {
    countRef.current !== 0 && console.warn('Schema Context Changed');
    countRef.current++;
    return { schema, uiSchema, widgets };
  }, [schema, uiSchema, widgets]);
  return (
    <FormSchemaContext.Provider value={contextVal}>
      {children}
    </FormSchemaContext.Provider>
  );
}

export function useFormSchema(path = '', uiPath = '') {
  const { schema, uiSchema } = useContext(FormSchemaContext);
  return useMemo(() => {
    const subSchema: Schema = path ? _get(schema, path) : schema;
    const uiSubSchema: UiSchema = uiPath ? _get(uiSchema, uiPath) : uiSchema;
    const schemas = { schema: subSchema, uiSchema: uiSubSchema || {} };
    return schemas;
  }, [path, uiPath, schema, uiSchema]);
}

interface IUseWidget {
  type: string;
  widget?: string;
}
interface IUseCustomFieldWidget {
  fieldType: string;
  widget?: string;
}

export function useWidget<T>({ type, widget }: IUseWidget): Widget<T> {
  const { widgets } = useContext(FormSchemaContext);
  const Comp = _get(widgets, `${type}.${widget || 'default'}`);
  if (!Comp) throw Error(`No such widget ${type} ${widget}`);
  return Comp as Widget<T>;
}

export function useCustomFieldWidget<T>({
  fieldType,
  widget,
}: IUseCustomFieldWidget): Widget<T> {
  const { widgets } = useContext(FormSchemaContext);
  const Comp = _get(
    widgets,
    `custom.${fieldType}.widgets.${widget || 'default'}`
  );
  if (!Comp) throw Error(`No such widget ${fieldType} ${widget || 'default'}`);
  return Comp as Widget<T>;
}

export function useWrapper<T>(wrapperType: WrapperTypes): React.FC<T> {
  return useWidget({ type: 'wrapper', widget: wrapperType });
}

export function useRenderer<T>({ type, name }) {}

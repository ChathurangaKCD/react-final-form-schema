import { Form } from "react-final-form";
import { IWidgets } from "./widgets.interfaces";

type KeyValueObj = { [x: string]: any };

export type Schema = KeyValueObj;
export type UiSchema = KeyValueObj | null | undefined;

export interface SchemaFormProps {
  schema: Schema;
  uiSchema: UiSchema;
  initialValues: KeyValueObj;
  widgets: IWidgets;
  onSubmit: (val: any) => void;
  onValueChange?: (val: any) => void;
}

export interface SchemaContextProps {
  schema: Schema;
  uiSchema: UiSchema;
  widgets: IWidgets;
  defs?: any;
  children: React.ReactNode;
}

export interface SchemaContextValue {
  schema: Schema;
  uiSchema: UiSchema;
  widgets: IWidgets;
}

import { Form } from "react-final-form";
import { IWidgets } from "./registry/widgets.interfaces";

type KeyValueObj = { [x: string]: any };

export type Schema = KeyValueObj;
export type UiSchema = KeyValueObj | null | undefined;

interface SchemaFormProps {
  schema: Schema;
  uiSchema: UiSchema;
  initialValues: KeyValueObj;
  widgets: IWidgets;
  onSubmit: (val: any) => void;
  onValueChange?: (val: any) => void;
}

interface SchemaContextProps {
  schema: Schema;
  uiSchema: UiSchema;
  widgets: IWidgets;
  defs?: any;
  children: React.ReactChild<typeof Form>;
}

interface SchemaContextValue {
  schema: Schema;
  uiSchema: UiSchema;
  widgets: IWidgets;
}

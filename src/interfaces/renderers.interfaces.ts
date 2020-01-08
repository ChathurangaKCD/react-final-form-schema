import { Schema, UiSchema } from './form.interfaces';

export interface RendererProps {
  dataPath: string;
  schemaPath: string;
  uiPath: string;
  level: number;
  required: boolean;
}

export interface SchemaRendererProps extends RendererProps {}
export interface ArrayRendererProps extends RendererProps {}
export interface ObjectRendererProps extends RendererProps {}
export interface FieldRendererProps extends RendererProps {}

export interface RenderFnProps extends RendererProps {
  schema: Schema;
  uiSchema: UiSchema;
}

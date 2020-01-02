interface RendererProps {
  dataPath: string;
  schemaPath: string;
  uiPath: string;
  level: number;
}

interface SchemaRendererProps extends RendererProps {}
interface ArrayRendererProps extends RendererProps {}
interface ObjectRendererProps extends RendererProps {}
interface FieldRendererProps extends RendererProps {}

interface RenderFnProps extends RendererProps {
  schema: Schema;
  uiSchema: UiSchema;
}

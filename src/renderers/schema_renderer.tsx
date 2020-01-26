import React from 'react';
import { useFormSchema } from '../form/schema_context';
import { SchemaRendererProps } from '../interfaces/renderers.interfaces';
import { ArrayRenderer } from './array_renderer';
import { RenderUnsupportedField } from './fields/unsupported_field';
import { FieldRenderer } from './field_renderer';
import { ObjectRenderer } from './object_renderer';
import { TypeRenderer } from './type_renderer';

/**
 * Render whole/sub schema
 * @param {*} param0
 */
export function SchemaRenderer({
  dataPath = '',
  schemaPath = '',
  uiPath = '',
  level = 0,
  required = false,
}: SchemaRendererProps) {
  const { schema, uiSchema } = useFormSchema(schemaPath, uiPath);
  const props = { dataPath, schemaPath, uiPath, level, required };
  if (schema['ui:field']) {
    return <FieldRenderer key={dataPath} {...props} />;
  } else if (schema.type) {
    switch (schema.type) {
      case 'object':
        return <ObjectRenderer key={dataPath} {...props} />;
      case 'array':
        return <ArrayRenderer key={dataPath} {...props} />;
      default:
        return <TypeRenderer key={dataPath} {...props} />;
    }
  }
  return (
    <RenderUnsupportedField
      key={dataPath}
      {...props}
      schema={schema}
      uiSchema={uiSchema}
    />
  );
}

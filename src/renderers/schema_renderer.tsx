import React from 'react';
import { ArrayRenderer } from './array_renderer';
import { ObjectRenderer } from './object_renderer';
import { FieldRenderer } from './field_renderer';
import { CustomCompRenderer } from './custom_comp_renderer';
import { useFormSchema } from '../form/schema_context';
import { SchemaRendererProps } from '../interfaces/renderers.interfaces';
import { RenderUnsupportedField } from './fields/unsupported_field';

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
  if (schema.field) {
    return <CustomCompRenderer {...props} />;
  } else if (schema.type) {
    switch (schema.type) {
      case 'object':
        return <ObjectRenderer key={dataPath} {...props} />;
      case 'array':
        return <ArrayRenderer key={dataPath} {...props} />;
      default:
        return <FieldRenderer key={dataPath} {...props} />;
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

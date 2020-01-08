import React, { useMemo } from 'react';
import { useFormSchema, useWrapper } from '../form/schema_context';
import {
  getDataSubPath,
  getSchemaSubPath,
  getUiSubPath,
} from '../utils/schema_path_utils';
import {
  ObjectItemWrapperProps,
  ObjectWrapperProps,
} from '../interfaces/wrappers.interfaces';
import { SchemaRenderer } from './schema_renderer';
import { ObjectRendererProps } from '../interfaces/renderers.interfaces';

/**
 * Render Object Type
 * @param {*} param0
 */
export function ObjectRenderer({
  dataPath,
  schemaPath,
  uiPath,
  level,
}: ObjectRendererProps) {
  const { schema, uiSchema } = useFormSchema(schemaPath, uiPath);
  const { title, required, properties: schemaObj } = schema;
  const ObjectWrapper = useWrapper<ObjectWrapperProps>('object');
  const ObjectItemWrapper = useWrapper<ObjectItemWrapperProps>('object:item');
  const isRequired = useMemo(() => {
    const map = new Map<string, boolean>();
    if (Array.isArray(required)) {
      required.forEach(field => {
        map.set(field, true);
      });
    }
    return (key: string) => map.get(key) || false;
  }, [required]);
  return (
    <ObjectWrapper title={title} level={level}>
      {Object.keys(schemaObj).map(key => {
        const schemaSubPath = getSchemaSubPath(schemaPath, `properties.${key}`);
        const dataSubPath = getDataSubPath(dataPath, key);
        const uiSubPath = getUiSubPath(uiPath, key);
        return (
          <ObjectItemWrapper key={dataSubPath} level={level + 1}>
            <SchemaRenderer
              dataPath={dataSubPath}
              schemaPath={schemaSubPath}
              uiPath={uiSubPath}
              level={level + 1}
              required={isRequired(key)}
            />
          </ObjectItemWrapper>
        );
      })}
    </ObjectWrapper>
  );
}

import React from "react";
import { useFormSchema, useWrapper } from "../schema_context";
import {
  getDataSubPath,
  getSchemaSubPath,
  getUiSubPath
} from "../utils/schema_path_utils";
import {
  ObjectItemWrapperProps,
  ObjectWrapperProps
} from "../wrappers/interfaces";
import { SchemaRenderer } from "./schema_renderer";

/**
 * Render Object Type
 * @param {*} param0
 */
export function ObjectRenderer({
  dataPath,
  schemaPath,
  uiPath,
  level
}: ObjectRendererProps) {
  const { schema, uiSchema } = useFormSchema(schemaPath, uiPath);
  const { title, properties: schemaObj } = schema;
  const ObjectWrapper = useWrapper<ObjectWrapperProps>("object");
  const ObjectItemWrapper = useWrapper<ObjectItemWrapperProps>("object:item");
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
            />
          </ObjectItemWrapper>
        );
      })}
    </ObjectWrapper>
  );
}

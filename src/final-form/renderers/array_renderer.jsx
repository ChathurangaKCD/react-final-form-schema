import React from "react";
import { useForm } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";
import { UnsupportedField } from "../components/unsupported_field";
import { useFormSchema } from "../schema_context";
import { getSchemaSubPath, getUiSubPath } from "../utils/schema_path_utils";
import {
  ArrayItemAddBtn,
  ArrayItemRemoveBtn,
  ArrayItemWrapper,
  ArrayWrapper
} from "../wrappers/component_wrappers";
import { renderEnumSelect } from "./fields/enum_select";
import { SchemaRenderer } from "./schema_renderer";

/**
 * Render Array Type
 * * input arrays => render item schema
 * * nested object/array arrays => render item schema
 * * enum selection => multi select (alt: checkbox group)
 * * fixed item arrays => render each item schema
 * @param {*} param0
 */
export function ArrayRenderer({ dataPath, schemaPath, uiPath, level }) {
  const { schema, uiSchema } = useFormSchema(schemaPath, uiPath);
  const formApi = useForm();
  if (Array.isArray(schema.items)) {
    return renderFixedItemList({ schema });
  } else if (schema.items.enum) {
    return renderEnumSelect({ schema, uiSchema, path: dataPath, level });
  } else
    return renderNestedArray({
      level,
      schema,
      uiSchema,
      dataPath,
      schemaPath,
      uiPath,
      formApi
    });
}

function renderNestedArray({
  schema,
  uiSchema,
  level,
  dataPath,
  schemaPath,
  uiPath,
  formApi
}) {
  const { title } = schema;
  return (
    <ArrayWrapper title={title} level={level}>
      <FieldArray name={dataPath}>
        {({ fields }) =>
          fields.map((name, index) => (
            <ArrayItemWrapper
              key={name}
              buttons={
                <ArrayItemRemoveBtn onClick={() => fields.remove(index)} />
              }
            >
              <SchemaRenderer
                dataPath={name}
                schemaPath={getSchemaSubPath(schemaPath, "items")}
                uiPath={getUiSubPath(uiPath, "items")}
                level={level + 1}
              />
            </ArrayItemWrapper>
          ))
        }
      </FieldArray>
      <div className="buttons">
        <ArrayItemAddBtn
          onClick={() => formApi.mutators.push(dataPath, undefined)}
        >
          Add
        </ArrayItemAddBtn>
      </div>
    </ArrayWrapper>
  );
}

function renderFixedItemList({ schema, path }) {
  const props = { schema, path };
  return <UnsupportedField {...props}></UnsupportedField>;
}

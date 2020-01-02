import React from "react";
import { useForm } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";
import { UnsupportedField } from "../components/unsupported_field";
import { Schema } from "../interfaces";
import { useFormSchema, useWrapper } from "../schema_context";
import { getSchemaSubPath, getUiSubPath } from "../utils/schema_path_utils";
import { RenderEnumSelect } from "./fields/enum_select";
import { SchemaRenderer } from "./schema_renderer";
import {
  ArrayWrapperProps,
  ArrayItemWrapperProps,
  ArrayItemAddBtnProps,
  ArrayItemRemoveBtnProps
} from "../wrappers/interfaces";

/**
 * Render Array Type
 * * input arrays => render item schema
 * * nested object/array arrays => render item schema
 * * enum selection => multi select (alt: checkbox group)
 * * fixed item arrays => render each item schema
 * @param {*} param0
 */
export function ArrayRenderer({
  dataPath,
  schemaPath,
  uiPath,
  level
}: ArrayRendererProps) {
  const { schema, uiSchema } = useFormSchema(schemaPath, uiPath);
  const renderData = {
    schema,
    uiSchema,
    dataPath,
    uiPath,
    schemaPath,
    level
  };
  if (Array.isArray(schema.items)) {
    return renderFixedItemList({
      schema,
      uiSchema,
      dataPath,
      schemaPath,
      uiPath,
      level
    });
  } else if (schema.items.enum) {
    return <RenderEnumSelect {...renderData} />;
  } else return <RenderNestedArray {...renderData} />;
}

interface RenderNestedArrayProps extends RenderFnProps {}

function RenderNestedArray({
  schema,
  uiSchema,
  level,
  dataPath,
  schemaPath,
  uiPath
}: RenderNestedArrayProps) {
  const { title } = schema;
  const formApi = useForm();
  const ArrayWrapper = useWrapper<ArrayWrapperProps>("array");
  const ArrayItemWrapper = useWrapper<ArrayItemWrapperProps>("array:item");
  const ArrayItemRemoveBtn = useWrapper<ArrayItemRemoveBtnProps>(
    "array:itemremove"
  );
  const ArrayItemAddBtn = useWrapper<ArrayItemAddBtnProps>("array:itemadd");
  return (
    <ArrayWrapper title={title} level={level}>
      {/* subscribe only to array length; 
        if reordering needed subscribe to value */}
      <FieldArray name={dataPath} subscription={{}} validate={undefined}>
        {({ fields }) =>
          fields.map((name, index) => (
            <ArrayItemWrapper
              key={name}
              level={level + 1}
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

interface RenderFixedItemListProps extends RenderFnProps {
  schema: Schema;
}

function renderFixedItemList({ schema, dataPath }: RenderFixedItemListProps) {
  const props = { schema, path: dataPath };
  return <UnsupportedField {...props}></UnsupportedField>;
}

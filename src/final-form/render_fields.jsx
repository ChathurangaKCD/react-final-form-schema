import React from "react";
import { Field, useForm } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";
import { SelectField } from "./components/select_field";
import {
  FieldWrapper,
  ArrayWrapper,
  ObjectWrapper,
  ArrayItemWrapper,
  ArrayItemRemoveBtn,
  ArrayItemAddBtn,
  ObjectItemWrapper
} from "./wrappers/component_wrappers";
import { InputField } from "./components/input_field";
import { UnsupportedField } from "./components/unsupported_field";
import { getSubPath, getFieldName } from "./utils/schema_path_utils";

export function renderSchema(schema, path = "", level = 0) {
  console.log("Schema", schema, path);
  const props = { schema, path };
  if (schema.widget) {
    return <UnsupportedField {...props} />;
  } else if (schema.type) {
    switch (schema.type) {
      case "object":
        return <ObjectRenderer {...props} level={level} />;
      case "array":
        return <ArrayRenderer {...props} level={level} />;
      default:
        return <FieldRenderer {...props} level={level} />;
    }
  }
  return <UnsupportedField {...props} />;
}

function ObjectRenderer({ schema, path, level }) {
  const { title, properties: schemaObj } = schema;
  return (
    <ObjectWrapper title={title} level={level}>
      {Object.keys(schemaObj).map(key => {
        const subPath = getSubPath(path, key);
        return (
          <ObjectItemWrapper key={subPath}>
            {renderSchema(schemaObj[key], subPath, level + 1)}
          </ObjectItemWrapper>
        );
      })}
    </ObjectWrapper>
  );
}

function ArrayRenderer({ schema, path, level }) {
  const { title, items: itemSchema } = schema;
  const formApi = useForm();
  return (
    <ArrayWrapper title={title} level={level}>
      <FieldArray name={path}>
        {({ fields }) =>
          fields.map((name, index) => (
            <ArrayItemWrapper
              key={name}
              buttons={
                <ArrayItemRemoveBtn onClick={() => fields.remove(index)} />
              }
            >
              {renderSchema(itemSchema, name, level + 1)}
            </ArrayItemWrapper>
          ))
        }
      </FieldArray>
      <div className="buttons">
        <ArrayItemAddBtn onClick={() => formApi.mutators.push(path, undefined)}>
          Add
        </ArrayItemAddBtn>
      </div>
    </ArrayWrapper>
  );
}

function FieldRenderer({ schema, path, level }) {
  switch (schema.type) {
    case "string": {
      return (
        <FieldWrapper level={level}>
          <Field name={getFieldName(path)}>
            {({ input, meta }) => (
              <InputField
                label={schema.title}
                {...input}
                {...schema.fieldProps}
                items={schema.items}
                error={meta.touched && meta.error}
              ></InputField>
            )}
          </Field>
        </FieldWrapper>
      );
    }
    case "number": {
      return <UnsupportedField {...{ schema, path }} />;
    }
    case "boolean": {
      return <UnsupportedField {...{ schema, path }} />;
    }
    case "enum": {
      return (
        <FieldWrapper level={level}>
          <Field name={getFieldName(path)}>
            {({ input, meta }) => (
              <SelectField
                label={schema.title}
                {...input}
                {...schema.fieldProps}
                items={schema.items}
                error={meta.touched && meta.error}
              ></SelectField>
            )}
          </Field>
        </FieldWrapper>
      );
    }
    default:
      return <UnsupportedField {...{ schema, path }} />;
  }
}

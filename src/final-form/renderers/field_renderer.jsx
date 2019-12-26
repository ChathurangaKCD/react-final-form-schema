import React from "react";
import { Field } from "react-final-form";
import { CheckBoxField } from "../components/checkbox_field.";
import { DateTimePickers } from "../components/datetime/react-widgets";
import { InputField, NumberField } from "../components/input_field";
import { UnsupportedField } from "../components/unsupported_field";
import { useFormSchema } from "../schema_context";
import { getFieldName } from "../utils/schema_path_utils";
import { minLength } from "../utils/validators";
import { FieldWrapper } from "../wrappers/component_wrappers";
import { renderEnumSelect } from "./fields/enum_select";

/**
 * Render Fields
 * @param {*} param0
 */
export function FieldRenderer(props) {
  const { dataPath, schemaPath, uiPath, level } = props;
  const { schema, uiSchema } = useFormSchema(schemaPath, uiPath);
  const renderData = { ...props, schema, uiSchema };
  switch (schema.type) {
    case "string": {
      return renderTextInput(renderData);
    }
    case "number": {
      return renderNumberInput(renderData);
    }
    case "boolean": {
      return renderBooleanInput(renderData);
    }
    case "date":
    case "datetime": {
      return renderDateInput(renderData);
    }
    case "daterange":
    case "datetimerange": {
      return (
        <FieldWrapper level={level} row={true}>
          <Field name={getFieldName(dataPath)}>
            {({ input, meta }) => (
              <DateTimePickers.DateTimeRange
                label={schema.title}
                dateOnly={schema.type === "date"}
                {...input}
                {...schema.fieldProps}
                error={meta.touched && meta.error}
              />
            )}
          </Field>
        </FieldWrapper>
      );
    }
    default:
      return <UnsupportedField {...{ schema, uiSchema, path: dataPath }} />;
  }
}
function renderDateInput({
  dataPath,
  schemaPath,
  uiPath,
  level,
  schema,
  uiSchema
}) {
  return (
    <FieldWrapper level={level} type="datetime">
      <Field name={getFieldName(dataPath)}>
        {({ input, meta }) => (
          <DateTimePickers.DateTime
            label={schema.title}
            dateOnly={schema.type === "date"}
            {...input}
            {...schema.fieldProps}
            error={meta.touched && meta.error}
          />
        )}
      </Field>
    </FieldWrapper>
  );
}

function renderBooleanInput({
  dataPath,
  schemaPath,
  uiPath,
  level,
  schema,
  uiSchema
}) {
  return (
    <FieldWrapper level={level}>
      <Field name={getFieldName(dataPath)}>
        {({ input, meta }) => (
          <CheckBoxField
            label={schema.title}
            {...input}
            {...schema.fieldProps}
            items={schema.items}
            error={meta.touched && meta.error}
          />
        )}
      </Field>
    </FieldWrapper>
  );
}

function renderNumberInput({
  dataPath,
  schemaPath,
  uiPath,
  level,
  schema,
  uiSchema
}) {
  return (
    <FieldWrapper level={level}>
      <Field name={getFieldName(dataPath)}>
        {({ input, meta }) => (
          <NumberField
            label={schema.title}
            {...input}
            {...schema.fieldProps}
            items={schema.items}
            error={meta.touched && meta.error}
          />
        )}
      </Field>
    </FieldWrapper>
  );
}

function renderTextInput({
  dataPath,
  schemaPath,
  uiPath,
  level,
  schema,
  uiSchema
}) {
  if (schema.type === "string" && Array.isArray(schema.enum)) {
    return renderEnumSelect({ schema, uiSchema, path: dataPath, level });
  }
  return (
    <FieldWrapper level={level}>
      <Field name={getFieldName(dataPath)} validate={minLength(5)}>
        {({ input, meta }) => (
          <InputField
            label={schema.title}
            path={dataPath}
            error={meta.touched && meta.error}
            {...input}
          />
        )}
      </Field>
    </FieldWrapper>
  );
}

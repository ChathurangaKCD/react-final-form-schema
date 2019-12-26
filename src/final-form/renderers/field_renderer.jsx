import React from "react";
import { Field } from "react-final-form";
import { DateTimePickers } from "../components/datetime/react-widgets";
import { UnsupportedField } from "../components/unsupported_field";
import { useFormSchema } from "../schema_context";
import { getFieldName } from "../utils/schema_path_utils";
import { FieldWrapper } from "../wrappers/component_wrappers";
import { renderEnumSelect } from "./fields/enum_select";
import { renderTextInput } from "./fields/text_input";
import { renderBooleanInput } from "./fields/boolean_input";
import { renderDateInput } from "./fields/date_input";
import { renderNumberInput } from "./fields/number_input";

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
      if (schema.type === "string" && Array.isArray(schema.enum)) {
        return renderEnumSelect({ schema, uiSchema, path: dataPath, level });
      }
      return renderTextInput(renderData);
    }
    case "number":
    case "integer": {
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
                input={input}
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

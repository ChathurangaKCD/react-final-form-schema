import React from "react";
import { UnsupportedField } from "../components/unsupported_field";
import { useFormSchema } from "../schema_context";
import { renderBooleanInput } from "./fields/boolean_input";
import { renderDateInput, renderDateTimeInput } from "./fields/date_input";
import {
  renderDateRangeInput,
  renderDateTimeRangeInput
} from "./fields/date_range_input";
import { renderEnumSelect } from "./fields/enum_select";
import { renderNumberInput } from "./fields/number_input";
import { renderTextInput } from "./fields/text_input";

/**
 * Render Fields
 * @param {*} param0
 */
export function FieldRenderer(props: FieldRendererProps) {
  const { dataPath, schemaPath, uiPath, level } = props;
  const { schema, uiSchema } = useFormSchema(schemaPath, uiPath);
  const renderData = { ...props, schema, uiSchema };
  switch (schema.type) {
    case "string": {
      if (Array.isArray(schema.enum)) {
        return renderEnumSelect(renderData);
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
    case "date": {
      return renderDateInput(renderData);
    }
    case "datetime": {
      return renderDateTimeInput(renderData);
    }
    case "daterange": {
      return renderDateRangeInput(renderData);
    }
    case "datetimerange": {
      return renderDateTimeRangeInput(renderData);
    }
    default:
      return <UnsupportedField {...{ schema, uiSchema, path: dataPath }} />;
  }
}

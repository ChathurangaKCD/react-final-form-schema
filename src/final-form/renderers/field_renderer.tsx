import React from "react";
import { UnsupportedField } from "../components/unsupported_field";
import { useFormSchema } from "../schema_context";
import { RenderBooleanInput } from "./fields/boolean_input";
import { RenderDateInput, RenderDateTimeInput } from "./fields/date_input";
import {
  RenderDateRangeInput,
  RenderDateTimeRangeInput
} from "./fields/date_range_input";
import { RenderEnumSelect } from "./fields/enum_select";
import { RenderNumberInput } from "./fields/number_input";
import { RenderTextInput } from "./fields/text_input";

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
        return <RenderEnumSelect {...renderData} />;
      }
      return <RenderTextInput {...renderData} />;
    }
    case "number":
    case "integer": {
      return <RenderNumberInput {...renderData} />;
    }
    case "boolean": {
      return <RenderBooleanInput {...renderData} />;
    }
    case "date": {
      return <RenderDateInput {...renderData} />;
    }
    case "datetime": {
      return <RenderDateTimeInput {...renderData} />;
    }
    case "daterange": {
      return <RenderDateRangeInput {...renderData} />;
    }
    case "datetimerange": {
      return <RenderDateTimeRangeInput {...renderData} />;
    }
    default:
      return <UnsupportedField {...{ schema, uiSchema, path: dataPath }} />;
  }
}

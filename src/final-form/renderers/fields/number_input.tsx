import React from "react";
import { Field } from "react-final-form";
import { NumberInput } from "../../components/number_input_field";
import { Schema } from "../../interfaces";
import { getFieldName } from "../../utils/schema_path_utils";
import { getValidators } from "../../utils/validators";
import { FieldWrapper } from "../../wrappers/component_wrappers";

interface RenderNumberInputFnProps extends RenderFnProps {}

const numberValidators = ["minimum", "maximum"];

export function renderNumberInput({
  dataPath,
  schemaPath,
  uiPath,
  level,
  schema,
  uiSchema
}: RenderNumberInputFnProps) {
  const validators = getValidators(schema, numberValidators);
  return (
    <FieldWrapper level={level} isRow={false}>
      <Field name={getFieldName(dataPath)} {...validators}>
        {({ input, meta }) => (
          <NumberInput
            label={schema.title}
            input={input}
            schemaProps={parseNumberInputSchema(schema)}
            uiSchema={uiSchema}
            error={meta.touched && meta.error}
          />
        )}
      </Field>
    </FieldWrapper>
  );
}

const IFTE = (condition: any, val: any = condition, elseVal: any = undefined) =>
  !!condition ? val : elseVal;

function parseNumberInputSchema(schema: Schema) {
  const { multipleOf, maximum, minimum, type } = schema;
  const props = {
    step: IFTE(
      type === "integer",
      IFTE(multipleOf, multipleOf, 1),
      IFTE(multipleOf)
    ),
    min: IFTE(minimum),
    max: IFTE(maximum)
  };
  return props;
}

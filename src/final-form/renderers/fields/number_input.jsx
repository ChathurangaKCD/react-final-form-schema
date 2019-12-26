import React from "react";
import { Field } from "react-final-form";
import { NumberInput } from "../../components/number_input_field";
import { getFieldName } from "../../utils/schema_path_utils";
import { FieldWrapper } from "../../wrappers/component_wrappers";
import { validators, composeValidators } from "../../utils/validators";

export function renderNumberInput({
  dataPath,
  schemaPath,
  uiPath,
  level,
  schema,
  uiSchema
}) {
  const validators = getValidators(schema);
  return (
    <FieldWrapper level={level}>
      <Field name={getFieldName(dataPath)} {...validators}>
        {({ input, meta }) => (
          <NumberInput
            label={schema.title}
            {...input}
            {...parseNumberInputSchema(schema)}
            error={meta.touched && meta.error}
          />
        )}
      </Field>
    </FieldWrapper>
  );
}

const IFTE = (condition, val = condition, elseVal = undefined) =>
  condition ? val : elseVal;

function parseNumberInputSchema(schema) {
  const { multipleOf, maximum, minimum, type } = schema;
  const props = {
    step: IFTE(
      type === "integer",
      IFTE(multipleOf, multipleOf, "1"),
      IFTE(multipleOf)
    ),
    min: IFTE(minimum),
    max: IFTE(maximum)
  };
  return props;
}

const numberValidators = ["minimum", "maximum"];
function getValidators(schema) {
  const _validators = numberValidators
    .map(
      key =>
        schema[key] !== undefined &&
        validators[key] !== undefined &&
        validators[key](schema[key])
    )
    .filter(validator => typeof validator === "function");
  const validate = composeValidators(..._validators);
  return { validate };
}

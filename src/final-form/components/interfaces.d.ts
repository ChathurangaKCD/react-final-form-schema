import { FieldInputProps } from "react-final-form";
import { UiSchema } from "../interfaces";

export interface FieldProps {
  label: string;
  error: string | false;
  uiSchema: UiSchema;
  input: FieldInputProps<any, HTMLElement>;
}

export interface TextInputProps extends FieldProps {
  schemaProps: {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
  };
}
export interface NumberInputProps extends FieldProps {
  schemaProps: {
    step?: number;
    min?: number;
    max?: number;
  };
}
export interface CheckBoxInputProps extends FieldProps {}
export interface SelectFieldProps extends FieldProps {
  optionValues: string[];
  optionLabels: string[];
  multiple: boolean;
}
export interface DateTimePickerProps extends FieldProps {
  min?: number | null;
  max?: number | null;
  dateOnly: boolean;
  readOnly?: boolean;
  required: boolean;
}
export interface DateTimeRangePickerProps extends FieldProps {
  min?: number | null;
  max?: number | null;
  dateOnly: boolean;
  readOnly?: boolean;
  required: boolean;
}

export interface DateRangePickerProps extends FieldProps {
  min?: number | null;
  max?: number | null;
}

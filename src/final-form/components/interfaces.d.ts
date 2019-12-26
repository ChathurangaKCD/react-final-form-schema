import { FieldInputProps } from "react-final-form";

export interface FieldProps {
  label: string;
  error: string | false;
  uiSchema: {
    [x: string]: any;
  } | null;
  input: FieldInputProps<any, HTMLElement>;
}

export interface TextInputProps extends FieldProps {
  schemaProps: {
    minlength?: number;
    maxlength?: number;
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

import { FieldInputProps } from 'react-final-form';
import { UiSchema } from './form.interfaces';

export interface InputFieldProps {
  label: string;
  error: string | false;
  uiSchema: UiSchema;
  input: FieldInputProps<any, HTMLElement>;
}

export interface TextInputProps extends InputFieldProps {
  schemaProps: {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    required?: boolean;
  };
}
export interface NumberInputProps extends InputFieldProps {
  schemaProps: {
    step?: number;
    min?: number;
    max?: number;
    required?: boolean;
  };
}
export interface CheckBoxInputProps extends InputFieldProps {}
export interface SelectFieldProps extends InputFieldProps {
  optionValues: string[];
  optionLabels: string[];
  multiple: boolean;
}
export interface DateTimePickerProps extends InputFieldProps {
  min?: number | null;
  max?: number | null;
  dateOnly: boolean;
  readOnly?: boolean;
  required: boolean;
}
export interface DateTimeRangePickerProps extends InputFieldProps {
  min?: number | null;
  max?: number | null;
  dateOnly: boolean;
  readOnly?: boolean;
  required: boolean;
}

export interface DateRangePickerProps extends InputFieldProps {
  min?: number | null;
  max?: number | null;
}
export interface DatePickerProps extends InputFieldProps {
  min?: number | null;
  max?: number | null;
}

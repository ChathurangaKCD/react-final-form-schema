import { ResetBtnProps, SubmitBtnProps } from './buttons.interface';
import {
  CheckBoxInputProps,
  DatePickerProps,
  DateRangePickerProps,
  DateTimePickerProps,
  DateTimeRangePickerProps,
  InputFieldProps,
  NumberInputProps,
  SelectFieldProps,
  TextInputProps,
} from './components.interfaces';
import { RenderFnProps } from './renderers.interfaces';
import {
  ArrayItemAddBtnProps,
  ArrayItemRemoveBtnProps,
  ArrayItemWrapperProps,
  ArrayWrapperProps,
  FieldWrapperProps,
  FormWrapperProps,
  ObjectItemWrapperProps,
  ObjectWrapperProps,
} from './wrappers.interfaces';

export type Widget<T = InputFieldProps> = React.FC<T>;

export type WrapperTypes =
  | 'form'
  | 'object'
  | 'object:item'
  | 'array'
  | 'array:item'
  | 'array:itemremove'
  | 'array:itemadd'
  | 'field';

export interface IWidgets {
  number: {
    default: Widget<NumberInputProps>;
    [x: string]: Widget<NumberInputProps>;
  };
  integer: {
    default: Widget<NumberInputProps>;
    [x: string]: Widget<NumberInputProps>;
  };
  string: {
    default: Widget<TextInputProps>;
    [x: string]: Widget<TextInputProps> | Widget<SelectFieldProps>;
    enum: Widget<SelectFieldProps>;
  };
  boolean: {
    default: Widget<CheckBoxInputProps>;
  };
  object: {};
  array: { enum: Widget<SelectFieldProps> };
  unsupported: { default: Widget<InputFieldProps> };
  wrapper: {
    form: Widget<FormWrapperProps>;
    object: Widget<ObjectWrapperProps>;
    'object:item': Widget<ObjectItemWrapperProps>;
    array: Widget<ArrayWrapperProps>;
    'array:item': Widget<ArrayItemWrapperProps>;
    'array:itemremove': Widget<ArrayItemRemoveBtnProps>;
    'array:itemadd': Widget<ArrayItemAddBtnProps>;
    field: Widget<FieldWrapperProps>;
  };
  buttons: {
    submit: Widget<SubmitBtnProps>;
    reset: Widget<ResetBtnProps>;
  };
  custom: {
    [x: string]: CustomField;
  };
}

export interface CustomField {
  widgets: { default: Widget; [x: string]: Widget };
  // renderer?: React.FC<RenderFnProps>;
}

import {
  CheckBoxInputProps,
  DatePickerProps,
  DateRangePickerProps,
  DateTimePickerProps,
  DateTimeRangePickerProps,
  NumberInputProps,
  SelectFieldProps,
  TextInputProps,
  InputFieldProps,
} from './components.interfaces';
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
import { SubmitBtnProps, ResetBtnProps } from './buttons.interface';

export type Widget<T> = React.FC<T>;

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
    enum: Widget<SelectFieldProps>;
  };
  boolean: {
    default: Widget<CheckBoxInputProps>;
  };
  date: { default: Widget<DatePickerProps> };
  datetime: { default: Widget<DateTimePickerProps> };
  daterange: { default: Widget<DateRangePickerProps> };
  datetimerange: { default: Widget<DateTimeRangePickerProps> };
  object: {};
  array: { enum: Widget<SelectFieldProps> };
  custom: {};
  unsupported: { default: Widget<InputFieldProps> };
  wrapper: {
    form: Widget<FormWrapperProps>;
    object: Widget<ObjectWrapperProps>;
    'object:item': Widget<ObjectItemWrapperProps>;
    array: Widget<ArrayWrapperProps>;
    'array:item': Widget<ArrayItemWrapperProps>;
    'array:itemremove': Widget<ArrayItemRemoveBtnProps>;
    'array:itemadd': Widget<ArrayItemAddBtnProps>;
    field: Widget<any>;
  };
  buttons: {
    submit: Widget<SubmitBtnProps>;
    reset: Widget<ResetBtnProps>;
  };
}

import {
  CheckBoxInputProps,
  DatePickerProps,
  DateRangePickerProps,
  DateTimePickerProps,
  DateTimeRangePickerProps,
  NumberInputProps,
  SelectFieldProps,
  TextInputProps
} from "../components/interfaces";
import {
  ArrayItemAddBtnProps,
  ArrayItemRemoveBtnProps,
  ArrayItemWrapperProps,
  ArrayWrapperProps,
  FormWrapperProps,
  ObjectItemWrapperProps,
  ObjectWrapperProps
} from "../wrappers/interfaces";

export type Widget<T> = React.FC<T>;

export type WrapperTypes =
  | "form"
  | "object"
  | "object:item"
  | "array"
  | "array:item"
  | "array:itemremove"
  | "array:itemadd";

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
  wrapper: {
    form: Widget<FormWrapperProps>;
    object: Widget<ObjectWrapperProps>;
    "object:item": Widget<ObjectItemWrapperProps>;
    array: Widget<ArrayWrapperProps>;
    "array:item": Widget<ArrayItemWrapperProps>;
    "array:itemremove": Widget<ArrayItemRemoveBtnProps>;
    "array:itemadd": Widget<ArrayItemAddBtnProps>;
  };
}

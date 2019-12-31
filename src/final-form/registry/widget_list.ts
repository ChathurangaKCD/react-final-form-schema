import { NumberInput } from "../components/number_input_field";
import { TextInput } from "../components/input_field";
import { CheckBoxField } from "../components/checkbox_field.";
import { SelectField } from "../components/select_field";
import { ReactDatePicker } from "../components/datetime/react-dates/date_picker";
import { CustomDateTimeRangePicker } from "../components/datetime/react-widgets/date_time_range_picker";
import { CustomDateTimePicker } from "../components/datetime/react-widgets/date_time_picker";
import { ReactDateRangePicker } from "../components/datetime/react-dates/date_range_picker";
import {
  NumberInputProps,
  TextInputProps,
  CheckBoxInputProps,
  DateTimePickerProps,
  DateRangePickerProps,
  DateTimeRangePickerProps,
  DatePickerProps,
  SelectFieldProps
} from "../components/interfaces";

type Widget<T> = React.FC<T> | React.Component<T, any, any>;

interface Widgets {
  number: {
    default: Widget<NumberInputProps>;
  };
  string: {
    default: Widget<TextInputProps>;
    enum: Widget<SelectFieldProps>;
  };
  boolean: {
    default: Widget<CheckBoxInputProps>;
  };
  datetime: {
    date: Widget<DatePickerProps>;
    datetime: Widget<DateTimePickerProps>;
    daterange: Widget<DateRangePickerProps>;
    datetimerange: Widget<DateTimeRangePickerProps>;
  };
  object: {};
  array: {};
  custom: {};
}

const defaultWidgets: Widgets = {
  number: {
    default: NumberInput
  },
  string: {
    default: TextInput,
    enum: SelectField
  },
  boolean: {
    default: CheckBoxField
  },
  datetime: {
    date: ReactDatePicker,
    datetime: CustomDateTimePicker,
    daterange: ReactDateRangePicker,
    datetimerange: CustomDateTimeRangePicker
  },
  object: {
    wrapper: undefined,
    itemWrapper: undefined
  },
  array: {
    wrapper: undefined,
    itemWrapper: undefined,
    removeBtn: undefined
  },
  custom: {}
};

export function getWidgets(customWidgets = {}) {
  return { ...defaultWidgets, ...customWidgets };
}

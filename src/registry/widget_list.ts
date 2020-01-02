import { CheckBoxField } from "../components/checkbox_field.";
import { ReactDatePicker } from "../components/datetime/react-dates/date_picker";
import { ReactDateRangePicker } from "../components/datetime/react-dates/date_range_picker";
import { CustomDateTimePicker } from "../components/datetime/react-widgets/date_time_picker";
import { CustomDateTimeRangePicker } from "../components/datetime/react-widgets/date_time_range_picker";
import { TextInput } from "../components/input_field";
import { NumberInput } from "../components/number_input_field";
import { SelectField } from "../components/select_field";
import { IWidgets } from "../interfaces/widgets.interfaces";
import {
  FormWrapper,
  ObjectWrapper,
  ObjectItemWrapper,
  ArrayWrapper,
  ArrayItemWrapper,
  ArrayItemRemoveBtn,
  ArrayItemAddBtn
} from "../wrappers/component_wrappers";

export const defaultWidgets: IWidgets = {
  number: {
    default: NumberInput
  },
  integer: {
    default: NumberInput
  },
  string: {
    default: TextInput,
    enum: SelectField
  },
  boolean: {
    default: CheckBoxField
  },
  date: { default: ReactDatePicker },
  datetime: { default: CustomDateTimePicker },
  daterange: { default: ReactDateRangePicker },
  datetimerange: { default: CustomDateTimeRangePicker },
  object: {},
  array: {
    enum: SelectField
  },
  custom: {},
  wrapper: {
    form: FormWrapper,
    object: ObjectWrapper,
    "object:item": ObjectItemWrapper,
    array: ArrayWrapper,
    "array:item": ArrayItemWrapper,
    "array:itemremove": ArrayItemRemoveBtn,
    "array:itemadd": ArrayItemAddBtn
  }
};

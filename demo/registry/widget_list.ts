import { CheckBoxField } from '../components/checkbox_field.';
import { ReactDatePicker } from '../components/datetime/react-dates/date_picker';
import { ReactDateRangePicker } from '../components/datetime/react-dates/date_range_picker';
import { CustomDateTimePicker } from '../components/datetime/react-widgets/date_time_picker';
import { CustomDateTimeRangePicker } from '../components/datetime/react-widgets/date_time_range_picker';
import { TextInput } from '../components/input_field';
import { NumberInput, NumberRangeInput } from '../components/number_input_field';
import { SelectField } from '../components/select_field';
import { UnsupportedField } from '../components/unsupported_field';
import { IWidgets } from '../../dist/';
import {
  ArrayItemAddBtn,
  ArrayItemRemoveBtn,
  ArrayItemWrapper,
  ArrayWrapper,
  FieldWrapper,
  FormWrapper,
  ObjectItemWrapper,
  ObjectWrapper,
} from '../wrappers/component_wrappers';
import { SubmitBtn, ResetBtn } from '../wrappers/buttons';

export const defaultWidgets: IWidgets = {
  number: {
    default: NumberInput,
    range: NumberRangeInput,
  },
  integer: {
    default: NumberInput,
    range: NumberRangeInput,
  },
  string: {
    default: TextInput,
    enum: SelectField,
  },
  boolean: {
    default: CheckBoxField,
  },
  date: { default: ReactDatePicker },
  datetime: { default: CustomDateTimePicker },
  daterange: { default: ReactDateRangePicker },
  datetimerange: { default: CustomDateTimeRangePicker },
  object: {},
  array: {
    enum: SelectField,
  },
  custom: {},
  unsupported: { default: UnsupportedField },
  wrapper: {
    form: FormWrapper,
    object: ObjectWrapper,
    'object:item': ObjectItemWrapper,
    array: ArrayWrapper,
    'array:item': ArrayItemWrapper,
    'array:itemremove': ArrayItemRemoveBtn,
    'array:itemadd': ArrayItemAddBtn,
    field: FieldWrapper,
  },
  buttons: {
    submit: SubmitBtn,
    reset: ResetBtn,
  },
};

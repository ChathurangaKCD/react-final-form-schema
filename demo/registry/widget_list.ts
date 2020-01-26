import { IWidgets } from '../../dist/';
import { CheckBoxField } from '../components/checkbox_field.';
import { ReactDatePicker } from '../components/datetime/react-dates/date_picker';
import { ReactDateRangePicker } from '../components/datetime/react-dates/date_range_picker';
import { DateTimePickers } from '../components/datetime/react-widgets';
import { TextAreaInput, TextInput } from '../components/input_field';
import {
  NumberInput,
  NumberRangeInput,
} from '../components/number_input_field';
import { SelectField } from '../components/select_field';
import { UnsupportedField } from '../components/unsupported_field';
import { ResetBtn, SubmitBtn } from '../wrappers/buttons';
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
    textarea: TextAreaInput,
  },
  boolean: {
    default: CheckBoxField,
  },
  object: {},
  array: {
    enum: SelectField,
  },
  custom: {
    date: { widgets: { default: ReactDatePicker } },
    datetime: { widgets: { default: DateTimePickers.DateTime } },
    daterange: { widgets: { default: ReactDateRangePicker } },
    datetimerange: { widgets: { default: DateTimePickers.DateTimeRange } },
    ipv4: { widgets: { default: TextInput, 'ipv4:masked': NumberInput } },
  },
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

# React Final Form Schema

Generates forms using schema definitions.

`Schema` - Required data format (structure and validations) is defined with a [JSON schema][json-schema].

`UI Schema` - additional ui customizations are defined in the ui schema. (layouts, styles & custom widgets).

### UI Components
UI components list should implement `IWidgets` interface.
Default widgets are used when widget type is not defined in UI schema.

```
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
  // other input types
```

#### Wrappers
Components used to define layout of the form
* FormWrapper - render form inputs & buttons.
* ObjectWrapper
* ObjectItemWrapper
* ArrayWrapper
* ArrayItemWrapper
* ArrayItemRemoveBtn
* ArrayItemAddBtn
* FieldWrapper

#### Input widgets
Components used to define actual input fields and styles.

* NumberInput
* TextInput
* SelectField
* CheckBoxField
* Date Time Pickers
* & custom widgets implementing relevant interfaces for data types..

### Component Layout
![alt text][layout-diagram]

[layout-diagram]: https://github.com/ChathurangaKCD/react-final-form-schema/raw/master/layout/Form%20Layout.png "Component Layout"

[json-schema]: https://json-schema.org/understanding-json-schema/
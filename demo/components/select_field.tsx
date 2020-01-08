import React, { useMemo, useCallback } from 'react';
import { Form } from 'react-bootstrap';
import Select from 'react-select';
import { SelectFieldProps } from '../../dist/interfaces/components.interfaces';

// export function SimpleSelectField({
//   label,
//   error,
//   path,
//   items,
//   ...otherProps
// }) {
//   return (
//     <Form.Group controlId={path}>
//       {label && <Form.Label className="float-left">{label}</Form.Label>}
//       <Form.Control as="select" {...otherProps}>
//         <option value="" disabled>
//           select
//         </option>
//         {items.map(item => (
//           <option key={item.value} value={item.value}>
//             {item.label}
//           </option>
//         ))}
//       </Form.Control>
//     </Form.Group>
//   );
// }

function useTransformSelecteProps({
  input: { value: selected, onChange: onChangeValue, ...input },
  optionValues,
  optionLabels = [],
  multiple: isMultiSelect = false,
}: SelectFieldProps) {
  const options = useMemo(() => {
    return optionValues.map((val, idx) => ({
      label: optionLabels[idx] || val,
      value: val,
    }));
  }, [optionValues, optionLabels]);
  const mapFn = useMemo(() => {
    const optionMap = new Map(options.map(opt => [opt.value, opt]));
    return (optValue: string) => optionMap.get(optValue);
  }, [options]);
  const onChange = useCallback(
    (event: any) => {
      console.log(event);
      const nextValue =
        isMultiSelect && Array.isArray(event)
          ? event.map(opt => opt.value)
          : event.value;
      onChangeValue(nextValue);
    },
    [isMultiSelect, onChangeValue]
  );
  const value = useMemo(() => {
    const transformedValue =
      isMultiSelect && Array.isArray(selected)
        ? selected.map(mapFn)
        : mapFn(selected);
    return transformedValue;
  }, [selected, mapFn, isMultiSelect]);
  return { value, onChange, options, isMulti: isMultiSelect, ...input };
}

export function SelectField(props: SelectFieldProps) {
  const mappedProps = useTransformSelecteProps(props);
  const { label, error } = props;
  return (
    <Form.Group controlId={mappedProps.name}>
      {label && <Form.Label className="float-left">{label}</Form.Label>}
      <Select isSearchable={true} {...mappedProps} />
    </Form.Group>
  );
}

// export function MultiSelectField({
//   label,
//   error,
//   path,
//   isMulti,
//   ...otherProps
// }) {
//   const mappedProps = useTransformSelecteProps(otherProps);
//   const props = { ...otherProps, ...mappedProps };
//   return (
//     <Form.Group controlId={path}>
//       {label && <Form.Label className="float-left">{label}</Form.Label>}
//       <Select isMulti isSearchable={true} {...props} />
//     </Form.Group>
//   );
// }

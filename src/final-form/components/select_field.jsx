import React, { useMemo } from "react";
import { Form } from "react-bootstrap";
import Select from "react-select";

export function SimpleSelectField({
  label,
  error,
  path,
  items,
  ...otherProps
}) {
  return (
    <Form.Group controlId={path}>
      {label && <Form.Label className="float-left">{label}</Form.Label>}
      <Form.Control as="select" {...otherProps}>
        <option value="" disabled>
          select
        </option>
        {items.map(item => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </Form.Control>
    </Form.Group>
  );
}

function useTransformSelecteProps({
  value: selected,
  items: options,
  onChange: onChangeValue,
  multiple: isMultiSelect = false
}) {
  const mapFn = useMemo(() => {
    const optionMap = new Map(options.map(opt => [opt.value, opt]));
    return optValue => optionMap.get(optValue);
  }, [options]);
  const onChange = useMemo(
    () => event => {
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
  return { value, onChange, options, isMulti: isMultiSelect };
}

export function SelectField({ label, error, path, ...otherProps }) {
  const mappedProps = useTransformSelecteProps(otherProps);
  const props = { ...otherProps, ...mappedProps };
  return (
    <Form.Group controlId={path}>
      {label && <Form.Label className="float-left">{label}</Form.Label>}
      <Select isSearchable={true} {...props} />
    </Form.Group>
  );
}

export function MultiSelectField({ label, error, path, items, ...otherProps }) {
  const mappedProps = useTransformSelecteProps(otherProps);
  const props = { ...otherProps, ...mappedProps };
  return (
    <Form.Group controlId={path}>
      {label && <Form.Label className="float-left">{label}</Form.Label>}
      <Select isMulti isSearchable={true} {...props} />
    </Form.Group>
  );
}

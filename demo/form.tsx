import React, { useState, useCallback, useEffect } from 'react';
import formSchema from './schema.json';
import formUiSchema from './ui_schema.json';
import { SchemaForm } from '../dist';
const initialValues = { title: 't1' };
import './form.scss';

const dataRef = (function() {
  let onUpdate: any = null;
  return {
    update(val: any) {
      onUpdate && onUpdate(val);
    },
    subscribe(cb) {
      onUpdate = cb;
      return () => (onUpdate = null);
    },
  };
})();
function DataSubscriber({ children }) {
  const [val, setVal] = useState(null);
  useEffect((): any => {
    return dataRef.subscribe(setVal);
  }, []);
  return children(val);
}

export function FinalForm() {
  const onSubmit = useCallback(() => alert('submit'), []);
  return (
    <div style={{ width: '60%', margin: 'auto', paddingTop: '50px' }}>
      <SchemaForm
        schema={formSchema}
        uiSchema={formUiSchema}
        initialValues={initialValues}
        onSubmit={onSubmit}
        onValueChange={dataRef.update}
      ></SchemaForm>
      <div style={{ width: '100vw', margin: 'auto', paddingTop: '50px' }}>
        <DataSubscriber>
          {(values: any) => <pre>{JSON.stringify(values, 0, 2)}</pre>}
        </DataSubscriber>
        <pre style={{ width: '100vw', margin: 'auto', paddingTop: '50px' }}>
          {JSON.stringify(formSchema, null, 2)}
        </pre>
      </div>
    </div>
  );
}

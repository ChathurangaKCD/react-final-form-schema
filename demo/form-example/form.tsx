import React, { useState, useCallback, useEffect } from 'react';
import { SchemaForm } from '../../dist/';
import formSchema from './schema.json';
import formUiSchema from './ui_schema.json';
import { defaultWidgets } from '../registry/widget_list';
const initialValues = { title: 't1' };

const dataRef = (function() {
  let onUpdate: any = null;
  return {
    update(val: any) {
      onUpdate && onUpdate(val);
    },
    subscribe(cb: any) {
      onUpdate = cb;
      return (): void => {
        onUpdate = null;
      };
    },
  };
})();
function DataSubscriber({ children }: any) {
  const [val, setVal] = useState(null);
  useEffect(() => {
    return dataRef.subscribe(setVal);
  }, []);
  return children(val);
}

export default function FinalForm() {
  const onSubmit = useCallback(
    () =>
      new Promise(resolve => {
        setTimeout(() => alert('submit'), 3000);
        resolve();
      }),
    []
  );
  return (
    <div style={{ width: '60%', margin: 'auto', paddingTop: '50px' }}>
      <SchemaForm
        schema={formSchema}
        uiSchema={formUiSchema}
        initialValues={initialValues}
        onSubmit={onSubmit}
        widgets={defaultWidgets}
        onValueChange={dataRef.update}
      ></SchemaForm>
      <div style={{ width: '100vw', margin: 'auto', paddingTop: '50px' }}>
        <DataSubscriber>
          {(values: any) => <pre>{JSON.stringify(values, null, 2)}</pre>}
        </DataSubscriber>
        <pre style={{ width: '100vw', margin: 'auto', paddingTop: '50px' }}>
          {JSON.stringify(formSchema, null, 2)}
        </pre>
      </div>
    </div>
  );
}

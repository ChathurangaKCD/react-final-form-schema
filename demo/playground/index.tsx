import React, { useCallback, useState } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { SchemaForm } from '../../dist';
import defaultSchema from '../form-example/schema.json';
import defaultUiSchema from '../form-example/ui_schema.json';
import { defaultWidgets } from '../registry/widget_list';
import { dataRef, DataSubscriber } from './data_ref';
import { Editor } from './Editor';
const initialValues = { title: 't1' };

interface ISchema {
  [x: string]: any;
}
export function Playground() {
  const [schema, setSchema] = useState<ISchema>(defaultSchema);
  const [uiSchema, setUiSchema] = useState<ISchema>(defaultUiSchema);
  const onUpdateSchema = useCallback(val => {
    setSchema({ ...parseJson(val), key: Date.now() });
  }, []);
  const onUpdateUiSchema = useCallback(val => {
    setUiSchema({ ...parseJson(val), key: Date.now() });
  }, []);
  const onSubmit = useCallback(
    () =>
      new Promise(resolve => {
        setTimeout(() => alert('submit'), 3000);
        resolve();
      }),
    []
  );
  return (
    <Tabs forceRenderTabPanel={true}>
      <TabList>
        <Tab>Schema</Tab>
        {/* <Tab>Ui Schema</Tab> */}
        <Tab>Form</Tab>
        <Tab>Values</Tab>
      </TabList>
      <TabPanel>
        <Editor defaultValue={defaultSchema} onUpdate={onUpdateSchema} />
      </TabPanel>
      {/* <TabPanel>
        <Editor defaultValue={defaultUiSchema} onUpdate={onUpdateUiSchema} />
      </TabPanel> */}
      <TabPanel>
        <SchemaForm
          key={schema.key}
          schema={schema}
          uiSchema={defaultUiSchema}
          initialValues={initialValues}
          onSubmit={onSubmit}
          widgets={defaultWidgets}
          onValueChange={dataRef.update}
        ></SchemaForm>
      </TabPanel>
      <TabPanel>
        <DataSubscriber>
          {(values: any) => <pre>{JSON.stringify(values, null, 2)}</pre>}
        </DataSubscriber>
      </TabPanel>
    </Tabs>
  );
}

function parseJson(code: string) {
  let obj = {};
  try {
    obj = JSON.parse(code);
  } catch (error) {}
  return obj;
}

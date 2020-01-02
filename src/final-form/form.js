import React, { useState, useCallback, useEffect } from "react";
import { SchemaForm } from "./schema_form";
import formSchema from "./schema.json";
import formUiSchema from "./ui_schema.json";
import { defaultWidgets } from "./registry/widget_list";
const initialValues = { title: "t1" };

const dataRef = (function() {
  let onUpdate = null;
  return {
    update(val) {
      onUpdate && onUpdate(val);
    },
    subscribe(cb) {
      onUpdate = cb;
      return () => (onUpdate = null);
    }
  };
})();
function DataSubscriber({ children }) {
  const [val, setVal] = useState(null);
  useEffect(() => {
    return dataRef.subscribe(setVal);
  }, []);
  return children(val);
}

export default function FinalForm() {
  const onSubmit = useCallback(() => alert("submit"), []);
  return (
    <div style={{ width: "60%", margin: "auto", paddingTop: "50px" }}>
      <SchemaForm
        schema={formSchema}
        uiSchema={formUiSchema}
        initialValues={initialValues}
        onSubmit={onSubmit}
        widgets={defaultWidgets}
        onValueChange={dataRef.update}
      ></SchemaForm>
      <div style={{ width: "100vw", margin: "auto", paddingTop: "50px" }}>
        <DataSubscriber>
          {values => <pre>{JSON.stringify(values, 0, 2)}</pre>}
        </DataSubscriber>
        <pre style={{ width: "100vw", margin: "auto", paddingTop: "50px" }}>
          {JSON.stringify(formSchema, null, 2)}
        </pre>
      </div>
    </div>
  );
}

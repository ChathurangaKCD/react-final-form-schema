import React from "react";
import { SchemaForm } from "./schema_form";
import formSchema from "./schema.json";

// export default  function FinalForm(){
//   return <MyForm onSubmit={()=>alert('Submit')} validate={()=>true}></MyForm>
// };
// console.log(typeof formSchema, formSchema);

export default function FinalForm() {
  return (
    <div style={{ width: "60%", margin: "auto", paddingTop: "50px" }}>
      <SchemaForm
        schema={formSchema}
        initialValues={{ title: "t1" }}
        onSubmit={() => alert("submit")}
      ></SchemaForm>
      <div style={{ width: "100vw", margin: "auto", paddingTop: "50px" }}>
        <pre style={{ width: "100vw", margin: "auto", paddingTop: "50px" }}>
          {JSON.stringify(formSchema, null, 2)}
        </pre>
      </div>
    </div>
  );
}

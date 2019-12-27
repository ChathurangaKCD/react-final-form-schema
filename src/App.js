import React from "react";
import "./App.scss";
import MyForm from "./final-form/form";

function App() {
  return (
    <div className="App">
      {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <MaterialUIPickers></MaterialUIPickers>
      </MuiPickersUtilsProvider> */}
      <MyForm></MyForm>
    </div>
  );
}

export default App;

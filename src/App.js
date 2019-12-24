// import DateFnsUtils from "@date-io/date-fns";
// import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import React from "react";
import "./App.scss";
import MyForm from "./final-form/form";
// import { MaterialUIPickers } from "./DatePicker";

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

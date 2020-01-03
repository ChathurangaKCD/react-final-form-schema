import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
// import './index.scss';
import FinalForm from './form-example/form';
const App = () => {
  return (
    <div>
      <FinalForm></FinalForm>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

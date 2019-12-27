import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { FinalForm } from './form';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-widgets/dist/css/react-widgets.css';
const App = () => {
  return (
    <div>
      <FinalForm></FinalForm>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

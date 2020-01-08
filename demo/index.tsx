import 'bootstrap/dist/css/bootstrap.min.css';
import * as React from 'react';
import { Container } from 'react-bootstrap';
import * as ReactDOM from 'react-dom';
import 'react-widgets/lib/scss/react-widgets.scss';
import { Playground } from './playground';

const App = () => {
  return (
    <Container>
      {/* <FinalForm></FinalForm> */}
      <Playground></Playground>
    </Container>
  );
};

import * as monaco from 'monaco-editor';

(self as any).MonacoEnvironment = {
  getWorkerUrl: function(moduleId: any, label: string) {
    if (label === 'json') {
      return './dist/json.worker.js';
    }
    if (label === 'css') {
      return './css.worker.js';
    }
    if (label === 'html') {
      return './html.worker.js';
    }
    if (label === 'typescript' || label === 'javascript') {
      return './ts.worker.js';
    }
    return './editor.worker.js';
  },
};
// monaco.editor.create((document as any).getElementById('container'), {
//   value: ['{', '}'].join('\n'),
//   language: 'json',
// });
ReactDOM.render(<App />, document.getElementById('root'));

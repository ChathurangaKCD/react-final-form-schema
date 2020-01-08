import React, { useState } from 'react';
import MonacoEditor from 'react-monaco-editor';
import _ from 'lodash';
import { Row, Button, Col, Container } from 'react-bootstrap';

// function editorDidMount(editor: any, monaco: any) {
//   console.log('editorDidMount', editor);
//   editor.focus();
// }
export const Editor = props => {
  const { onUpdate, defaultValue, ...rest } = props;
  const [code, onChange] = useState(JSON.stringify(defaultValue, null, 2));
  const options = {
    tabSize: 2,
    wordWrapColumn: 80,
    wordWrap: 'bounded',
    contextMenu: true,
  };
  return (
    <Row>
      <Container>
        <MonacoEditor
          language="json"
          theme="vs-light"
          height="600px"
          width="100%"
          // value={code}
          defaultValue={code}
          options={options}
          onChange={_.debounce(onChange)}
          {...rest}
        />
      </Container>
      <Col md={12}>
        <Button onClick={() => onUpdate(code)}>Apply schema</Button>
      </Col>
    </Row>
  );
};

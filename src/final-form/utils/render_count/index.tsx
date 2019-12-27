import React from 'react';
// import './index.css';

export default class RenderCount extends React.Component {
  renders = 0;

  render() {
    this.renders++;
    return <div className="render-count">{this.renders}</div>;
  }
}

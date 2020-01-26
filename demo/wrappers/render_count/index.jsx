import React, { useRef } from 'react';
import './index.css';

const DISPLAY_COUNT = false;

export function RenderCount() {
  const count = useRef(0);
  if (DISPLAY_COUNT)
    return <div className="render-count">{++count.current}</div>;
  return null;
}

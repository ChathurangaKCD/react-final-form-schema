import { useState, useEffect } from 'react';

export const dataRef = (function() {
  let onUpdate: any = null;
  return {
    update(val: any) {
      onUpdate && onUpdate(val);
    },
    subscribe(cb: any) {
      onUpdate = cb;
      return (): void => {
        onUpdate = null;
      };
    },
  };
})();

export function DataSubscriber({ children }: any) {
  const [val, setVal] = useState(null);
  useEffect(() => {
    return dataRef.subscribe(setVal);
  }, []);
  return children(val);
}

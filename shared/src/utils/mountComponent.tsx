import React from 'react';
import { createRoot }  from 'react-dom/client';

export const createMountComponent = (Component: any, props: any, el: any) => {
  const root = createRoot(el as HTMLElement);

  return root.render(<Component {...props} />);
};

import React from 'react';

import { createMountComponent } from '../../utils/mountComponent';

export interface IButtonProps {
  title?: string
  onClick: (val: string) => void
}

const Button = (props: IButtonProps): JSX.Element => {
  return (
    <button onClick={() => props.onClick('with button clicked')}>
      { props.title || 'Shared Remote Button' }
    </button>
  );
}

export default (el: any, props: IButtonProps) => createMountComponent(Button, props, el);

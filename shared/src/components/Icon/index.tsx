import React, { memo } from 'react';
import { createMountComponent } from "../../utils/mountComponent";
import styles from './Icon.module.scss';

interface IIconProps {
  className: string;
  numberTopItem?: number;
  customClass?: string;
}

const Icon = memo(({className, numberTopItem, customClass}: IIconProps) => {
  return (
    <div className={`${styles.icon} ${customClass ? customClass : ''}`}>
      <li className={`fa ${className}`} />
      <span className={`${styles.icon__item}`}>{numberTopItem}</span>
    </div>
  );
})

Icon.displayName = 'Icon';

export default (el: any, props: IIconProps) => createMountComponent(Icon, props, el);

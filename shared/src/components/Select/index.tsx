/* eslint-disable @typescript-eslint/ban-types */
import React, { ChangeEventHandler } from 'react';
import Select from 'react-select';
import styles from './Select.module.scss';
import { createMountComponent } from "../../utils/mountComponent";

interface ISelectProps {
  placeholder?: string;
  errorMsg?: string;
  label?: string;
  disabled?: boolean;
  onBlur?: Function;
  onChange?: ChangeEventHandler<HTMLSelectElement>,
  defaultValue?: any;
  options: Array<{value: string, label: string}>;
  className?: string;
  value: any,
}
const SelectCustom = ({placeholder, label, disabled, onChange, defaultValue, options, value, className}: ISelectProps) => {
  return (
    <div className={`${styles.customSelect} ${className}`}>
      {!!label && <p className="input__label">{label}</p>}
      <Select
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        options={options}
        isDisabled={disabled}
      />
    </div>
  );
};

export default (el: any, props: ISelectProps) => createMountComponent(SelectCustom, props, el);
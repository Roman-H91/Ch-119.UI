import React, { FC } from 'react';
import { InputI } from '../../utils/interfaces';

export const Input: FC<InputI> = ({
  onChange,
  value,
  className,
  type,
  name,
  id,
  placeholder,
}) => (
  <input
    onChange={onChange}
    value={value}
    className={className}
    type={type}
    name={name}
    id={id}
    placeholder={placeholder}
  />
);

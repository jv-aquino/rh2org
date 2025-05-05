/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useState } from 'react';
import { Check, X } from 'lucide-react';
import styles from './input.module.css';
import { mergeClasses } from '@/utils/mergeClasses';

interface ValidatedInputProps {
  title: string;
  name: string;
  placeholder: string;
  type?: string;
  value?: any;
  setValue?: (value: any) => void;
  overrideValidate?: (value: string) => boolean;
  containerClassName?: string;
  labelClassName?: string;
  inputContainerClassName?: string;
  inputClassName?: string;
  iconContainerClassName?: string;
}

function ValidatedInput({
  title,
  name,
  placeholder,
  type,
  value,
  setValue,
  overrideValidate,
  containerClassName,
  labelClassName,
  inputContainerClassName,
  inputClassName,
  iconContainerClassName,
}: ValidatedInputProps) {
  const [inputValue, setInputValue] = useState<string>(value || '');
  const [isValid, setIsValid] = useState<boolean | null>(null);

  let validate: (value: string) => boolean;
  if (overrideValidate) {
    validate = overrideValidate;
  } else {
    validate = (value) => {
      if (type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
      }
      if (type === 'password') {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        return passwordRegex.test(value);
      }
      if (type === 'phone') {
        const phoneRegex = /^\+?[1-9]\d{1,14}$/;
        return phoneRegex.test(value);
      }
      if (type === 'text') {
        return value.trim().length > 0;
      }
      return true;
    };
  }

  let onChange;
  if (value && setValue) {
    onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
      setIsValid(validate(e.target.value));
    };
  } else {
    onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
      setIsValid(validate(e.target.value));
    };
  }

  return (
    <div className={mergeClasses("flex flex-col", containerClassName)}>
      <label className={mergeClasses("text-lg font-medium", labelClassName)} htmlFor={name}>
        {title}
      </label>
      <div className={mergeClasses("relative inline-block", inputContainerClassName)}>
        <input
          className={mergeClasses("outline-none text-slate-900 placeholder:text-gray-400", inputClassName)}
          type={type ?? 'text'}
          name={name}
          id={name}
          placeholder={placeholder}
          value={value ? value : inputValue}
          onChange={onChange}
        />
        {isValid !== null && (
          <span className={mergeClasses(styles.icon_container + " right-0", iconContainerClassName)}>
            {isValid ? (
              <Check className={`${styles.icon} ${styles.icon_valid}`} />
            ) : (
              <X className={`${styles.icon} ${styles.icon_invalid}`} />
            )}
          </span>
        )}
      </div>
    </div>
  );
}

export default ValidatedInput;

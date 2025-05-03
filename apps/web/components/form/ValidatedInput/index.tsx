'use client';
import { useState } from 'react';
import { Check, X } from 'lucide-react';
import styles from './input.module.css';

interface ValidatedInputProps {
  title: string;
  name: string;
  placeholder: string;
  type?: string;
}

function ValidatedInput({
  title,
  name,
  placeholder,
  type,
}: ValidatedInputProps) {
  const [value, setValue] = useState('');
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const validate = (value: string) => {
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
    return null;
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setIsValid(validate(e.target.value));
  };


  return (
    <div className={styles.container}>
      <label className={`${styles.label} sm:text-[22px]`} htmlFor={name}>
        {title}
      </label>
      <div className={styles.input_container}>
        <input
          className={`${styles.input} sm:text-[19px]`}
          type={type ?? 'text'}
          name={name}
          id={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        {isValid !== null && (
          <span className={styles.icon_container}>
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

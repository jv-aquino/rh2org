import { Check, X } from "lucide-react";
import styles from "./input.module.css";

interface ValidatedInputProps {
  title: string;
  name: string;
  placeholder: string;
  type?: string;
  value: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isValid: boolean | null;
}

function ValidatedInput({ title, name, placeholder, type, value, onChange, isValid }: ValidatedInputProps) {
  return ( 
    <div className={styles.container}>
      <label className={styles.label} htmlFor={name}>{title}</label>
      <div className={styles.input_container}>
        <input className={styles.input}
          type={type ?? "text"} name={name} id={name} placeholder={placeholder}
          value={value} onChange={onChange} />
          {isValid !== null && (
            <span className={styles.icon_container}>
              {isValid ? <Check className={`${styles.icon} ${styles.icon_valid}`} /> : <X className={`${styles.icon} ${styles.icon_invalid}`} />}
            </span>
          )}
      </div>
    </div>
   );
}

export default ValidatedInput;
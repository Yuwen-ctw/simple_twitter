import styles from '../../assets/styles/components/form/authInput.module.scss';


const AuthInput = ({ type, label, value, placeholder, onChange }) => {
  return (
    <div className={styles.Container}>
        <div className={styles.label}>
        {label}
        </div>
        <div className={styles.Input}
        type={type || 'text'}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange?.(event.target.value)}
        >
        </div>
    </div>
  );
};

export default AuthInput;
import styles from 'assets/styles/components/form/settingInput.module.scss'
import { forwardRef } from 'react'

const SettingInput = forwardRef((props, ref) => {
  const {
    value,
    onChange,
    inputName,
    labelName,
    type = 'text',
    errMessage = '內容不可空白',
    disabled = false,
  } = props
  const nameErr =
    inputName === 'name' && value.length > 50 ? '字數超出上限' : errMessage
  return (
    <div className={styles.input__wrapper} ref={ref}>
      <label htmlFor={`setting-${inputName}-input`}>{labelName}</label>
      <input
        type={type}
        className={styles.input}
        id={`setting-${inputName}-input`}
        value={value}
        onChange={(e) =>
          onChange({ type: `${inputName}`, payload: e.target.value })
        }
        autoComplete="off"
        disabled={disabled}
      />
      <span className={styles.error}>{nameErr}</span>
      {inputName === 'name' && (
        <span className={styles.maxLen}>{value?.length}/50</span>
      )}
    </div>
  )
})

SettingInput.displayName = 'SettingInput'
export default SettingInput

import styles from 'assets/styles/components/share/texts.module.scss'

const SectionTitle = ({ text, children }) => (
  <h4 className={styles.sectionTitle}>
    {children}
    {text}
  </h4>
)

export default SectionTitle

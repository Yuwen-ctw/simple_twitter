import Router from './routes/Router'
import styles from 'assets/styles/app.module.scss'

function App() {
  return <div className={styles.app}>{<Router />}</div>
}

export default App

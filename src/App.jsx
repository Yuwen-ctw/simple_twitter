import { BrowserRouter } from 'react-router-dom'
import Router from './routes/Router'
import styles from 'assets/styles/app.module.scss'
import { AuthContextProvider } from 'contexts/AuthContext'

function App() {
  return (
    <div className={styles.app}>
      <BrowserRouter>
        <AuthContextProvider>
          <Router />
        </AuthContextProvider>
      </BrowserRouter>
    </div>
  )
}

export default App

import { BrowserRouter } from 'react-router-dom'
import Router from './routes/Router'
import styles from 'assets/styles/app.module.scss'
import { AuthContextProvider } from 'contexts/AuthContext'

const basename = process.env.PUBLIC_URL

function App() {
  return (
    <div className={styles.app}>
      <BrowserRouter basename={basename}>
        <AuthContextProvider>
          <Router />
        </AuthContextProvider>
      </BrowserRouter>
    </div>
  )
}

export default App

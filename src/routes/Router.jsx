import { Route, Routes } from 'react-router-dom'
import { RegisterPage, LoginPage, NotFoundPage } from '../pages'
import AdminRoutes from './AdminRoutes'
import MainRoutes from './MainRoutes/MainRoutes'

function Router() {
  return (
    <Routes>
      <Route path="register" element={<RegisterPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="admin/*" element={<AdminRoutes />} />
      <Route path="/*" element={<MainRoutes />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default Router

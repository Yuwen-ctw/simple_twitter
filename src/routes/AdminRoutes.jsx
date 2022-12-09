import { Routes, Route } from 'react-router-dom'
import {
  AdminLoginPage,
  AdminMainLayout,
  AdminTweetsPage,
  AdminUsersPage,
  NotFoundPage,
} from '../pages/index'

function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AdminLoginPage />} />
      <Route path="main" element={<AdminMainLayout />}>
        <Route path="tweets" element={<AdminTweetsPage />} />
        <Route path="users" element={<AdminUsersPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
export default AdminRoutes

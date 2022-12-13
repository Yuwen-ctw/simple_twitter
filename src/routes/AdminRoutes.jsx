import { Routes, Route } from 'react-router-dom'
import {
  AdminLoginPage,
  AdminMainLayout,
  AdminTweetSection,
  AdminUserSection,
  NotFoundPage,
} from '../pages/index'

function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AdminLoginPage />} />
      <Route element={<AdminMainLayout />}>
        <Route path="tweets" element={<AdminTweetSection />} />
        <Route path="users" element={<AdminUserSection />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
export default AdminRoutes

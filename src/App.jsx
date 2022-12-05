import { BrowserRouter, Route, Routes } from 'react-router-dom'
import {
  RegisterPage,
  LoginPage,
  SettingPage,
  AdminLoginPage,
  NotFoundPage,
  AdminMainLayout,
  AdminTweetsPage,
  AdminUsersPage,
} from './pages'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="register" element={<RegisterPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="setting" element={<SettingPage />} />
        <Route path="admin" element={<AdminLoginPage />} />
        <Route path="admin/main" element={<AdminMainLayout />}>
          <Route index element={<AdminTweetsPage />} />
          <Route path="users" element={<AdminUsersPage />} />
        </Route>
        <Route path="/main" element>
          <Route index element />
          <Route path="tweet/:tweetId" element />
          <Route path="user/:userId" element>
            <Route index element />
            <Route path="like" element />
            <Route path="reply" element />
          </Route>
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

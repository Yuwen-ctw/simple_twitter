import { Routes, Route } from 'react-router-dom'
import {
  MainLayout,
  SettingSection,
  MainSection,
  TweetSection,
  NotFoundPage,
} from '../../pages'
import UserRoutes from './UserRoutes'
function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<MainSection />} />
        <Route path="setting" element={<SettingSection />} />
        <Route path="tweet/:tweetId" element={<TweetSection />} />
        <Route path="user/:userId/*" element={<UserRoutes />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
export default MainRoutes

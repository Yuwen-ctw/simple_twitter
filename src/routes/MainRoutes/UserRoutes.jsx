import { Routes, Route } from 'react-router-dom'
import {
  UserSectionLayout,
  UserMainSection,
  UserReplySection,
  UserFollowSection,
  NotFoundPage,
} from '../../pages'

function UserRoutes() {
  return (
    <Routes>
      <Route path="/" element={<UserSectionLayout />}>
        <Route path="tweets" element={<UserMainSection />} />
        <Route path="likes" element={<UserMainSection />} />
        <Route path="replied_tweets" element={<UserReplySection />} />
        <Route path="followers" element={<UserFollowSection />} />
        <Route path="followings" element={<UserFollowSection />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default UserRoutes

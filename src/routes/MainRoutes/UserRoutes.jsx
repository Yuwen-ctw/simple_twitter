import { Routes, Route } from 'react-router-dom'
import {
  UserSectionLayout,
  UserMainSection,
  UserLikeSection,
  UserReplySection,
  UserFollowSection,
  NotFoundPage,
} from '../../pages'

function UserRoutes() {
  return (
    <Routes>
      <Route path="/" element={<UserSectionLayout />}>
        <Route path="tweet" element={<UserMainSection />} />
        <Route path="like" element={<UserLikeSection />} />
        <Route path="reply" element={<UserReplySection />} />
      </Route>
      <Route path="follower" element={<UserFollowSection />} />
      <Route path="following" element={<UserFollowSection />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default UserRoutes

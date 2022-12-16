import { useLocation } from 'react-router-dom'
import Navbar from './share/Navbar'
import NavItem from './share/NavItem'
import { ClrButton } from '../Buttons'

function UserNavbar({ onClick, onLogout, currentUserId }) {
  const pathName = useLocation().pathname
  let check
  if (pathName === '/' && pathName.length === 1) check = 'home'
  if (pathName.includes('tweet/')) check = 'home'
  if (pathName.includes('setting')) check = 'setting'
  if (pathName.includes(`user/${currentUserId}`)) check = 'user'

  return (
    <Navbar>
      <NavItem text="首頁" value={'home'} check={check} to="/" />
      <NavItem
        text="個人資料"
        value={'user'}
        check={check}
        to={`user/${currentUserId}/tweets`}
      />
      <NavItem text="設定" value={'setting'} check={check} to="setting" />
      <ClrButton text="推文" onClick={onClick} />
      <NavItem text="登出" value={'logout'} onClick={onLogout} to="login" />
    </Navbar>
  )
}

export default UserNavbar

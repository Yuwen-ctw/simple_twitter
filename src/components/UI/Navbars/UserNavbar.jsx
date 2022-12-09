import { useLocation } from 'react-router-dom'
import Navbar from './share/Navbar'
import NavItem from './share/NavItem'

function UserNavbar() {
  const pathName = useLocation().pathname
  let check
  if (pathName === '/') check = 'home'
  if (pathName.includes('tweet')) check = 'home'
  // 需要確認本人id，並加進條件式
  if (pathName.includes('user')) check = 'user'

  return (
    <Navbar>
      <NavItem text="首頁" value={'home'} check={check} to="/" />
      <NavItem text="個人資料" value={'user'} check={check} to="user/5" />
      <NavItem text="設定" value={'setting'} check={check} to="setting" />
      <NavItem text="登出" value={'logout'} />
    </Navbar>
  )
}

export default UserNavbar

import { useLocation } from 'react-router-dom'
import Navbar from './share/Navbar'
import NavItem from './share/NavItem'

function AdminNavbar({ onLogout }) {
  const pathName = useLocation().pathname
  const check = pathName.includes('tweets') ? 'tweets' : 'users'

  return (
    <Navbar>
      <NavItem text="推文清單" value={'tweets'} check={check} to="tweets" />
      <NavItem text="使用者列表" value={'users'} check={check} to="users" />
      <NavItem text="登出" value={'logout'} onClick={onLogout} to="" />
    </Navbar>
  )
}

export default AdminNavbar

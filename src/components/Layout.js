import { Outlet } from 'react-router-dom'
import NavBar from './items/NavBar'

function Layout() {
  return (
    <div>
      <NavBar />
      <div>
        <Outlet />
      </div>
    </div>
  )
}

export default Layout
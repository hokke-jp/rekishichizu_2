import Logo from 'Images/app_logo.png'
import { NavLink } from 'react-router-dom'

export const AppLogo = ({ className }: { className: string }) => {
  return (
    <NavLink to="/" className="hover:opacity-90">
      <img className={className} src={Logo} alt="App logo" />
    </NavLink>
  )
}

import { NavLink } from 'react-router-dom'

export const FormLink = ({ to, text }: { to: string; text: string }) => {
  return (
    <NavLink to={to} className={'text-blue-600 hover:text-blue-800'}>
      {text}
    </NavLink>
  )
}

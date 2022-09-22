import { Tooltip, ButtonBase } from '@mui/material'
import { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'

export const IconWrapper = ({
  path,
  tooltip,
  children
}: {
  path: string
  tooltip: string
  children: ReactNode
}) => {
  return (
    <Tooltip title={tooltip} placement="right">
      <div className="hover:bg-gray-100">
        <ButtonBase style={{ display: 'block', width: '100%' }}>
          <NavLink
            to={path}
            className={({ isActive }) =>
              (isActive ? 'bg-gray-100' : '').concat(
                ' flex items-center justify-center h-16 w-full'
              )
            }
          >
            {children}
          </NavLink>
        </ButtonBase>
      </div>
    </Tooltip>
  )
}

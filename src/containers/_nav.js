import React from 'react'
import CIcon from '@coreui/icons-react'
import { } from '@coreui/icons'
import { cilHome, cilSpeedometer } from '@coreui/icons-pro'

const _nav = [
  {
    _tag: 'CSidebarNavItem',
    name: 'Home',
    to: '/',
    icon: <CIcon content={cilHome} customClasses="c-sidebar-nav-icon" />,
    badge: {
      color: 'success',
      text: 'NEW',
    }
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon content={cilSpeedometer} customClasses="c-sidebar-nav-icon" />,
  }
]

export default _nav

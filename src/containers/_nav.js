import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilNotes, cilPeople } from '@coreui/icons'
import { cilHome, cilInfoCircle } from '@coreui/icons-pro'

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
    name: 'About',
    to: '/about',
    icon: <CIcon content={cilInfoCircle} customClasses="c-sidebar-nav-icon" />,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Blog',
    to: '/blog',
    icon: <CIcon content={cilNotes} customClasses="c-sidebar-nav-icon" />,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Social Mediators',
    to: '/social-mediators',
    icon: <CIcon content={cilPeople} customClasses="c-sidebar-nav-icon" />,
  }
]

export default _nav

import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilNotes, cilPeople } from '@coreui/icons'
import { cilHome, cilInfoCircle, cilPhone } from '@coreui/icons-pro'

const _nav = [
  {
    _tag: 'CSidebarNavItem',
    name: 'Home',
    to: '/home',
    icon: <CIcon style={{ color: "#ffb6b6" }} content={cilHome} customClasses="c-sidebar-nav-icon" />,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'About',
    to: '/about',
    icon: <CIcon style={{ color: '#4cc0d9' }} content={cilInfoCircle} customClasses="c-sidebar-nav-icon" />,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Blog',
    to: '/blog',
    icon: <CIcon style={{ color: "#fcb040" }} content={cilNotes} customClasses="c-sidebar-nav-icon" />,
    badge: {
      color: 'success',
      text: 'NEW',
    }
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Social Mediators',
    to: '/social-mediators',
    icon: <CIcon style={{ color: '#39af49' }} content={cilPeople} customClasses="c-sidebar-nav-icon" />
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Contact',
    to: '/contact',
    icon: <CIcon style={{ color: '#ef4036' }} content={cilPhone} customClasses="c-sidebar-nav-icon" />
  }
]

export default _nav

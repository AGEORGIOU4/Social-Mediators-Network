import { cilNotes, cilPeople } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import React from 'react'
import BottomNavigation from 'reactjs-bottom-navigation'
import 'reactjs-bottom-navigation/dist/index.css'
import { cilHome, cilInfoCircle, cilPhone } from '@coreui/icons-pro'

const TheBottomNavigation = () => {
  const bottomNavItems = [
    {
      title: 'Home',
      icon: <CIcon style={{ color: '#ffb6b6' }} size="sm" content={cilHome} />,
      activeIcon: <CIcon style={{ color: '#ffb6b6' }} size="sm" content={cilHome} />
    },
    {
      title: 'About',
      icon: <CIcon style={{ color: '#4cc0d9' }} size="sm" content={cilInfoCircle} />,
      activeIcon: <CIcon style={{ color: '#4cc0d9' }} size="sm" content={cilInfoCircle} />
    },
    {
      title: 'Blog',
      icon: <CIcon style={{ color: '#fcb040' }} size="sm" content={cilNotes} />,
      activeIcon: <CIcon style={{ color: '#fcb040' }} size="sm" content={cilNotes} />,
    },
    {
      title: 'Mediators',
      icon: <CIcon style={{ color: '#39af49' }} size="sm" content={cilPeople} />,
      activeIcon: <CIcon style={{ color: '#39af49' }} size="sm" content={cilPeople} />,
    },
    {
      title: 'Contact',
      icon: <CIcon style={{ color: '#ef4036' }} size="sm" content={cilPhone} />,
      activeIcon: <CIcon style={{ color: '#ef4036' }} size="sm" content={cilPhone} />,
      to: "/Home"
    },

  ]

  return (
    <div className="custom-bottom-nav">
      <BottomNavigation
        activeBgColor={"#d1676800"}
        activeTextColor={"#fff"}
        items={bottomNavItems}
        // onItemClick={(item) => { setDefaultNav(item) }}
        onItemClick={item => (item.title === "Mediators") ?
          window.location.href = '/#/social-mediators' :
          window.location.href = '/#/'.concat(item.title)}
      >
      </BottomNavigation>
    </div>
  )
}

export default TheBottomNavigation

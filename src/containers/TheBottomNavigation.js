import { cilHome, cilNotes, cilPeople } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import React from 'react'
import BottomNavigation from 'reactjs-bottom-navigation'
import 'reactjs-bottom-navigation/dist/index.css'
import { useHistory } from 'react-router'
import _nav from './_nav'
import { Link, Redirect } from 'react-router-dom';

const TheBottomNavigation = () => {

  let history = useHistory();

  const setDefaultNav = (item) => {

    switch (item.title) {
      case "Home":
        <Link to='/home' />
        break;
      case "Blog":
        history.push('/Blog')
        break;
      case "Social Mediators":
        history.push('/social-mediators')
        break;
      default:
        return 0;
    }
  }


  const bottomNavItems = [
    {
      title: 'Home',
      icon: <CIcon style={{ color: '#fff' }} size="sm" content={cilHome} />,
      activeIcon: <CIcon style={{ color: '#fff' }} size="sm" content={cilHome} />
    },
    {
      title: 'Blog',
      icon: <CIcon style={{ color: '#fff' }} size="sm" content={cilNotes} />,
      activeIcon: <CIcon style={{ color: '#fff' }} size="sm" content={cilNotes} />,
      to: "/Home"
    },
    {
      title: 'Social Mediators',
      icon: <CIcon style={{ color: '#fff' }} size="sm" content={cilPeople} />,
      activeIcon: <CIcon style={{ color: '#fff' }} size="sm" content={cilPeople} />,
    }
  ]

  return (
    <div className="custom-bottom-nav">
      <BottomNavigation
        activeBgColor={"#ffffff00"}
        activeTextColor={"#fff"}
        items={bottomNavItems}
        // onItemClick={(item) => { setDefaultNav(item) }}
        onItemClick={item => (item.title === "Social Mediators") ?
          window.location.href = '/#/social-mediators' :
          window.location.href = '/#/'.concat(item.title)}
        component
      >
      </BottomNavigation>
    </div>
  )
}

export default TheBottomNavigation

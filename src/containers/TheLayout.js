import React from 'react'
import { useSelector } from 'react-redux'
import classNames from 'classnames'
import {
  TheContent,
  TheSidebar,
  TheAside,
  TheFooter,
  TheHeader
} from './index'

import TheBottomNavigation from './TheBottomNavigation'

const TheLayout = () => {
  const darkMode = useSelector(state => state.darkMode)
  const classes = classNames(
    'c-app c-default-layout',
    darkMode && 'c-dark-theme'
  )

  return (
    <div className={classes}>
      <TheSidebar />
      <TheAside />
      <div className="c-wrapper">
        <TheHeader />
        {/* <TheSubHeader /> */}

        <div className="c-body">
          <TheContent />
        </div>
        <TheFooter />


        <TheBottomNavigation />

      </div>
    </div>
  )
}

export default TheLayout

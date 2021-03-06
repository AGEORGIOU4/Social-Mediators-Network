import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CCreateElement,
  CSidebar,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
} from '@coreui/react'

// sidebar nav config
import navigation from './_nav'

const TheSidebar = () => {
  const dispatch = useDispatch()
  const show = useSelector(state => state.sidebarShow)

  return (
    <CSidebar
      show={show}
      onShowChange={(val) => dispatch({ type: 'set', sidebarShow: val })}
      style={{ backgroundImage: "linear-gradient(180deg,rgba(61,61,61,0.6) 0%,rgba(61,61,61,0.6) 100%), url(/city-portrait.jpg)" }}
    >
      {/* <CSidebarBrand className="d-md-down-none" to="/">
        <img
          alt='SMN-logo-full'
          className="c-sidebar-brand-full"
          src='SMN-logo-landscape.png'
          width={150}
        />
        <img
          alt='SMN-logo-minimized'
          className="c-sidebar-brand-minimized"
          src='SMN-logo-square.png'
          width={30} />
      </CSidebarBrand> */}
      <CSidebarNav>

        <CCreateElement
          items={navigation}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle
          }}
        />

      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none" />
    </CSidebar>
  )
}

export default React.memo(TheSidebar)

import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CHeader,
  CHeaderBrand,
  CHeaderNav,
  CHeaderNavItem,
  CHeaderNavLink,
  CSubheader,
  CToggler,
  CBreadcrumbRouter,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { TheHeaderDropdown } from '.'
// routes config
import routes from '../routes'

const TheHeader = () => {
  const dispatch = useDispatch()
  const asideShow = useSelector(state => state.asideShow)
  const sidebarShow = useSelector(state => state.sidebarShow)

  const toggleSidebar = () => {
    const val = [true, 'responsive'].includes(sidebarShow) ? false : 'responsive'
    dispatch({ type: 'set', sidebarShow: val })
  }

  const toggleSidebarMobile = () => {
    const val = [false, 'responsive'].includes(sidebarShow) ? true : 'responsive'
    dispatch({ type: 'set', sidebarShow: val })
  }

  return (
    <CHeader withSubheader>
      <CToggler
        inHeader
        className="ml-md-3 d-lg-none"
        onClick={toggleSidebarMobile}
      />
      <CToggler
        inHeader
        className="ml-3 d-md-down-none"
        onClick={toggleSidebar}
      />
      <CHeaderNav>
        <CHeaderBrand  >
          <img styl
            alt='iclaim-logo-full'
            className="c-sidebar-brand-full"
            src='iclaim-logo-landscape.png'
            width={100}
          />

        </CHeaderBrand>
      </CHeaderNav>

      {/* <CHeaderBrand className="mx-auto d-lg-none" to="/">

        <img
          alt='iclaim-logo'
          className="c-sidebar-brand-full"
          src='iclaim-logo-landscape.png'
          width={100} />
      </CHeaderBrand> */}

      <CHeaderNav className="d-md-down-none mr-auto">

        <CHeaderNavItem className="px-3" >
          <CHeaderNavLink to="/home">Home</CHeaderNavLink>
        </CHeaderNavItem>

      </CHeaderNav>


      <div style={{ position: "fixed", right: 0 }}>
        <CHeaderNav>

          <CToggler
            inHeader
            // className="ml-md-3 d-lg-none"
            onClick={() => dispatch({ type: 'set', asideShow: !asideShow })}
          >
            <CIcon className="mr-2" size="lg" name="cil-applications-settings" />
          </CToggler>

          <TheHeaderDropdown />

        </CHeaderNav>
      </div>

      <CSubheader className="px-3 justify-content-between">
        <CBreadcrumbRouter className="border-0 c-subheader-nav m-0 px-0 px-md-3" routes={routes} />
      </CSubheader>
    </CHeader >
  )
}

export default TheHeader

import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";

import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilArrowCircleLeft, cilArrowCircleRight, cilSettings, cilUser } from '@coreui/icons'
import { cilCommentSquare } from '@coreui/icons-pro'

const TheHeaderDropdown = () => {
  let avatar = 'avatar.png';

  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isAuthenticated) {
    avatar = user.picture
  }

  return (
    <CDropdown
      inNav
      className="c-header-nav-items mx-2"
      direction="down"
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          <CImg
            src={avatar}
            className="c-avatar-img"
            alt="admin@bootstrapmaster.com"
          />
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem
          header
          tag="div"
          color="light"
          className="text-center"
        >
          <strong>Account</strong>
        </CDropdownItem>

        <CDropdownItem to="/profile">
          <CIcon content={cilUser} className="mfe-2" />
          Profile
        </CDropdownItem>

        <CDropdownItem to="/settings">
          <CIcon content={cilSettings} className="mfe-2" />
          Settings
        </CDropdownItem>

        <CDropdownItem
          header
          tag="div"
          color="light"
          className="text-center"
        >
          <strong>Social Mediator</strong>
        </CDropdownItem>

        <CDropdownItem>
          <CIcon content={cilCommentSquare} className="mfe-2" />
          Comments
          <CBadge color="warning" className="mfs-auto">42</CBadge>
        </CDropdownItem>

        <CDropdownItem divider />

        <CDropdownItem href="#/login">
          <CIcon content={cilArrowCircleRight} className="mfe-2" />
          Login
        </CDropdownItem>

        <CDropdownItem href="#/logout">
          <CIcon content={cilArrowCircleLeft} className="mfe-2" />
          Logout
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default TheHeaderDropdown
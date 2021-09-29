import React from 'react'
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilAccountLogout, cilSettings, cilUser } from '@coreui/icons'
import { cilCommentSquare } from '@coreui/icons-pro'

const TheHeaderDropdown = () => {
  return (
    <CDropdown
      inNav
      className="c-header-nav-items mx-2"
      direction="down"
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          <CImg
            src={'avatar.png'}
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

        <CDropdownItem>
          <CIcon content={cilUser} className="mfe-2" />
          Profile
          <CBadge color="info" className="mfs-auto">42</CBadge>
        </CDropdownItem>

        <CDropdownItem>
          <CIcon content={cilSettings} className="mfe-2" />
          Settings
          <CBadge color="success" className="mfs-auto">42</CBadge>
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
        <CDropdownItem>
          <CIcon content={cilAccountLogout} className="mfe-2" />
          Logout
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default TheHeaderDropdown
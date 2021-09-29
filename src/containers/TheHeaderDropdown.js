import React, { useState } from 'react'
import { useAuth0 } from "@auth0/auth0-react";

// Firebase
import { collection, getDocs } from 'firebase/firestore';
import { firebaseDB } from 'src/reusable/firebaseConfig';

import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg,
  CLabel,
  CSwitch,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilNoteAdd, cilNotes } from '@coreui/icons';
import { cilArrowCircleLeft, cilArrowCircleRight, cilSettings, cilUser } from '@coreui/icons'
import { cilColumns, cilCommentSquare } from '@coreui/icons-pro'

var isAdmin = false;
var admins = [];

const TheHeaderDropdown = () => {
  let avatar = 'avatar.png';

  const { user, isAuthenticated } = useAuth0();


  if (isAuthenticated) {
    avatar = user.picture;

    const getAdmins = async (db) => {
      const adminCol = collection(db, 'admins');
      const adminSnapshot = await getDocs(adminCol);
      const adminList = adminSnapshot.docs.map(doc => doc.data());
      admins = adminList;

      admins.forEach(admin => {
        if (admin.email == user.email) {
          isAdmin = true;
          console.log(isAdmin)
        }
      }
      )
    }
    getAdmins(firebaseDB);
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
            alt="iclaim-avatar"
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

        <CDropdownItem
          header
          tag="div"
          color="light"
          className="text-center"
        >
          <strong>Social Mediator</strong>
        </CDropdownItem>

        <CDropdownItem>
          <CIcon content={cilNotes} className="mfe-2" />
          Blog
          <CBadge color="warning" className="mfs-auto">42</CBadge>
        </CDropdownItem>

        <CDropdownItem divider />

        <CDropdownItem href="#/login" style={isAuthenticated ? { display: 'none' } : { display: 'block' }}  >
          <CIcon content={cilArrowCircleRight} className="mfe-2" />
          Login
        </CDropdownItem>

        <CDropdownItem href="#/logout" style={isAuthenticated ? { display: 'block' } : { display: 'none' }} >
          <CIcon content={cilArrowCircleLeft} className="mfe-2" />
          Logout
        </CDropdownItem>

        <CDropdownItem style={isAdmin ? { display: 'block' } : { display: 'none' }}
          header
          tag="div"
          color="light"
          className="text-center"
        >
          <strong>Admin</strong>
        </CDropdownItem>

        <CDropdownItem to="/settings" style={isAdmin ? { display: 'block' } : { display: 'none' }}>
          <CIcon content={cilSettings} className="mfe-2" />
          Admin Settings
        </CDropdownItem>

        <CDropdownItem style={isAdmin ? { display: 'block' } : { display: 'none' }} >
          <CLabel style={{ marginBottom: '0', marginRight: '5px' }}><CIcon content={cilLockLocked} /> Admin Mode</CLabel>
          <CSwitch
            style={{ marginTop: '8px' }}
            color='primary'
            variant='3d'
            shape='pill'
            defaultChecked
          >
          </CSwitch>
        </CDropdownItem>

      </CDropdownMenu>
    </CDropdown >
  )
}

export default TheHeaderDropdown
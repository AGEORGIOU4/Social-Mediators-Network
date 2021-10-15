import React, { useState } from 'react'
import { useAuth0 } from "@auth0/auth0-react";

// Firebase
import { collection, getDocs } from 'firebase/firestore';
import { firebaseDB } from 'src/reusable/firebaseConfig';

import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilNotes } from '@coreui/icons';
import { cilArrowCircleLeft, cilArrowCircleRight, cilUser } from '@coreui/icons'
import { cilNote } from '@coreui/icons-pro';

// Check if Admin to display admin option
var admins = [];
var checkIfAdmin = false;

const TheHeaderDropdown = () => {
  const [isAdmin, setAdmin] = useState("");
  let avatar = 'avatar.png';

  const { user, isAuthenticated } = useAuth0();


  if (isAuthenticated) {
    avatar = user.picture;

    if (!checkIfAdmin) {
      const getAdmins = async (db) => {
        const adminCol = collection(db, 'admins');
        const adminSnapshot = await getDocs(adminCol);
        const adminList = adminSnapshot.docs.map(doc => doc.data());
        admins = adminList;

        admins.forEach(admin => {
          if (admin.email === user.email) {
            setAdmin({ isAdmin: true });
            document.cookie = "admin=True";
            console.log("User is admin!");
            checkIfAdmin = true;
          }
        }
        )
      }
      getAdmins(firebaseDB);
    }
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
          <CIcon content={cilNote} className="mfe-2" />
          Post a proposal
        </CDropdownItem>


        <CDropdownItem to="/blog">
          <CIcon content={cilNotes} className="mfe-2" />
          Blog
        </CDropdownItem>

        <CDropdownItem
          header
          tag="div"
          color="light"
          className="text-center"
        >
          <strong>Authentication</strong>
        </CDropdownItem>

        <CDropdownItem to="/login" style={isAuthenticated ? { display: 'none' } : { display: 'block' }}  >
          <CIcon content={cilArrowCircleRight} className="mfe-2" />
          Login
        </CDropdownItem>

        <CDropdownItem to="/logout" style={isAuthenticated ? { display: 'block' } : { display: 'none' }} >
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
          <CIcon content={cilLockLocked} className="mfe-2" />
          Admin Settings
        </CDropdownItem>

      </CDropdownMenu>
    </CDropdown >
  )
}

export default TheHeaderDropdown
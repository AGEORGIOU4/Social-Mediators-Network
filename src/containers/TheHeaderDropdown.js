import React, { useState, useEffect } from 'react'
import { useAuth0 } from "@auth0/auth0-react";

// Firebase
import { getDoc, doc } from 'firebase/firestore';
import { firebaseDB } from 'src/reusable/firebaseConfig';

import {
  CButton,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg,
  CSpinner
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked } from '@coreui/icons';
import { cilArrowCircleLeft, cilArrowCircleRight, cilUser } from '@coreui/icons'
import { useCookies } from 'react-cookie';
import { getCookie } from 'src/reusable/reusables';

// Check if Admin to display admin option
var checkIfAdmin = false;
var checkIfUser = false;
var check = false;

const TheHeaderDropdown = () => {
  const { user, isAuthenticated, loginWithRedirect } = useAuth0();
  const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);

  const [isAdmin, setAdmin] = useState("");
  const [flag, setFlag] = useState(false);
  const [userFirebase, setUserFirebase] = useState([]);
  const [avatar, setAvatar] = useState("");


  useEffect(() => {
    setTimeout(() =>
      setFlag(true)
      , 6000)
  });

  if (!isAuthenticated) {
    if (!check) {
      setFlag(true);
      check = true;
    }
  }

  if (isAuthenticated) {

    if (!checkIfAdmin) {
      const getAdmin = async (db) => {
        const docRef = doc(db, "admins", user.email);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists() && !checkIfAdmin) {
          setAdmin({ isAdmin: true });
          setCookie("admin", true, 1);
          checkIfAdmin = true;

        }
      }
      getAdmin(firebaseDB);
    }
  }

  if (isAuthenticated) {
    if (!checkIfUser) {

      if (getCookie("userPicture")) {
        setAvatar(getCookie("userPicture"));
        checkIfUser = true;
        setFlag(true);
      } else {

        const getUser = async (db) => {
          const docRef = doc(db, "users", user.email);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setUserFirebase(docSnap.data())
            checkIfUser = true;
            setFlag(true);
          }
          setCookie("userPicture", userFirebase.picture, 7);
          setAvatar(userFirebase.picture);
        }
        getUser(firebaseDB);
      }
    }
  }

  return (
    <div>
      <div style={{ display: flag ? "none" : "block", padding: "0 1.13rem" }}>
        <CSpinner color="primary" size="lg" />
      </div>

      <div style={{ display: flag ? "block" : "none" }}>
        <CButton onClick={() => loginWithRedirect()} color="primary" style={{ marginRight: '10px', color: 'white', display: (isAuthenticated) ? "none" : "block" }}>Login</CButton>



        <CDropdown
          inNav
          className="c-header-nav-items mx-2"
          direction="down"
          style={{ display: (isAuthenticated) ? "block" : "none" }}
        >
          <CDropdownToggle className="c-header-nav-link" caret={false}>
            <div className="c-avatar">
              <CImg
                src={avatar}
                className="c-avatar-img profile-photo"
                alt="iclaim-avatar"
                style={{ maxHeight: '2.5em' }}
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

            {/* <CDropdownItem
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
          </CDropdownItem> */}

            {/* <CDropdownItem
            header
            tag="div"
            color="light"
            className="text-center"
          >
            <strong>Authentication</strong>
          </CDropdownItem> */}

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
      </div>
    </div>
  )
}

export default TheHeaderDropdown
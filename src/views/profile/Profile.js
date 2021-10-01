import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { CButton, CCardBody, CCardFooter, CCardHeader, CRow, CCard, CCol } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilPencil } from "@coreui/icons";
import { CSpinner } from "@coreui/react";
import { LoginCard } from "src/containers/common";

import { collection, getDocs, setDoc, doc } from 'firebase/firestore';
import { firebaseDB } from 'src/reusable/firebaseConfig';

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  console.log(user)
  if (isLoading) {
    return <div style={{ textAlign: 'center' }}> <CSpinner color='primary' grow /></div>
  }

  if (isAuthenticated) {
    return (
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader><h4 style={{ margin: '0px' }}><strong>Profile</strong></h4></CCardHeader>
            <CCardBody>
              <div>
                <p>
                  <span><strong>Username:</strong></span> {user.nickname}
                </p>
              </div>

              <div>
                <p>
                  <span><strong>Email:</strong></span> {user.email}
                </p>
              </div>
              <div>
                <img
                  alt="iclaim-user"
                  src={user.picture}
                  width={100} />
              </div>
            </CCardBody>
            <CCardFooter>
              <div style={{ textAlign: 'end' }}>
                <CButton color='primary'><CIcon content={cilPencil} /> Edit</CButton>
              </div>
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
    )
  }

  else {
    return (
      <LoginCard />
    )
  }
}

export default Profile
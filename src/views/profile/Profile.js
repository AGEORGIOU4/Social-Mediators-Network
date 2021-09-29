import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { CButton, CCardBody, CCardFooter, CCardHeader, CLabel, CRow, CCard, CCol } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilPencil } from "@coreui/icons";
import { CSpinner } from "@coreui/react";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  console.log(user)
  if (isLoading) {
    return <div style={{ textAlign: 'center' }}> <CSpinner color='primary' grow /></div>
  }


  return (

    isAuthenticated && (
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader><h4 style={{ margin: '0px' }}><strong>Profile</strong></h4></CCardHeader>
            <CCardBody>
              <div>
                <p>
                  <span><strong>Name:</strong></span> {user.nickname}
                </p>
              </div>

              <div>
                <p>
                  <span><strong>Email:</strong></span> {user.email}
                </p>
              </div>
              <div>
                <img src={user.picture} width={100} />
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
  );
}

export default Profile
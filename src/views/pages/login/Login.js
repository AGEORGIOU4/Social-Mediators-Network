import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import { CButton, CCard, CCardBody, CCol, CContainer, CForm, CRow } from '@coreui/react'
import { Route } from 'react-router';

const Login = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  if (!isAuthenticated) {
    return (
      <div className="c-app c-default-layout flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md="6">
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <div style={{ textAlign: 'center' }}>
                      <img
                        alt="SMN-logo"
                        className="c-sidebar-brand-full"
                        src='SMN-logo-landscape.png'
                        width={200} />
                    </div>

                    <br />
                    <br />

                    <CRow>
                      <CCol xs="6" style={{ textAlign: 'end' }}>
                        <CButton color="primary" className="px-4" onClick={() => loginWithRedirect()}>Login</CButton>
                      </CCol>
                      <CCol xs="6">
                        <CButton to="/" color="secondary" className="px-4">Guest</CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    )
  } else {
    return (
      <Route render={({ history }) => (
        history.push("/")
      )} />
    )
  }
}

export default Login

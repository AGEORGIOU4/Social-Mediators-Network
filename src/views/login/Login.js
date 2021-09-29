import React from 'react'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

const Login = () => {
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCard className="p-4">
              <CCardBody>
                <CForm>

                  <div style={{ textAlign: 'center' }}>
                    <img
                      className="c-sidebar-brand-full"
                      src='iclaim-logo-landscape.png'
                      width={200} />
                  </div>

                  <br />
                  <br />
                  <CRow>
                    <CCol xs="6" style={{ textAlign: 'end' }}>
                      <CButton color="primary" className="px-4">Login</CButton>
                    </CCol>
                    <CCol xs="6">
                      <CButton color="secondary" className="px-4">Guest</CButton>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div >
  )
}

export default Login

import React from 'react'
import {
  CRow,
  CCol,
  CCard,
  CCardHeader,
  CCardBody,
  CFormGroup,
  CLabel,
  CInput,
} from '@coreui/react'

import { CButton, CCardFooter, CImg } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilPencil } from "@coreui/icons";
import interests from './interests'
import Select from 'react-select'
import { useSelector } from 'react-redux';

const ProfileForm = () => {

  const darkMode = useSelector(state => state.darkMode)

  const [value, setValue] = React.useState([
    { value: 'Law', label: 'Law' },
  ])

  return (
    <CRow>
      <CCol sm={12} md={6} style={{ flexBasis: 'auto' }}>
        <CCard>
          <CCardHeader><h4 style={{ margin: '0px' }}><strong>Edit Profile Card</strong></h4></CCardHeader>
          <CCardBody>
            <CFormGroup>

              <CLabel>Email</CLabel>
              <CInput
                type="text"
                name="email"
                readOnly />

              <CLabel>First Name</CLabel>
              <CInput
                type="text"
                name="firstName" />

              <CLabel>Last Name</CLabel>
              <CInput
                type="text"
                name="lastName" />

              <CLabel>Username</CLabel>
              <CInput
                type="text"
                name="username" />

              <CLabel>Experiences</CLabel>
              <CInput
                type="text"
                name="experiences" />

              <CLabel>Qualifications</CLabel>
              <CInput
                type="text"
                name="qualifications" />

              <CLabel>Few words about you</CLabel>
              {/* <CTextarea
                size="lg"
                type="textarea"
                name="bio"
                rows="5" /> */}

              <textarea className="form-control" id="exampleFormControlTextarea1" rows="4"></textarea>
            </CFormGroup>

          </CCardBody>
        </CCard>
      </CCol>

      <CCol sm={12} md={6} style={{ flexBasis: 'auto' }}>
        <CCard>
          <CCardHeader>
            Interests
          </CCardHeader>
          <CCardBody>
            <Select
              name="form-field-name2"
              value={value}
              options={interests}
              onChange={setValue}
              isMulti
              theme={(theme) => ({
                ...theme,
                colors: {
                  ...theme.colors,
                  primary: darkMode ? 'black' : theme.colors.primary,
                  primary25: darkMode ? 'black' : theme.colors.primary25,
                  dangerLight: darkMode ? 'black' : theme.colors.dangerLight,
                  neutral0: darkMode ? '#2a2b36' : theme.colors.neutral0
                },
              })}
            />
          </CCardBody>
        </CCard>

        <CCard>
          <CCardHeader>
            Photo
          </CCardHeader>
          <CCardBody>
            <div class="input-group mb-3">

              <div class="form-file">
                <input type="file" class="form-file-input" id="inputGroupFile01" aria-describedby="inputGroupFileAddon01" />
              </div>

              <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroupFileAddon01">Upload</span>
              </div>
            </div>
          </CCardBody>
        </CCard>


        <CCard>
          <CCardHeader><h4 style={{ margin: '0px' }}><strong>Profile Card</strong></h4></CCardHeader>
          <CCardBody>

            <CRow>
              <CCol xs="12" md="12" lg="8">
                <div>
                  <CCol>
                    <span><strong>First name:</strong></span>firstName
                  </CCol>

                  <CCol>
                    <span><strong>Last name:</strong></span> lastName
                  </CCol>

                  <CCol>
                    <span><strong>Username:</strong></span>nickname
                  </CCol>

                  <CCol>
                    <span><strong>Experiences:</strong></span>experiences
                  </CCol>

                  <CCol>
                    <span><strong>Qualifications:</strong></span>qualifications
                  </CCol>

                  <CCol>
                    <span><strong>Email:</strong></span>email
                  </CCol>
                  <CCol style={{ paddingBottom: "10px" }}>
                    <span><strong>Few words about you:</strong></span>bio
                  </CCol>
                </div>

              </CCol>

              <CCol xs="12" md="12" lg="4" style={{ textAlign: "center" }}>
                <div style={{ padding: "10px" }}>
                  <CImg src={"avatar.png"}
                    width="100"
                    shape="rounded-circle" />
                </div>
              </CCol>
            </CRow>

          </CCardBody>

          <CCardFooter>
            <div style={{ textAlign: 'end' }}>
              <CButton color='primary' href="#/profile-form"><CIcon content={cilPencil} /> Submit</CButton>
            </div>
          </CCardFooter>

        </CCard>


      </CCol>
    </CRow>
  )
}

export default ProfileForm

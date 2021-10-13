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
  CTextarea
} from '@coreui/react'

import { CButton, CCardFooter, CImg } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilPencil } from "@coreui/icons";
import interests from './interests'
import Select from 'react-select'
import { useSelector } from 'react-redux';

class ProfileForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userData: {
        firstName: "",
        lastName: "",
        nickname: "",
        qualifications: "",
        interests: "",
        bio: "",
        picture: "avatar.png",
      },
      loading: false,
      value: {
        "Law": "Law"
      }
    };


    //const darkMode = useSelector(state => state.darkMode)
    // const [value, setValue] = React.useState([
    //   { value: 'Law', label: 'Law' },
    // ])


    if (props.location.state) {
      this.state.userData = props.location.state;
      console.log(this.state.userData)
    }

  }

  componentDidMount() {
    document.getElementById("firstName").value = this.state.userData.firstName;
    document.getElementById("lastName").value = this.state.userData.lastName;
    document.getElementById("nickname").value = this.state.userData.nickname;
    document.getElementById("qualifications").value = this.state.userData.qualifications;
    document.getElementById("interests").value = this.state.userData.interests;
    document.getElementById("bio").value = this.state.userData.bio;
  }


  render() {
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
                  id="firstName"
                  name="firstName"
                />

                <CLabel>Last Name</CLabel>
                <CInput
                  type="text"
                  id="lastName"
                  name="lastName"
                />

                <CLabel>Nickname</CLabel>
                <CInput
                  type="text"
                  id="nickname"
                  name="nickname"
                />

                <CLabel>Qualifications/Experiences</CLabel>
                <CInput
                  type="text"
                  id="qualifications"
                  name="qualifications"
                />

                <CLabel>Few words about you</CLabel>
                <CTextarea
                  id="bio"
                  name="bio"
                  size="md"
                  type="textarea"
                  rows="6" />

                {/* <textarea className="form-control" id="bio" name="bio" rows="4"></textarea> */}
              </CFormGroup>

            </CCardBody>
          </CCard>
        </CCol>

        <CCol sm={12} md={6} style={{ flexBasis: 'auto' }}>
          <CCard>
            <CCardHeader>
              Area of interests
            </CCardHeader>
            <CCardBody>
              <Select
                id="interests"
                name="interests"
                value="hello"
                options={interests}
                // onChange={this.setState({ value: this.state.userData.interests })}
                isMulti
              // theme={(theme) => ({
              //   ...theme,
              //   colors: {
              //     ...theme.colors,
              //     primary: darkMode ? 'black' : theme.colors.primary,
              //     primary25: darkMode ? 'black' : theme.colors.primary25,
              //     dangerLight: darkMode ? 'black' : theme.colors.dangerLight,
              //     neutral0: darkMode ? '#2a2b36' : theme.colors.neutral0
              //   },
              // })}
              />
            </CCardBody>
          </CCard>

          <CCard>
            <CCardHeader>
              Photo
            </CCardHeader>
            <CCardBody>
              <div className="input-group mb-3">

                <div className="form-file">
                  <input type="file" className="form-file-input" id="inputGroupFile01" aria-describedby="inputGroupFileAddon01" />
                </div>

                <div className="input-group-prepend">
                  <span className="input-group-text" id="inputGroupFileAddon01">Upload</span>
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
                      <span><strong>First name:</strong></span> {this.state.userData.firstName}
                    </CCol>

                    <CCol>
                      <span><strong>Last name:</strong></span> {this.state.userData.lastName}
                    </CCol>

                    <CCol>
                      <span><strong>Username:</strong></span> {this.state.userData.nickname}
                    </CCol>


                    <CCol>
                      <span><strong>Qualifications/Experiences:</strong></span> {this.state.userData.qualifications}
                    </CCol>

                    <CCol>
                      <span><strong>Email:</strong></span> {this.state.userData.email}
                    </CCol>
                    <CCol style={{ paddingBottom: "10px" }}>
                      <span><strong>Few words about you:</strong></span> {this.state.userData.bio}
                    </CCol>
                  </div>

                </CCol>

                <CCol xs="12" md="12" lg="4" style={{ textAlign: "center" }}>
                  <div style={{ padding: "10px" }}>
                    <CImg src={this.state.userData.picture}
                      width="100"
                      shape="rounded-circle" />
                  </div>
                </CCol>
              </CRow>

            </CCardBody>

            <CCardFooter>
              <div style={{ textAlign: 'end' }}>
                <CButton color='primary' href="#/profile-form"
                ><CIcon content={cilPencil} /> Submit</CButton>
              </div>
            </CCardFooter>

          </CCard>


        </CCol>
      </CRow>

    )
  }
}

export default ProfileForm

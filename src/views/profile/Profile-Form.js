import React from 'react'
import {
  CRow,
  CCol,
  CCard,
  CCardHeader,
  CCardBody,
  CForm,
  CFormGroup,
  CLabel,
  CInput,
  CTextarea, CSelect
} from '@coreui/react'

import { CButton, CCardFooter, CImg } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilPencil } from "@coreui/icons";
import LinesEllipsis from 'react-lines-ellipsis'
import Interests from 'src/reusable/interests';

class ProfileForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      initialValues: {
        email: "",
        firstName: "",
        lastName: "",
        nickname: "",
        qualifications: "",
        areaOfInterest: "",
        bio: "",
        picture: "avatar.png",
      },
      loading: false,
      firstName: "",
      lastName: "",
      nickname: "",
      qualifications: "",
      areaOfInterest: "",
      bio: "",
      picture: "avatar.png",
    };

    if (props.location.state) { // Pass all attributes from profile
      this.state.initialValues = props.location.state;

      this.state.firstName = this.state.initialValues.firstName;
      this.state.lastName = this.state.initialValues.lastName;
      this.state.nickname = this.state.initialValues.nickname;
      this.state.qualifications = this.state.initialValues.qualifications;
      this.state.bio = this.state.initialValues.bio;
      this.state.areaOfInterest = this.state.initialValues.areaOfInterest;
      this.state.picture = this.state.initialValues.picture;

    }

    this.handleChangeFirstName = this.handleChangeFirstName.bind(this);
    this.handleChangeLastName = this.handleChangeLastName.bind(this);
    this.handleChangeNickname = this.handleChangeNickname.bind(this);
    this.handleChangeQualifications = this.handleChangeQualifications.bind(this);
    this.handleChangeBio = this.handleChangeBio.bind(this);
    this.handleChangeAreaOfInterest = this.handleChangeAreaOfInterest.bind(this);
    this.handleChangePicture = this.handleChangePicture.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleChangeFirstName(event) { this.setState({ firstName: event.target.value }) }
  handleChangeLastName(event) { this.setState({ lastName: event.target.value }) }
  handleChangeNickname(event) { this.setState({ nickname: event.target.value }) }
  handleChangeQualifications(event) { this.setState({ qualifications: event.target.value }) }
  handleChangeBio(event) { this.setState({ bio: event.target.value }) }
  handleChangeAreaOfInterest(event) { this.setState({ areaOfInterest: event.target.value }) }
  handleChangePicture(event) { this.setState({ picture: event.target.value }) }

  handleSubmit(event) {
    alert('Done!');

    event.preventDefault();
  }

  componentDidMount() {
    document.getElementById("email").value = this.state.initialValues.email;
    document.getElementById("firstName").value = this.state.initialValues.firstName;
    document.getElementById("lastName").value = this.state.initialValues.lastName;
    document.getElementById("nickname").value = this.state.initialValues.nickname;
    document.getElementById("qualifications").value = this.state.initialValues.qualifications;
    document.getElementById("bio").value = this.state.initialValues.bio;

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
                  id="email"
                  type="text"
                  name="email"
                  readOnly />

                <CLabel>First Name</CLabel>
                <CInput
                  type="text"
                  id="firstName"
                  name="firstName"
                  onChange={this.handleChangeFirstName}
                />

                <CLabel>Last Name</CLabel>
                <CInput
                  type="text"
                  id="lastName"
                  name="lastName"
                  onChange={this.handleChangeLastName}
                />

                <CLabel>Nickname</CLabel>
                <CInput
                  type="text"
                  id="nickname"
                  name="nickname"
                  onChange={this.handleChangeNickname}
                />

                <CLabel>Qualifications/Experiences</CLabel>
                <CInput
                  type="text"
                  id="qualifications"
                  name="qualifications"
                  onChange={this.handleChangeQualifications}
                />

                <CLabel>Few words about you</CLabel>
                <CTextarea
                  id="bio"
                  name="bio"
                  size="md"
                  type="textarea"
                  rows="7"
                  onChange={this.handleChangeBio}
                />

              </CFormGroup>
            </CCardBody>
          </CCard>

        </CCol>

        <CCol sm={12} md={6} style={{ flexBasis: 'auto' }}>
          <CCard>
            <CCardHeader>
              Area of interest
            </CCardHeader>
            <CCardBody>
              {/* <CSelect custom value={this.state.value} onChange={this.handleChange} name="areaOfInterest" id="areaOfInterest">
                <option value="N/A">Please select</option>
                <option value="Law">Law</option>
                <option value="Technology">Technology</option>
                <option value="Computer Science">Computer Science</option>
              </CSelect> */}

              <div className="select-container">
                <CSelect value={this.state.initialValues.areaOfInterest} onChange={this.handleChangeAreaOfInterest}>
                  {Interests.map((option) => (
                    <option value={option.value}>{option.label}</option>
                  ))}
                </CSelect>
              </div>
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
                      <span><strong>Email: </strong></span> {this.state.initialValues.email}
                    </CCol>

                    <CCol>
                      <span><strong>First name: </strong></span> {this.state.firstName}
                    </CCol>

                    <CCol>
                      <span><strong>Last name: </strong></span> {this.state.lastName}
                    </CCol>

                    <CCol>
                      <span><strong>Nickname: </strong></span> {this.state.nickname}
                    </CCol>


                    <CCol>
                      <span><strong>Qualifications/Experiences: </strong></span> {this.state.qualifications}
                    </CCol>


                    <CCol>
                      <span><strong>Area of interest: </strong></span> {this.state.areaOfInterest}
                    </CCol>

                    <CCol>
                      <span><strong>About you: </strong></span>
                      <LinesEllipsis
                        text={this.state.bio}
                        maxLine='1'
                        ellipsis='...'
                        trimRight
                        basedOn='letters'
                      />
                    </CCol>
                  </div>

                </CCol>

                <CCol xs="12" md="4" lg="4" style={{ textAlign: "center" }}>
                  <div style={{ padding: "10px" }}>
                    <CImg src={this.state.picture}
                      width="100"
                      shape="rounded-circle" />
                  </div>
                </CCol>
              </CRow>

            </CCardBody>

            <CCardFooter>
              <div style={{ textAlign: 'end' }}>
                <CButton color='primary' onClick={this.handleSubmit}>
                  Submit</CButton>
              </div>
            </CCardFooter>
          </CCard>

        </CCol>
      </CRow >

    )
  }
}

export default ProfileForm

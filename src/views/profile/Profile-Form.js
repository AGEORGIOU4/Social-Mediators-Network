import React from 'react'
import { Route } from 'react-router';
import {
  CRow,
  CCol,
  CCard,
  CCardHeader,
  CCardBody,
  CFormGroup,
  CLabel,
  CInput,
  CTextarea,
  CSelect,
  CSpinner,
  CInputFile,
} from '@coreui/react'

import { uploadBytes } from '@firebase/storage';
import { getStorage, ref, getDownloadURL } from '@firebase/storage';
import { CButton, CImg } from "@coreui/react";
import { setDoc, doc, getDoc } from 'firebase/firestore';
import LinesEllipsis from 'react-lines-ellipsis'
import interestOptions from 'src/reusable/interestOptions';
import { firebaseDB } from 'src/reusable/firebaseConfig';
import Swal from 'sweetalert2';
import { SwalMixing } from 'src/reusable/SwalMixin';
import { cilCloudUpload, cilSave } from '@coreui/icons-pro';
import CIcon from '@coreui/icons-react';
import Select from 'react-select'
import { trainingOptions } from 'src/reusable/trainingOptions';
import { multiSelectCustomStyles } from './multiSelectCustomStyles';

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
        trainings: [],
        bio: "",
        picture: "avatar.png",
        createdAt: "",
        status: true,
      },

      loading: false,

      email: "",
      firstName: "",
      lastName: "",
      nickname: "",
      qualifications: "",
      areaOfInterest: "",
      selectedTrainings: [],
      bio: "",
      picture: "avatar.png",
      createdAt: "",
      status: true,
      image: "",
      firebaseFlag: false
    };

    if (props.location.state) { // Pass all attributes from profile
      this.state.initialValues = props.location.state;

      this.state.email = this.state.initialValues.email;
      this.state.firstName = this.state.initialValues.firstName;
      this.state.lastName = this.state.initialValues.lastName;
      this.state.nickname = this.state.initialValues.nickname;
      this.state.qualifications = this.state.initialValues.qualifications;
      this.state.bio = this.state.initialValues.bio;
      this.state.areaOfInterest = this.state.initialValues.areaOfInterest;
      this.state.selectedTrainings = this.state.initialValues.trainings;
      this.state.picture = (this.state.initialValues.picture) ? this.state.initialValues.picture : "avatar.png";
      this.state.createdAt = this.state.initialValues.createdAt;
      this.state.status = this.state.initialValues.status;

    } else { // fetch from firebase

      if (!this.state.firebaseFlag) {
        const getUser = async (db) => {
          const docRef = doc(db, "users", this.getCookie("userEmail"));
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            this.state.initialValues = (docSnap.data());
            this.setState({ firebaseFlag: true });
            this.state.email = this.state.initialValues.email;
            this.state.firstName = this.state.initialValues.firstName;
            this.state.lastName = this.state.initialValues.lastName;
            this.state.nickname = this.state.initialValues.nickname;
            this.state.qualifications = this.state.initialValues.qualifications;
            this.state.bio = this.state.initialValues.bio;
            this.state.areaOfInterest = this.state.initialValues.areaOfInterest;
            this.state.selectedTrainings = this.state.initialValues.trainings;
            this.state.picture = (this.state.initialValues.picture) ? this.state.initialValues.picture : "avatar.png";
            this.state.createdAt = this.state.initialValues.createdAt;
            this.state.status = this.state.initialValues.status;

            this.componentDidMount();
          }
        }
        getUser(firebaseDB);
      }
    }

    this.handleChangeFirstName = this.handleChangeFirstName.bind(this);
    this.handleChangeLastName = this.handleChangeLastName.bind(this);
    this.handleChangeNickname = this.handleChangeNickname.bind(this);
    this.handleChangeQualifications = this.handleChangeQualifications.bind(this);
    this.handleChangeBio = this.handleChangeBio.bind(this);
    this.handleChangeAreaOfInterest = this.handleChangeAreaOfInterest.bind(this);
    this.handleChangeTrainings = this.handleChangeTrainings.bind(this);
    this.handleChangePicture = this.handleChangePicture.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);

  }

  componentDidMount() {
    if (this.getCookie("session")) {
      document.getElementById("email").value = this.state.initialValues.email;
      document.getElementById("firstName").value = this.state.initialValues.firstName;
      document.getElementById("lastName").value = this.state.initialValues.lastName;
      document.getElementById("nickname").value = this.state.initialValues.nickname;
      document.getElementById("qualifications").value = this.state.initialValues.qualifications;
      document.getElementById("bio").value = this.state.initialValues.bio;

      this.setState({ areaOfInterest: this.state.initialValues.areaOfInterest })
      this.setState({ selectedTrainings: this.state.initialValues.trainings })
      this.setState({ picture: this.state.initialValues.picture })
    }
  }

  handleChangeFirstName(event) { this.setState({ firstName: event.target.value }) }
  handleChangeLastName(event) { this.setState({ lastName: event.target.value }) }
  handleChangeNickname(event) { this.setState({ nickname: event.target.value }) }
  handleChangeQualifications(event) { this.setState({ qualifications: event.target.value }) }
  handleChangeBio(event) { this.setState({ bio: event.target.value }) }
  handleChangeAreaOfInterest(event) { this.setState({ areaOfInterest: event.target.value }) }

  handleChangeTrainings = (e) => {
    this.setState({ selectedTrainings: Array.isArray(e) ? e.map(x => x.value) : [] });
    this.setState({ trainings: this.selectedTrainings });
  }
  handleChangePicture(event) { this.setState({ picture: event.target.value }) }


  uploadPhoto = () => {

    const imagePath = 'images/'.concat(this.state.initialValues.email).concat("-avatar");

    // Upload
    const storage = getStorage();
    const storageRef = ref(storage, imagePath);
    if (this.state.image === '') {
      SwalMixing("warning", "Forgot something? :)");
      return;
    } else {

      this.setState({ loading: true });

      uploadBytes(storageRef, this.state.image).then((snapshot) => {
        getDownloadURL(ref(storage, imagePath))
          .then((url) => {
            this.setState({ picture: url });

          })

        SwalMixing("success", "Uploaded succesfully!");

        this.setState({ loading: false });

      });
    }
  }


  handleSubmit(event) {

    Swal.fire({

      text: 'Is your profile card correct?',
      showCancelButton: true,
      icon: 'question',
      // iconColor: '#e55353',
      confirmButtonText: `Yes`,
      confirmButtonColor: '#2eb85c'
    }).then((result) => {
      if (result.isConfirmed) {

        this.editUser(firebaseDB);

        const Toast = Swal.mixin({
          toast: true,
          position: 'bottom-end',
          showConfirmButton: false,
          timer: 1000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })

        Toast.fire({
          icon: 'success',
          title: 'Updated successfully'
        })

        setTimeout(() =>
          // this.props.history.push('/profile')
          window.location.href = "/"
          , 1000)
      }
    })

    event.preventDefault();
  }

  editUser = async (db) => {
    await setDoc(doc(db, "users", this.state.email), {
      email: this.state.email,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      nickname: this.state.nickname,
      qualifications: this.state.qualifications,
      areaOfInterest: this.state.areaOfInterest,
      trainings: this.state.selectedTrainings,
      bio: this.state.bio,
      picture: this.state.picture,
      createdAt: this.state.createdAt,
      status: this.state.status,
    });
  }

  getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  render() {
    if (this.getCookie("session")) {
      return (
        <CRow>
          <CCol sm={12} md={6} style={{ flexBasis: 'auto' }}>

            <CCard>
              <CCardBody>

                <CFormGroup>

                  <CLabel>Email</CLabel>
                  <CInput
                    id="email"
                    type="text"
                    name="email"
                    readOnly />

                  <CLabel className="form-label">First Name</CLabel>
                  <CInput
                    required
                    type="text"
                    id="firstName"
                    name="firstName"
                    onChange={this.handleChangeFirstName}
                  />

                  <CLabel className="form-label">Last Name</CLabel>
                  <CInput
                    type="text"
                    id="lastName"
                    name="lastName"
                    onChange={this.handleChangeLastName}
                  />

                  <CLabel className="form-label">Nickname</CLabel>
                  <CInput
                    type="text"
                    id="nickname"
                    name="nickname"
                    onChange={this.handleChangeNickname}

                  />

                  <CLabel className="form-label">Area of interest</CLabel>
                  <CSelect value={this.state.areaOfInterest} onChange={this.handleChangeAreaOfInterest}>
                    {interestOptions.map((option) => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </CSelect>

                  <CLabel className="form-label">Qualifications/Experiences</CLabel>
                  <CInput
                    type="text"
                    id="qualifications"
                    name="qualifications"
                    onChange={this.handleChangeQualifications}
                  />

                  <CLabel className="form-label">Trainings</CLabel>
                  <Select
                    // defaultValue={this.state.trainings}
                    value={(this.state.selectedTrainings) ? trainingOptions.filter(training => this.state.selectedTrainings.includes(training.value)) : ""} // set selected values
                    name="trainingOptions"
                    onChange={this.handleChangeTrainings}
                    isMulti
                    options={trainingOptions}
                    styles={multiSelectCustomStyles}
                    className="basic-multi-select"
                    classNamePrefix="select"

                  />

                  <CLabel className="form-label">Few words about you</CLabel>
                  <CTextarea
                    id="bio"
                    name="bio"
                    size="md"
                    type="textarea"
                    rows="2"
                    onChange={this.handleChangeBio}
                  />

                </CFormGroup>
              </CCardBody>
            </CCard>

          </CCol>

          <CCol sm={12} md={6} style={{ flexBasis: 'auto' }}>

            <CCard>
              <CCardHeader>
                Photo
              </CCardHeader>
              <CCardBody>

                <div>
                  <div style={{ display: (this.state.loading) ? "none" : "block" }}>
                    <CCol lg="12" xs="12" md="12" style={{ textAlign: "left", paddingLeft: '0px' }}>
                      <CInputFile type="file" onChange={(e) => {
                        this.setState({ image: (e.target.files[0]) })
                        this.state.image = e.target.files[0];
                        if (this.state.image)
                          this.uploadPhoto();
                      }} />
                    </CCol>

                    <CRow>
                      <CCol lg="7" xs="7" md="7" style={{ textAlign: "left", marginTop: '4px' }}>
                        <p style={{ color: '#e55353', fontStyle: 'italic' }}>*Upload a square photo</p>
                      </CCol>

                      <CCol lg="5" xs="5" md="5" style={{ textAlign: "end" }}>

                        <CButton color="secondary" size='sm' onClick={this.uploadPhoto}><CIcon content={cilCloudUpload} /></CButton>
                      </CCol>

                    </CRow>
                  </div>

                  <div style={{ display: (this.state.loading) ? "block" : "none" }}>
                    <center>
                      <CCol>
                        <CSpinner color='primary' grow />
                      </CCol>
                    </center>
                  </div>

                </div>

              </CCardBody>
            </CCard>

            <CCard>
              <CCardBody>
                <CCol xs="12" style={{ textAlign: 'center' }}>
                  <CImg src={(this.state.picture) ? this.state.picture : "avatar.png"}
                    width="120" height="120"
                    shape="rounded-circle"
                    className="profile-photo"
                  />
                </CCol>


                <CCol xs="12" style={{ textAlign: 'center', margin: '6px 0' }}>
                  <strong style={{ fontSize: 'x-large' }}> {this.state.firstName} {this.state.lastName}</strong>
                </CCol>

                <div style={{ width: "100%" }}>
                  <hr></hr>
                </div>

                <div>

                  <CCol style={{ padding: "10px" }}>
                    <span><strong>Nickname:</strong></span> {this.state.nickname}
                  </CCol>

                  <CCol style={{ padding: "10px" }}>
                    <span><strong>Email:</strong></span> {this.state.email}
                  </CCol>

                  <CCol style={{ padding: "10px" }}>
                    <span><strong>Interests:</strong></span> {this.state.areaOfInterest}
                  </CCol>

                  <CCol style={{ padding: "10px" }}>
                    <span><strong>Trainings:</strong></span> {
                      (this.state.selectedTrainings) ? this.state.selectedTrainings.map((training, index) => (index ? ', ' : ' ') + training) : ""}
                  </CCol>

                  <CCol style={{ padding: "10px" }}>
                    <span><strong>Qualifications/Experiences:</strong></span> {this.state.qualifications}
                  </CCol>

                  <CCol style={{ padding: "10px" }}>
                    <span><strong>About you: </strong></span>
                    <LinesEllipsis
                      text={this.state.bio}
                      maxLine='1'
                      ellipsis='...'
                      trimRight
                      basedOn='letters'
                    />
                  </CCol>

                  <CCol style={{ padding: "10px" }}>
                    <span><strong>Member since:</strong></span> {this.state.createdAt}
                  </CCol>

                  <div style={{ width: "100%" }}>
                    <hr></hr>
                  </div>
                </div>

                <div style={{ textAlign: 'end' }}>
                  <CButton color='dark' variant="outline" onClick={this.handleSubmit}><CIcon content={cilSave} /> Update</CButton>
                </div>
              </CCardBody>

              <CCardBody style={{ textAlign: 'center', display: (this.state.loading) ? "block" : "none" }}>
                <CSpinner color='primary' grow />
              </CCardBody>
            </CCard>

          </CCol >
        </CRow >

      )
    } else {
      return (
        <Route render={({ history }) => (
          history.push("/")
        )} />
      )
    }
  }
}

export default ProfileForm

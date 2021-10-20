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
} from '@coreui/react'

import { uploadBytes } from '@firebase/storage';
import { getStorage, ref, getDownloadURL } from '@firebase/storage';
import { CButton, CCardFooter, CImg } from "@coreui/react";
import { setDoc, doc, getDoc } from 'firebase/firestore';
import LinesEllipsis from 'react-lines-ellipsis'
import Interests from 'src/reusable/interests';
import { firebaseDB } from 'src/reusable/firebaseConfig';
import Swal from 'sweetalert2';
import { SwalMixing } from 'src/reusable/SwalMixin';

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
        createdAt: "",
      },

      loading: false,

      email: "",
      firstName: "",
      lastName: "",
      nickname: "",
      qualifications: "",
      areaOfInterest: "",
      bio: "",
      picture: "avatar.png",
      createdAt: "",

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
      this.state.picture = (this.state.initialValues.picture) ? this.state.initialValues.picture : "avatar.png";
      this.state.createdAt = this.state.initialValues.createdAt;

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
            this.state.picture = (this.state.initialValues.picture) ? this.state.initialValues.picture : "avatar.png";
            this.state.createdAt = this.state.initialValues.createdAt;

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
      this.setState({ picture: this.state.initialValues.picture })
    }
  }

  handleChangeFirstName(event) { this.setState({ firstName: event.target.value }) }
  handleChangeLastName(event) { this.setState({ lastName: event.target.value }) }
  handleChangeNickname(event) { this.setState({ nickname: event.target.value }) }
  handleChangeQualifications(event) { this.setState({ qualifications: event.target.value }) }
  handleChangeBio(event) { this.setState({ bio: event.target.value }) }
  handleChangeAreaOfInterest(event) { this.setState({ areaOfInterest: event.target.value }) }
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
          timer: 3000,
          timerProgressBar: false,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })

        Toast.fire({
          icon: 'success',
          title: 'Updated successfully'
        })

        //window.location.href = "/";
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
      bio: this.state.bio,
      picture: this.state.picture,
      createdAt: this.state.createdAt
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
              <CCardHeader><h4 style={{ margin: '0px' }}><strong>Edit Profile Card</strong></h4>
              </CCardHeader>
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
                    required
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
                    style={{ marginBottom: "23px" }}
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


                <CSelect value={this.state.areaOfInterest} onChange={this.handleChangeAreaOfInterest}>
                  {Interests.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </CSelect>

              </CCardBody>
            </CCard>

            <CCard>
              <CCardHeader>
                Photo
              </CCardHeader>
              <CCardBody>

                <div>
                  <div style={{ display: (this.state.loading) ? "none" : "block" }}>
                    <CCol lg="12" xs="12" md="12" style={{ textAlign: "left", paddingLeft: '0px' }}>
                      <input type="file" onChange={(e) => {
                        this.setState({ image: (e.target.files[0]) })
                        this.state.image = e.target.files[0];
                        if (this.state.image)
                          this.uploadPhoto();
                      }} />
                    </CCol>
                    <CCol lg="12" xs="12" md="12" style={{ textAlign: "end", paddingRight: '0px' }}>
                      <CButton color="secondary" onClick={this.uploadPhoto}>Upload</CButton>
                    </CCol>
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
                        width="100" height="100"
                        shape="rounded-circle" />
                    </div>
                  </CCol>
                </CRow>

              </CCardBody>

              <CCardFooter>
                <div style={{ textAlign: 'end' }}>
                  <Route render={({ history }) => (<CButton color='danger' onClick={() => { history.goBack() }}>Go Back</CButton>)} /> <CButton color='primary' onClick={this.handleSubmit}>Update</CButton>
                </div>
              </CCardFooter>
            </CCard>

          </CCol>
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

import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { CButton, CCardBody, CRow, CCard, CCol, CImg } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilPencil } from "@coreui/icons";
import { CSpinner } from "@coreui/react";
import { Route } from 'react-router';
import { getDoc, doc, deleteDoc } from 'firebase/firestore';
import { firebaseDB } from 'src/reusable/firebaseConfig';
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { getCookie } from "src/reusable/reusables";

const Profile = props => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  const [userFirebase, setUserFirebase] = useState([]);
  const [firebaseFlag, setFirebaseFlag] = useState(false);
  const [firebaseLoading, setFirebaseLoading] = useState(true);

  function removeUser() {
    Swal.fire({

      text: 'Are you sure you want to delete your profile?',
      showCancelButton: true,
      icon: 'error',
      iconColor: '#e55353',
      confirmButtonText: `Yes, delete it!`,
      confirmButtonColor: '#e55353'
    }).then((result) => {
      if (result.isConfirmed) {

        try {
          const deleteUser = async (db) => {
            await deleteDoc(doc(db, "users", user.email));
          }

          deleteUser(firebaseDB);

          const Toast = Swal.mixin({
            toast: true,
            position: 'bottom-end',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: false,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })

          Toast.fire({
            icon: 'success',
            title: 'Deleted successfully'
          })


        } catch (error) {
          console.log(error);
        }

        setTimeout(function () {
          props.history.push('/logout')
        }, 2000)
      }
    })
  }

  if (isAuthenticated && getCookie("session")) {
    if (!firebaseFlag) {
      const getUser = async (db) => {
        const docRef = doc(db, "users", user.email);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserFirebase(docSnap.data())
          setFirebaseFlag(true);
          setFirebaseLoading(false);

          console.log(userFirebase);
        } else {
          setTimeout(function () {
            props.history.push('/logout')
          }, 1000)
          console.log("No such document!");
        }
      }
      getUser(firebaseDB);

    }

    return (
      <CRow>
        <CCol>
          <CCard>
            <CCardBody style={{ display: (firebaseLoading || isLoading) ? "none" : "block" }}>

              <CCol xs="12" style={{ textAlign: 'center' }}>
                <CImg src={(userFirebase.picture) ? userFirebase.picture : "avatar.png"}
                  width="120" height="120"
                  shape="rounded-circle"
                  className="profile-photo"
                />
              </CCol>


              <CCol xs="12" style={{ textAlign: 'center', margin: '6px 0' }}>
                <strong style={{ fontSize: 'x-large' }}> {userFirebase.firstName} {userFirebase.lastName}</strong>
              </CCol>

              <div style={{ width: "100%" }}>
                <hr></hr>
              </div>

              <div>

                <CCol style={{ padding: "10px" }}>
                  <span><strong>Nickname:</strong></span> {userFirebase.nickname}
                </CCol>

                <CCol style={{ padding: "10px" }}>
                  <span><strong>Email:</strong></span> {userFirebase.email}
                </CCol>

                <CCol style={{ padding: "10px" }}>
                  <span><strong>Interests:</strong></span> {userFirebase.areaOfInterest}
                </CCol>

                <CCol style={{ padding: "10px" }}>
                  <span><strong>Qualifications/Experiences:</strong></span> {userFirebase.qualifications}
                </CCol>

                <CCol style={{ padding: "10px" }}>
                  <span><strong>Trainings:</strong></span> {
                    (userFirebase.trainings) ? userFirebase.trainings.map((training, index) => (index ? ', ' : ' ') + training) : ""}
                </CCol>

                <CCol style={{ padding: "10px" }}>
                  <span><strong>About:</strong></span> {userFirebase.bio}
                </CCol>

                <CCol style={{ padding: "10px" }}>
                  <span><strong>Member since:</strong></span> {userFirebase.createdAt}
                </CCol>
              </div>

              <div style={{ width: "100%" }}>
                <hr></hr>
              </div>

              <div style={{ textAlign: 'end' }}>
                <Route render={({ history }) => (<CButton color='dark' variant='outline' onClick={() => { history.push({ pathname: "/profile-form", state: userFirebase }) }} >Edit <CIcon content={cilPencil} /></CButton>)} />
              </div>
            </CCardBody>

            <CCardBody style={{ textAlign: 'center', display: (firebaseLoading) ? "block" : "none" }}>
              <CSpinner color='primary' grow />
            </CCardBody>
          </CCard>
          <CCol style={{ textAlign: 'center', marginBottom: '20px' }}>
            <Link to="/profile" style={{ color: '#e55353' }} onClick={removeUser}> Permanently delete your account</Link>
          </CCol>

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

export default Profile

import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { CButton, CCardBody, CCardFooter, CCardHeader, CRow, CCard, CCol, CImg } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilPencil } from "@coreui/icons";
import { CSpinner } from "@coreui/react";
import { LoginCard } from "src/containers/common";
import { Route } from 'react-router';
import { getDoc, doc, deleteDoc } from 'firebase/firestore';
import { firebaseDB } from 'src/reusable/firebaseConfig';
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

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
            timer: 3000,
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

          props.history.push('/logout')

        } catch (error) {
          console.log(error);
        }
      }
    })
  }

  if (isAuthenticated) {
    if (!firebaseFlag) {
      const getUser = async (db) => {
        const docRef = doc(db, "users", user.email);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserFirebase(docSnap.data())
          setFirebaseFlag(true);
          setFirebaseLoading(false);
        } else {
          console.log("No such document!");
        }
      }
      getUser(firebaseDB);
    }

    return (
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader><h4 style={{ margin: '0px' }}><strong>Profile Card</strong></h4></CCardHeader>
            <CCardBody style={{ display: (firebaseLoading || isLoading) ? "none" : "block" }}>
              <div style={{ padding: "10px" }}>
                <CImg src={(userFirebase.picture) ? userFirebase.picture : "avatar.png"}
                  width="100" height="100"
                  shape="rounded-circle" />

                <strong> {userFirebase.nickname}</strong>
              </div>


              <div>
                <CCol style={{ padding: "10px" }}>
                  <span><strong>First name:</strong></span> {userFirebase.firstName}
                </CCol>

                <CCol style={{ padding: "10px" }}>
                  <span><strong>Last name:</strong></span> {userFirebase.lastName}
                </CCol>

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
                  <span><strong>About:</strong></span> {userFirebase.bio}
                </CCol>

                <CCol style={{ padding: "10px" }}>
                  <span><strong>Member since:</strong></span> {userFirebase.createdAt}
                </CCol>
              </div>
            </CCardBody>

            <CCardBody style={{ textAlign: 'center', display: (firebaseLoading) ? "block" : "none" }}>
              <CSpinner color='primary' grow />
            </CCardBody>
            <CCardFooter>
              <div style={{ textAlign: 'end' }}>
                <Route render={({ history }) => (<CButton color='primary' onClick={() => { history.push({ pathname: "/profile-form", state: userFirebase }) }} ><CIcon content={cilPencil} /> Edit</CButton>)} />
              </div>
            </CCardFooter>
          </CCard>
          <CCol style={{ textAlign: 'center', marginBottom: '20px' }}>
            <Link to="/profile" style={{ color: '#e55353' }} onClick={removeUser}> Permanently delete your account</Link>
          </CCol>

        </CCol>
      </CRow >
    )
  } else {
    return (
      <div>
        <LoginCard />
      </div>
    )
  }
}

export default Profile
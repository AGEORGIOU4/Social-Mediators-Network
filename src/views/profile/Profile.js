import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { CButton, CCardBody, CCardFooter, CCardHeader, CRow, CCard, CCol, CImg } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilPencil } from "@coreui/icons";
import { CSpinner } from "@coreui/react";
import { LoginCard } from "src/containers/common";
import { Route } from 'react-router';
import { getDoc, doc } from 'firebase/firestore';
import { firebaseDB } from 'src/reusable/firebaseConfig';

const Profile = props => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  const [userFirebase, setUserFirebase] = useState([]);
  const [firebaseFlag, setFirebaseFlag] = useState(false);
  const [firebaseLoading, setFirebaseLoading] = useState(true);

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
              <Route render={({ history }) => (
                <div style={{ textAlign: 'end' }}>
                  <CButton color='primary'
                    onClick={() => {
                      history.push({
                        pathname: "/profile-form",
                        state: userFirebase
                      })
                    }}
                  ><CIcon content={cilPencil} /> Edit</CButton>

                </div>
              )} />
            </CCardFooter>
          </CCard>
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
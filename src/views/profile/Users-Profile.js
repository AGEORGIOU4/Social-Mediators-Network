import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { CButton, CCardBody, CRow, CCard, CCol, CImg } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { CSpinner } from "@coreui/react";
import { Route } from 'react-router';

import { getDoc, doc } from 'firebase/firestore';
import { firebaseDB } from 'src/reusable/firebaseConfig';
import { cilMail } from "@coreui/icons-pro";
import { LoginCard } from "src/containers/common";
import { SwalMixing } from "src/reusable/SwalMixin";

const UsersProfile = props => {
  const { isAuthenticated, isLoading } = useAuth0();

  const [userFirebase, setUserFirebase] = useState([]);
  const [firebaseFlag, setFirebaseFlag] = useState(false);
  const [firebaseLoading, setFirebaseLoading] = useState(true);

  const { email } =
    (props.location && props.location.state) || {};

  if (!email) {
    return (
      <Route render={({ history }) => (
        history.push("/")
      )} />
    )
  }
  else if (isAuthenticated && email) {
    if (!firebaseFlag) {

      const getUser = async (db) => {
        const docRef = doc(db, "users", email);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserFirebase(docSnap.data())
          setFirebaseFlag(true);
          setFirebaseLoading(false);
          console.log(userFirebase);
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
            <CCardBody style={{ display: (firebaseLoading || isLoading) ? "none" : "block" }}>
              <CCol xs="12" style={{ textAlign: 'center' }}>
                <CImg src={(userFirebase.picture) ? userFirebase.picture : "avatar.png"}
                  width="120" height="120"
                  shape="rounded-circle"
                  className="profile-photo"
                />
              </CCol>


              <CCol xs="12" style={{ textAlign: 'center', margin: '12px 0 6px' }}>
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

                <div style={{ width: "100%" }}>
                  <hr></hr>
                </div>

              </div>

              <Route render={({ history }) => (
                <div style={{ textAlign: 'end' }}>
                  <a target="_blank" rel="noopener noreferrer" href={`mailto:${email}`}><CButton color={"dark"} variant="outline">Message <CIcon size="md" content={cilMail} /></CButton></a>
                </div>
              )} />
            </CCardBody>

            <CCardBody style={{ textAlign: 'center', display: (firebaseLoading) ? "block" : "none" }}>
              <CSpinner color='primary' grow />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow >
    )
  } else {
    SwalMixing("warning", "Only members can view a member's personal info");
    return (
      <CCol>
        <LoginCard />
      </CCol>
    )
  }
}

export default UsersProfile

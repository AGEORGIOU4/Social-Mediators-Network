import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { CButton, CCardBody, CRow, CCard, CCol, CImg } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { CSpinner } from "@coreui/react";
import { Route } from 'react-router';

import { getDoc, doc } from 'firebase/firestore';
import { firebaseDB } from 'src/reusable/firebaseConfig';
import { cilMail, cilShare, cilCommentBubble } from "@coreui/icons-pro";
import { LoginCard } from "src/containers/common";
import {
  FormatTimestamp

} from "src/reusable/reusables";

const Proposal = props => {
  const { isAuthenticated, isLoading } = useAuth0();

  const [proposal, setProposal] = useState([]);
  const [firebaseFlag, setFirebaseFlag] = useState(false);
  const [loading, setLoading] = useState(false);

  const { proposalID } =
    (props.location.state) || {};

  if (!firebaseFlag && props.location.state) {
    setProposal(props.location.state);
    setFirebaseFlag(true);
  }

  console.log(proposal);

  if (!isAuthenticated) {
    return (
      <Route render={({ history }) => (
        history.push("/")
      )} />
    )
  }

  if (!proposalID) {
    return (
      <Route render={({ history }) => (
        history.push("/blog")
      )} />
    )
  }

  // else if (isAuthenticated) {
  //   if (!firebaseFlag) {

  //     const getProposal = async (db) => {
  //       const docRef = doc(db, "proposals", proposalID);
  //       const docSnap = await getDoc(docRef);

  //       if (docSnap.exists()) {
  //         setProposal(docSnap.data())
  //         setFirebaseFlag(true);
  //         setFirebaseLoading(false);
  //         console.log(proposal);
  //       } else {
  //         console.log("No such document!");
  //       }
  //     }
  //     getProposal(firebaseDB);
  //   }

  return (
    <CRow>
      <CCol>
        <CCard>
          <CCardBody>

            <CRow>
              <CCol xs="12" style={{ textAlign: 'center' }}>
                <CImg src={(proposal.picture) ? proposal.picture : "avatar.png"}
                  width="120" height="120"
                  shape="rounded-circle" />
              </CCol>

              <CCol xs="12" style={{ textAlign: 'center', marginTop: '6px' }}>
                <strong style={{ fontSize: 'x-large' }}> {proposal.author}</strong>
              </CCol>
            </CRow>


            <div style={{ width: "80%" }}>
              {/* <p style={{ color: "#00000066", fontSize: 'small', marginBottom: '4px' }}>{<FormatTimestamp seconds={proposal.createdAt.seconds} />}</p> */}
            </div>

            <div style={{ width: "100%" }}>
              <hr></hr>
            </div>

            <div style={{ width: "100%" }}>
              <h3 style={{ fontWeight: '900' }}>{proposal.content}</h3>
            </div>

            <div style={{ width: "100%", textAlign: "end" }}>
              <a style={{ fontSize: 'smaller', marginBottom: '4px' }}>{proposal.totalComments} comments</a>
            </div>

            <div style={{ width: "100%" }}>
              <hr></hr>
            </div>


            <div style={{ width: "100%", textAlign: 'center' }}>
              <div style={{ width: '50%', float: 'left' }} >
                <CButton
                  style={{ margin: '0 2px', fontSize: 'smaller' }}
                  size="sm"
                  color="dark"
                  variant="ghost"
                >Share <CIcon size={"sm"} content={cilShare} /></CButton>
              </div>

              <div style={{ width: '50%', float: 'left' }} >
                <CButton
                  style={{ margin: '0 2px', fontSize: 'smaller' }}
                  size="sm"
                  color="dark"
                  variant="ghost"
                  onClick={() => { this.postComment(proposal.proposalID) }}
                >Comment <CIcon size={"sm"} content={cilCommentBubble} /></CButton>
              </div>
            </div>

          </CCardBody>

          <CCardBody style={{ textAlign: 'center', display: (loading) ? "block" : "none" }}>
            <CSpinner color='primary' grow />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow >
  )
}
//   } else {
//     return (
//       <div>
//         <LoginCard />
//       </div>
//     )
//   }
// }

export default Proposal

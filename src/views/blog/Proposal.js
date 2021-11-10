import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { CButton, CCardBody, CRow, CCard, CCol, CImg } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { Route } from 'react-router';
import { cilShare, cilCommentBubble } from "@coreui/icons-pro";
import { CommentsTable } from "src/Tables/CommentsTable";
import { collection, getDocs, setDoc, doc, Timestamp, getDoc } from 'firebase/firestore';
import { firebaseDB } from "src/reusable/firebaseConfig";
import Swal from "sweetalert2";
import { v4 as uuidv4 } from 'uuid';
import { getCookie } from "src/reusable/reusables";
import { FormatTimestamp } from 'src/reusable/reusables';

const Proposal = props => {
  var pic = getCookie("userPicture");

  const { user, isAuthenticated } = useAuth0();
  var userFirebase = [];

  const [proposal, setProposal] = useState([]);
  const [comments, setComments] = useState([]);

  const [firebaseFlag, setFirebaseFlag] = useState(false);
  const [commentsTrue, setCommentsTrue] = useState(false);
  const [totalCommentsCounter, setTotalCommentsCounter] = useState(0);
  const [totalEnabledCommentsCounter, setTotalEnabledCommentsCounter] = useState(0);

  var enteredContent = "";

  const { proposalID, createdAt, totalComments, totalEnabledComments } =
    (props.location.state) || {};

  if (!firebaseFlag && props.location.state) {
    setProposal(props.location.state);

    setTotalCommentsCounter(totalComments);
    setTotalEnabledCommentsCounter(totalEnabledComments);

    getComments(proposalID);

    setFirebaseFlag(true);
  }

  const getUser = async (db) => {
    const docRef = doc(db, "users", user.email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      userFirebase = docSnap.data();
    } else {
      console.log("User does not exist is firebase!");
    }
  }

  const addComment = async (db) => {
    var commentID = uuidv4();

    await setDoc(doc(db, 'proposals/'.concat(proposalID).concat('/comments'), commentID), {
      commentID: commentID,
      author: userFirebase.firstName + ' ' + userFirebase.lastName,
      createdAt: Timestamp.now(),
      content: enteredContent,
      picture: (userFirebase.picture) ? userFirebase.picture : 'avatar.png',
      status: true,

    });

    var commentsCounter = totalCommentsCounter + 1;
    var enabledCommentsCounter = totalEnabledCommentsCounter + 1;

    setTotalCommentsCounter(commentsCounter);
    setTotalEnabledCommentsCounter(enabledCommentsCounter);

    await setDoc(doc(db, "proposals", proposalID), {
      author: proposal.author,
      title: proposal.title,
      description: proposal.description,
      createdAt: proposal.createdAt,
      email: proposal.email,
      picture: proposal.picture,
      proposalID: proposal.proposalID,
      totalComments: commentsCounter,
      totalEnabledComments: enabledCommentsCounter,
      status: proposal.status,
    });
  }

  const postComment = async () => {
    getUser(firebaseDB);

    Swal.fire({
      customClass: {
        image: 'proposalSwal'
      },

      input: "textarea",
      inputPlaceholder: "Write your comment...",
      imageUrl: pic,
      imageWidth: 80,
      showConfirmButton: true,
      confirmButtonText: "Comment",
      inputValidator: (value) => {
        if (!value) {
          return 'You need to write something!'
        } else {
          if (userFirebase.picture && userFirebase.firstName && userFirebase.lastName !== undefined) {
            enteredContent = value;
            addComment(firebaseDB);

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
              title: 'Comment added successfully'
            })

            getComments(proposalID);

          } else {
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
              icon: 'error',
              title: 'Oops, something went wrong. Please try again'
            })
          }
        }
      }
    })
  }

  function getComments(proposalID) {

    const fetchComments = async (db) => {
      const commentsCol = collection(db, 'proposals/'.concat(proposalID).concat('/comments'))
      const commentsSnapshot = await getDocs(commentsCol);
      const commentsList = commentsSnapshot.docs.map(doc => doc.data());

      var visibleComments = [];

      commentsList.forEach(comment => {
        if (comment.status === true) {
          visibleComments.push(comment);
        }
      });

      setComments(visibleComments);
      setCommentsTrue(commentsList.length > 0 ? true : false);
    };
    fetchComments(firebaseDB);
  }

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

  return (
    <CRow>
      <CCol>
        <CCard>
          <CCardBody>
            <div style={{ width: '100%' }}>
              <div style={{ width: "20%", float: 'left', textAlign: "center", marginLeft: '-6px', marginRight: '6px' }}>
                <CImg src={(proposal.picture) ? proposal.picture : "avatar.png"}
                  width="44" height="44"
                  shape="rounded-circle" />
              </div>

              <div style={{ width: "80%", float: 'left' }}>
                <strong style={{ fontSize: 'medium' }}> {proposal.author}</strong>
              </div>
            </div>

            <div style={{ width: "80%" }}>
              <p style={{ color: "#00000066", fontSize: 'small', marginBottom: '4px' }}>{<FormatTimestamp seconds={createdAt.seconds} />}</p>
            </div>

            <div style={{ width: "100%" }}>
              <hr></hr>
            </div>

            <div style={{ width: "100%" }}>
              <h3 style={{ fontWeight: '900' }}>{proposal.title}</h3>
            </div>

            <div style={{ width: "100%" }}>
              <p>{proposal.description}</p>
            </div>

            <div style={{ width: "100%", textAlign: "end" }}>
              <a style={{ fontSize: 'smaller', marginBottom: '4px' }}>{totalEnabledCommentsCounter} comments</a>
            </div>

            <div style={{ width: "100%" }}>
              <hr></hr>
            </div>


            <CCol>
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
                    onClick={() => { postComment(proposal.proposalID) }}
                  >Comment <CIcon size={"sm"} content={cilCommentBubble} /></CButton>
                </div>

              </div>
            </CCol>
          </CCardBody>

          <div style={{ display: (!commentsTrue) ? 'none' : 'block' }}>
            <CommentsTable comments={comments} />
          </div>

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

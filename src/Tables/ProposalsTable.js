import React from 'react'
import { CCardBody, CDataTable, CCol, CCard, CButton, CRow } from '@coreui/react'

// Firebase
import { collection, getDocs, setDoc, doc } from 'firebase/firestore';
import { firebaseDB } from 'src/reusable/firebaseConfig';
import { cilCommentBubble, cilShare, } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { CImg } from '@coreui/react';
import { Route } from 'react-router';
import { FormatTimestamp } from 'src/reusable/reusables';
import { CommentsTable } from './CommentsTable';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';

const proposalFields = [
  { key: 'card', label: "", sorter: false, filter: false },
  { key: 'author' },
  { key: 'content' },
]

export class ProposalsTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      proposals: [],
      proposalID: "",
      comments: [],
      showComments: false,
      proposalsLoading: false,
      commentsLoading: false,
    };
  }

  componentDidMount() {

    const getProposals = async (db) => {
      this.setState({ proposalsLoading: true })

      const proposalCol = collection(db, 'proposals/')
      const proposalSnapshot = await getDocs(proposalCol);
      const proposalList = proposalSnapshot.docs.map(doc => doc.data());
      this.setState({ proposals: proposalList });
      this.setState({ proposalsLoading: false });
      console.log(this.state.proposals);
    };
    getProposals(firebaseDB);
  }

  getComment(proposalID) {

    this.setState({ commentsLoading: true })
    this.state.showComments = true;
    this.setState({ showComments: true });

    console.log(proposalID);
    const fetchComments = async (db) => {
      const commentsCol = collection(db, 'proposals/'.concat(proposalID).concat('/comments'))
      const commentsSnapshot = await getDocs(commentsCol);
      const commentsList = commentsSnapshot.docs.map(doc => doc.data());
      this.setState({ comments: commentsList });
      this.setState({ commentsLoading: false })
      console.log(this.state.comments)
    };
    fetchComments(firebaseDB);
  }

  postComment = async () => {
    const swalQueue = Swal.mixin({
      confirmButtonText: 'Comment',
      showCancelButton: true,
      confirmButtonColor: '#635dff',
      allowOutsideClick: true,
    })

    await swalQueue.fire({
      input: "textarea",
      inputPlaceholder: 'Write a comment...',
      inputValidator: (value) => {
        if (!value) {
          return 'You need to write something!'
        } else {
          // enteredComment = value;
          // console.log(enteredComment);
        }
      }
    })
  }

  addComment(proposalID) {
    const insertComment = async (db) => {
      let createdAt = this.convertDate(Date.now());
      let commentID = uuidv4();

      await setDoc(doc(db, 'proposals/'.concat(proposalID).concat('/comments'), commentID), {
        commentID: commentID,
        createdAt: createdAt,
      });
    }
    insertComment(firebaseDB);
    console.log("added")
  }

  convertDate(updated_at) {
    var dateToString = "N/A";
    if (updated_at !== "N/A" || updated_at !== undefined) {
      var dateObject = new Date(updated_at);
      var date = new Intl.DateTimeFormat("en-UK", { year: "2-digit", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit" }).format(dateObject);
      dateToString = date.toString();
    }

    return (
      dateToString
    )
  }

  render() {
    return (

      <CRow className="basic-table">
        <CCol xs="12" style={{ textAlign: 'center' }}>
          <h2 style={{ marginBottom: '20px' }}><strong>Proposals</strong></h2>
        </CCol>

        <CCol xs="12">
          <Route render={({ history }) => (
            <CDataTable
              items={this.state.proposals}
              fields={proposalFields}
              loading={this.state.proposalsLoading}
              header={false}
              tableFilter={{ 'placeholder': 'Search...' }}
              itemsPerPage={20}
              pagination
              clickableRows
              sorterValue="createdAt"
              scopedSlots={{
                'card':
                  (item) => (
                    <td>
                      <CCard style={{ padding: "0", margin: "0" }}>
                        <CCardBody>
                          <div>
                            <div style={{ width: '100%' }}>
                              <div style={{ width: "20%", float: 'left', textAlign: "center", marginLeft: '-6px', marginRight: '6px' }}>
                                <CImg src={(item.picture) ? item.picture : "avatar.png"}
                                  width="44" height="44"
                                  shape="rounded-circle" />
                              </div>

                              <div style={{ width: "80%", float: 'left' }}>
                                <strong style={{ fontSize: 'medium' }}> {item.author}</strong>
                              </div>
                            </div>

                            <div style={{ width: "80%" }}>
                              <p style={{ color: "#00000066", fontSize: 'small', marginBottom: '4px' }}>{<FormatTimestamp seconds={item.createdAt.seconds} />}</p>
                            </div>

                            <div style={{ width: "100%" }}>
                              <hr></hr>
                            </div>

                            <div style={{ width: "100%" }}>
                              <p>{item.content}</p>
                            </div>

                            <div style={{ width: "100%", textAlign: "end" }}>
                              <p onClick={() => { this.getComment(item.proposalID) }} style={{ color: (this.state.showComments) ? "#635dff" : "#00000066", fontSize: 'smaller', marginBottom: '4px' }}>{item.totalComments} comments</p>
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
                                  onClick={() => {

                                  }}

                                >Share <CIcon size={"sm"} content={cilShare} /></CButton>
                              </div>

                              <div style={{ width: '50%', float: 'left' }} >
                                <CButton
                                  style={{ margin: '0 2px', fontSize: 'smaller' }}
                                  size="sm"
                                  color="dark"
                                  variant="ghost"
                                  onClick={() => { this.postComment() }}
                                >Comment <CIcon size={"sm"} content={cilCommentBubble} /></CButton>
                              </div>
                            </div>

                          </div>


                          {/* Comments */}
                          <div style={{ display: (this.state.showComments) ? 'block' : 'none' }}>
                            <CommentsTable comments={this.state.comments} loading={this.state.commentsLoading} showComments={this.state.showComments} />
                          </div>

                        </CCardBody>
                      </CCard>
                    </td>
                  ),
                'author':
                  (item) => (
                    <td
                      style={{ display: "none" }}>

                      {/* <CButton onClick={() => this.addComment(item.proposalID)}>Comment</CButton> */}
                    </td>
                  ),
                'content':
                  (item) => (
                    <td
                      style={{ display: "none" }}>
                    </td>
                  ),
                'createdAt':
                  (item) => (
                    <td
                      style={{ display: "none" }}>
                    </td>
                  ),
              }
              }
            />
          )} />
        </CCol>
      </CRow >

    )
  }
}
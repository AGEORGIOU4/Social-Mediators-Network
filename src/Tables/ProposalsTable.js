import React from 'react'
import { CCardBody, CDataTable, CCol, CCard, CCardHeader, CInput, CCardFooter, CButton, CRow } from '@coreui/react'

// Firebase
import { collection, getDocs, setDoc, doc, deleteDoc } from 'firebase/firestore';
import { firebaseDB } from 'src/reusable/firebaseConfig';
import { cilCommentBubble, cilShare, cilTrash } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import Swal from 'sweetalert2';
import { CImg } from '@coreui/react';
import { Route } from 'react-router';
import { FormatTimestamp } from 'src/reusable/reusables';
import { CommentsTable } from './CommentsTable';

const proposalFields = [
  { key: 'card', label: "", sorter: false, filter: false },
  { key: 'author' },
  { key: 'content' },
  // { key: 'comments' },
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
                              <p onClick={() => { this.getComment(item.proposalID) }} style={{ color: "#00000066", fontSize: 'smaller', marginBottom: '4px' }}>13 comments</p>
                            </div>

                            <div style={{ width: "100%" }}>
                              <hr></hr>
                            </div>

                            <div style={{ width: "100%", textAlign: 'center' }}>
                              <CButton
                                style={{ margin: '0 10px 10px' }}
                                size="sm"
                                color="dark"
                                variant="ghost"
                                onClick={() => {

                                }}

                              >Share <CIcon size={"lg"} content={cilShare} /></CButton>

                              <CButton
                                style={{ margin: '0 10px 10px' }}
                                size="sm"
                                color="dark"
                                variant="ghost"
                                onClick={() => { }}
                              >Comment <CIcon size={"lg"} content={cilCommentBubble} /></CButton>
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
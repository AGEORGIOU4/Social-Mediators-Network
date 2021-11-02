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
      loading: false,
    };
  }

  componentDidMount() {
    this.setState({ loading: true })

    const getProposals = async (db) => {
      const proposalCol = collection(db, 'proposals/')
      const proposalSnapshot = await getDocs(proposalCol);
      const proposalList = proposalSnapshot.docs.map(doc => doc.data());
      this.setState({ proposals: proposalList });
      this.setState({ loading: false });
      console.log(this.state.proposals);
    };

    getProposals(firebaseDB);
  }

  getComment(proposalID) {
    const fetchComments = async (db) => {
      const commentsCol = collection(db, 'proposals/'.concat(proposalID).concat('/comments'))
      const commentsSnapshot = await getDocs(commentsCol);
      const commentsList = commentsSnapshot.docs.map(doc => doc.data());
      this.setState({ comments: commentsList });
      this.setState({ loading: false })
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
              loading={this.state.loading}
              header={false}
              tableFilter={{ 'placeholder': 'Search...' }}
              itemsPerPage={20}
              pagination
              clickableRows
              sorterValue="createdAt"
              onRowClick={(item, index, col, e) => {
                if (this.getCookie("userEmail") === item.email) {
                  // history.push("/profile")
                } else {
                  history.push({
                    // pathname: "/users-profile",
                    // state: item
                  })
                }
              }
              }
              scopedSlots={{
                'card':
                  (item) => (
                    <td>
                      <CCard style={{ padding: "0", margin: "0" }}>
                        <CCardBody>

                          <div style={{ width: '100%' }}>
                            <div style={{ width: "20%", float: 'left', marginLeft: '-6px', marginRight: '6px' }}>
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
                            <a href="www.google.com"><p style={{ color: "#00000066", fontSize: 'smaller', marginBottom: '4px' }}>13 comments</p></a>
                          </div>

                          <div style={{ width: "100%" }}>
                            <hr></hr>
                          </div>

                          <div style={{ width: "50%", float: 'left', textAlign: 'center' }}>
                            <CButton
                              style={{ margin: '5px' }}
                              size="sm"
                              color="dark"
                              variant="ghost"
                              onClick={() => {

                              }}

                            >Share <CIcon size={"lg"} content={cilShare} /></CButton>
                          </div>

                          <div style={{ width: "50%", float: 'left', textAlign: 'center' }}>
                            <CButton
                              style={{ margin: '5px' }}
                              size="sm"
                              color="dark"
                              variant="ghost"
                              onClick={() => {

                              }}

                            >Comment <CIcon size={"lg"} content={cilCommentBubble} /></CButton>
                          </div>







                          {/* <CCol style={{ textAlign: 'end', paddingRight: '0' }}>
                          <CBadge color={getInterestsBadge(item.areaOfInterest)}>{item.areaOfInterest}</CBadge>
                        </CCol> */}


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
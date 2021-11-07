import React from 'react'
import { CCardBody, CDataTable, CCol, CCard, CRow, CSpinner } from '@coreui/react'

// Firebase
import { collection, getDocs } from 'firebase/firestore';
import { firebaseDB } from 'src/reusable/firebaseConfig';
import { CImg } from '@coreui/react';
import { Route } from 'react-router';
import { FormatTimestamp } from 'src/reusable/reusables';

const proposalFields = [
  { key: 'card', label: "", sorter: false, filter: false },
  { key: 'author' },
  { key: 'title' },
  { key: 'description' },
  { key: 'createdAt' },
]

export class ProposalsTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      proposals: [],
      proposalID: "",
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

  // getComment(proposalID) {

  //   this.setState({ commentsLoading: true })
  //   this.state.showComments = true;
  //   this.setState({ showComments: true });

  //   console.log(proposalID);
  //   const fetchComments = async (db) => {
  //     const commentsCol = collection(db, 'proposals/'.concat(proposalID).concat('/comments'))
  //     const commentsSnapshot = await getDocs(commentsCol);
  //     const commentsList = commentsSnapshot.docs.map(doc => doc.data());
  //     this.setState({ comments: commentsList });
  //     this.setState({ commentsLoading: false })
  //     console.log(this.state.comments)
  //   };
  //   fetchComments(firebaseDB);
  // }

  // postComment = async (proposalID) => {
  //   const swalQueue = Swal.mixin({
  //     confirmButtonText: 'Comment',
  //     showCancelButton: true,
  //     confirmButtonColor: '#635dff',
  //     allowOutsideClick: true,
  //     backdrop: true,
  //   })

  //   await swalQueue.fire({
  //     input: "textarea",
  //     inputPlaceholder: 'Write a comment...',
  //     inputValidator: (value) => {
  //       if (!value) {
  //         return 'You need to write something!'
  //       } else {

  //         enteredComment = value;
  //         this.addComment(proposalID);
  //       }
  //     }
  //   })
  // }

  // addComment(proposalID) {
  //   const insertComment = async (db) => {

  //     let commentID = uuidv4();

  //     await setDoc(doc(db, 'proposals/'.concat(proposalID).concat('/comments'), commentID), {
  //       commentID: commentID,
  //       createdAt: Timestamp.now(),
  //       commentContent: enteredComment,
  //     });
  //   }
  //   insertComment(firebaseDB);
  //   console.log("added")
  // }

  // convertDate(updated_at) {
  //   var dateToString = "N/A";
  //   if (updated_at !== "N/A" || updated_at !== undefined) {
  //     var dateObject = new Date(updated_at);
  //     var date = new Intl.DateTimeFormat("en-UK", { year: "2-digit", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit" }).format(dateObject);
  //     dateToString = date.toString();
  //   }

  //   return (
  //     dateToString
  //   )
  // }

  render() {
    return (

      <CRow className="basic-table">
        <CCol xs="12" style={{ textAlign: 'center' }}>
          <h2 style={{ marginBottom: '20px' }}><strong>Proposals</strong></h2>
        </CCol>


        <CCol xs="12" style={{ display: (this.state.loading) ? "none" : "block" }}>
          <Route render={({ history }) => (
            <CDataTable
              items={this.state.proposals}
              fields={proposalFields}
              loading={this.state.loading}
              header={false}
              tableFilter={{ 'placeholder': 'Search...' }}
              itemsPerPage={20}
              pagination
              sorter
              sorterValue={{ column: "createdAt", asc: false }}
              clickableRows
              onRowClick={(item, index, col, e) => {
                history.push({
                  pathname: "/proposal",
                  state: item
                })
              }
              }
              scopedSlots={{
                'card':
                  (item, index) => (
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
                              <h3 style={{ fontWeight: '900' }}>{item.title}</h3>
                            </div>
                            <div style={{ width: "100%" }}>
                              <p >{item.description}</p>
                            </div>

                            <div style={{ width: "100%", textAlign: "end" }}>
                              <a href="" style={{ fontSize: 'smaller', marginBottom: '4px' }}>{item.totalComments} comments</a>
                            </div>

                            <div style={{ width: "100%" }}>
                              <hr></hr>
                            </div>

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
                'title':
                  (item) => (
                    <td
                      style={{ display: "none" }}>
                    </td>
                  ),
                'description':
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
        <CCol xs="12" style={{ textAlign: 'center', display: (this.state.loading) ? "block" : "none" }}>
          <CSpinner color='primary' grow />
        </CCol>

      </CRow >

    )
  }
}
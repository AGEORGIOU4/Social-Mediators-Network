import React from 'react'
import CIcon from '@coreui/icons-react';
// Firebase
import { collection, getDocs, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { firebaseDB } from 'src/reusable/firebaseConfig';

import { CCardBody, CButton, CDataTable, CCol, CCard, CCardHeader, CBadge, CCardFooter, CCollapse, CLink, CImg, CSwitch } from '@coreui/react'
import { getStatusBadge, FormatTimestamp } from 'src/reusable/reusables';
import Swal from 'sweetalert2';
import { cilMinus, cilTrash } from '@coreui/icons';
import Switch from "react-switch";
import { Route } from 'react-router';
import LinesEllipsis from 'react-lines-ellipsis';

const proposalFields = [
  { key: 'author' },
  { key: 'title', _style: { width: '30%' } },
  { key: 'description', _style: { width: '30%' } },
  { key: 'createdAt' },
  {
    key: 'totalComments',
    label: 'Comments',
    _style: { width: '1%' },
    filter: false
  },
  { key: 'status', filter: false },
  {
    key: 'switchVisibility',
    label: '',
    _style: { width: '1%' },
    sorter: false,
    filter: false
  },
  { key: 'remove', label: '', _style: { width: '0%' }, sorter: false, filter: false },
]

const commentsFields = [
  { key: 'picture' },
  { key: 'author' },
  { key: 'content' },
  { key: 'createdAt' },
  { key: 'status', filter: false },
  {
    key: 'switchVisibility',
    label: '',
    _style: { width: '1%' },
    sorter: false,
    filter: false
  },
  { key: 'remove', label: '', _style: { width: '0%' }, sorter: false, filter: false },
]

export class ProposalsTableAdmin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      proposals: [],
      proposal: [],
      totalComments: 0,
      totalEnabledComments: 0,
      comments: [],
      loading: false,
      details: [],
      openDetails: false,
      status: true,
      commentsTrue: false,
      commentParentID: "",
    };
  }

  toggleDetails = (item, index) => {
    const position = this.state.details.indexOf(index)
    let newDetails = this.state.details.slice()
    if (position !== -1) {
      newDetails.splice(position, 1)
    } else {
      newDetails = [...this.state.details, index]
    }
    this.setState({ details: newDetails })
    this.setState({ openDetails: !this.state.openDetails })

    this.setState({ proposal: item });
    this.setState({ totalComments: item.totalComments });
    this.setState({ totalEnabledComments: item.totalEnabledComments });

    this.getComments(item.proposalID);
  }

  getProposals = async (db) => {
    this.setState({ loading: true });

    const proposalCol = collection(db, 'proposals');
    const proposalSnapshot = await getDocs(proposalCol);
    const proposalList = proposalSnapshot.docs.map(doc => doc.data());

    this.setState({ proposals: proposalList });

    this.setState({ loading: false })
  };

  editProposal = async (item, db) => {
    await setDoc(doc(db, "proposals", item.proposalID), {
      proposalID: item.proposalID,
      author: item.author,
      createdAt: item.createdAt,
      title: item.title,
      description: item.description,
      email: item.email,
      picture: item.picture,
      totalComments: item.totalComments,
      status: this.state.status
    });
    this.componentDidMount();
  }

  handleChangeProposalVisibility(item) {
    this.state.status = !item.status;
    this.setState({ status: !item.status });
    this.editProposal(item, firebaseDB);
  }

  removeProposal(proposalID) {
    console.log(proposalID);
    Swal.fire({

      text: 'Delete this from proposals?',
      showCancelButton: true,
      icon: 'error',
      iconColor: '#e55353',
      confirmButtonText: `Yes, delete it!`,
      confirmButtonColor: '#e55353'
    }).then((result) => {
      if (result.isConfirmed) {

        try {
          const deleteProposal = async (db) => {
            await deleteDoc(doc(db, "proposals", proposalID));
          }

          deleteProposal(firebaseDB);

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

          this.componentDidMount();
        } catch (error) {
          console.log(error);
        }
      }
    })
  }

  getComments(proposalID) {
    this.setState({ loading: true });

    const fetchComments = async (db) => {
      const commentsCol = collection(db, 'proposals/'.concat(proposalID).concat('/comments'))
      const commentsSnapshot = await getDocs(commentsCol);
      const commentsList = commentsSnapshot.docs.map(doc => doc.data());

      this.setState({ commentParentID: proposalID });

      this.setState({ comments: commentsList });
      this.setState({ loading: false });
      this.setState({ commentsTrue: (commentsList.length > 0 ? true : false) });
    };
    fetchComments(firebaseDB);
  }

  handleChangeCommentVisibility(item) {
    this.state.status = !item.status;
    this.setState({ status: !item.status });
    this.editComment(item, firebaseDB);
  }

  editComment = async (item, db) => {

    var enabledCommentsCounter = (!item.status) ? this.state.totalEnabledComments + 1 : this.state.totalEnabledComments - 1;
    this.setState({ totalEnabledComments: enabledCommentsCounter });

    await setDoc(doc(db, "proposals", this.state.proposal.proposalID), {
      author: this.state.proposal.author,
      title: this.state.proposal.title,
      description: this.state.proposal.description,
      createdAt: this.state.proposal.createdAt,
      email: this.state.proposal.email,
      picture: this.state.proposal.picture,
      proposalID: this.state.proposal.proposalID,
      totalComments: this.state.totalComments,
      totalEnabledComments: enabledCommentsCounter,
      status: this.state.proposal.status,
    });


    await setDoc(doc(db, 'proposals/'.concat(this.state.commentParentID).concat('/comments'), item.commentID), {
      commentID: item.commentID,
      author: item.author,
      createdAt: item.createdAt,
      content: item.content,
      picture: item.picture,
      status: this.state.status
    });
    this.getComments(this.state.commentParentID);
    this.getProposals(firebaseDB);
  }

  removeComment(commentID, proposalID, commentStatus, db) {
    Swal.fire({

      text: 'Delete this from comments?',
      showCancelButton: true,
      icon: 'error',
      iconColor: '#e55353',
      confirmButtonText: `Yes, delete it!`,
      confirmButtonColor: '#e55353'
    }).then((result) => {
      if (result.isConfirmed) {

        try {
          const deleteComment = async (db) => {
            await deleteDoc(doc(db, 'proposals/'.concat(proposalID).concat('/comments'), commentID));
          }
          deleteComment(firebaseDB);

          var commentsCounter = this.state.totalComments - 1;
          this.setState({ totalComments: commentsCounter });

          var enabledCommentsCounter = (!commentStatus) ? this.state.totalEnabledComments : this.state.totalEnabledComments - 1;
          this.setState({ totalEnabledComments: enabledCommentsCounter });

          setDoc(doc(db, "proposals", this.state.proposal.proposalID), {
            author: this.state.proposal.author,
            title: this.state.proposal.title,
            description: this.state.proposal.description,
            createdAt: this.state.proposal.createdAt,
            email: this.state.proposal.email,
            picture: this.state.proposal.picture,
            proposalID: this.state.proposal.proposalID,
            totalComments: commentsCounter,
            totalEnabledComments: enabledCommentsCounter,
            status: this.state.proposal.status,
          });

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
          this.getProposals(firebaseDB);
          this.getComments(proposalID);
        } catch (error) {
          console.log(error);
        }
      }
    })
  }

  componentDidMount() {
    this.getProposals(firebaseDB);
  }

  render() {
    return (
      <CCol xs="12" style={{ padding: 0 }}>
        <CCard>
          <CCardHeader>
            <h4 style={{ margin: '0' }}><strong>Proposals</strong></h4>
          </CCardHeader>
          <CCardBody className="settings-table">
            <CDataTable
              items={this.state.proposals}
              fields={proposalFields}
              loading={this.state.loading}
              columnFilter
              cleaner
              responsive={true}
              tableFilter={{ 'placeholder': 'Search for a proposal...' }}
              sorter
              sorterValue={{ column: "createdAt", asc: false }}
              itemsPerPage={20}
              pagination
              clickableRows
              scopedSlots={{
                'title':
                  (item) => (
                    <td>
                      <LinesEllipsis
                        text={item.title}
                        maxLine='4'
                        ellipsis='...'
                        trimRight
                        basedOn='letters'
                      />
                    </td>
                  ),
                'description':
                  (item) => (
                    <td>
                      <LinesEllipsis
                        text={item.description}
                        maxLine='4'
                        ellipsis='...'
                        trimRight
                        basedOn='letters'
                      />
                    </td>
                  ),
                'createdAt':
                  (item) => (
                    <td>
                      <FormatTimestamp seconds={(item.createdAt != null ? item.createdAt.seconds : "N/A")} />
                    </td>
                  ),
                'status':
                  (item) => {
                    return (
                      <td className="py-2">
                        <CBadge color={getStatusBadge(item.status)}>{(item.status) ? "Active" : "Banned"}</CBadge>
                      </td>
                    )
                  },
                'totalComments':
                  (item, index) => {
                    return (

                      <td className="py-2" onClick={() => { this.toggleDetails(item, index) }}>
                        <CLink>{item.totalComments} comments</CLink>
                      </td>
                    )
                  },
                'details':
                  (item, index) => {
                    return (
                      <CCollapse show={this.state.details.includes(index)}>
                        <CCardBody style={{ display: (this.state.loading) ? "none" : "block", backgroundColor: '#f0f3f5' }}>

                          <CCol xs="12">
                            <CCol style={{ textAlign: "end" }}>
                              <CButton onClick={() => { this.toggleDetails(item, index) }} color={"info"}>Hide <CIcon content={cilMinus} /></CButton>
                            </CCol>

                            {/* Comments Sub-table */}
                            <Route render={({ history }) => (
                              <CDataTable
                                items={this.state.comments}
                                fields={commentsFields}
                                loading={this.state.loading}
                                columnFilter
                                cleaner
                                itemsPerPage={20}
                                tableFilter={{ 'placeholder': 'Search a comment...' }}
                                pagination
                                sorter
                                sorterValue={{ column: "createdAt", asc: false }}
                                clickableRows
                                scopedSlots={{
                                  'picture':
                                    (item) => (
                                      <td>
                                        <CImg src={(item.picture) ? item.picture : "avatar.png"}
                                          width="36" height="36"
                                          shape="rounded-circle" />
                                      </td>
                                    ),
                                  'content':
                                    (item) => (
                                      <td style={{ textAlign: 'justify' }}>
                                        {item.content}
                                      </td>
                                    ),
                                  'createdAt':
                                    (item) => (
                                      <td>
                                        <FormatTimestamp seconds={(item.createdAt != null ? item.createdAt.seconds : "N/A")} />
                                      </td>
                                    ),
                                  'status':
                                    (item) => {
                                      return (
                                        <td className="py-2">
                                          <CBadge color={getStatusBadge(item.status)}>{(item.status) ? "Active" : "Banned"}</CBadge>
                                        </td>
                                      )
                                    },
                                  'switchVisibility':
                                    (item) => {
                                      return (
                                        <td className="py-2" style={{ verticalAlign: 'inherit' }}>
                                          <CSwitch variant="3d" size="sm" color="success" checked={item.status} onChange={() => this.handleChangeCommentVisibility(item, firebaseDB)} />
                                        </td>
                                      )
                                    },
                                  'remove':
                                    (item, index) => {
                                      return (
                                        <td className="py-2" style={{ verticalAlign: 'inherit' }}>
                                          <CButton
                                            className="trash-btn"
                                            size="sm"
                                            style={{ color: "#e55353" }}
                                            variant="outline"
                                            onClick={() => {
                                              this.removeComment(item.commentID, this.state.commentParentID, item.status, firebaseDB);
                                            }}

                                          ><CIcon content={cilTrash} /></CButton>
                                        </td>
                                      )
                                    },
                                }
                                }
                              />
                            )} />
                          </CCol>
                        </CCardBody>
                      </CCollapse>
                    )
                  },
                'switchVisibility':
                  (item) => {
                    return (
                      <td className="py-2" style={{ verticalAlign: 'inherit' }}>
                        <Switch checked={item.status} onChange={() => this.handleChangeProposalVisibility(item, firebaseDB)} />
                      </td>
                    )
                  },
                'remove':
                  (item, index) => {
                    return (
                      <td className="py-2" style={{ verticalAlign: 'inherit' }}>
                        <CButton
                          size="sm"
                          className="trash-btn"
                          style={{ color: "#e55353" }}
                          variant="outline"
                          onClick={() => {
                            this.removeProposal(item.proposalID)
                          }}

                        ><CIcon content={cilTrash} /></CButton>
                      </td>
                    )
                  },
              }}
            />
          </CCardBody>
          <CCardFooter>
          </CCardFooter>
        </CCard>
      </CCol>
    )
  }
}
export default ProposalsTableAdmin

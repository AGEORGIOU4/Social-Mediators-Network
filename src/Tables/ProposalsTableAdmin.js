import React from 'react'
import CIcon from '@coreui/icons-react';
// Firebase
import { collection, getDocs, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { firebaseDB } from 'src/reusable/firebaseConfig';

import { CCardBody, CButton, CDataTable, CCol, CCard, CCardHeader, CBadge, CCardFooter, CCollapse, CLink } from '@coreui/react'
import { getStatusBadge, FormatTimestamp } from 'src/reusable/reusables';
import { cilEye, cilEyeSlash } from '@coreui/icons-pro';
import Swal from 'sweetalert2';
import { cilTrash } from '@coreui/icons';
import Switch from "react-switch";
import { CommentsTableAdmin } from './CommentsTableAdmin';

const proposalFields = [
  { key: 'author' },
  { key: 'title', },
  { key: 'description' },
  { key: 'createdAt' },
  { key: 'status' },
  {
    key: 'totalComments',
    label: 'Comments',
    _style: { width: '1%' },
    sorter: false,
    filter: false
  },
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
      comments: [],
      loading: false,
      details: [],
      openDetails: false,
      status: true,
      commentsTrue: false,
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

    this.getComments(item.proposalID);
  }


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

  handleChangeVisibility(item) {
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
      this.setState({ comments: commentsList });
      this.setState({ loading: false });
      this.setState({ commentsTrue: (commentsList.length > 0 ? true : false) });
    };
    fetchComments(firebaseDB);
  }

  componentDidMount() {
    this.setState({ loading: true })

    const getProposals = async (db) => {
      const proposalCol = collection(db, 'proposals');
      const proposalSnapshot = await getDocs(proposalCol);
      const proposalList = proposalSnapshot.docs.map(doc => doc.data());

      this.setState({ proposals: proposalList });

      this.setState({ loading: false })
    };
    getProposals(firebaseDB);
  }

  render() {
    return (
      <CCol xs={12}>
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
              tableFilter={{ 'placeholder': 'Search a proposal...' }}
              sorter
              sorterValue={{ column: "createdAt", asc: false }}
              itemsPerPage={50}
              hover
              pagination
              clickableRows
              scopedSlots={{
                'totalComments':
                  (item, index) => {
                    return (

                      <td className="py-2" onClick={() => { this.toggleDetails(item, index) }}>
                        <CLink>{item.totalComments}</CLink>
                      </td>
                    )
                  },
                'details':
                  (item, index) => {
                    return (
                      <CCollapse show={this.state.details.includes(index)}>
                        <CCardBody style={{ display: (this.state.loading) ? "none" : "block", backgroundColor: '#f0f3f5' }}>
                          {/* <div style={{ display: (!commentsTrue) ? 'none' : 'block' }}> */}
                          <CommentsTableAdmin comments={this.state.comments} />
                          {/* </div> */}
                        </CCardBody>
                      </CCollapse>
                    )
                  },
                'createdAt':
                  (item) => (
                    <td>
                      <FormatTimestamp seconds={(item.createdAt != null ? item.createdAt.seconds : "N/A")} />
                    </td>
                  ),
                'status':
                  (item) => (
                    <td>
                      <CBadge color={getStatusBadge(item.status)}>
                        {item.status}
                      </CBadge>
                    </td>
                  ),
                'visibility':
                  (item) => (
                    <td>
                      <CButton
                        color="#4638c2"
                        variant="outline"
                        size="sm"><CIcon content={(item.status === "Active") ? cilEye : cilEyeSlash} /></CButton>
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
                        <Switch checked={item.status} onChange={() => this.handleChangeVisibility(item, firebaseDB)} />
                      </td>
                    )
                  },
                'remove':
                  (item, index) => {
                    return (
                      <td className="py-2" style={{ verticalAlign: 'inherit' }}>
                        <CButton
                          size="sm"
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

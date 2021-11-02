import React from 'react'
import { CCardBody, CDataTable, CCol, CCard, CCardHeader, CImg, CButton, CCollapse } from '@coreui/react'

// Firebase
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { firebaseDB } from 'src/reusable/firebaseConfig';

import { Route } from 'react-router';
import CIcon from '@coreui/icons-react';
import { cilEye } from '@coreui/icons-pro';
import { cilTrash } from '@coreui/icons';
import Swal from 'sweetalert2';

const socialMediatorFields = [
  { key: 'email' },
  {
    key: 'show_details',
    label: '',
    _style: { width: '1%' },
    sorter: false,
    filter: false
  },
  { key: 'remove', label: '', _style: { width: '0%' }, sorter: false, filter: false },
]

export class SocialMediatorsAdvancedTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      loading: false,
      details: [],
      items: []
    };
  }

  toggleDetails = (index) => {
    const position = this.state.details.indexOf(index)
    let newDetails = this.state.details.slice()
    if (position !== -1) {
      newDetails.splice(position, 1)
    } else {
      newDetails = [...this.state.details, index]
    }
    this.setState({ details: newDetails })
  }

  removeUser(email) {
    if (!email) {
      email = "this";
    }
    console.log(email);
    Swal.fire({

      text: 'Delete '.concat(email).concat(' from users? '),
      showCancelButton: true,
      icon: 'error',
      iconColor: '#e55353',
      confirmButtonText: `Yes, delete it!`,
      confirmButtonColor: '#e55353'
    }).then((result) => {
      if (result.isConfirmed) {

        try {
          const deleteUser = async (db) => {
            await deleteDoc(doc(db, "users", email));
          }

          deleteUser(firebaseDB);

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

  componentDidMount() {
    this.setState({ loading: true })

    const getUsers = async (db) => {
      const userCol = collection(db, 'users');
      const userSnapshot = await getDocs(userCol);
      const usersList = userSnapshot.docs.map(doc => doc.data());
      this.setState({ users: usersList });

      this.setState({ loading: false })
    };

    getUsers(firebaseDB);
  }

  render() {
    return (
      <CCol xs="12">
        <CCard className="advanced-table">
          <CCardHeader>
            <h4 style={{ margin: '0' }}><strong>Users</strong></h4>
          </CCardHeader>
          <CCardBody className="settings-table">

            <Route render={({ history }) => (

              <CDataTable
                className="advanced-table"
                items={this.state.users}
                fields={socialMediatorFields}
                tableFilter={{ 'placeholder': 'Search by email...' }}
                cleaner
                itemsPerPage={50}
                sorter
                pagination
                loading={this.state.loading}
                scopedSlots={{

                  'show_details':
                    (item, index) => {
                      return (
                        <td className="py-2">
                          <CButton
                            size="sm"
                            color="primary"
                            variant="outline"
                            onClick={() => { this.toggleDetails(index) }}

                          ><CIcon content={cilEye} /></CButton>
                        </td>
                      )
                    },
                  'details':
                    (item, index) => {
                      return (
                        <CCollapse show={this.state.details.includes(index)}>
                          <CCardBody style={{ display: (this.state.loading) ? "none" : "block" }}>
                            <div style={{ background: 'linear-gradient(0deg, rgb(255, 255, 255) 10%, #f3ecfe  80%)', margin: '-20px -20px 0px', padding: '20px', borderRadius: '3px' }}>
                              <CImg src={(item.picture) ? item.picture : "avatar.png"}
                                width="70" height="70"
                                shape="rounded-circle"
                                style={{ border: '3px solid white ', marginLeft: "-10px" }} />

                              <strong style={{ fontSize: 'large' }}> {item.firstName} {item.lastName}</strong>
                            </div>

                            <div>

                              <CCol style={{ padding: "10px" }}>
                                <span><strong>Nickname:</strong></span> {item.nickname}
                              </CCol>

                              <CCol style={{ padding: "10px" }}>
                                <span><strong>Email:</strong></span> <a target="_blank" rel="noopener noreferrer" href={`mailto:${item.email}`}>{item.email}</a>
                              </CCol>

                              <CCol style={{ padding: "10px" }}>
                                <span><strong>Interests:</strong></span> {item.areaOfInterest}
                              </CCol>

                              <CCol style={{ padding: "10px" }}>
                                <span><strong>Qualifications/Experiences:</strong></span> {item.qualifications}
                              </CCol>

                              <CCol style={{ padding: "10px" }}>
                                <span><strong>About:</strong></span> {item.bio}
                              </CCol>

                              <CCol style={{ padding: "10px" }}>
                                <span><strong>Member since:</strong></span> {item.createdAt}
                              </CCol>
                            </div>
                          </CCardBody>
                        </CCollapse>
                      )
                    },
                  'remove':
                    (item) => (
                      <td>
                        <CButton
                          size="sm"
                          color="danger"
                          variant="outline"
                          onClick={() => {
                            this.removeUser(item.email)
                          }}

                        ><CIcon content={cilTrash} /></CButton>
                      </td>
                    )
                }}
              />
            )} />

          </CCardBody>
          {/* <CCardFooter style={{ textAlign: 'right' }}>
            <CButton color="primary">Create User</CButton>
          </CCardFooter> */}
        </CCard>
      </CCol >
    )
  }
}
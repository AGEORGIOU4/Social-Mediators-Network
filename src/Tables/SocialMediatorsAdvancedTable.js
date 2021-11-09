import React from 'react'
import { CCardBody, CDataTable, CCol, CCard, CCardHeader, CImg, CButton, CCollapse, CBadge } from '@coreui/react'

// Firebase
import { collection, getDocs, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { firebaseDB } from 'src/reusable/firebaseConfig';

import { Route } from 'react-router';
import CIcon from '@coreui/icons-react';
import { cilEyeSlash } from '@coreui/icons-pro';
import { cilTrash } from '@coreui/icons';
import Swal from 'sweetalert2';
import Switch from "react-switch";
import { getStatusBadge } from 'src/reusable/reusables';

const socialMediatorFields = [
  { key: 'email' },
  { key: 'status' },
  {
    key: 'switchVisibility',
    label: '',
    _style: { width: '1%' },
    sorter: false,
    filter: false
  },
  {
    key: 'remove',
    label: '',
    _style: { width: '1%' },
    sorter: false,
    filter: false
  },
]

export class SocialMediatorsAdvancedTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      loading: false,
      details: [],
      openDetails: false,
      status: true,
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
    this.setState({ openDetails: !this.state.openDetails })
  }


  editUser = async (item, db) => {
    await setDoc(doc(db, "users", item.email), {
      email: item.email,
      nickname: item.nickname,
      picture: item.picture,
      firstName: item.firstName,
      lastName: item.lastName,
      bio: item.bio,
      qualifications: item.qualifications,
      trainings: item.trainings,
      areaOfInterest: item.areaOfInterest,
      createdAt: item.createdAt,
      status: this.state.status
    });
    this.componentDidMount();
  }

  handleChangeVisibility(item) {
    this.setState({ status: !item.status });
    this.editUser(item, firebaseDB);
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
                clickableRows
                hover
                // onRowClick={((item, index, col, e) => { this.toggleDetails(index) })}
                loading={this.state.loading}
                scopedSlots={{
                  'email':
                    (item, index) => {
                      return (

                        <td className="py-2" onClick={() => { this.toggleDetails(index) }}>
                          {item.email}
                        </td>
                      )
                    },
                  'details':
                    (item, index) => {
                      return (
                        <CCollapse show={this.state.details.includes(index)}>
                          <CCardBody style={{ display: (this.state.loading) ? "none" : "block" }}>
                            <CCol xs="12" style={{ textAlign: 'center' }}>
                              <CImg src={(item.picture) ? item.picture : "avatar.png"}
                                width="120" height="120"
                                shape="rounded-circle"
                                className="profile-photo"
                              />
                            </CCol>


                            <CCol xs="12" style={{ textAlign: 'center', margin: '6px 0' }}>
                              <strong style={{ fontSize: 'x-large' }}> {item.firstName} {item.lastName}</strong>
                            </CCol>

                            <div style={{ width: "100%" }}>
                              <hr></hr>
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
                                <span><strong>Trainings:</strong></span> {
                                  (item.trainings) ? item.trainings.map((training, index) => (index ? ', ' : ' ') + training) : ""}
                              </CCol>

                              <CCol style={{ padding: "10px" }}>
                                <span><strong>About:</strong></span> {item.bio}
                              </CCol>

                              <CCol style={{ padding: "10px" }}>
                                <span><strong>Member since:</strong></span> {item.createdAt}
                              </CCol>

                              <div style={{ width: "100%" }}>
                                <hr></hr>
                              </div>

                              <CCol style={{ paddingRight: "0", textAlign: "center" }}>
                                <CButton
                                  style={{ margin: '5px', color: "#e55353" }}
                                  size="sm"
                                  variant="outline"
                                  onClick={() => {
                                    this.removeUser(item.email)
                                  }}

                                >Delete <CIcon content={cilTrash} /></CButton>

                                <CButton
                                  style={{ margin: '5px' }}
                                  size="sm"
                                  color="dark"
                                  variant="outline"
                                  onClick={() => { this.toggleDetails(index) }}

                                >Hide <CIcon content={cilEyeSlash} /> </CButton>
                              </CCol>
                            </div>
                          </CCardBody>
                        </CCollapse>
                      )
                    },
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
                        <td className="py-2" style={{ verticalAlign: 'bottom' }}>
                          <Switch checked={item.status} onChange={() => this.handleChangeVisibility(item, firebaseDB)} />
                        </td>
                      )
                    },
                  'remove':
                    (item, index) => {
                      return (
                        <td className="py-2">
                          <CButton
                            size="sm"
                            style={{ color: "#e55353" }}
                            variant="outline"
                            onClick={() => {
                              this.removeUser(item.email)
                            }}

                          ><CIcon content={cilTrash} /></CButton>
                        </td>
                      )
                    },

                }}
              />
            )} />

          </CCardBody>
        </CCard>
      </CCol >
    )
  }
}
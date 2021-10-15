import React from 'react'
import CIcon from '@coreui/icons-react';
import Swal from 'sweetalert2';
import { Route } from 'react-router';

// Firebase
import { collection, getDocs, setDoc, doc, deleteDoc } from 'firebase/firestore';
import { firebaseDB } from 'src/reusable/firebaseConfig';

import LinesEllipsis from 'react-lines-ellipsis'
import { cilTrash } from '@coreui/icons';
import { CCardBody, CButton, CDataTable, CCol, CCard, CCardHeader, CBadge, CCardFooter, CRow, CInput } from '@coreui/react'
import { EditBtn, RemoveBtn, getStatusBadge, FormatTimestamp } from 'src/reusable/reusables';
import { v4 as uuidv4 } from 'uuid';
import { cilEye, cilEyeSlash } from '@coreui/icons-pro';

const adminFields = [
  { key: 'email', _style: { width: '10%' }, label: 'Email' },
  { key: 'remove', label: '', _style: { width: '0%' }, sorter: false, filter: false },
]

const postFields = [
  { key: 'username' },
  { key: 'content', _style: { width: '50%' } },
  { key: 'createdOn', label: "Created on" },
  { key: 'status', _style: { width: '10%' } },
  { key: 'visibility', label: '', _style: { width: '0%' }, sorter: false, filter: false },
  { key: 'edit', label: '', _style: { width: '0%' }, sorter: false, filter: false },
  { key: 'remove', label: '', _style: { width: '0%' }, sorter: false, filter: false },
]



class Settings extends React.Component {
  constructor(props) {
    super(props);

    // Common state
    this.state = {
      admins: [],
      newAdminEmail: "",
      loading: false,
    };

    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.removeAdmin = this.removeAdmin.bind(this);
    this.assignAdmin = this.assignAdmin.bind(this);

  }


  handleChangeEmail(event) {
    this.setState({ newAdminEmail: event.target.value });
  }

  assignAdmin(event) {
    var autoID = uuidv4();
    console.log(autoID);

    let isAdmin = false;
    this.state.admins.forEach(admin => {
      if (admin.email === this.state.newAdminEmail) {
        alert('Admin ' + this.state.newAdminEmail + ' already exists!');
        isAdmin = true;
      }
    })

    if (this.state.newAdminEmail === '') {
      alert('Enter new admin`s email!');
    }

    if (!isAdmin && this.state.newAdminEmail) {

      const setAdmin = async (db) => {
        await setDoc(doc(db, "admins", autoID), {
          id: autoID,
          email: this.state.newAdminEmail,
        });
        event.preventDefault();
      }
      setAdmin(firebaseDB);
      this.componentDidMount();
      this.setState({ newAdminEmail: "" })
    }
  }

  removeAdmin(id, email) {
    if (!email) {
      email = "this";
    }
    Swal.fire({

      text: 'Delete '.concat(email).concat(' from admin? '),
      showCancelButton: true,
      icon: 'error',
      iconColor: '#e55353',
      confirmButtonText: `Yes, delete it!`,
      confirmButtonColor: '#e55353'
    }).then((result) => {
      if (result.isConfirmed) {


        const deleteAdmin = async (db) => {
          await deleteDoc(doc(db, "admins", id));
        }

        deleteAdmin(firebaseDB);

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
      }
    })
  }

  getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  componentDidMount() {
    this.setState({ loading: true })

    const getAdmins = async (db) => {
      const adminCol = collection(db, 'admins');
      const adminSnapshot = await getDocs(adminCol);
      const adminList = adminSnapshot.docs.map(doc => doc.data());
      this.setState({ admins: adminList });

      this.setState({ loading: false })

      this.setState({ loading: true })

      const getPosts = async (db) => {
        const postCol = collection(db, 'posts');
        const postSnapshot = await getDocs(postCol);
        const postList = postSnapshot.docs.map(doc => doc.data());
        this.setState({ posts: postList });

        this.setState({ loading: false })
      };

      getPosts(firebaseDB);
    };

    getAdmins(firebaseDB);
  }

  render() {

    if (this.getCookie("admin")) {
      return (

        <CRow>

          <CCol xs={12}>
            <CCard>
              <CCardHeader>
                <h4 style={{ margin: '0' }}><strong>Posts</strong></h4>
              </CCardHeader>
              <CCardBody>
                <CDataTable
                  items={this.state.posts}
                  fields={postFields}
                  loading={this.state.loading}
                  columnFilter
                  tableFilter
                  cleaner
                  itemsPerPageSelect
                  itemsPerPage={5}
                  hover
                  sorter
                  pagination
                  clickableRows
                  // onRowClick={(item, index, col, e) => this.toggleDetails(item.id)}
                  // onPageChange={(val) => console.log('new page:', val)}
                  // onPagesChange={(val) => console.log('new pages:', val)}
                  // onPaginationChange={(val) => console.log('new pagination:', val)}
                  // onFilteredItemsChange={(val) => console.log('new filtered items:', val)}
                  // onSorterValueChange={(val) => console.log('new sorter value:', val)}
                  // onTableFilterChange={(val) => console.log('new table filter:', val)}
                  // onColumnFilterChange={(val) => console.log('new column filter:', val)}
                  scopedSlots={{
                    'content':
                      (item) => (
                        <td>
                          <LinesEllipsis
                            text={item.content}
                            maxLine='2'
                            ellipsis='...'
                            trimRight
                            basedOn='letters'
                          />
                        </td>
                      ),
                    'createdOn':
                      (item) => (
                        <td>
                          <FormatTimestamp seconds={(item.createdOn != null ? item.createdOn.seconds : "N/A")} />
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
                    'edit':
                      (item) => (
                        <td>
                          <EditBtn EditRoute="/customer-form" />
                        </td>
                      ),
                    'remove':
                      (item) => (
                        <td>
                          <RemoveBtn />
                        </td>
                      )
                  }}
                />
              </CCardBody>
              <CCardFooter style={{ textAlign: 'right' }}>
                <CButton color="primary">
                  Create Post
                </CButton>

              </CCardFooter>
            </CCard>
          </CCol>


          <CCol xs={12}>
            <CCard>
              <CCardHeader>
                <h4 style={{ margin: '0' }}><strong>Users</strong></h4>
              </CCardHeader>
              <CCardBody>

              </CCardBody>
              <CCardFooter style={{ textAlign: 'right' }}>
                <CButton color="primary">Create User
                </CButton>

              </CCardFooter>
            </CCard>
          </CCol>


          {/* Admins */}
          <CCol xs={12}>
            <CCard id="table">
              <CCardHeader>
                <h4 style={{ margin: '0' }}><strong>Admins</strong></h4>
              </CCardHeader>
              <CCardBody>
                <CDataTable
                  items={this.state.admins}
                  fields={adminFields}
                  loading={this.state.loading}
                  itemsPerPage={10}
                  striped
                  pagination
                  scopedSlots={{
                    'remove':
                      (item) => (
                        <td>
                          <CButton
                            size="sm"
                            color="danger"
                            variant="outline"
                            onClick={() => {
                              this.removeAdmin(item.id, item.email)
                            }}

                          ><CIcon content={cilTrash} /></CButton>
                        </td>
                      )
                  }}
                />
              </CCardBody>
              <CCardFooter style={{ textAlign: 'right' }}>


                <CRow>
                  <CCol xs="8">
                    <CInput type="email" placeholder="Enter new admin's email" value={this.state.newAdminEmail} onChange={this.handleChangeEmail} />
                  </CCol>

                  <CCol xs="4">
                    <CButton onClick={this.assignAdmin} color="primary">
                      Assign
                    </CButton>
                  </CCol>
                </CRow>



              </CCardFooter>
            </CCard>
          </CCol>

        </CRow >
      )
    } else {
      return (
        <Route render={({ history }) => (
          history.push("/")
        )} />
      )
    }
  }
}

export default Settings
import React from 'react'
import { CCardBody, CDataTable, CCol, CCard, CCardHeader, CInput, CCardFooter, CButton, CRow } from '@coreui/react'

// Firebase
import { collection, getDocs, setDoc, doc, deleteDoc } from 'firebase/firestore';
import { firebaseDB } from 'src/reusable/firebaseConfig';
import { cilTrash } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import Swal from 'sweetalert2';


const adminFields = [
  { key: 'email', _style: { width: '10%' }, label: 'Email' },
  { key: 'remove', label: '', _style: { width: '0%' }, sorter: false, filter: false },
]



export class AdminsTable extends React.Component {
  constructor(props) {
    super(props);

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
        await setDoc(doc(db, "admins", this.state.newAdminEmail), {
          email: this.state.newAdminEmail,
        });
        event.preventDefault();
      }
      setAdmin(firebaseDB);
      this.componentDidMount();
      this.setState({ newAdminEmail: "" })
    }
  }

  removeAdmin(email) {
    if (!email) {
      email = "this";
    }
    console.log(email);
    Swal.fire({

      text: 'Delete '.concat(email).concat(' from admin? '),
      showCancelButton: true,
      icon: 'error',
      iconColor: '#e55353',
      confirmButtonText: `Yes, delete it!`,
      confirmButtonColor: '#e55353'
    }).then((result) => {
      if (result.isConfirmed) {

        try {
          const deleteAdmin = async (db) => {
            await deleteDoc(doc(db, "admins", email));
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
        } catch (error) {
          console.log(error);
        }
      }
    })
  }

  componentDidMount() {
    this.setState({ loading: true })

    const getAdmins = async (db) => {
      const adminCol = collection(db, 'admins');
      const adminSnapshot = await getDocs(adminCol);
      const adminList = adminSnapshot.docs.map(doc => doc.data());
      this.setState({ admins: adminList });

      this.setState({ loading: false })
    };

    getAdmins(firebaseDB);
  }

  render() {
    return (

      <CCol xs="12">
        <CCard className="advanced-table">
          <CCardHeader>
            <h4 style={{ margin: '0' }}><strong>Admins</strong></h4>
          </CCardHeader>
          <CCardBody className="settings-table">
            <CDataTable
              className="advanced-table"
              items={this.state.admins}
              fields={adminFields}
              tableFilter={{ 'placeholder': 'Search by email...' }}
              cleaner
              itemsPerPage={10}
              sorter
              pagination
              loading={this.state.loading}
              scopedSlots={{
                'remove':
                  (item) => (
                    <td>
                      <CButton
                        size="sm"
                        color="danger"
                        variant="outline"
                        onClick={() => {
                          this.removeAdmin(item.email)
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
                <CInput type="email" placeholder="Enter new admin's email..." value={this.state.newAdminEmail} onChange={this.handleChangeEmail} />
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
    )
  }
}
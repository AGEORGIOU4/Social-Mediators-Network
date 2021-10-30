import React from 'react'
import CIcon from '@coreui/icons-react';
import Swal from 'sweetalert2';
import { Route } from 'react-router';

// Firebase
import { collection, getDocs, setDoc, doc, deleteDoc } from 'firebase/firestore';
import { firebaseDB } from 'src/reusable/firebaseConfig';

import LinesEllipsis from 'react-lines-ellipsis'
import { CCardBody, CButton, CDataTable, CCol, CCard, CCardHeader, CBadge, CCardFooter, CRow } from '@coreui/react'
import { EditBtn, RemoveBtn, getStatusBadge, FormatTimestamp } from 'src/reusable/reusables';
import { cilEye, cilEyeSlash } from '@coreui/icons-pro';
import { SocialMediatorsAdvancedTable } from 'src/reusable/Tables/SocialMediatorsAdvancedTable';
import { AdminsTable } from 'src/reusable/Tables/AdminsTable';

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

    this.state = {
      loading: false,
    };
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

    const getPosts = async (db) => {
      const postCol = collection(db, 'posts');
      const postSnapshot = await getDocs(postCol);
      const postList = postSnapshot.docs.map(doc => doc.data());
      this.setState({ posts: postList });

      this.setState({ loading: false })
    };
    getPosts(firebaseDB);
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

          <SocialMediatorsAdvancedTable />

          {/* Admins */}
          <AdminsTable />

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
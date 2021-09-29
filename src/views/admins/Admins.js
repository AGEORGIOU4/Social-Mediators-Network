import React from 'react'
import { CCardBody, CButton, CDataTable, CCol, CCard, CCardHeader, CCardFooter } from '@coreui/react'
import { EditBtn, RemoveBtn } from 'src/reusable/reusables';

// Firebase
import { collection, getDocs } from 'firebase/firestore';
import { firebaseDB } from 'src/reusable/firebaseConfig';

const adminFields = [
  { key: 'email', label: 'ID' },
  { key: 'edit', label: '', _style: { width: '0%' }, sorter: false, filter: false },
  { key: 'remove', label: '', _style: { width: '0%' }, sorter: false, filter: false },
]

class Admins extends React.Component {
  constructor(props) {
    super(props);

    // Common state
    this.state = {
      admins: [],
      loading: false,
    };
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
      <CCol >
        <CCard id="table">
          <CCardHeader>
            <h4 style={{ margin: '0' }}><strong>Admins</strong></h4>
          </CCardHeader>
          <CCardBody>
            <CDataTable
              items={this.state.admins}
              fields={adminFields}
              loading={this.state.loading}
              columnFilter
              tableFilter
              cleaner
              itemsPerPageSelect
              itemsPerPage={5}
              hover
              sorter
              pagination
              // loading
              onRowClick={(item, index, col, e) => this.toggleDetails(item.id)}
              // onPageChange={(val) => console.log('new page:', val)}
              // onPagesChange={(val) => console.log('new pages:', val)}
              // onPaginationChange={(val) => console.log('new pagination:', val)}
              // onFilteredItemsChange={(val) => console.log('new filtered items:', val)}
              // onSorterValueChange={(val) => console.log('new sorter value:', val)}
              // onTableFilterChange={(val) => console.log('new table filter:', val)}
              // onColumnFilterChange={(val) => console.log('new column filter:', val)}
              scopedSlots={{
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
              Add Admin
            </CButton>

          </CCardFooter>
        </CCard>
      </CCol>
    )
  }
}

export default Admins
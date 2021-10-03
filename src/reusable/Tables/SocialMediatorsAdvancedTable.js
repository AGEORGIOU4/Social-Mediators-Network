import React from 'react'
import { CCardBody, CDataTable, CCol, CCard, CCardHeader, CCardFooter, CImg } from '@coreui/react'

// Firebase
import { collection, getDocs } from 'firebase/firestore';
import { firebaseDB } from 'src/reusable/firebaseConfig';
import { ViewBtn } from '../reusables';

export const socialMediatorFields = [
  { key: 'picture', label: "", sorter: false, filter: false },
  { key: 'firstName' },
  { key: 'lastName' },
  { key: 'description', label: "About" },
  { key: 'interests' },
  { key: 'view', label: "", sorter: false, filter: false },
]

export class SocialMediatorsAdvancedTable extends React.Component {
  constructor(props) {
    super(props);

    // Common state
    this.state = {
      users: [],
      loading: false,
    };
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
      <CCol >
        <CCard id="table">
          <CCardHeader>
            <h4 style={{ margin: '0' }}><strong>Meet the Social Mediators</strong></h4>
          </CCardHeader>
          <CCardBody>
            <CDataTable
              items={this.state.users}
              fields={socialMediatorFields}
              loading={this.state.loading}
              tableFilter

              cleaner
              striped
              itemsPerPage={10}
              hover
              sorter
              pagination
              // loading
              onRowClick={(item, index, col, e) => console.log(item, index, col, e)}
              // onPageChange={(val) => console.log('new page:', val)}
              // onPagesChange={(val) => console.log('new pages:', val)}
              // onPaginationChange={(val) => console.log('new pagination:', val)}
              // onFilteredItemsChange={(val) => console.log('new filtered items:', val)}
              // onSorterValueChange={(val) => console.log('new sorter value:', val)}
              // onTableFilterChange={(val) => console.log('new table filter:', val)}
              // onColumnFilterChange={(val) => console.log('new column filter:', val)}
              scopedSlots={{
                'picture':
                  (item) => (
                    <td>
                      <CImg src={(item.picture !== "") ? item.picture : "avatar.png"}
                        width="40" height="40"
                        shape="rounded-circle" />
                    </td>
                  ),
                'view':
                  (item) => (
                    <td>
                      <ViewBtn />
                    </td>
                  ),

              }}
            />
          </CCardBody>
          <CCardFooter style={{ textAlign: 'right' }}>

          </CCardFooter>
        </CCard>
      </CCol>
    )
  }
}
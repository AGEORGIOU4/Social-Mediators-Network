import React from 'react'
import { CDataTable, CCol, CCard, CImg, CCardBody } from '@coreui/react'

// Firebase
import { collection, getDocs } from 'firebase/firestore';
import { firebaseDB } from 'src/reusable/firebaseConfig';

export const socialMediatorFields = [
  { key: 'picture', label: "", sorter: false, filter: false },
  { key: 'email' }
]

export class SocialMediatorsBasicTable extends React.Component {
  constructor(props) {
    super(props);

    // Common state
    this.state = {
      users: [],
      details: [],
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
        <CCard>
          <CCardBody style={{ padding: '2rem' }}>
            <CDataTable
              items={this.state.users}
              fields={socialMediatorFields}
              loading={this.state.loading}
              clickableRows
              onRowClick={(item, index, col, e) => console.log(item, index, col, e)}
              hover
              striped
              bordered
              tableFilter
              header={false}
              size="sm"
              itemsPerPageSelect
              itemsPerPage={10}
              pagination
              scopedSlots={{
                'picture':
                  (item) => (
                    <td>
                      <CImg src={(item.picture) ? item.picture : "avatar.png"}
                        width="40" height="40"
                        shape="rounded-circle" />
                    </td>
                  )
              }}
            />
          </CCardBody>
        </CCard>
      </CCol>

    )
  }
}
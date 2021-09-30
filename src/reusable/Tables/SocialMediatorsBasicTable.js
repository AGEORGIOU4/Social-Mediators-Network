import React from 'react'
import { CCardBody, CDataTable, CCol, CCard, CImg } from '@coreui/react'

// Firebase
import { collection, getDocs } from 'firebase/firestore';
import { firebaseDB } from 'src/reusable/firebaseConfig';

import { ViewBtn } from '../reusables';

export const socialMediatorFields = [
  { key: 'photo', label: "", sorter: false, filter: false },
  { key: 'firstName', label: "Name" },
  { key: 'lastName', label: "Surname" },
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
          <CDataTable
            items={this.state.users}
            fields={socialMediatorFields}
            loading={this.state.loading}
            clickableRows
            onRowClick={(item, index, col, e) => console.log(item, index, col, e)}
            hover
            striped
            bordered
            header={false}
            size="sm"
            itemsPerPage={10}
            pagination
            scopedSlots={{
              'photo':
                (item) => (
                  <td>
                    <CImg src={item.photo}
                      width="40" height="40"
                      shape="rounded-circle" />
                  </td>
                )
            }}
          />
        </CCard>
      </CCol>

    )
  }
}
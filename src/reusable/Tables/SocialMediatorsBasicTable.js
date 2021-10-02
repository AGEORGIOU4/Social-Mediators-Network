import React from 'react'
import { CDataTable, CCol, CCard, CCardHeader, CImg, CCardBody, CBadge } from '@coreui/react'

// Firebase
import { collection, getDocs } from 'firebase/firestore';
import { firebaseDB } from 'src/reusable/firebaseConfig';

import { CButton } from '@coreui/react';
import LinesEllipsis from 'react-lines-ellipsis';
import { getInterestsBadge } from '../reusables';
export const socialMediatorFields = [
  { key: 'firstName', label: "", sorter: false, filter: false },
  { key: 'card', label: "", sorter: false, filter: false },
  { key: 'interests', label: "", sorter: false, filter: false },
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
        {/* <CCard>
          <CCardBody> */}
        <CDataTable
          items={this.state.users}
          fields={socialMediatorFields}
          loading={this.state.loading}
          onRowClick={(item, index, col, e) => console.log(item, index, col, e)}
          hover
          tableFilter
          size="sm"
          itemsPerPage={5}
          pagination
          scopedSlots={{
            // 'picture':
            //   (item) => (
            //     <td>
            //       <CImg src={(item.picture) ? item.picture : "avatar.png"}
            //         width="40" height="40"
            //         shape="rounded-circle" />
            //     </td>
            //   ),
            'firstName':
              (item) => (
                <td style={{ display: "none" }}>

                </td>
              ),
            'card':
              (item) => (

                <CCol xs="12" style={{ marginTop: "20px" }}>
                  <CCard style={{ padding: "0" }}>
                    <CCardHeader>
                      <CImg src={(item.picture) ? item.picture : "avatar.png"}
                        width="40" height="40"
                        shape="rounded-circle" />

                      <strong> {item.nickname}</strong>
                    </CCardHeader>
                    <CCardBody>
                      <LinesEllipsis
                        text='Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
              laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
              ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.'
                        maxLine='2'
                        ellipsis='...'
                        trimRight
                        basedOn='letters'
                      />

                      {/* <div style={{ textAlign: 'end', marginTop: '15px' }}>
                        <CImg src={(item.picture) ? item.picture : "avatar.png"}
                          width="40" height="40"
                          shape="rounded-circle" />
                      </div> */}
                    </CCardBody>

                  </CCard>
                </CCol>

              ),
            'interests':
              (item) => (
                <td
                  style={{ display: "none" }}>

                </td>
              ),
          }}
        />
        {/* </CCardBody>
        </CCard> */}
      </CCol>

    )
  }
}
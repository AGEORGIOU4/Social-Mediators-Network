import React from 'react'
import { CCardBody, CDataTable, CCol, CCard, CCardHeader, CCardFooter, CImg } from '@coreui/react'

// Firebase
import { collection, getDocs } from 'firebase/firestore';
import { firebaseDB } from 'src/reusable/firebaseConfig';
import { ViewBtn } from '../reusables';
import LinesEllipsis from 'react-lines-ellipsis'
import { Route } from 'react-router';

export const socialMediatorFields = [
  { key: 'picture', label: "", sorter: false, filter: false },
  { key: 'firstName' },
  { key: 'lastName' },
  { key: 'nickname', label: "Username" },
  { key: 'bio', label: "About" },
  { key: 'qualifications' },
  { key: 'areaOfInterest' },
  { key: 'view', label: "", sorter: false, filter: false },
]

export class SocialMediatorsAdvancedTable extends React.Component {
  constructor(props) {
    super(props);

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

            <Route render={({ history }) => (

              <CDataTable
                items={this.state.users}
                fields={socialMediatorFields}
                loading={this.state.loading}
                tableFilter
                clickableRows
                cleaner
                striped
                itemsPerPage={10}
                hover
                sorter
                pagination
                loading={this.state.loading}
                onRowClick={(item, index, col, e) => {
                  history.push({
                    pathname: "/users-profile",
                    state: item
                  })
                }}
                scopedSlots={{
                  'picture':
                    (item) => (
                      <td>
                        <CImg src={(item.picture !== "") ? item.picture : "avatar.png"}
                          width="40" height="40"
                          shape="rounded-circle" />
                      </td>
                    ),
                  'bio':
                    (item) => (
                      <td>
                        <LinesEllipsis
                          text={item.bio}
                          maxLine='2'
                          ellipsis='...'
                          trimRight
                          basedOn='letters'
                        />
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
            )} />

          </CCardBody>
          <CCardFooter style={{ textAlign: 'right' }}>

          </CCardFooter>
        </CCard>
      </CCol>
    )
  }
}
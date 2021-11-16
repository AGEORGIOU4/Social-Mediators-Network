import React from 'react'
import { CDataTable, CCol, CCard, CImg, CCardBody, CBadge, CRow, CSpinner } from '@coreui/react'
import { Route } from 'react-router';

// Firebase
import { collection, getDocs } from 'firebase/firestore';
import { firebaseDB } from 'src/reusable/firebaseConfig';
import LinesEllipsis from 'react-lines-ellipsis';
import { getInterestsBadge } from 'src/reusable/reusables';
import CIcon from '@coreui/icons-react';
import { cilMail } from '@coreui/icons-pro';

export const socialMediatorFields = [
  { key: 'card', label: "", sorter: false, filter: false },
  { key: 'email', label: "", sorter: false, filter: false },
  { key: 'firstName', label: "", sorter: false, filter: false },
  { key: 'lastName', label: "", sorter: false, filter: false },
  { key: 'nickname', label: "", sorter: false, filter: false },
  { key: 'trainings', label: "", sorter: false, filter: false },
  { key: 'qualifications', label: "", sorter: false, filter: false },
  { key: 'areaOfInterest', label: "", sorter: false, filter: false },
]

export class SocialMediatorsBasicTable extends React.Component {
  constructor(props) {
    super(props);

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

      var visibleUsers = [];

      usersList.forEach(user => {
        if (user.status === true) {
          visibleUsers.push(user);
        }
      });

      this.setState({ users: visibleUsers });

      this.setState({ loading: false })
    };

    getUsers(firebaseDB);
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

  render() {
    return (

      <CRow className="basic-table">
        <CCol xs="12" style={{ textAlign: 'center' }}>
          <h2 style={{ margin: '20px 5px 30px' }}><strong>Social Mediators</strong></h2>
        </CCol>

        <CCol xs="12" style={{ display: (this.state.loading) ? "none" : "block" }}>
          <Route render={({ history }) => (
            <CDataTable
              items={this.state.users}
              fields={socialMediatorFields}
              loading={this.state.loading}
              header={false}
              tableFilter={{ 'placeholder': 'Search...' }}
              itemsPerPage={20}
              pagination
              clickableRows
              onRowClick={(item, index, col, e) => {
                if (this.getCookie("userEmail") === item.email) {

                  history.push("/profile")

                } else {
                  history.push({
                    pathname: "/users-profile",
                    state: item
                  })
                }
              }
              }
              scopedSlots={{
                'card':
                  (item) => (
                    <td>
                      <CCard style={{ padding: "0", margin: "0" }}>
                        <CCardBody>

                          <div style={{ width: '100%' }}>
                            <div style={{ width: "20%", float: 'left', marginLeft: '-6px', marginRight: '6px' }}>
                              <CImg src={(item.picture) ? item.picture : "avatar.png"}
                                width="50" height="50"
                                shape="rounded-circle" />
                            </div>

                            <div style={{ width: "70%", float: 'left' }}>
                              <strong style={{ fontSize: 'medium' }}> {item.firstName} {item.lastName}</strong>
                            </div>

                            <div style={{ width: "10%", float: 'left', textAlign: 'end', paddingRight: '0px' }}>
                              <a href={`mailto:${item.email}`}><CIcon content={cilMail} style={{ marginLeft: '4px' }} /></a>
                            </div>
                          </div>

                          <div style={{ width: "80%", float: 'left' }}>
                            <LinesEllipsis
                              text={item.bio}
                              maxLine='2'
                              ellipsis='...'
                              trimRight
                              basedOn='letters'
                              style={{ fontSize: 'small' }}
                            />
                          </div>



                          <CCol style={{ textAlign: 'end', paddingRight: '0' }}>
                            <CBadge color={getInterestsBadge(item.areaOfInterest)}>{item.areaOfInterest}</CBadge>
                          </CCol>


                        </CCardBody>
                      </CCard>
                    </td>
                  ),
                'email':
                  (item) => (
                    <td
                      style={{ display: "none" }}>
                    </td>
                  ),
                'firstName':
                  (item) => (
                    <td
                      style={{ display: "none" }}>
                    </td>
                  ),
                'lastName':
                  (item) => (
                    <td
                      style={{ display: "none" }}>
                    </td>
                  ),
                'nickname':
                  (item) => (
                    <td
                      style={{ display: "none" }}>
                    </td>
                  ),
                'trainings':
                  (item) => (
                    <td
                      style={{ display: "none" }}>
                    </td>
                  ),
                'qualifications':
                  (item) => (
                    <td
                      style={{ display: "none" }}>
                    </td>
                  ),
                'areaOfInterest':
                  (item) => (
                    <td
                      style={{ display: "none" }}>
                    </td>
                  ),
              }
              }
            />
          )} />
        </CCol>

        <CCol xs="12" style={{ textAlign: 'center', display: (this.state.loading) ? "block" : "none" }}>
          <CSpinner color='primary' grow />
        </CCol>

      </CRow >

    )
  }
}
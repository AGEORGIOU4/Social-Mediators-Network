import React from 'react'
import { CDataTable, CCol, CCard, CCardHeader, CImg, CCardBody, CButton, CBadge } from '@coreui/react'
import { Route } from 'react-router';

// Firebase
import { collection, getDocs } from 'firebase/firestore';
import { firebaseDB } from 'src/reusable/firebaseConfig';
import LinesEllipsis from 'react-lines-ellipsis';
import CIcon from '@coreui/icons-react';
import { cilMail } from '@coreui/icons-pro';
import { getInterestsBadge } from '../reusables';

export const socialMediatorFields = [
  { key: 'firstName', label: "", sorter: false, filter: false },
  { key: 'card', label: "", sorter: false, filter: false },
  { key: 'areaOfInterest', label: "", sorter: false, filter: false },
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
                clickableRows
                header={false}
                tableFilter={{ 'placeholder': 'Search by name or interest...' }}
                size="sm"
                itemsPerPage={5}
                pagination
                scopedSlots={{
                  'card':
                    (item) => (
                      <td>
                        <CCard style={{ padding: "0" }}>
                          <CCardHeader>
                            <div style={{ width: "80%", float: "left" }}>
                              <CImg src={(item.picture) ? item.picture : "avatar.png"}
                                width="40" height="40"
                                shape="rounded-circle" />

                              <strong> {item.nickname}</strong>
                            </div>
                            <div style={{ width: "20%", float: "left", textAlign: "end" }}>
                              <CButton shape="pill" color="dark" size="md"><CIcon content={cilMail} /><a target="_blank" rel="noopener noreferrer" href={`mailto:${item.email}`}></a></CButton>
                            </div>

                          </CCardHeader>
                          <CCardBody>
                            <LinesEllipsis
                              text={item.bio}
                              maxLine='2'
                              ellipsis='...'
                              trimRight
                              basedOn='letters'
                            />

                            <CCol style={{ textAlign: 'end' }}>
                              <CBadge color={getInterestsBadge(item.areaOfInterest)}>{item.areaOfInterest}</CBadge>
                            </CCol>
                          </CCardBody>
                        </CCard>
                      </td>
                    ),
                  'firstName':
                    (item) => (
                      <td style={{ display: "none" }}>

                      </td>
                    ),
                  'areaOfInterest':
                    (item) => (
                      <td
                        style={{ display: "none" }}>

                      </td>
                    ),
                }}
              />
            )} />
          </CCardBody>
        </CCard>
      </CCol>

    )
  }
}
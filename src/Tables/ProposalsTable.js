import React from 'react'
import { CCardBody, CDataTable, CCol, CCard, CRow, CSpinner, CLink } from '@coreui/react'

// Firebase
import { collection, getDocs } from 'firebase/firestore';
import { firebaseDB } from 'src/reusable/firebaseConfig';
import { CImg } from '@coreui/react';
import { Route } from 'react-router';
import { FormatTimestamp } from 'src/reusable/reusables';

const proposalFields = [
  { key: 'card', label: "", sorter: false, filter: false },
  { key: 'author' },
  { key: 'title' },
  { key: 'description' },
  { key: 'createdAt' },
]

export class ProposalsTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      proposals: [],
      proposalID: "",
      loading: false,
    };
  }

  componentDidMount() {
    this.setState({ loading: true })

    const getProposals = async (db) => {
      const proposalCol = collection(db, 'proposals/')
      const proposalSnapshot = await getDocs(proposalCol);
      const proposalsList = proposalSnapshot.docs.map(doc => doc.data());

      var visibleProposals = [];

      proposalsList.forEach(proposal => {
        if (proposal.status === true) {
          visibleProposals.push(proposal);
        }
      });

      this.setState({ proposals: visibleProposals });

      this.setState({ loading: false });
    };
    getProposals(firebaseDB);
  }

  render() {
    return (

      <CRow className="basic-table proposals-table">
        {/* <CCol xs="12" style={{ textAlign: 'center' }}>
          <h2 style={{ margin: '20px 5px 30px' }}><strong>Proposals</strong></h2>
        </CCol> */}


        <CCol xs="12" style={{ display: (this.state.loading) ? "none" : "block", padding: "0" }}>
          <Route render={({ history }) => (
            <CDataTable
              items={this.state.proposals}
              fields={proposalFields}
              loading={this.state.loading}
              header={false}
              tableFilter={{ 'placeholder': 'Search a proposal...' }}
              itemsPerPage={20}
              pagination
              sorter
              sorterValue={{ column: "createdAt", asc: false }}
              clickableRows
              onRowClick={(item, index, col, e) => {
                history.push({
                  pathname: "/proposal",
                  state: item
                })
              }
              }
              scopedSlots={{
                'card':
                  (item, index) => (
                    <td>
                      <CCard className="proposals-card" style={{ padding: "0", margin: "0" }}>
                        <CCardBody>
                          <div>
                            <div style={{ width: '100%' }}>
                              <div style={{ width: "20%", float: 'left', textAlign: "center", marginLeft: '-6px', marginRight: '6px' }}>
                                <CImg src={(item.picture) ? item.picture : "avatar.png"}
                                  width="44" height="44"
                                  shape="rounded-circle" />
                              </div>

                              <div style={{ width: "80%", float: 'left' }}>
                                <strong style={{ fontSize: 'medium' }}> {item.author}</strong>
                              </div>
                            </div>

                            <div style={{ width: "80%" }}>
                              <p style={{ color: "#00000066", fontSize: 'small', marginBottom: '4px' }}>{<FormatTimestamp seconds={item.createdAt.seconds} />}</p>
                            </div>

                            <div style={{ width: "100%" }}>
                              <hr></hr>
                            </div>

                            <div style={{ width: "100%" }}>
                              <h3 style={{ fontWeight: '900' }}>{item.title}</h3>
                            </div>
                            <div style={{ width: "100%" }}>
                              <p >{item.description}</p>
                            </div>

                            <div style={{ width: "100%", textAlign: "end" }}>
                              <CLink style={{ fontSize: 'smaller', marginBottom: '4px' }}>{(item.totalEnabledComments > 0) ? item.totalEnabledComments : 0} comments</CLink>
                            </div>

                            <div style={{ width: "100%" }}>
                              <hr></hr>
                            </div>

                          </div>

                        </CCardBody>
                      </CCard>
                    </td>
                  ),
                'author':
                  (item) => (
                    <td
                      style={{ display: "none" }}>
                    </td>
                  ),
                'title':
                  (item) => (
                    <td
                      style={{ display: "none" }}>
                    </td>
                  ),
                'description':
                  (item) => (
                    <td
                      style={{ display: "none" }}>
                    </td>
                  ),
                'createdAt':
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
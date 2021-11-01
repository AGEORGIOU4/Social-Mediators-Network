import React from 'react'
import { CCardBody, CDataTable, CCol, CCard, CCardHeader, CInput, CCardFooter, CButton, CRow } from '@coreui/react'

// Firebase
import { collection, getDocs, setDoc, doc, deleteDoc } from 'firebase/firestore';
import { firebaseDB } from 'src/reusable/firebaseConfig';
import { cilTrash } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import Swal from 'sweetalert2';


const proposalFields = [
  { key: 'proposalID', _style: { width: '10%' }, label: 'ID' },
  { key: 'author' },
  { key: 'title' },
  { key: 'comments' },
  { key: 'remove', label: '', _style: { width: '0%' }, sorter: false, filter: false },
]



export class ProposalsTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      proposals: [],
      loading: false,
    };

  }

  componentDidMount() {
    this.setState({ loading: true })

    const getProposals = async (db) => {
      const proposalCol = collection(db, 'proposals/tC3wGwj0Joi3sSgGihj2/comments')
      const proposalSnapshot = await getDocs(proposalCol);
      const proposalList = proposalSnapshot.docs.map(doc => doc.data());
      this.setState({ proposals: proposalList });
      this.setState({ loading: false })
      console.log(this.state.proposals[0].commentID)
    };

    getProposals(firebaseDB);
  }

  render() {
    return (

      <CCol xs="12">
        <CCard className="advanced-table">
          <CCardHeader>
            <h4 style={{ margin: '0' }}><strong>Proposals</strong></h4>
          </CCardHeader>
          <CCardBody>
            <CDataTable
              className="advanced-table"
              items={this.state.proposals}
              fields={proposalFields}
              tableFilter={{ 'placeholder': 'Search by email...' }}
              cleaner
              itemsPerPage={10}
              sorter
              pagination
              loading={this.state.loading}
              scopedSlots={{
                'remove':
                  (item) => (
                    <td>
                      <CButton
                        size="sm"
                        color="danger"
                        variant="outline"
                        onClick={() => {
                          // this.removeAdmin(item.email)
                        }}

                      ><CIcon content={cilTrash} /></CButton>
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
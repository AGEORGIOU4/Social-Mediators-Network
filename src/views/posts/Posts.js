import React from 'react'
import { CCardBody, CButton, CDataTable, CCol, CCard, CCardHeader, CBadge, CCardFooter } from '@coreui/react'
import { getBadge, EditBtn, RemoveBtn } from 'src/reusable/reusables';
import { v4 as uuidv4 } from 'uuid';

// Firebase
import { collection, getDocs } from 'firebase/firestore';
import { firebaseDB } from 'src/reusable/firebaseConfig';

const postFields = [
  { key: 'id', label: 'ID' },
  { key: 'username' },
  { key: 'photo' },
  { key: 'content' },
  { key: 'createdOn', label: "Created on", _style: { width: '10%' } },
  { key: 'status', label: "Created on", _style: { width: '10%' } },
  { key: 'edit', label: '', _style: { width: '0%' }, sorter: false, filter: false },
  { key: 'remove', label: '', _style: { width: '0%' }, sorter: false, filter: false },
]

class Posts extends React.Component {
  constructor(props) {
    super(props);

    // Common state
    this.state = {
      posts: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.setState({ loading: true })

    const getPosts = async (db) => {
      const postCol = collection(db, 'posts');
      const postSnapshot = await getDocs(postCol);
      const postList = postSnapshot.docs.map(doc => doc.data());
      this.setState({ posts: postList });

      var autoID = uuidv4();
      console.log(autoID);

      this.setState({ loading: false })
    };

    getPosts(firebaseDB);
  }

  toggleDetails(index) {
    const position = this.state.details.indexOf(index)

    let newDetails = this.state.details.slice()
    if (position !== -1) {
      newDetails.splice(position, 1)
    } else {
      newDetails = [...this.state.details, index]
    }
    this.setState({ details: newDetails })
  }

  render() {
    return (
      <CCol >
        <CCard id="table">
          <CCardHeader>
            <h4 style={{ margin: '0' }}><strong>Posts</strong></h4>
          </CCardHeader>
          <CCardBody>
            <CDataTable
              items={this.state.posts}
              fields={postFields}
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
                'status':
                  (item) => (
                    <td>
                      <CBadge color={getBadge(item.status)}>
                        {item.status}
                      </CBadge>
                    </td>
                  ),
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
              Create Post
            </CButton>

          </CCardFooter>
        </CCard>
      </CCol>
    )
  }
}

export default Posts
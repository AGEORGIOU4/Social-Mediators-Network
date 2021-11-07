import React from 'react'
import CIcon from '@coreui/icons-react';
import { Route } from 'react-router';

// Firebase
import { collection, getDocs } from 'firebase/firestore';
import { firebaseDB } from 'src/reusable/firebaseConfig';

import LinesEllipsis from 'react-lines-ellipsis'
import { CCardBody, CButton, CDataTable, CCol, CCard, CCardHeader, CBadge, CCardFooter, CRow } from '@coreui/react'
import { EditBtn, RemoveBtn, getStatusBadge, FormatTimestamp } from 'src/reusable/reusables';
import { cilEye, cilEyeSlash } from '@coreui/icons-pro';
import { SocialMediatorsAdvancedTable } from 'src/Tables/SocialMediatorsAdvancedTable';
import { AdminsTable } from 'src/Tables/AdminsTable';
import ProposalsTableAdmin from 'src/Tables/ProposalsTableAdmin';

const postFields = [
  { key: 'username' },
  { key: 'content', _style: { width: '50%' } },
  { key: 'createdOn', label: "Created on" },
  { key: 'status', _style: { width: '10%' } },
  { key: 'visibility', label: '', _style: { width: '0%' }, sorter: false, filter: false },
  { key: 'edit', label: '', _style: { width: '0%' }, sorter: false, filter: false },
  { key: 'remove', label: '', _style: { width: '0%' }, sorter: false, filter: false },
]

class Settings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };
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

  componentDidMount() {
    this.setState({ loading: true })

    const getPosts = async (db) => {
      const postCol = collection(db, 'posts');
      const postSnapshot = await getDocs(postCol);
      const postList = postSnapshot.docs.map(doc => doc.data());
      this.setState({ posts: postList });

      this.setState({ loading: false })
    };
    getPosts(firebaseDB);
  }

  render() {

    if (this.getCookie("admin")) {
      return (

        <CRow>

          <AdminsTable />
          <SocialMediatorsAdvancedTable />
          <ProposalsTableAdmin />

        </CRow >
      )
    } else {
      return (
        <Route render={({ history }) => (
          history.push("/")
        )} />
      )
    }
  }
}

export default Settings
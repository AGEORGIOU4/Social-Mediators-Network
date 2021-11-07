import React from 'react'
import { Route } from 'react-router';

// Firebase
import { collection, getDocs } from 'firebase/firestore';
import { firebaseDB } from 'src/reusable/firebaseConfig';

import { CRow } from '@coreui/react'

import { SocialMediatorsAdvancedTable } from 'src/Tables/SocialMediatorsAdvancedTable';
import { AdminsTable } from 'src/Tables/AdminsTable';
import ProposalsTableAdmin from 'src/Tables/ProposalsTableAdmin';

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
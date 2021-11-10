import React from 'react'
import { ProposalsTable } from 'src/Tables/ProposalsTable'
import { CCol } from '@coreui/react';
import { SwalMixing } from 'src/reusable/SwalMixin';
import { useAuth0 } from "@auth0/auth0-react";
import { LoginCard } from 'src/containers/common';
import { getCookie } from 'src/reusable/reusables';
const Blog = () => {
  const { isAuthenticated } = useAuth0();

  if (isAuthenticated) {
    return (
      <ProposalsTable />
    )
  } else if (!getCookie("session")) {
    SwalMixing("warning", "Only members can view Blog")
    return (
      <CCol>
        <LoginCard />
      </CCol>
    )
  } else {
    <CCol>
      <LoginCard />
    </CCol>
  }
}

export default Blog

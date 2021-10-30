import React from 'react'

import { Route } from 'react-router';
import { Button } from 'react-floating-action-button'
import { cilNote } from '@coreui/icons-pro';
import CIcon from '@coreui/icons-react';

const TheFloatingButton = () => {
  return (


    <div className="custom-fab-container">
      <Route render={({ history }) => (
        <Button
          tooltip="Post a proposal"
          rotate={true}
          onClick={() => { history.push("/blog") }} >
          <CIcon content={cilNote} />
        </Button>)} />
    </div>

  )
}

export default TheFloatingButton

import React from 'react'
import {
  CBreadcrumbRouter, CSubheader,
} from '@coreui/react'

import routes from '../routes'


const TheSubHeader = () => {
  return (
    <CSubheader className="px-3 justify-content-between custom-sub-header" style={{ position: "initial" }}>
      <CBreadcrumbRouter className="border-0 c-subheader-nav m-0 px-0 px-md-3" routes={routes} />
    </CSubheader>
  )
}

export default TheSubHeader

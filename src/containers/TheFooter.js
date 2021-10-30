import React from 'react'
import { CFooter } from '@coreui/react'

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div style={{ marginRight: "3.5rem", marginTop: "3px" }}>
        Copyright © 2021 ICLAIM | All Rights Reserved |
        <span className="mr-1"> Powered by</span>
        <a href="https://www.uclancyprus.ac.cy/research/research-centres/inspire/" target="_blank" rel="noopener noreferrer">InSPIRE Lab</a>
      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter)

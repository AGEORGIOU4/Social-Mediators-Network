import React from 'react'
import { CFooter, CLink } from '@coreui/react'

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div>
        <CLink href="https://https://www.iclaimcentre.org/" target="_blank">
          ICLAIM Centre
        </CLink>
      </div>
      <div className="mfs-auto">
        <span className="mr-1">Powered by</span>
        <a href="https://www.uclancyprus.ac.cy/research/research-centres/inspire/" target="_blank" rel="noopener noreferrer">InSPIRE Lab</a>
      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter)

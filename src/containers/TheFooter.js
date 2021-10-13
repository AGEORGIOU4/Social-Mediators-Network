import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CFooter, CToggler } from '@coreui/react'

import CIcon from '@coreui/icons-react'

const TheFooter = () => {
  const dispatch = useDispatch()
  const darkMode = useSelector(state => state.darkMode)

  return (
    <CFooter fixed={false}>
      <div style={{ marginRight: "3.5rem" }}>

        Copyright © 2021 ICLAIM | All Rights Reserved |


        <span className="mr-1"> Powered by</span>
        <a href="https://www.uclancyprus.ac.cy/research/research-centres/inspire/" target="_blank" rel="noopener noreferrer">InSPIRE Lab</a>
      </div>

      <div style={{ position: "absolute", right: 0 }}>

        <CToggler
          inHeader
          className="ml-3 c-d-legacy-none"
          onClick={() => dispatch({ type: 'set', darkMode: !darkMode })}
          title="Toggle Light/Dark Mode"
        >
          <CIcon name="cil-moon" className="c-d-dark-none" alt="CoreUI Icons Moon" />
          <CIcon name="cil-sun" className="c-d-default-none" alt="CoreUI Icons Sun" />
        </CToggler>

      </div>

    </CFooter>
  )
}

export default React.memo(TheFooter)

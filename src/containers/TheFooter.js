import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CFooter, CToggler } from '@coreui/react'
import CIcon from '@coreui/icons-react'

const TheFooter = () => {
  const dispatch = useDispatch()
  const darkMode = useSelector(state => state.darkMode)

  return (
    <CFooter fixed={false}>
      <div>

        Copyright © 2021 ICLAIM | All Rights Reserved

      </div>
      <div className="mfs-auto">
        <span className="mr-1">Powered by</span>
        <a href="https://www.uclancyprus.ac.cy/research/research-centres/inspire/" target="_blank" rel="noopener noreferrer">InSPIRE Lab</a>
      </div>


      <CToggler style={{ marginLeft: "5px" }}
        onClick={() => dispatch({ type: 'set', darkMode: !darkMode })}
        title="Toggle Light/Dark Mode"
      >
        <CIcon name="cil-moon" className="c-d-dark-none" alt="CoreUI Icons Moon" />
        <CIcon name="cil-sun" className="c-d-default-none" alt="CoreUI Icons Sun" />
      </CToggler>

    </CFooter>
  )
}

export default React.memo(TheFooter)

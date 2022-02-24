import React from 'react'
import {
  CCol,
  CRow,
  CCard,
  CCardBody,
} from '@coreui/react'

const Policy = () => {

  const socialMediatorsNetwork = 'ICLAIM is an interdisciplinary Centre, which closely works with UCLan Cyprus on law in the real world, socio-legal issues and disputes arising in a transnational and interdisciplinary context, at all levels of the legal order and multi-level governance (international, European and national), utilising alternative and innovative methods. The network will be used as a platform where users within the organisation will be able to post ideas and comments. The data collected are secured and will NOT BE USED FOR ANY EXTERNAL PURPOSES'

  return (
    <CRow>
      <CCol xs="12" md="12">

        <CCol xs="12" style={{ textAlign: 'center' }}>
          <h2 style={{ margin: '20px 5px 40px' }}><strong>Privacy Policy</strong></h2>
        </CCol>

        <CCard>
          <CCardBody>
            <h1>
              Privacy policy
            </h1>
            <p>
              {socialMediatorsNetwork}
            </p>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow >
  )
}

export default Policy

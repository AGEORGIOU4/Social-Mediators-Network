import React from 'react'
import {
  CCol,
  CNav,
  CNavItem,
  CNavLink,
  CRow,
  CTabContent,
  CTabPane,
  CCard,
  CCardBody,
  CTabs,
  CImg,
  CLink
} from '@coreui/react'

const About = () => {

  const uclan = 'UCLan Cyprus is a Cypriot University and also the first overseas campus of a British University, the University of Central Lancashire (UCLan). It is the only university in Cyprus that can offer students the advantage of an honours or postgraduate degree recognised both in the UK and in Cyprus; truly international qualifications to enhance employability at home and overseas. What distinguishes UCLan Cyprus is its commitment to quality and standards. Students have to meet our entrance requirements in order to be admitted. Our teaching staff are required to have ‘Rolls Royce minds’ to enable the UCLan Group of Universities to continue climbing the QS World University Rankings, the most prestigious university rankings in the world.'
  const iclaim = 'ICLAIM is an interdisciplinary Centre, which closely works with UCLan Cyprus on law in the real world, socio-legal issues and disputes arising in a transnational and interdisciplinary context, at all levels of the legal order and multi-level governance (international, European and national), utilising alternative and innovative methods.'

  return (
    <CRow>
      <CCol xs="12" md="12">

        <CCol xs="12" style={{ textAlign: 'center' }}>
          <h2 style={{ margin: '20px 5px 40px' }}><strong>About us</strong></h2>
        </CCol>

        <CCard>
          <CCardBody>
            <CTabs>
              <CNav variant="tabs">
                <CNavItem>
                  <CNavLink style={{ fontSize: "12px" }}>
                    UCLan Cyprus
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink style={{ fontSize: "12px" }}>
                    ICLAIM
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink style={{ fontSize: "12px" }}>
                    Supporters
                  </CNavLink>
                </CNavItem>
              </CNav>
              <CTabContent>
                <CTabPane style={{ padding: "10px", textAlign: "justify" }}>
                  <p>{uclan}</p>
                  <CCol xs={12} style={{ textAlign: "center" }}>
                    <CLink href="https://www.uclancyprus.ac.cy/">
                      <CImg src={"About/uclan-logo.png"}
                        width="200" height="200"
                      />
                    </CLink>
                  </CCol>
                </CTabPane>

                <CTabPane style={{ padding: "10px", textAlign: "justify" }}>
                  <p>{iclaim}</p>
                  <CCol xs={12} style={{ textAlign: "center" }}>
                    <CLink href="https://www.iclaimcentre.org/">
                      <CImg src={"About/iclaim-logo.png"}
                        width="200" height="200"
                      />
                    </CLink>
                  </CCol>
                </CTabPane>

                <CTabPane style={{ padding: "10px" }}>
                  <p>⚫ Lancashire Research Institute of Citizenship, Society and Change</p>
                  <p>⚫ British High Commission, Nicosia</p>
                  <p>⚫ Centre for Sustainable Transitions, University of Central Lancashire</p>

                  <CRow style={{ textAlign: "justify" }}>
                    <CCol xs={12} md={6} lg={6} style={{ textAlign: "center" }}>
                      <CLink href="https://www.uclancyprus.ac.cy/">
                        <CImg src={"About/uclan-logo.png"}
                          width="200" height="200"
                        />
                      </CLink>
                    </CCol>

                    <CCol xs={12} md={6} lg={6} style={{ textAlign: "center" }}>
                      <CLink href="https://www.iclaimcentre.org/">
                        <CImg src={"About/iclaim-logo.png"}
                          width="200" height="200"
                        />
                      </CLink>
                    </CCol>
                  </CRow>

                </CTabPane>
              </CTabContent>
            </CTabs>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow >
  )
}

export default About

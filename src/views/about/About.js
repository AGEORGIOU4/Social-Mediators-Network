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
  CButton
} from '@coreui/react'

const About = () => {

  const uclan = 'UCLan Cyprus is a Cypriot University and also the first overseas campus of a British University, the University of Central Lancashire (UCLan).It is the only university in Cyprus that can offer students the advantage of an honours or postgraduate degree recognised both in the UK and in Cyprus; truly international qualifications to enhance employability at home and overseas. What distinguishes UCLan Cyprus is its commitment to quality and standards. Students have to meet our entrance requirements in order to be admitted. Our teaching staff are required to have ‘Rolls Royce minds’ to enable the UCLan Group of Universities to continue climbing the QS World University Rankings, the most prestigious university rankings in the world.'
  const iclaim = 'ICLAIM is an interdisciplinary Centre, which closely works with UCLan Cyprus on law in the real world, socio-legal issues and disputes arising in a transnational and interdisciplinary context, at all levels of the legal order and multi-level governance (international, European and national), utilising alternative and innovative methods.'
  const icsc = 'The Lancashire Research Institute of Citizenship, Society and Change brings together powerful research strands from four UCLan Faculties into a critical mass capable of extensive transdisciplinary work, well placed to respond to urgent and profound questions concerning a sustainable future, relationships among individuals and communities, arts and culture, public institutions of health, welfare and security. The Directors of the Institute are Professor Nicky Stanley, Dr John Whitton, Professor Ulrike Zeshan and Professor Lynn Froggett with research backgrounds that reflect the cross disciplinary nature of the Institute.'

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
                  <CNavLink>
                    UCLan Cyprus
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                    ICLAIM
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                    ICSC
                  </CNavLink>
                </CNavItem>
              </CNav>
              <CTabContent>
                <CTabPane style={{ padding: "10px", textAlign: "justify" }}>
                  <p>{uclan}</p>
                  <CButton color="dark" variant='outline' style={{ float: "right" }} href="https://www.social-mediation.org/about-us/" >More</CButton>
                </CTabPane>
                <CTabPane style={{ padding: "10px", textAlign: "justify" }}>
                  <p>{iclaim}</p>
                  <CButton color="dark" variant='outline' style={{ float: "right" }} href="https://www.social-mediation.org/about-us/" >More</CButton>
                </CTabPane>
                <CTabPane style={{ padding: "10px", textAlign: "justify" }}>
                  <p>{icsc}</p>
                  <CButton color="dark" variant='outline' style={{ float: "right" }} href="https://www.social-mediation.org/about-us/" >More</CButton>
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

import React, { Component } from 'react';
import { CCol, CRow } from '@coreui/react';

class About extends Component {
  render() {
    return (
      <div>
        <CCol xs="12" style={{ textAlign: 'center', marginTop: '15px', marginBottom: '15px' }}>
          <h2><strong>About us</strong></h2>
        </CCol>

        <CRow style={{ marginTop: "10px" }}>
          <CCol>

            <CCol>

              <h5><strong>Vision</strong></h5>
              <p style={{ textAlign: "justify", fontSize: 'medium' }}>
                ICLAIM envisions a society where citizens are empowered individually and collectively and enjoy access to social justice,
                through alternative and innovative approaches in the application of the law to societal issues, underpinned by high quality
                research and impact.</p>

            </CCol>

            <CCol>
              {/* <hr className="my-2" /> */}
            </CCol>

            <CCol>

              <h5><strong>Mission</strong></h5>
              <p style={{ textAlign: "justify", fontSize: 'medium' }}>
                As a social enterprise, to foster social dialogue and the rule of law through education and training and enhance active citizenship
                through knowledge transfer activities to groups of interested parties and the wider public. We are pioneering new solutions with wider
                impact on socio-legal challenges, at no or a fair cost.</p>

            </CCol>


            <CCol>
              {/* <hr className="my-2" /> */}
            </CCol>

            <CCol>

              <h5><strong>Objectives</strong></h5>
              <p style={{ textAlign: "justify", fontSize: 'medium' }}>
                To create, promote and raise awareness of innovative and alternative legal solutions, including dispute resolution methods, widening access to social justice.
                To support socio-legal research and impact beyond academia, making a notable difference in society.
                To create a space and share experience, knowledge and expertise with interested groups and the public at large, designing solutions taylor-made to their needs.
                To enhance capacity building of interested groups and the wider public in the field of social justice.
                To empower ICLAIM users and citizens more generally to find their own solutions to socio-legal challenges.</p>

            </CCol>

            <CCol>
              {/* <hr className="my-2" /> */}
            </CCol>
          </CCol>

        </CRow>
      </div>
    );
  }
}

export default About
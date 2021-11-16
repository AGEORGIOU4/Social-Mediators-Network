import { cilLocationPin, cilPhone } from '@coreui/icons'
import { cilMail } from '@coreui/icons-pro'
import CIcon from '@coreui/icons-react'
import { CLink } from '@coreui/react'
import React from 'react'

const phone = +35724694096;
const email = "info@iclaimcentre.org";

const Contact = () => {

  return (

    <div>
      <h1>ICLAIM</h1>
      <p>
        ICLAIM is an interdisciplinary centre for Law, Alternative and Innovative Methods, a non-profit organisation based in Cyprus
      </p>

      <hr />

      <p><CIcon content={cilLocationPin} /> 12-14 University Ave, Pyla 7080, Larnaka, Cyprus</p>
      <p><CIcon content={cilPhone} /> <CLink target="_blank" rel="noopener noreferrer" href={`tel:${phone}`}>+357 24 694096</CLink></p>
      <p><CIcon content={cilMail} /> <CLink target="_blank" rel="noopener noreferrer" href={`mailto:${email}`}>info@iclaimcentre.org</CLink></p>

      <hr />
    </div>

  )
}

export default Contact

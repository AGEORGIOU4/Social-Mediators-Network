import React from 'react'
import {
  CRow,
  CCol,
  CCard,
  CCardHeader,
  CCardBody,
  CFormGroup,
  CLabel,
  CFormText,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CInput
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { TextMask, InputAdapter } from 'react-text-mask-hoc'

// React DateRangePicker
import { DateRangePicker } from 'react-dates'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'

import ProBadge from 'src/reusable/ProBadge'
import DocsLink from 'src/reusable/DocsLink'

// React select
import interests from './interests'
import Select from 'react-select'
import { useSelector } from 'react-redux';

const ProfileForm = () => {

  const darkMode = useSelector(state => state.darkMode)

  const [value, setValue] = React.useState([
    { value: 'Law', label: 'Law' },
  ])

  return (
    <CRow>
      <CCol sm={12} md={6} style={{ flexBasis: 'auto' }}>
        <CCard>
          <CCardHeader>
            Edit Profile Card

          </CCardHeader>
          <CCardBody>
            <CFormGroup>
              <CLabel>Username</CLabel>
              <CInput
                type="text" />
            </CFormGroup>

          </CCardBody>
        </CCard>
      </CCol>
      <CCol sm={12} md={6}>
        <CCard>
          <CCardHeader>
            Interests
          </CCardHeader>
          <CCardBody>
            <Select
              name="form-field-name2"
              value={value}
              options={interests}
              onChange={setValue}
              isMulti
              theme={(theme) => ({
                ...theme,
                colors: {
                  ...theme.colors,
                  primary: darkMode ? 'black' : theme.colors.primary,
                  primary25: darkMode ? 'black' : theme.colors.primary25,
                  dangerLight: darkMode ? 'black' : theme.colors.dangerLight,
                  neutral0: darkMode ? '#2a2b36' : theme.colors.neutral0
                },
              })}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default ProfileForm

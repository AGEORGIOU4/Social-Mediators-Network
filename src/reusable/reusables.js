import React from 'react'
import { CButton } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilTrash } from '@coreui/icons'
import { Route } from "react-router-dom";

export const getBadge = status => {
  switch (status) {
    case 'Active': return 'success'
    case 'Inactive': return 'secondary'
    case 'Pending': return 'warning'
    case 'Banned': return 'danger'
    default: return 'primary'
  }
}

export const EditBtn = (props) => {
  return (
    <Route render={({ history }) => (
      <CButton
        color="info"
        variant="outline"
        size="sm" onClick={() => { history.push(props.EditRoute) }}><CIcon content={cilPencil} /></CButton>
    )} />
  )
}

export const RemoveBtn = () => {
  return (
    <CButton
      size="sm"
      color="danger"
      variant="outline"
    ><CIcon content={cilTrash} /></CButton>
  )
}

export const FormatTimestamp = (props) => {
  var seconds = props.seconds;
  var dateObject = new Date(seconds * 1000);
  var date = new Intl.DateTimeFormat("en-US", { year: "numeric", month: "2-digit", day: "2-digit" }).format(dateObject);
  var dateToString = date.toString();

  return (
    dateToString
  )
}
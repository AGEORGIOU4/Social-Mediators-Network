import React from 'react'
import { CButton } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilTrash } from '@coreui/icons'
import { Route } from "react-router-dom";
import { cisEye } from '@coreui/icons-pro';

export const getStatusBadge = status => {
  switch (status) {
    case 'Active': return 'success'
    case 'Inactive': return 'secondary'
    case 'Pending': return 'warning'
    case 'Banned': return 'danger'
    default: return 'primary'
  }
}

export const getInterestsBadge = interests => {
  switch (interests) {
    case 'Computing': return 'secondary'
    case 'Technology': return 'success'
    case 'Physics': return 'info'
    case 'Law': return 'warning'
    case 'Business': return 'danger'
    case 'Other': return 'primary'

    default: return 'primary'
  }
}

export const ViewBtn = (props) => {
  return (
    <Route render={({ history }) => (
      <CButton
        color="secondary"
        variant="ghost"
        size="sm" onClick={() => { history.push(props.ViewRoute) }}><CIcon content={cisEye} /></CButton>
    )} />
  )
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

export const RemoveBtn = (props) => {
  return (
    <CButton
      size="sm"
      color="danger"
      variant="outline"
      onClick={props.removeItem}
    ><CIcon content={cilTrash} /></CButton>
  )
}

export const FormatTimestamp = (props) => {
  var dateToString = "N/A";

  if (props.seconds !== "N/A") {

    var seconds = props.seconds;
    var dateObject = new Date(seconds * 1000);
    var date = new Intl.DateTimeFormat("en-US", { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" }).format(dateObject);
    dateToString = date.toString();

  }

  return (
    dateToString
  )
}
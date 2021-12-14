import React from 'react'
import { CButton } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilTrash } from '@coreui/icons'
import { Route } from "react-router-dom";
import { cisEye } from '@coreui/icons-pro';

export const getStatusBadge = status => {
  switch (status) {
    case true: return 'success'
    case false: return 'danger'
    default: return 'primary'
  }
}

export const getInterestsBadge = interests => {
  switch (interests) {
    case 'Education': return 'secondary'
    case 'Law': return 'primary'
    case 'Human rights': return 'info'
    case 'Youth rights': return 'info'
    case 'Research': return 'warning'
    case 'Gender': return 'secondary'
    case 'Peace': return 'secondary'
    case 'Volunteering': return 'secondary'
    case 'Politics': return 'primary'
    case 'Computing': return 'info'
    case 'Photography': return 'warning'
    case 'Architecture': return 'warning'
    case 'Environment': return 'warning'
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


// Cookies functions
export function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

export function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
import React from 'react'

import { Button } from 'react-floating-action-button'
import { cilNote } from '@coreui/icons-pro';
import CIcon from '@coreui/icons-react';
import Swal from 'sweetalert2';
const TheFloatingButton = () => {

  var enteredProposal = "";


  const postProposal = async () => {
    const swalQueue = Swal.mixin({
      confirmButtonText: 'Post',
      showCancelButton: true,
      confirmButtonColor: '#635dff',
      allowOutsideClick: true,
    })

    await swalQueue.fire({
      input: "text",
      inputPlaceholder: "What do you have in mind?",
      inputValidator: (value) => {
        if (!value) {
          return 'You need to write something!'
        } else {
          enteredProposal = value;
          console.log(enteredProposal);
        }
      }
    })
  }

  return (


    <div className="custom-fab-container">
      <Button
        tooltip="Post a proposal"
        onClick={() => { postProposal() }} >
        <CIcon content={cilNote} />
      </Button>
    </div>

  )
}

export default TheFloatingButton

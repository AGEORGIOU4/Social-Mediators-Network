import React from 'react'

import { Button } from 'react-floating-action-button'
import { cilNote } from '@coreui/icons-pro';
import CIcon from '@coreui/icons-react';
import Swal from 'sweetalert2';
const TheFloatingButton = () => {

  var enteredProposal = "";

  const postProposal = async () => {

    Swal.fire({
      input: "text",
      inputPlaceholder: "What do you have in mind?",
      imageUrl: 'https://www.social-mediation.org/wp-content/uploads/2018/06/social-mediation-logoX2.png',
      imageWidth: 80,
      imageAlt: 'Social Mediators Network',
      showConfirmButton: true,
      confirmButtonText: "Post",
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

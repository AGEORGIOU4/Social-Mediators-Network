import React, { useState } from 'react'

import { Button } from 'react-floating-action-button'
import { cilNote } from '@coreui/icons-pro';
import CIcon from '@coreui/icons-react';
import Swal from 'sweetalert2';
import { useAuth0 } from "@auth0/auth0-react";
import { firebaseDB } from 'src/reusable/firebaseConfig';
import { getDoc, setDoc, doc, Timestamp } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

const TheFloatingButton = () => {

  const { user, isAuthenticated } = useAuth0();
  const [userFirebase, setUserFirebase] = useState([]);
  // var userFirebase = [];

  var enteredTitle = "";
  var enteredDescription = "";
  var enteredProposal = "";

  const postProposal = async () => {

    const getUser = async (db) => {
      const docRef = doc(db, "users", user.email);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUserFirebase(docSnap.data());
        //userFirebase = docSnap.data();
      } else {
        console.log("User does not exist is firebase!");
      }
      console.log(userFirebase);
    }

    getUser(firebaseDB);

    const addProposal = async (db) => {

      var proposalID = uuidv4();
      await setDoc(doc(db, "proposals", proposalID), {
        author: userFirebase.firstName + " " + userFirebase.lastName,
        title: enteredTitle,
        description: enteredDescription,
        createdAt: Timestamp.now(),
        email: user.email,
        picture: userFirebase.picture,
        proposalID: proposalID,
        totalComments: 0,
        visibility: "active",
      });
    }

    const steps = ['1', '2']
    const swalQueue = Swal.mixin({
      progressSteps: steps,
      confirmButtonText: 'Next',
      confirmButtonColor: '#635dff',
      allowOutsideClick: true,
      backdrop: true
    })

    Swal.fire({
      currentProgressStep: 0,
      input: "text",
      inputPlaceholder: "Enter your proposal's title...",
      imageUrl: userFirebase.picture,
      imageWidth: 80,
      showConfirmButton: true,
      confirmButtonText: "Next",
      inputValidator: (value) => {
        if (!value) {
          return 'You need to write something!'
        } else {
          enteredTitle = value;
          console.log(enteredTitle);
          Swal.fire({
            currentProgressStep: 1,
            input: "textarea",
            inputPlaceholder: "Enter your proposal's description...",
            imageUrl: userFirebase.picture,
            imageWidth: 80,
            showConfirmButton: true,
            confirmButtonText: "Post",
            inputValidator: (value) => {
              if (!value) {
                return 'You need to write something!'
              } else {
                enteredDescription = value;
                console.log(enteredDescription);
                console.log(userFirebase);
                addProposal(firebaseDB);

                const Toast = Swal.mixin({
                  toast: true,
                  position: 'bottom-end',
                  showConfirmButton: false,
                  timer: 3000,
                  timerProgressBar: false,
                  didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                  }
                })

                Toast.fire({
                  icon: 'success',
                  title: 'Proposal added successfully'
                })

              }
            }
          })
        }
      }
    })
  }

  return (


    <div className="custom-fab-container" style={{ display: (isAuthenticated) ? "block" : "none" }}>
      <Button
        tooltip="Post a proposal"
        onClick={() => { postProposal() }} >
        <CIcon content={cilNote} />
      </Button>
    </div>

  )
}

export default TheFloatingButton

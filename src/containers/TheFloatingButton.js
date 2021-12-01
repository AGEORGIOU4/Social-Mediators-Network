import React from 'react'

import { Button } from 'react-floating-action-button'
import { cilNote } from '@coreui/icons-pro';
import CIcon from '@coreui/icons-react';
import Swal from 'sweetalert2';
import { useAuth0 } from "@auth0/auth0-react";
import { firebaseDB } from 'src/reusable/firebaseConfig';
import { getDoc, setDoc, doc, Timestamp } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { getCookie } from 'src/reusable/reusables';

const TheFloatingButton = () => {

  var pic = getCookie("userPicture");

  const url = window.location.hash;
  console.log(url);
  var isConnected = false;
  isConnected = window.navigator.onLine;

  const { user, isAuthenticated } = useAuth0();

  var userFirebase = [];

  var enteredTitle = "";
  var enteredDescription = "";

  const postProposal = async () => {

    const getUser = async (db) => {
      const docRef = doc(db, "users", user.email);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        userFirebase = docSnap.data();
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
        picture: (userFirebase.picture) ? userFirebase.picture : 'avatar.png',
        proposalID: proposalID,
        totalComments: 0,
        totalEnabledComments: 0,
        status: true,
      });
    }

    Swal.fire({
      customClass: {
        image: 'proposalSwal'
      },

      input: "text",
      inputPlaceholder: "What do you have in mind?",
      imageUrl: pic,
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
            customClass: {
              image: 'proposalSwal'
            },

            input: "textarea",
            inputPlaceholder: "Tell us more...",
            imageUrl: pic,
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

                if (userFirebase.picture && userFirebase.firstName && userFirebase.lastName !== undefined) {
                  addProposal(firebaseDB);

                  const Toast = Swal.mixin({
                    toast: true,
                    position: 'bottom-end',
                    showConfirmButton: false,
                    timer: 1000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                      toast.addEventListener('mouseenter', Swal.stopTimer)
                      toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                  })

                  if (url === "#/Blog" || url === "#/blog") {
                    setTimeout(() =>
                      window.location.reload(false)
                      , 1000)
                  }

                  Toast.fire({
                    icon: 'success',
                    title: 'Proposal added successfully'
                  })
                } else {
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
                    icon: 'error',
                    title: 'Oops, something went wrong. Please try again'
                  })
                }

              }
            }
          })
        }
      }
    })
  }

  return (
    <div className="custom-fab-container" style={{ display: (isAuthenticated && isConnected) ? "block" : "none" }}>
      <Button
        tooltip="Post a proposal"
        onClick={() => { postProposal() }} >
        <CIcon content={cilNote} />
      </Button>
    </div>
  )
}

export default TheFloatingButton

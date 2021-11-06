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
  // const [userFirebase, setUserFirebase] = useState([]);
  var userFirebase = [];

  var enteredProposal = "";

  const postProposal = async () => {

    const getUser = async (db) => {
      const docRef = doc(db, "users", user.email);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // setUserFirebase(docSnap.data());
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
        content: enteredProposal,
        createdAt: Timestamp.now(),
        email: user.email,
        picture: userFirebase.picture,
        proposalID: proposalID,
        totalComments: 0,
        visibility: "active",
      });
    }

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
          console.log(userFirebase);
          addProposal(firebaseDB);

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

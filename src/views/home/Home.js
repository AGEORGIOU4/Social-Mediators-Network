import React, { useState } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import { firebaseDB } from 'src/reusable/firebaseConfig';
import { getDoc, setDoc, doc } from 'firebase/firestore';
import { CCard, CCardBody, CCardHeader, CCarousel, CCarouselControl, CCarouselIndicators, CCarouselInner, CCarouselItem, CCol, CRow, CButton, CImg } from '@coreui/react'
import Swal from 'sweetalert2';
import LinesEllipsis from 'react-lines-ellipsis'
import { SocialMediatorsBasicTable } from 'src/reusable/Tables/SocialMediatorsBasicTable'
import Interest from 'src/reusable/Tables/Interest';

const Home = () => {
  const { user, isAuthenticated } = useAuth0();
  const [firebaseFlag, setFirebaseFlag] = useState(false);

  var enteredFirstName = "";
  var enteredLastName = "";
  var enteredBio = "";
  var enteredQualifications = "";
  var enteredInsterest = "";

  var isConnected = false;
  isConnected = window.navigator.onLine;
  console.log("Connection is " + isConnected);


  var isEstablished = (getCookie("session") ? getCookie("session") : "Not established");
  console.log("Session is: " + isEstablished);

  // Check if user is logged in
  if (isAuthenticated && !firebaseFlag && !getCookie("session")) {
    setCookie("session", "Established", 1);
    setCookie("userEmail", user.email, 7);

    console.log("User " + user.email + " is authenticated");

    const getUser = async (db) => {
      const docRef = doc(db, "users", user.email);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setFirebaseFlag(true);
      } else {
        console.log("User does not exist is firebase!");
        WelcomeAlert();
      }
    }
    getUser(firebaseDB);
    setFirebaseFlag(true);
  }

  function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  function getCookie(cname) {
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

  function convertDate(updated_at) {
    var dateToString = "N/A";
    if (updated_at !== "N/A" || updated_at !== undefined) {
      var dateObject = new Date(updated_at);
      var date = new Intl.DateTimeFormat("en-UK", { year: "2-digit", month: "2-digit", day: "2-digit" }).format(dateObject);
      dateToString = date.toString();
    }

    return (
      dateToString
    )
  }

  const addUser = async (db) => {
    let createdAt = convertDate(user.updated_at);

    await setDoc(doc(db, "users", user.email), {
      email: user.email,
      nickname: user.nickname,
      picture: user.picture,
      firstName: enteredFirstName,
      lastName: enteredLastName,
      bio: enteredBio,
      qualifications: enteredQualifications,
      areaOfInterest: enteredInsterest,
      createdAt: createdAt,
    });
  }

  const WelcomeAlert = async () => {

    Swal.fire({
      title: 'Welcome',
      text: 'to Social Mediators Network',
      imageUrl: 'https://www.social-mediation.org/wp-content/uploads/2018/06/social-mediation-logoX2.png',
      imageWidth: 80,
      imageAlt: 'Social Mediators Network',
      showConfirmButton: true,
      confirmButtonText: "Proceed",
      confirmButtonColor: '#635dff',
      allowOutsideClick: false,
      footer: 'Firstly let`s create your profile...'
    }).then((result) => {
      if (result.isConfirmed) {
        CreateProfile();
      }
    })

    const CreateProfile = async () => {
      const steps = ['1', '2', '3', '4', '5']
      const swalQueue = Swal.mixin({
        progressSteps: steps,
        confirmButtonText: 'Next',
        confirmButtonColor: '#635dff',
        allowOutsideClick: false,
      })

      // await swalQueue.fire({
      //   title: 'Welcome',
      //   text: 'to Social Mediators Network',
      //   imageUrl: 'https://www.social-mediation.org/wp-content/uploads/2018/06/social-mediation-logoX2.png',
      //   imageWidth: 80,
      //   imageAlt: 'Social Mediators Network',
      //   confirmButtonText: "Proceed",
      //   footer: 'Let`s create your profile...',
      //   currentProgressStep: -1
      // })

      await swalQueue.fire({
        title: "What's your first name?",
        input: "text",
        inputPlaceholder: 'Enter your first name',
        currentProgressStep: 0,
        inputValidator: (value) => {
          if (!value) {
            return 'You need to write something!'
          } else {
            enteredFirstName = value;
          }
        }
      })

      await swalQueue.fire({
        title: "What's your last name?",
        input: "text",
        inputPlaceholder: 'Enter your last name',
        currentProgressStep: 1,
        inputValidator: (value) => {
          if (!value) {
            return 'You need to write something!'
          } else {
            enteredLastName = value;
          }
        }
      })

      await swalQueue.fire({
        title: "Any qualifications or experiences as a social mediator?",
        input: "text",
        inputPlaceholder: 'Enter qualifications',
        currentProgressStep: 2,
        inputValidator: (value) => {
          if (!value) {
            return 'You need to write something!'
          } else {
            enteredQualifications = value;
          }
        }
      })

      await swalQueue.fire({
        title: "Tell us bit about yourself...",
        input: "textarea",
        inputPlaceholder: 'Few words about you',
        currentProgressStep: 3,
        inputValidator: (value) => {
          if (!value) {
            return 'You need to write something!'
          } else {
            enteredBio = value;
          }
        }
      })

      await swalQueue.fire({
        title: "And last! Select an area of interest...",
        input: "select",
        inputPlaceholder: 'Select an area of interest',
        showConfirmButton: true,
        currentProgressStep: 4,
        inputOptions: { Interest },
        inputValidator: (value) => {
          if (!value) {
            return 'You need to select something!'
          } else {
            enteredInsterest = value;
            addUser(firebaseDB);
            console.log("User ".concat(user.nickname).concat(" is added!"));

            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'You are now a member!',
              showConfirmButton: false,
              timer: 3000
            })
          }
        }
      })
    }
  }


  const slides = [
    'iclaim-slide1.jpg',
    'iclaim-slide1.jpg',
    'iclaim-slide1.jpg',
  ]

  return (
    <CRow >

      <CCol xs="12" id="homeCarousel" style={{ display: (isConnected) ? "block" : "none" }}>
        <CCarousel animate autoSlide={3000}>
          <CCarouselIndicators style={{ color: 'grey' }} />
          <CCarouselInner>

            <CCarouselItem>
              <CImg shape="rounded" className="d-block w-100" src={slides[0]} alt="slide 1" />
            </CCarouselItem>

            <CCarouselItem>
              <CImg shape="rounded" className="d-block w-100" src={slides[1]} alt="slide 2" />
            </CCarouselItem>

            <CCarouselItem>
              <CImg shape="rounded" className="d-block w-100" src={slides[2]} alt="slide 3" />
            </CCarouselItem>

          </CCarouselInner>

          <CCarouselControl direction="prev" />
          <CCarouselControl direction="next" />

        </CCarousel>
      </CCol>
      <CCol xs="12" style={{ textAlign: 'center', marginTop: '10px', marginBottom: '30px' }}>
        <h2><strong>Welcome to Social Mediators' Network</strong></h2>
      </CCol>

      <CCol xs="12">
        <CCol style={{ background: '#0000' }}>

          <p className="backgroundP" style={{ textAlign: "justify", fontSize: 'medium' }}>
            This app provides a forum for the members of the Social Mediators' Network, where they can discuss future collaborations and joint action on Social Mediation. The app features the bios, profiles and completed trainings of each member and lets all users to familiarise with the other members of the Network and complement one another's work through their individual interests and expertise.
          </p>

          <p className="backgroundP" style={{ textAlign: "justify", fontSize: 'medium' }}>
            The Social Mediators' Network developed through the Social Mediation initiative ran by ICLAIM in a series of consecutive trainings since 2018. Supporters of the Social Mediation initiative and the Social Mediators' Network include the University of Central Lancashire, UCLan Cyprus, the Centre for Sustainable Transitions, and the British High Commission. The initiative was awarded the 2020 European Citizens' Award by the European Parliament.
          </p>

          <p className="backgroundP" style={{ textAlign: "justify", fontStyle: 'italic', fontSize: 'small' }}>This platform is designed and developed as a social mediators network and can be used as a proposals tool where any member is able to post and comment.</p>
          <p style={{ textAlign: 'center', marginTop: '30px', marginBottom: '0px' }}>
            <CButton href='https://www.social-mediation.org/' color="primary" size="lg">Learn More</CButton>
          </p>
        </CCol>
      </CCol>

      <CCol xs="12" style={{ margin: "30px 0" }}>
        <hr style={{ width: "70%" }} />
      </CCol>

      <CCol xs="12" style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h2><strong>News</strong></h2>
      </CCol>

      <CCol xs="12" sm="4" md="4">
        <CCard>
          <CCardHeader>
            News card
          </CCardHeader>
          <CCardBody>
            <LinesEllipsis
              text='Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
              laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
              ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.'
              maxLine='2'
              ellipsis='...'
              trimRight
              basedOn='letters'
            />

            <div style={{ textAlign: 'end', marginTop: '15px' }}><CButton color="primary">Read</CButton></div>
          </CCardBody>

        </CCard>
      </CCol>

      <CCol xs="12" sm="4" md="4">
        <CCard>
          <CCardHeader>
            News card
          </CCardHeader>
          <CCardBody>
            <LinesEllipsis
              text='Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
              laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
              ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.'
              maxLine='2'
              ellipsis='...'
              trimRight
              basedOn='letters'
            />
            <div style={{ textAlign: 'end', marginTop: '15px' }}><CButton color="primary">Read</CButton></div>
          </CCardBody>

        </CCard>
      </CCol>

      <CCol xs="12" sm="4" md="4">
        <CCard>
          <CCardHeader>
            News card
          </CCardHeader>
          <CCardBody>
            <LinesEllipsis
              text='Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
              laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
              ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.'
              maxLine='2'
              ellipsis='...'
              trimRight
              basedOn='letters'
            />
            <div style={{ textAlign: 'end', marginTop: '15px' }}><CButton color="primary">Read</CButton></div>
          </CCardBody>
        </CCard>
      </CCol>

      <CCol xs="12" style={{ margin: "30px 0" }}>
        <hr style={{ width: "70%" }} />
      </CCol>

      <CCol xs="12" style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h2><strong>Social Mediators</strong></h2>
      </CCol>

      <SocialMediatorsBasicTable />

    </CRow >


  )
}

export default Home

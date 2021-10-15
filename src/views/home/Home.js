import React, { useState } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import { firebaseDB } from 'src/reusable/firebaseConfig';
import { collection, getDocs, setDoc, doc } from 'firebase/firestore';
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

  console.log("session is: " + getCookie("session"));
  console.log("userEmail is: " + getCookie("userEmail"));

  // Check if user is logged in
  if (isAuthenticated && !firebaseFlag && !getCookie("session")) {
    document.cookie = "session=Established...";
    setCookie("userEmail", user.email, 1);
    console.log("User " + user.email + " is authenticated: " + isAuthenticated);

    // Get all firebase users
    const getUsers = async (db) => {
      const userSnapshot = await getDocs(collection(db, "users"));
      const usersList = userSnapshot.docs.map(doc => doc.data());
      console.log("Users list done...");

      var memberFlag = false;
      // Check if logged in user is not in firestore
      usersList.forEach(userInList => {
        if (user.email === userInList.email) {
          console.log('User ' + user.email + ' exists in Firebase!');
          memberFlag = true;
        }
      })

      // Add member (get values from prompt)
      if (!memberFlag) {
        WelcomeAlert();
      }
    }
    getUsers(firebaseDB);
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

  const addUser = async (db) => {
    await setDoc(doc(db, "users", user.email), {
      email: user.email,
      nickname: user.nickname,
      picture: user.picture,
      firstName: enteredFirstName,
      lastName: enteredLastName,
      bio: enteredBio,
      qualifications: enteredQualifications,
      areaOfInterest: enteredInsterest,
      createdAt: user.updated_at,
    });
  }

  const WelcomeAlert = () => {

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
      footer: 'Let`s create your profile...'
    }).then((result) => {
      if (result.isConfirmed) {
        GetName();
      }
    })
  }

  const GetName = () => {
    Swal.fire({
      title: "What's your name?",
      input: "text",
      inputPlaceholder: 'Enter your first name',
      showConfirmButton: true,
      confirmButtonText: `Next`,
      confirmButtonColor: "#635dff",
      allowOutsideClick: false,
      inputValidator: (value) => {
        if (!value) {
          return 'You need to write something!'
        } else {
          enteredFirstName = value;

          GetSurname();
        }
      }
    })
  }

  const GetSurname = () => {
    Swal.fire({
      title: "What's your surname?",
      input: "text",
      inputPlaceholder: 'Enter your last name',
      showConfirmButton: true,
      confirmButtonText: `Next`,
      confirmButtonColor: "#635dff",
      allowOutsideClick: false,
      inputValidator: (value) => {
        if (!value) {
          return 'You need to write something!'
        } else {
          enteredLastName = value;

          GetQualifications();
        }
      }
    })
  }

  const GetQualifications = () => {
    Swal.fire({
      title: "Any qualifications or experiences as a social mediator?",
      input: "text",
      inputPlaceholder: 'Enter qualifications',
      showConfirmButton: true,
      confirmButtonText: `Next`,
      confirmButtonColor: "#635dff",
      allowOutsideClick: false,
      inputValidator: (value) => {
        if (!value) {
          return 'You need to write something!'
        } else {
          enteredQualifications = value;

          GetBio();
        }
      }
    })
  }

  const GetBio = () => {
    Swal.fire({
      title: "Tell us bit about yourself...",
      input: "textarea",
      inputPlaceholder: 'Few words about you',
      showConfirmButton: true,
      confirmButtonText: `Next`,
      confirmButtonColor: "#635dff",
      allowOutsideClick: false,
      inputValidator: (value) => {
        if (!value) {
          return 'You need to write something!'
        } else {
          enteredBio = value;

          GetInterest();
        }
      }
    })
  }

  const GetInterest = () => {
    Swal.fire({
      title: "Lastly! Select a field of interest...",
      input: "select",
      inputPlaceholder: 'Select a field of interest',
      showConfirmButton: true,
      confirmButtonText: `Next`,
      confirmButtonColor: "#635dff",
      allowOutsideClick: false,
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

  const slides = [
    'iclaim-slide1.jpg',
    'iclaim-slide1.jpg',
    'iclaim-slide1.jpg',
  ]

  return (
    <CRow >

      <CCol xs="12" id="homeCarousel">
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
        <h2><strong>Welcome to Social Mediators Network</strong></h2>
      </CCol>

      <CCol xs="12">
        <CCol style={{ background: '#0000' }}>

          <p style={{ textAlign: "justify", fontSize: 'medium' }}>
            This app provides a forum for the members of the Social Mediators' Network, where they can discuss future collaborations and joint action on Social Mediation. The app features the bios, profiles and completed trainings of each member and lets all users to familiarise with the other members of the Network and complement one another's work through their individual interests and expertise.
          </p>

          <p style={{ textAlign: "justify", fontSize: 'medium' }}>
            The Social Mediators' Network developed through the Social Mediation initiative ran by ICLAIM in a series of consecutive trainings since 2018. Supporters of the Social Mediation initiative and the Social Mediators' Network include the University of Central Lancashire, UCLan Cyprus, the Centre for Sustainable Transitions, and the British High Commission. The initiative was awarded the 2020 European Citizens' Award by the European Parliament.
          </p>

          <p style={{ textAlign: "justify", fontStyle: 'italic', fontSize: 'small' }}>This platform is designed and developed as a social mediators network and can be used as a proposals tool where any member is able to post and comment.</p>
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

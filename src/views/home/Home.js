import React, { useState } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import { firebaseDB } from 'src/reusable/firebaseConfig';
import { collection, getDocs, setDoc, doc } from 'firebase/firestore';
import { CCard, CCardBody, CCardHeader, CCarousel, CCarouselControl, CCarouselIndicators, CCarouselInner, CCarouselItem, CCol, CRow, CButton, CImg } from '@coreui/react'
import Swal from 'sweetalert2';
import LinesEllipsis from 'react-lines-ellipsis'
import Interests from 'src/reusable/interests';
import { SocialMediatorsBasicTable } from 'src/reusable/Tables/SocialMediatorsBasicTable'

const Home = () => {
  const { user, isAuthenticated } = useAuth0();
  const [firebaseFlag, setFirebaseFlag] = useState(false);

  var enteredFirstName = "";
  var enteredLastName = "";
  var enteredBio = "";
  var enteredQualifications = "";
  var enteredInsterest = "";

  console.log(getCookie("session"));

  // Check if user is logged in
  if (isAuthenticated && !firebaseFlag && !getCookie("session")) {
    document.cookie = "session=Established...";
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
      interests: enteredInsterest,
      createdAt: user.updated_at,
      loginTimes: 0,
    });
  }

  const WelcomeAlert = () => {

    Swal.fire({
      title: 'Welcome',
      text: 'to ICLAIM social mediators platform',
      imageUrl: 'https://www.iclaimcentre.org/wp-content/uploads/2018/06/logo-form.png',
      imageWidth: 80,
      imageAlt: 'ICLAIM logo',
      showConfirmButton: true,
      confirmButtonText: "Proceed",
      confirmButtonColor: '#f55e45',
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
      confirmButtonColor: "#f55e45",
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
      confirmButtonColor: "#f55e45",
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
      confirmButtonColor: "#f55e45",
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
      confirmButtonColor: "#f55e45",
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
      title: "Lastly! Select an interest...",
      input: "select",
      inputPlaceholder: 'Select an interest',
      showConfirmButton: true,
      confirmButtonText: `Next`,
      confirmButtonColor: "#f55e45",
      allowOutsideClick: false,
      inputOptions: { interests: Interests },
      //   'Interests': {
      //     CS: 'Computer Science',
      //     Technology: 'Technology',
      //     Law: 'Law',
      //     Journalism: 'Journalism'
      //   },
      // },
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
            title: 'Your are now a member!',
            showConfirmButton: false,
            timer: 3000
          })
        }
      }
    })
  }

  const slides = [
    'iclaim-slide1.jpg',
    'iclaim-slide2.jpg',
    'iclaim-slide3.jpg',
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

      <CCol xs="12" style={{ textAlign: 'center', marginTop: '15px', marginBottom: '15px' }}>
        <h2><strong>Welcome to ICLAM Social Mediators Platform</strong></h2>
      </CCol>

      <CCol xs="12">
        <CCol style={{ background: '#0000' }}>

          <p style={{ textAlign: "justify", fontSize: 'medium' }}>
            ICLAIM envisions a society where citizens are empowered individually and collectively and enjoy access to social justice, through alternative and innovative approaches in the application of the law to societal issues, underpinned by high quality research and impact.</p>

          <p style={{ textAlign: "justify", fontStyle: 'italic', fontSize: 'small' }}>This platform can be used as a proposals tool where any member is able to post and comment.</p>
          <p style={{ textAlign: 'center' }}>
            <CButton href='https://www.iclaimcentre.org/' color="primary" size="lg">Learn More</CButton>
          </p>
        </CCol>
      </CCol>

      <CCol xs="12">
        <hr className="my-2" />
      </CCol>

      <CCol xs="12" style={{ textAlign: 'center', marginTop: '15px', marginBottom: '15px' }}>
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

      <CCol xs="12">
        <hr className="my-2" />
      </CCol>

      <CCol xs="12" style={{ textAlign: 'center', marginTop: '15px', marginBottom: '15px' }}>
        <h2><strong>Social Mediators</strong></h2>
      </CCol>

      <SocialMediatorsBasicTable />

    </CRow >


  )
}

export default Home

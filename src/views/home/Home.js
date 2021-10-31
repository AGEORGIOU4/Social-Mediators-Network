import React, { useState } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import { firebaseDB } from 'src/reusable/firebaseConfig';
import { getDoc, setDoc, doc } from 'firebase/firestore';
import { CCard, CCardBody, CCardHeader, CCarousel, CCarouselControl, CCarouselIndicators, CCarouselInner, CCarouselItem, CCol, CRow, CButton, CImg } from '@coreui/react'
import Swal from 'sweetalert2';
import LinesEllipsis from 'react-lines-ellipsis'
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

  // Check if user is logged in
  if (isAuthenticated && !firebaseFlag && !getCookie("session")) {
    setCookie("session", "Established", 1);
    setCookie("userEmail", user.email, 7);

    console.log("User " + user.email + " is authenticated");

    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,

      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    Toast.fire({
      icon: 'success',
      title: 'Signed in successfully'
    })

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
      trainings: [],
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
      <CCol xs="12" style={{ textAlign: 'center', marginTop: '10px', marginBottom: '20px' }}>
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
            <LinesEllipsis
              text='ICLAIM’S ‘SOCIAL MEDIATION IN PRACTICE’ PROJECT RECEIVES THE EUROPEAN CITIZEN PRIZE 2020 FROM THE EUROPEAN PARLIAMENT'
              maxLine='1'
              ellipsis='...'
              trimRight
              basedOn='letters'
            />
          </CCardHeader>
          <CCardBody>
            <LinesEllipsis
              text='The Interdisciplinary Centre for Law, Alternative and Innovative Methods (ICLAIM), an independent non-profit organisation working in close association with the School of Law at the University of Central Lancashire in Cyprus (UCLan Cyprus), is proud to announce that out of the 30 laureates of the European Parliament’s European Citizen Prize 2020 from 25 countries of the EU, ICLAIM is one of the two recipients from Cyprus! The laureates for Cyprus were announced by the European Parliament Office in Cyprus on 12 February 2021, being ICLAIM Founder, Prof. Stéphanie Laulhé Shaelou, on behalf of ICLAIM for its ‘Social Mediation in Practice’ programme, and Mr Costas Vichas for his long-term humanitarian assistance to those in need. Since 2008, the European Parliament awards the European Citizen’s Prize every year to projects and initiatives that facilitate cross-border cooperation or promote mutual understanding within the EU. The prize, which has symbolic value, is also intended to acknowledge the work of those who through their day-to-day activities promote European values.
              ICLAIM is a non-profit organisation registered and established in Cyprus since 2017, whose primary objective is to serve communities. It is a social enterprise vehicle which benefits from the expertise of a pool of all-female resident experts, researchers and interns, from diverse backgrounds, primarily (but not exclusively) from the UCLan Cyprus School of Law. The organisation envisions a society where citizens are empowered and enjoy access to social justice, through alternative and innovative approaches in the application of the law to societal issues.
              The ‘Social Mediation in Practice’ project, whose broader objective is to spread the use of social mediation as a tool for the resolution of conflicts in the Cypriot society and beyond, is one of ICLAIM’s long-term projects, under the overall coordination of Prof. Stéphanie Laulhé Shaelou. In 2018, Dr Natalie Alkiviadou supervised a group of UCLan Cyprus law students, interns at ICLAIM, to draft the first ‘Handbook for Professionals on Social Mediation’. Since July 2018, the Handbook and ICLAIM expertise have been disseminated in a series of training and workshops promoting the use of social mediation among individuals primarily from the education, the NGO and the law enforcement sectors, across communities. This ‘train the trainers’ approach was initially piloted through the Social Mediation project delivered by ICLAIM with the support of UCLan Cyprus and a grant from the University of Central Lancashire Institute of Citizenship, Society and Change (UCLan ICSC). This was followed by a workshop series entitled ‘Social Mediation in Practice’ delivered in 2019 and 2020 by ICLAIM and supported by UCLan Cyprus, with a grant from the British High Commission in Nicosia. These workshops involved ICLAIM social mediation trainers Dr Katerina Antoniou and Ms Nadia Kornioti, with input from Dr Pinar Zubaroğlu-Ioannides, and facilitation by community members and students. All workshops encouraged the participation of a diverse group of individuals from all communities of Cyprus, and of varying professional or other background. The workshops led to the establishment of the Social Mediators Network in September 2020. Amid the pandemic, the ‘Social Mediation in Practice’ project swiftly reacted to the situation by offering collective and active reflection on the impact of COVID-19 on communities in Cyprus, and on the role that social mediation could play in this setting. The Prize therefore recognizes the active citizenship of almost 100 individuals across the island and beyond, as well as the trust showed by all institutions mentioned above. ICLAIM would like to thank them all.              
              The next step in the programme’s development is a forthcoming workshop, part of a new ‘Social Mediation for Social Transitions’ project delivered by ICLAIM with the support of UCLan Cyprus and a grant from the University of Central Lancashire Centre for Sustainable Transitions (UCLan CST). The workshop will take place on 26-27 February 2021 and more information is available on our www.social-mediation.org.  
              Our congratulations to everyone involved in ICLAIM’s ‘Social Mediation in Practice’ programme and to the Laureates for the much-deserved recognition!'
              maxLine='3'
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
            <LinesEllipsis
              text='Upcoming Workshop on Social Mediation for Social Transitions'
              maxLine='1'
              ellipsis='...'
              trimRight
              basedOn='letters'
            />
          </CCardHeader>
          <CCardBody>
            <LinesEllipsis
              text='The COVID19 pandemic in 2020 reinforced the political polarisation and social uncertainty observed in the last decade. Within this context of weakening social cohesion and growing hostility in our societies, we hereby announce the delivery of an innovative Social Mediation training, under the ‘Social Mediation for Social Transitions’ project delivered by ICLAIM with the support of UCLan Cyprus and a grant from the University of Central Lancashire Centre for Sustainable Transitions (UCLan CST).
              Building on previous experience, the activities will train individuals interested in the implementation of Social Mediation as a conflict resolution tool, through a two-day online workshop on 26-27 February. Participants   will then have the opportunity to join previously trained Social Mediators through an online Roundtable Discussion, scheduled on 6 March, to set priorities and identify useful approaches in using Social Mediation in societies characterised by continuous social, political, economic and technological transitions.
              The project aims to contribute towards the publication of a new Manual on Social Mediation for Social Transitions, which envisages to expand the contexts within which Social Mediation can be employed as a conflict resolution tool.               
              For more information address any further questions to social-mediation@iclaimcentre.org
              For all details regarding the workshop and roundtable meeting, please refer to the poster attached to the present announcement. Availability is limited and registration is compulsory through the following link: here'
              maxLine='3'
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
            <LinesEllipsis
              text='Watch! Social Mediation Conference – Public Session'
              maxLine='1'
              ellipsis='...'
              trimRight
              basedOn='letters'
            />
          </CCardHeader>
          <CCardBody>
            <LinesEllipsis
              text='On 12 September 2020, ICLAIM organised the Social Mediation Conference and launched the Social Mediators Network. Participants included trained Social Mediators from both Cyprus communities, who had participated in the workshops mentioned above. Based on the feedback, the ideas and the areas prioritised by the workshop participants, we produced a report summarising the main points on the conference.
              You can now watch online the public session of the Social Mediation Conference in the video below and access the Conference Report here'
              maxLine='3'
              ellipsis='...'
              trimRight
              basedOn='letters'
            />
            <div style={{ textAlign: 'end', marginTop: '15px' }}><CButton color="primary">Read</CButton></div>
          </CCardBody>
        </CCard>
      </CCol>

      <CCol xs="12" style={{ margin: "30px 0 45px" }}>
        <hr style={{ width: "70%" }} />
      </CCol>

    </CRow >


  )
}

export default Home

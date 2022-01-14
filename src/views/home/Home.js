import React, { useState } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import { firebaseDB } from 'src/reusable/firebaseConfig';
import { getDoc, setDoc, doc } from 'firebase/firestore';
import { CCard, CCardBody, CCardHeader, CCarousel, CCarouselControl, CCarouselIndicators, CCarouselInner, CCarouselItem, CCol, CRow, CButton, CImg } from '@coreui/react'
import Swal from 'sweetalert2';
import LinesEllipsis from 'react-lines-ellipsis'
import interests from 'src/reusable/interestsSwal';
import { getCookie, setCookie } from 'src/reusable/reusables';

const Home = () => {
  const { user, isAuthenticated } = useAuth0();
  const [firebaseFlag, setFirebaseFlag] = useState(false);

  var enteredFirstName = "";
  var enteredLastName = "";
  var enteredBio = "";
  var enteredQualifications = "None";
  var enteredTrainings = [];
  var enteredInsterest = "";


  var isConnected = false;
  isConnected = window.navigator.onLine;

  // Check if user is logged in
  if (isAuthenticated && !firebaseFlag && !getCookie("session")) {
    setCookie("session", "Established", 7);
    setCookie("userEmail", user.email, 7);

    console.log("User " + user.email + " is authenticated");

    const Toast = Swal.mixin({
      toast: true,
      position: 'bottom-end',
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
        console.log("User exists is firebase!");

      } else {
        console.log("User does not exist is firebase!");
        WelcomeAlert();
      }
    }
    getUser(firebaseDB);
    setFirebaseFlag(true);
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
      trainings: enteredTrainings,
      areaOfInterest: enteredInsterest,
      createdAt: createdAt,
      status: true
    });
  }

  const WelcomeAlert = async () => {

    Swal.fire({
      title: 'Welcome',
      text: 'to Social Mediators Network',
      imageUrl: 'icon-192x192.png',
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
        title: "Any qualifications or attended trainings as a social mediator?",
        currentProgressStep: 2,
        html:
          '<textarea id="qualifications-input1" class="swal-custom-input swal-custom-input-textarea" style="width: 100%" rows="4" placeholder="Enter your qualifications and experiences. Leave empty if none..."></textarea>' +
          '<br><br>' +
          '<select style="width: 100%" class="swal-custom-input swal-custom-input-select" name="trainings-input2-select" id="trainings-input2" value="N/A"><option value="N/A">First training attended if any</option>  <option value="Social Mediation Training, July 2018">Social Mediation Training, July 2018</option>  <option value="Social Mediation in Practice, Dheryneia 2019">Social Mediation in Practice, Dheryneia 2019</option>  <option value="Social Mediation in Practice, Nicosia 2019-2020">Social Mediation in Practice, Nicosia 2019-2020</option>  <option value="Social Mediation in Practice, Pyla, 2020">Social Mediation in Practice, Pyla, 2020</option> <option value="Social Mediation for Social Transitions, online, 2021">Social Mediation for Social Transitions, online, 2021</option> <option value="Identity, Culture, and Social Mediation, Pyla, 2021">Identity, Culture, and Social Mediation, Pyla, 2021</option></select>' +
          '<br>' +
          '<p style="color: #e55353; font-style: italic; font-size: small; margin-top:5px;" >*You can add more trainings attended later</p>',
        focusConfirm: false,
        preConfirm: () => {
          return [
            enteredQualifications = (document.getElementById('qualifications-input1').value) ? document.getElementById('qualifications-input1').value : "None",
            enteredTrainings.push(document.getElementById('trainings-input2').value)
          ]
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
        title: "And last! Select your primary area of interest...",
        input: "select",
        inputPlaceholder: 'Primary area of interest',
        showConfirmButton: true,
        currentProgressStep: 4,
        inputOptions: { interests },
        inputValidator: (value) => {
          if (!value) {
            return 'You need to select something!'
          } else {
            enteredInsterest = value;

            console.log(enteredInsterest);
            if (value === "YouthRights") {
              enteredInsterest = "Youth rights";
            }
            if (value === "HumanRights") {
              enteredInsterest = "Human rights";
            }
            console.log(enteredInsterest);

            addUser(firebaseDB);
            console.log("User ".concat(user.nickname).concat(" is added!"));

            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'You are now a member!',
              showConfirmButton: false,
              timerProgressBar: true,
              timer: 2000
            })

            setTimeout(() =>
              window.location.reload(false)
              , 2000)

          }
        }
      })
    }
  }

  const slides = [
    'iclaim-slide1.jpg',
    'iclaim-slide2.jpg',
    'iclaim-slide3.jpg',
  ]

  return (
    <CRow >

      <CCol xs="12" id="homeCarousel" style={{ display: (isConnected) ? "block" : "none" }}>
        <CCarousel animate autoSlide={5000}>
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

          <p style={{ textAlign: "justify", fontSize: 'medium' }}>
            This app provides a forum for the members of the Social Mediators' Network, where they can discuss future collaborations and joint action on Social Mediation. The app features the bios, profiles and completed trainings of each member and lets all users to familiarise with the other members of the Network and complement one another's work through their individual interests and expertise.
          </p>

          <p style={{ textAlign: "justify", fontSize: 'medium' }}>
            The Social Mediators' Network developed through the Social Mediation initiative ran by ICLAIM in a series of consecutive trainings since 2018. Supporters of the Social Mediation initiative and the Social Mediators' Network include the University of Central Lancashire, UCLan Cyprus, the Centre for Sustainable Transitions, and the British High Commission. The initiative was awarded the 2020 European Citizens' Award by the European Parliament.
          </p>

          <p style={{ textAlign: "justify", fontStyle: 'italic', fontSize: 'small' }}>This platform is designed and developed as a social mediators network and can be used as a proposals tool where any member is able to post and comment.</p>

          <p style={{ textAlign: 'center', marginTop: '30px', marginBottom: '0px' }}>
            <CButton href='https://www.social-mediation.org/' color="dark" variant="outline" size="lg">Learn More</CButton>
          </p>
        </CCol>
      </CCol>

      <CCol xs="12" style={{ margin: "30px 0" }}>
        <hr style={{ width: "70%" }} />
      </CCol>

      <CCol xs="12" style={{ textAlign: 'center', marginBottom: '40px', display: (isConnected) ? "block" : "none" }}>
        <h2><strong>Highlights</strong></h2>
      </CCol>

      <CCol xs="12" sm="4" md="4" style={{ display: (isConnected) ? "block" : "none" }}>
        <CCard>
          <CCardHeader>
            <LinesEllipsis
              text='Social Mediator Joya Lahoud takes social mediation to Lebanon'
              maxLine='5'
              ellipsis='...'
              trimRight
              basedOn='letters'
            />
          </CCardHeader>
          <CCardBody>
            <LinesEllipsis
              text='During the summer of 2021, Joya organized a series of three webinars to explain more about social mediation and its importance and efficiency in solving small-scale and large-scale conflicts for Lebanese participants. Participants of all ages joined the webinars and seemed deeply interested to learn more about this effective tool and how it may contribute to solving issues in Lebanon and globally in a civil and diplomatic way. Joya highlights: "I was really so happy that we could expand our network and share social mediation in the Middle East and particularly in Lebanon, a country facing major difficulties and conflicts nowadays. Not only we explained the role of a social mediator and the mechanisms of social mediation but also we discussed small and large-scale issues by applying the theory to the Lebanese reality and how this significant tool could help the Lebanese reach their long-term goals".'
              maxLine='10'
              ellipsis='...'
              trimRight
              basedOn='letters'
            />

            {/* <div style={{ textAlign: 'end', marginTop: '15px' }}><CButton variant="outline" color="dark">Read</CButton></div> */}
          </CCardBody>

        </CCard>
      </CCol>

      <CCol xs="12" sm="4" md="4" style={{ display: (isConnected) ? "block" : "none" }}>
        <CCard>
          <CCardHeader>
            <LinesEllipsis
              text='Stavros Frangoudes and Maria Atalioti deliver Equality Fairness and Diversity Awareness Workshop'
              maxLine='5'
              ellipsis='...'
              trimRight
              basedOn='letters'
            />
          </CCardHeader>
          <CCardBody>
            <LinesEllipsis
              text='Network members had the opportunity to enjoy peer-to-peer training on equality, diversity, and fairness by social mediators Stavros and Maria. The workshop was delivered on December 11th for both in person and remote attendance, engaging the network members that could attend in a vibrant and interactive session. The workshop included a crisis simulation that participants had to address in an ethical manner. Comments from participants indicated that the workshop was captivating and informative.'
              maxLine='10'
              ellipsis='...'
              trimRight
              basedOn='letters'
            />
            {/* <div style={{ textAlign: 'end', marginTop: '15px' }}><CButton variant="outline" color="dark">Read</CButton></div> */}
          </CCardBody>

        </CCard>
      </CCol>

      <CCol xs="12" sm="4" md="4" style={{ display: (isConnected) ? "block" : "none" }}>
        <CCard>
          <CCardHeader>
            <LinesEllipsis
              text='Social mediation and social work'
              maxLine='5'
              ellipsis='...'
              trimRight
              basedOn='letters'
            />
          </CCardHeader>
          <CCardBody>
            <LinesEllipsis
              text='On 7 November 2021, Network member, Dr Eleni Athanasiou invited ICLAIM to present at the 34th International Conference of The Council of International Fellowship, organised by the European University Cyprus. There we had the opportunity to present before an international audience of Social Workers from Southeast Asia to Latin America the Social Mediation project and participate in a lively discussion on how Social Mediation can be used effectively in the provision of social services. Some countries have already been implementing similar projects publicly and the results have been very positive.'
              maxLine='10'
              ellipsis='...'
              trimRight
              basedOn='letters'
            />
            {/* <div style={{ textAlign: 'end', marginTop: '15px' }}><CButton variant="outline" color="dark">Read</CButton></div> */}
          </CCardBody>
        </CCard>
      </CCol>

      <CCol xs="12" style={{ margin: "30px 0 45px", display: (isConnected) ? "block" : "none" }}>
        <hr style={{ width: "70%" }} />
      </CCol>

    </CRow >


  )
}

export default Home

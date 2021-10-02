import React, { useState } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import { collection, getDocs, setDoc, doc } from 'firebase/firestore';
import { firebaseDB } from 'src/reusable/firebaseConfig';

import {
  CCard,
  CCardBody,
  CCardHeader,
  CCarousel,
  CCarouselControl,
  CCarouselIndicators,
  CCarouselInner,
  CCarouselItem,
  CCol,
  CRow, CButton, CImg
} from '@coreui/react'
import LinesEllipsis from 'react-lines-ellipsis'
import { SocialMediatorsBasicTable } from 'src/reusable/Tables/SocialMediatorsBasicTable'
import { v4 as uuidv4 } from 'uuid';


const Home = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  const [firebaseFlag, setFirebaseFlag] = useState(false);

  // Check if user is logged in
  if (isAuthenticated && !firebaseFlag) {
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
          console.log('User ' + user.email + ' already exists!');
          memberFlag = true;
        }
      })
      // Add member
      if (!memberFlag) {
        const enteredFirstName = prompt('Please enter your first name:');
        const enteredLastName = prompt('Please enter your last name:');

        var autoID = uuidv4();
        console.log(autoID);

        const addUser = async (db) => {
          await setDoc(doc(db, "users", user.email), {
            id: autoID,
            email: user.email,
            firstName: enteredFirstName,
            lastName: enteredLastName,
            name: user.name,
            picture: user.picture,
            nickname: user.nickname,
            createdAt: user.updated_at,
            loginTimes: 0,
          });
        }
        addUser(firebaseDB);
        console.log("Added!");
      }
    }
    getUsers(firebaseDB);
    setFirebaseFlag(true);
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

      <CCol xs="12" sm="6" md="4">
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

      <CCol xs="12" sm="6" md="4">
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

      <CCol xs="12" sm="6" md="4">
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

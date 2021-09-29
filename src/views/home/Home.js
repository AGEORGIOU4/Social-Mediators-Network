import React from 'react'
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
  CRow, CProgress
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
const Home = () => {

  const slides = [
    'iclaim-slide1.jpg',
    'iclaim-slide2.jpg',
    'iclaim-slide3.jpg',
  ]

  return (
    <CRow >
      <CCol xs="12">
        <CCard>

          <CCardHeader>
            <strong>Welcome to ICLAIM Social Mediators Platform</strong>
          </CCardHeader>

          <CCardBody>

            <CCarousel animate autoSlide={3000}>
              <CCarouselIndicators style={{ color: 'grey' }} />
              <CCarouselInner>

                <CCarouselItem>
                  <img className="d-block w-100" src={slides[0]} alt="slide 1" />
                </CCarouselItem>

                <CCarouselItem>
                  <img className="d-block w-100" src={slides[1]} alt="slide 2" />
                </CCarouselItem>

                <CCarouselItem>
                  <img className="d-block w-100" src={slides[2]} alt="slide 3" />
                </CCarouselItem>

              </CCarouselInner>

              <CCarouselControl direction="prev" />
              <CCarouselControl direction="next" />

            </CCarousel>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs="12">
      </CCol>
    </CRow >
  )
}

export default Home

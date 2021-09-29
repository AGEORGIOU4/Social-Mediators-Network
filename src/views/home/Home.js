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
  CRow
} from '@coreui/react'

const Home = () => {

  const slides = [
    'iclaim-slide1.jpg',
    'iclaim-slide2.jpg',
    'iclaim-slide3.jpg',
  ]

  return (
    <CRow xs="6">
      <CCol xs="12" xl="12">
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
    </CRow>
  )
}

export default Home

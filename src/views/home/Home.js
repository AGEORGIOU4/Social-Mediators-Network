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
  CRow, CButton, CCardFooter
} from '@coreui/react'
import LinesEllipsis from 'react-lines-ellipsis'
import DocsLink from 'src/reusable/DocsLink'
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

            <div style={{ textAlign: 'end', marginTop: '5px' }}><CButton color="primary">Read</CButton></div>
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
            <div style={{ textAlign: 'end', marginTop: '5px' }}><CButton color="primary">Read</CButton></div>
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
            <div style={{ textAlign: 'end', marginTop: '5px' }}><CButton color="primary">Read</CButton></div>
          </CCardBody>

        </CCard>
      </CCol>
    </CRow >
  )
}

export default Home

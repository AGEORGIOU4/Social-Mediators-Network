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
  CRow, CButton, CImg, CJumbotron
} from '@coreui/react'
import LinesEllipsis from 'react-lines-ellipsis'

const Home = () => {

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

    </CRow >
  )
}

export default Home

import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {
  CSidebar,
  CSidebarClose, CCo
} from '@coreui/react'

const TheAside = () => {
  const show = useSelector(state => state.asideShow)
  const dispatch = useDispatch()
  const setState = (state) => dispatch({ type: 'set', asideShow: state })

  return (
    <CSidebar
      aside
      colorScheme='light'
      size='lg'
      overlaid
      show={show}
      onShowChange={(state) => setState(state)}
    >
      <CSidebarClose onClick={() => setState(false)} />

      <div style={{ textAlign: 'center' }}>
        <iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Ficlaimcentre%2F&tabs=timeline%2C%20events%2Cmessages&width=500&height=750&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
          width="320" height="750"
          style={{ border: 'none', overflow: 'hidden' }} scrolling="no" frameBorder="0" allowFullScreen={true} allow="autoplay 
           clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>


        <div className="fb-page" data-href="https://www.facebook.com/iclaimcentre/"
          data-tabs="timeline, events,messages"
          data-width="500" data-height="750" data-small-header="false"
          data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true">
          <blockquote cite="https://www.facebook.com/iclaimcentre/" className="fb-xfbml-parse-ignore">
            <a href="https://www.facebook.com/iclaimcentre/">Interdisciplinary Centre for Law, Alternative and Innovative Methods</a></blockquote></div>
      </div>

      <div className="nav-underline">
        <div className="nav nav-tabs">
          <div className="nav-item">
            <div className="nav-link">Facebook Feed</div>
          </div>
        </div>
      </div>
    </CSidebar>
  )
}

export default React.memo(TheAside)

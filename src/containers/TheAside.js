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

      show={show}
      onShowChange={(state) => setState(state)}
    >
      <CSidebarClose onClick={() => setState(false)} />

      <div style={{ textAlign: 'center' }}>
        <iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Ficlaimcentre%2F&tabs=timeline%2C%20events%2Cmessages&width=300&height=750&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
          width="300" height="750"
          style={{ border: 'none', overflow: 'hidden' }}></iframe>


        <div className="fb-page" data-href="https://www.facebook.com/iclaimcentre">

          <blockquote cite="https://www.facebook.com/iclaimcentre">
            <a href="https://www.facebook.com/iclaimcentre">Interdisciplinary Centre for Law, Alternative and Innovative Methods</a></blockquote></div>

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

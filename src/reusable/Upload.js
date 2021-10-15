import { useState } from 'react';
import { uploadBytes } from '@firebase/storage';
import { getStorage, ref, getDownloadURL } from '@firebase/storage';
import { CButton, CCol, CSpinner } from '@coreui/react';
import Swal from 'sweetalert2';

export var testUrl = 'hello';

function Upload(props) {
  const [image, setImage] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const imagePath = 'images/'.concat(props.email).concat("-avatar");

  // Upload
  const storage = getStorage();
  const storageRef = ref(storage, imagePath);

  const upload = () => {

    if (image === '') {
      alert("Forgot something? :)")
      return;
    } else {
      setLoading(true);
      uploadBytes(storageRef, image).then((snapshot) => {
        setLoading(false);

        const Toast = Swal.mixin({
          toast: true,
          position: 'bottom-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: false,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })

        Toast.fire({
          icon: 'success',
          title: 'Uploaded successfully'
        })

        getDownloadURL(ref(storage, imagePath))
          .then((url) => {
            setImageUrl(url);
            testUrl = url;
            console.log(testUrl);
          })
      });
    }
  }

  return (
    <div>
      <div style={{ display: (loading) ? "none" : "block" }}>
        <CCol >
          <input type="file" onChange={(e) => { setImage(e.target.files[0]) }} />
        </CCol>
        <CCol lg="12" xs="12" md="12" style={{ textAlign: "end" }}>
          <CButton color="secondary" onClick={upload}>Upload</CButton>
        </CCol>
      </div>

      <div style={{ display: (loading) ? "block" : "none" }}>
        <center>
          <CCol>
            <CSpinner color='primary' grow />
          </CCol>
        </center>
      </div>

    </div>
  );
}
export default Upload;
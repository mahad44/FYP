import { useState } from 'react';
import axios from "axios";
import $ from 'jquery';
import { Image } from 'react-bootstrap';
// import ReactCrop from 'react-image-crop'
// import 'react-image-crop/dist/ReactCrop.css';

const UpdateProfileView = () => {

    let initialPreview = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBKEGmmEQ4WlpXIfdqhhaFbJER2pXMLOFU3A&usqp=CAU";
    const [selectedFile,setSelectedFile] = useState(null);
    const [file,setFile] = useState("");
    let crop = {aspect: 1/1};

    const singleFileChangedHandler = ( event ) => {
    setSelectedFile(event.target.files[0]);
    };

    const singleFileUploadHandler = ( event ) => {
        const data = new FormData();
      // If file selected
        if ( selectedFile ) {
      data.append( 'profileImage', selectedFile, selectedFile.name );
      axios.post( 'http://localhost:5000/api/profile/profile-img-upload', data, {
          headers: {
           'accept': 'application/json',
           'Accept-Language': 'en-US,en;q=0.8',
           'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
          }
         })
          .then( ( response ) => {
            if ( 200 === response.status ) {
            // If file size is larger than expected.
            if( response.data.error ) {
             if ( 'LIMIT_FILE_SIZE' === response.data.error.code ) {
              ocShowAlert( 'Max size: 2MB', 'red' );
             } else {
             console.log( response.data );
             // If not the given file type
             ocShowAlert( response.data.error, 'red' );
             }
            } 
            else {
             // Success
             let fileName = response.data;
             setFile(response.data);
             console.log( 'fileName', fileName );
             console.log( response.data);
             ocShowAlert( 'File Uploaded', '#3089cf' );
            }
           }
          }).catch( ( error ) => {
          // If another error
          ocShowAlert( error, 'red' );
         });
        } 
        else {
         // if file not selected throw error
         ocShowAlert( 'Please upload file', 'red' );
        }
      };

    // ShowAlert Function
    const ocShowAlert = ( message, background = '#3089cf' ) => {
        let alertContainer = document.querySelector( '#oc-alert-container' ),
        alertEl = document.createElement( 'div' ),
        textNode = document.createTextNode( message );
        alertEl.setAttribute( 'class', 'oc-alert-pop-up' );
        $( alertEl ).css( 'background', background );
        alertEl.appendChild( textNode );
        alertContainer.appendChild( alertEl );
        setTimeout( function () {
        $( alertEl ).fadeOut( 'slow' );
        $( alertEl ).remove();
        }, 3000 );
    };

    const resetPicture = () => {
        setSelectedFile(null);
        setFile("");
    }


    return ( 
        <>
        <div className="container mt-5 w-75 ">
            <h1>Set Your Profile Here</h1>

            <div>
                {/* For Alert box*/}
                <div id="oc-alert-container"></div>
                {/* Single File Upload*/}
                <div className="card border-light mb-5 mt-5" style={{ boxShadow: '0 5px 10px 2px rgba(195,192,192,.5)' }}>
                    <div className="card-header">
                        <h3 style={{ color: '#555', marginLeft: '12px' }}>Upload a Profile Picture</h3>
                        <p className="text-muted" style={{ marginLeft: '12px' }}>Upload Size: 250px x 250px ( Max 2MB )</p>
                    </div>
                    <div className="card-body">
                        <p className="card-text">Please upload an image for your profile</p>
                        <div className='w-50'>
                            {selectedFile && selectedFile !== null && <img src={URL.createObjectURL(selectedFile)}></img>}

                            {/* Attempt to crop */}
                            {/* {selectedFile && selectedFile !== null && <ReactCrop crop={crop} src={URL.createObjectURL(selectedFile)} />} */}

                            {selectedFile === null && <img src={initialPreview}></img>}
                        </div>
                        <input type="file" onChange={singleFileChangedHandler}/>
                        <div className="mt-5">
                            <button className='btn btn-danger' onClick={resetPicture}>Reset</button>
                            <button className={file!=="" ? "btn btn-info disabled" : "btn btn-info"} onClick={singleFileUploadHandler}>Upload!</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        </>
     );
}
 
export default UpdateProfileView;
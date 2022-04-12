import { useState } from "react";
import { Link } from "react-router-dom";
import AvatarImageCropper from 'react-avatar-image-cropper';
import ReactDOM from 'react-dom';
import React, {Component} from 'react';
import Multiselect from 'multiselect-react-dropdown';
import { updateStudents } from "../API calls/users";
import axios from "axios";

const StudentFormNew = () => {
    const userId=JSON.parse(localStorage.getItem("user"));
    const [selectedImage,setSelectedImage] = useState();
    const [imageStatus,setImageStuatus] = useState("");
    const [shortDescription,setShortDescription] = useState("");
    const [longDescription,setLongDescription] = useState("");
    const [courses,setCourses] = useState([]);
    const [freeSlots,setFreeSlots] = useState([]);
    const objectArray= [
        { key: "Mon-Wed 1st Slot(8:30am-9:45am)", cat: "Mon-Wed" },
        { key: "Mon-Wed 2nd Slot(10:00am-11:15am)", cat: "Mon-Wed" },
        { key: "Mon-Wed 3rd Slot(11:30am-12:45pm)", cat: "Mon-Wed" },
        { key: "Mon-Wed Break Slot(01:00pm-02:15pm)", cat: "Mon-Wed" },
        { key: "Mon-Wed 4th Slot(03:30pm-04:45pm)", cat: "Mon-Wed" },
        { key: "Mon-Wed 5th Slot(04:00pm-05:15pm)", cat: "Mon-Wed" },
        { key: "Mon-Wed 6th Slot(05:30pm-06:45pm)", cat: "Mon-Wed" },
        { key: "Tue-Thur 1st Slot(8:30am-9:45am)", cat: "Tue-Thur" },
        { key: "Tue-Thur 2nd Slot(10:00am-11:15am)", cat: "Tue-Thur" },
        { key: "Tue-Thur 3rd Slot(11:30am-12:45pm)", cat: "Tue-Thur" },
        { key: "Tue-Thur Break Slot(01:00pm-02:15pm)", cat: "Tue-Thur" },
        { key: "Tue-Thur 4th Slot(03:30pm-04:45pm)", cat: "Tue-Thur" },
        { key: "Tue-Thur 5th Slot(04:00pm-05:15pm)", cat: "Tue-Thur" },
        { key: "Tue-Thur 6th Slot(05:30pm-06:45pm)", cat: "Tue-Thur" },
        { key: "Fri-Sat 1st Slot(8:30am-9:45am)", cat: "Fri-Sat" },
        { key: "Fri-Sat 2nd Slot(10:00am-11:15am)", cat: "Fri-Sat" },
        { key: "Fri-Sat 3rd Slot(11:30am-12:45pm)", cat: "Fri-Sat" },
        { key: "Fri-Sat Break Slot(01:00pm-02:15pm)", cat: "Fri-Sat" },
        { key: "Fri-Sat 4th Slot(03:30pm-04:45pm)", cat: "Fri-Sat" },
        { key: "Fri-Sat 5th Slot(04:00pm-05:15pm)", cat: "Fri-Sat" },
        { key: "Fri-Sat 6th Slot(05:30pm-06:45pm)", cat: "Fri-Sat" },
      ];
    
    

    const apply = (file) => {
        //handle the blob file you want
        //such as get the image src
       // var src = window.URL.createObjectURL(file);
        //localStorage.setItem("image",src)
        //console.log("src",src)
        console.log("file",file)
    
        setSelectedImage(file)
        setImageStuatus("image uploaded successfully")
        
        console.log(selectedImage)
           
    
    }

    const handleFormChange = (index, event) => {
        console.log("before",courses)
        let data = [...courses];
        data[index] = event.target.value;
        setCourses(data);
        console.log(courses)
      }

    
    const removeFields = (index) => {
        let data = [...courses];
        data.splice(index, 1)
        setCourses(data)
      }

    const addCourses = () => {
        let newfield = {  }
        setCourses([...courses, newfield])
      }

      const handleMultiselect = (event) => {
        var newArray = freeSlots.slice();   
        let result = event.map(a => a.key); 
          newArray.push(event); 
          setFreeSlots(event)
       console.log(freeSlots)
      }

      const reset = () => {
       window.location.reload();
      }

      const submit = () => {
        const data = new FormData();
        data.append( 'profileImage', selectedImage, selectedImage.name );
        axios.post( 'http://localhost:5000/api/profile/profile-img-upload', data, {
            headers: {
             'accept': 'application/json',
             'Accept-Language': 'en-US,en;q=0.8',
             'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
            }
           })
           .then((response)=>{
              console.log(response)
              console.log(response.data.location)

           const data1 = {
            shortDescription: shortDescription,
            longDescription: longDescription,
            freeTime: freeSlots,
            userId:userId._id,
            electives:courses,
            image:response.data.location
          };
        
          updateStudents(data1);
        })
      }

    return ( 
        <>
        <div className="container mt-5 w-75 ">
            <h1>Kindly fill in your details first to begin</h1>

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
                        <div style={{ width: '200px', height: '200px', border: '1px solid black' }}>
                        <AvatarImageCropper apply={apply.bind(this)} />
                       </div>
                       {imageStatus}
                       <br></br>
                       <br></br>
                       <br></br>
                       <br></br>
                       <strong>Short Description</strong><a> (Add a short paragraph about your interests)</a>
                       <br></br>
                      <textarea style={{width:'100%'}} onChange={e => setShortDescription(e.target.value)}></textarea>
                      <br></br>
                      <br></br>
                     <strong>Long Description</strong><a> (Add a detailed paragraph of your interests)</a>
                     <br></br>
                     <textarea style={{width:'100%'}} onChange={e => setLongDescription(e.target.value)}></textarea>
                     <br></br>
                     <br></br>
                     <strong>Courses Completed</strong><a> (Add relevant courses)</a>
                    <br></br>
                    {courses.map((input, index) => {
                    return(
                    <div key={index}>
                     <input
                     name='name'
                     style={{width:'50%'}}
                     placeholder='Name'
                     value={input.name}
                     onChange={event => handleFormChange(index, event)}
                     />
                     <button class=" btn-danger m-1" onClick={() => removeFields(index)}>Remove</button>
                   </div>
                     )
                  })}
          <button class=" btn-info" onClick={() =>addCourses()}>Add Course..</button>
          <br></br>
          <br></br>
             <strong>Free Slots</strong>
             <br></br>
             <Multiselect
             options={objectArray}
             groupBy="cat"
             displayValue="key"
             showCheckbox={true}
             id="css_custom"
             value='1'
             onSelect={event => handleMultiselect(event)}
              />
            <br></br>
                        <div className="mt-5 text-center">
                            <button className='btn btn-danger' onClick={()=>reset()}>Reset</button>
                            <button className={selectedImage===undefined || courses.length===0 || freeSlots.length===0 || shortDescription==="" || longDescription===""? "btn btn-success disabled" : "btn btn-success"} onClick={()=>submit()} >Upload!</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        </>
     );
}
 
export default StudentFormNew;
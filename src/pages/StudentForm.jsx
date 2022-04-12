
import { useState } from "react";
import { Link } from "react-router-dom";
import AvatarImageCropper from 'react-avatar-image-cropper';
import ReactDOM from 'react-dom';
import React, {Component} from 'react';
import Multiselect from 'multiselect-react-dropdown';
import { updateStudents } from "../API calls/users";
import axios from "axios";


class StudentForm extends React.Component {
  

  state = {
    userId:JSON.parse(localStorage.getItem("user")),
    shortDescription:"",
    longDescription:"",
    image:"",
    selectedImage:null,
    inputFields:[],
    freeSlots:[],
    objectArray: [
      { key: "1st Slot(8:30am-9:45am)", cat: "Mon-Wed" },
      { key: "2nd Slot(10:00am-11:15am)", cat: "Mon-Wed" },
      { key: "3rd Slot(11:30am-12:45pm)", cat: "Mon-Wed" },
      { key: "Break Slot(01:00pm-02:15pm)", cat: "Mon-Wed" },
      { key: "4th Slot(03:30pm-04:45pm)", cat: "Mon-Wed" },
      { key: "5th Slot(04:00pm-05:15pm)", cat: "Mon-Wed" },
      { key: "6th Slot(05:30pm-06:45pm)", cat: "Mon-Wed" },
      { key: "1st Slot(8:30am-9:45am)", cat: "Tue-Thur" },
      { key: "2nd Slot(10:00am-11:15am)", cat: "Tue-Thur" },
      { key: "3rd Slot(11:30am-12:45pm)", cat: "Tue-Thur" },
      { key: "Break Slot(01:00pm-02:15pm)", cat: "Tue-Thur" },
      { key: "4th Slot(03:30pm-04:45pm)", cat: "Tue-Thur" },
      { key: "5th Slot(04:00pm-05:15pm)", cat: "Tue-Thur" },
      { key: "6th Slot(05:30pm-06:45pm)", cat: "Tue-Thur" },
      { key: "1st Slot(8:30am-9:45am)", cat: "Fri-Sat" },
      { key: "2nd Slot(10:00am-11:15am)", cat: "Fri-Sat" },
      { key: "3rd Slot(11:30am-12:45pm)", cat: "Fri-Sat" },
      { key: "Break Slot(01:00pm-02:15pm)", cat: "Fri-Sat" },
      { key: "4th Slot(03:30pm-04:45pm)", cat: "Fri-Sat" },
      { key: "5th Slot(04:00pm-05:15pm)", cat: "Fri-Sat" },
      { key: "6th Slot(05:30pm-06:45pm)", cat: "Fri-Sat" },
    ],
  }

  apply = (file) => {
    // handle the blob file you want
    // such as get the image src
    
    var src = window.URL.createObjectURL(file);
    //localStorage.setItem("image",src)
    console.log("src",src)
    console.log("file",file)
    const data = new FormData();

    this.setState({selectedImage:file})
    this.setState({image:"image uploaded successfully"})
    data.append( 'profileImage', file, file.name );
    axios.post( 'http://localhost:5000/api/profile/profile-img-upload', data, {
        headers: {
         'accept': 'application/json',
         'Accept-Language': 'en-US,en;q=0.8',
         'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
        }
       })
       .then((response)=>{
          console.log(response)
       })
       

}

 handleFormChange = (index, event) => {
  let data = [...this.state.inputFields];
  data[index] = event.target.value;
  this.setState({inputFields:data});
  //console.log(this.state.inputFields)
}

handleMultiselect = (event) => {
  var newArray = this.state.freeSlots.slice();   
  let result = event.map(a => a.key); 
    newArray.push(event); 
    //newArray:event;  
    this.setState({freeSlots:event})
  //let data = [...this.state.inputFields];
  //data[index] = event.key;
  //this.setState({inputFields:data});
  //this.setState({freeSlots:event.value})
  //console.log(this.state.freeSlots)
 // console.log(result)
  //console.log('1')
}

addFields = () => {
  let newfield = {  }

  this.setState({inputFields:[...this.state.inputFields, newfield]})
}

removeFields = (index) => {
  let data = [...this.state.inputFields];
  data.splice(index, 1)
  this.setState({inputFields:data})
}

submit = () => {
  const data = {
    shortDescription: this.state.shortDescription,
    longDescription: this.state.longDescription,
    freeTime: this.state.freeSlots,
    userId:this.state.userId._id
  };

  updateStudents(data);
  console.log(this.state.userId._id)


}


render() {
 return ( 
    <>
    <div className = "container-fluid">
        <div className="row ">
      <section
        className="col-lg-6 d-none d-sm-none d-md-none d-lg-block"
        style={{ backgroundColor: "black", height: "95vh" }}
      >
        <img 
          style={{height:"100%", maxWidth:"100%"}}
          src="https://media-exp1.licdn.com/dms/image/C4D1BAQHoOBUqrNm_8Q/company-background_10000/0/1637003704197?e=2159024400&v=beta&t=BPHFYnIA-uDoJ3rdpoyM772qiXYMj1zxGYiv5Lz_ouE"
          className="img-fluid rounded-start "
          alt="..."
        />
      </section>
      <div className="col-12 col-lg-6 mt-5 ">
        <h1>Welcome to PMATS</h1>
        <p>
          To proceed you first need to fill in your details. 
          <strong> Kindly fill the required fields </strong>
        </p>

        <div className="card">
          <div className="card-body">
            {/*<form>
              <div className="row">
                <div className="form-group ">
                  <label className="form-label">
                    <strong>ERP</strong>
                  </label>
                  <input
                    onChange
                    type="text"
                    className="form-control"
                    placeholder="Enter your ERP here"
                    autoFocus
                  />
                </div>
              </div>
              <div className="row">
                <div className="form-group mt-3">
                  <label className="form-label">
                    <strong>Profile Image</strong>
                  </label>
                 
                </div>
              </div>
              <input type="file" name="image" className="form-input"/>
              <br></br>
              <br></br>

              <div class="select">
                    <select>
                    <option value="1">Select</option>
                    <option value="2">Option 1</option>
                    <option value="3">Option 2</option>
                   </select>
              </div>
              
              <div className="row mt-4">
                <div className="col-md-2">
                  {/*<button
                    type="submit"
                    className="btn btn-primary submitbutton  "
                  
                  >
                    Login
 </button>
                </div>

                
              </div>
            </form>*/}
            <strong>Profile Picture</strong>
            <div style={{ width: '200px', height: '200px', border: '1px solid black' }}>
              <AvatarImageCropper apply={this.apply.bind(this)} />
             </div>
            {this.state.image}
            <strong>Short Description</strong>
            <br></br>
            <textarea style={{width:'500px'}} onChange={e => this.setState({shortDescription:e.target.value})}></textarea>
            <br></br>
            <strong>Long Description</strong>
            <br></br>
            <textarea style={{width:'500px'}} onChange={e => this.setState({longDescription:e.target.value})}></textarea>
            <br></br>
            <strong>Courses Completed</strong>
            <br></br>
            {this.state.inputFields.map((input, index) => {
              return(
            <div key={index}>
              <input
                name='name'
                style={{width:'500px'}}
                placeholder='Name'
                value={input.name}
               onChange={event => this.handleFormChange(index, event)}
              />
              <button class="btn-danger m-1" onClick={() => this.removeFields(index)}>Remove</button>
            </div>
              )
          })}
          <button class="btn-success" onClick={this.addFields}>Add Course..</button>
          <br></br>
             <strong>Free Slots</strong>
             <br></br>
             
             <Multiselect
             options={this.state.objectArray}
             groupBy="cat"
             displayValue="key"
             showCheckbox={true}
             id="css_custom"
             value='1'
             onSelect={event => this.handleMultiselect(event)}
              />
            <br></br>
            <button  onClick={this.submit}
                    type="submit"
                    className="btn btn-primary submitbutton  "
                    >
                    Submit
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
    </>
 );
                  }
                }
export default StudentForm;

import { useState, useEffect } from 'react';
import {useParams} from 'react-router';
import Image from 'react-bootstrap/Image';
import { fetchUser } from "../API calls/users";
import Spinner from './../Components/Spinner';
import '../pages/css/userDetail.css';



const UserDetails = () => {

    const {userId} = useParams();
    const [user,setUser] = useState([]);
    const [profile,setProfile] = useState([]);
    const [responseRecieved, setResponseRecieved] = useState(false);
    

    useEffect(() => {
        fetchUser(userId)
          .then(response => {
            setResponseRecieved(true);
            setUser(response.data.data.user);
            setProfile(response.data.data.studentUser);
            console.log(response.data.data);
          })
          .catch(err => {
            setResponseRecieved(true);
            // setError(true);
          });
    }, []);

    return ( 
        <>
        {
        
        responseRecieved ?
        
        <div className="container mt-5 h-75 border rounded mb-5" style={{backgroundColor: "#F6F6F6"}}>
            {/* <h1>User : {userId}</h1> */}

            <div className="row rounded border bg-dark text-light p-5">
                <div className="col-md-2">
                    
                    <img className='rounded' src="https://media-exp1.licdn.com/dms/image/C4E03AQEJO6VffaNfoA/profile-displayphoto-shrink_200_200/0/1610983771633?e=1652313600&v=beta&t=89k6G3s9LTVaax5TOu1HMG1odHDn40jg3meUJ0Myw5I" alt="" />
                </div>
                <div className="col-md-7 p-5">
                    <h1>
                        {user.username}
                    </h1>
                    <h2 style={{color: "lightgray"}}>
                        BSCS Senior
                    </h2>
                </div>
                <div className="col-3 p-5 mt-3">
                    <button className='btn btn-light btn-lg'>
                        Send Request
                    </button> 
                </div>
            </div>
            <div className="row bg-dark">
                <div className="col-6 border p-5 bg-dark text-light">
                    <h2 style={{color: 'lightgray'}}>
                        About
                    </h2>
                    <h5>
                        {profile.longDescription}
                    </h5>
                </div>
                <div className="col-6 p-5 border  text-light">
                    <h2 style={{color: 'lightgray'}}>
                        Interested In
                    </h2>
                </div>
            </div>
            <div className="row bg-dark">
                <div className="col-6 border p-5 bg-dark text-light">
                    <h2 style={{color: 'lightgray'}}>
                        Specialized Courses
                    </h2>
                    <h5>
                        <ul>
                            <li>
                                Data Mining 
                            </li>
                            <li>
                                Warehousing 
                            </li>
                        </ul>
                    </h5>
                </div>
                <div className="col-6 p-5 border  text-light">
                    <h2 style={{color: 'lightgray'}}>
                        Free Slots
                    </h2>
                </div>
            </div>

        </div>
        :
        <div>
            <Spinner text="Fetching Data" />
        </div>
    
        }
        </>
     );
}
 
export default UserDetails;
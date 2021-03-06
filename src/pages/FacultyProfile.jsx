import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import Spinner from './../Components/Spinner';
import { fetchUser } from "../API calls/users";
import { createRequest } from "../API calls/request"



const FacultyProfile = () => {

    const {facultyId} = useParams();
    const [user,setUser] = useState([]);
    const [profile,setProfile] = useState([]);
    const [responseRecieved, setResponseRecieved] = useState(false);
    const [requestSent,setRequestSent] = useState(false);
    var userProfile = JSON.parse(localStorage.getItem('profile'));

    useEffect(() => {
        let data = {
            groupId: userProfile.groupId
        }
        fetchUser(data,facultyId)
          .then(response => {
            setResponseRecieved(true);
            setUser(response.data.data.user);
            setProfile(response.data.data.facultyUser);
            setRequestSent(response.data.data.sentRequest)
            console.log("RESPONSE BELOW");
            console.log(response.data.data);

          })
          .catch(err => {
            setResponseRecieved(true);
            // setError(true);
          });
    }, []);

    const sendRequest = async => {
        console.log("button clicked");
        let data = {
            groupId: userProfile.groupId,
            recieverId: user._id,
            requestType: "supervisor",
            proposalFile: "",
            message: "hey"
        }

        createRequest(data)
        .then(response=> {
            if(response.status !== 200){
                alert('Unable to send request');
            }
            else{
                setRequestSent(true);

            }
        })
    }

    return ( 
        <>
        {
        
        responseRecieved ?
        
        <div className="container mt-5 h-75 border border-dark mb-5" style={{backgroundColor: "#E3E3E3", borderRadius: "25px"}}>
            {/* <h1>User : {userId}</h1> */}

            <div className="row  p-5">
                <div className="col-md-2">
                    
                    <img style={{borderRadius: "25px"}} src="data:image/jpeg;base64,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" alt="" />
                </div>
                <div className="col-md-7 p-5">
                    <h1>
                        Imran Rauf
                    </h1>
                    <h2 style={{color: "darkgray"}}>
                        Senior Faculty
                    </h2>
                </div>
                <div className="col-3 p-5 mt-3">
                    {requestSent === false ? <button onClick={sendRequest} className='btn btn-secondary btn-lg'>
                        Send Request
                    </button> : 
                    <button disabled className='btn btn-info btn-lg'>
                        Sent
                    </button> }
                </div>
            </div>
            <div className="row" >
                <div className="col-6 p-5 ">
                    <div className="row bg bg-dark p-4 text-light" style={{borderRadius: "25px"}}>
                        <h2 style={{color: 'lightgray'}} >
                            About
                        </h2>
                        <h5>
                            {profile.longDescription}
                            I am a highly decorated and passionate teacher about data structures and algorithm
                        </h5>  
                    </div>
                </div>
                <div className="col-6 p-5   text-light">
                    <div className="row bg bg-dark p-4 text-light" style={{borderRadius: "25px"}}>
                        <h2 style={{color: 'lightgray'}}>
                            Interested In
                        </h2> 
                        <h5>
                            {/* {profile.longDescription} */}
                            I am keen to solve problems via optimization the time and resources available to us.
                        </h5>  
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-6 p-5 text-light">
                    <div className="row bg bg-dark p-4 text-light" style={{borderRadius: "25px"}}>   
                        <h2 style={{color: 'lightgray'}}>
                            Specializations
                        </h2>
                        <h5>
                            <ul>
                                <li>Programming </li>
                                <li>Algorithms </li>
                                <li>Data Structures </li>
                            </ul>
                        </h5>
                    </div>
                </div>
                <div className="col-6 p-5 text-light">
                    <div className="row bg bg-dark p-4 text-light" style={{borderRadius: "25px"}}>
                        <h2 style={{color: 'lightgray'}}>
                            Free Slots
                        </h2>
                        <h5>
                            <li> Monday : 11 - 13</li>
                            <li> Wednesday : 14-16</li>
                        </h5>
                    </div>
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
 
export default FacultyProfile;
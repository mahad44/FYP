
// import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { fetchSentRequests, fetchRecievedRequests, acceptRequest } from '../API calls/request';
import RequestCard from '../Components/RequestCard';
import Spinner from './../Components/Spinner';
import { cancelRequest } from './../API calls/request';
import { withRouter } from 'react-router-dom';


const ViewRequests = ({history}) => {

    var userProfile = JSON.parse(localStorage.getItem('profile'));
    const userId = userProfile.groupId;
    const [requests,setRequests] = useState([]);
    const [recievedRequests, setRecievedRequests] = useState([]);
    const [responseRecieved, setResponseRecieved] = useState(false);
    // const [sent,setSent] = useState(true);
    // const [recieved,setRecieved] = useState(true);
    const [selectedRequestType, setSelectedRequestType] = useState("Sent");
    let options = ["Sent","Recieved"];




    useEffect(() => {
        fetchSentRequests(userId)
          .then(response => {
            if(response.status!==200){
                alert('Unable to fetch sent requests')
            }
            else{
                setResponseRecieved(true);
                setRequests(response.data.data.sentRequests);
                console.log(response.data.data);
            }
          })
          .catch(err => {
            setResponseRecieved(true);
            // setError(true);
          });

        fetchRecievedRequests(userProfile.userId)
        .then(response => {
            if(response.status!==200){
                alert('Unable to fetch sent requests')
            }
            else{
                setResponseRecieved(true);
                setRecievedRequests(response.data.data.recievedRequests);
                console.log("Recieved Results");
                console.log(response.data.data);
            }
          })
          .catch(err => {
            setResponseRecieved(true);
            console.log("ERROR")
            // setError(true);
          });
    },[userId,userProfile.userId]);

    const accept = requestId => {
        let oldRecievedRequests = [...recievedRequests];
        let newRecievedRequests = recievedRequests.filter(req=> req._id!== requestId);
        let thisRequest = oldRecievedRequests.find(element=>element._id === requestId);
        let newRequest = {...thisRequest};
        newRequest.status="accepted";
        let updatedRecievedRequests = [...newRecievedRequests,newRequest];
        setRecievedRequests(updatedRecievedRequests);

        acceptRequest(requestId)
        .then(response=>{
            if(!response.data.data.actionPerformedSuccessfully){
                setRequests(oldRecievedRequests);
                alert('Sorry! Unable to accept the request.');
            }
            else{
                let newUserProfile = {...userProfile};
                newUserProfile.groupId = response.data.data.newGroupId;
                localStorage.setItem("profile", JSON.stringify(newUserProfile));
                history.push("/mygroup");
            }
        })
        .catch(error=>{
            setRequests(oldRecievedRequests);
            alert('Sorry! Unable to accept the request.');
        })
    }

    const remove = requestId => {

        let oldRequests = [...requests];
        let newRequests = requests.filter(req=> req._id!== requestId);
        setRequests(newRequests);

        console.log("RequestId value in Remov function " + requestId);

        cancelRequest(requestId)
        .then(response=>{
            if(response.data.data.requestDeleted ==="false"){
                setRequests(oldRequests);
                alert('Sorry! Unable to delete the request.');
            }
            else{
            }
        })
        .catch(error=>{
            setRequests(oldRequests);
            alert('Sorry! Unable to delete the request.');
        })
    } 

    // const toggle = () => {
    //     setSent(!sent);
    //     setRecieved(!recieved);
    // }

    return ( 
        <>
        {
            responseRecieved ?
        <>

        <div className="container mt-5">
            <h1>
                Your Requests ...
            </h1>
            {/* <button className="btn btn-primary">Sent</button>
            <button onClick={()=>toggle()} className="btn btn-primary">Recieved</button> */}
            

            <div className="mt-5" >

            <div className='row d-flex justify-content-end w-75 m-2  mb-5'>
                <select className='form-select w-25' value={selectedRequestType} onChange={(e) => setSelectedRequestType(e.target.value)} name="requestType" id="0">
                    {options.map(opt=> <option value={opt}>{opt}</option>)}
                </select> 
            </div>

            {((selectedRequestType==="Sent" && requests.length>0) || (selectedRequestType === "Recieved" && recievedRequests.length>0)) &&<div className="row align-items w-75 m-2 center mb-3" style={{textAlign: "center"}}>
                <div className="col-3"><h5>Request Type</h5></div>
                <div className="col-3"><h5>Detail</h5></div>
                <div className="col-3"><h5>Actions</h5></div>
                <div className="col-3"><h5>Status</h5></div>
            </div>}
            {/* {responseRecieved && selectedRequestType==="Sent" ? 
            requests.map(req=> <RequestCard id={req._id} recieverId={req.recieverId} onCancel={remove} type={req.type} status={req.status} recieverName={req.recieverName} />
            ) :

            recievedRequests.map(req=> <RequestCard id={req._id} recieverId={req.recieverId} onCancel={remove} type={req.type} status={req.status} recieverName={req.recieverName} />
            )

            } */}
            {responseRecieved && selectedRequestType==="Sent" &&
            requests.map(req=> <RequestCard id={req._id} recieverId={req.recieverId} onCancel={remove} type={req.type} status={req.status} senderId={req.senderId} senderName={req.senderName} recieverName={req.recieverName} />
            )}

            {responseRecieved && selectedRequestType==="Recieved" && 
            recievedRequests.map(req=> <RequestCard id={req._id} recieverId={req.recieverId} onCancel={remove} onAccept={accept} type={req.type} status={req.status} senderId={req.senderId} senderName={req.senderName} recieverName={req.recieverName} />
            )}

            {responseRecieved && selectedRequestType==="Sent" && requests.length ===0 && <h2 className='text-danger'>No requests sent yet.</h2>}
            {responseRecieved && selectedRequestType==="Recieved" && recievedRequests.length ===0 && <h2 className='text-danger'>No requests recieved yet.</h2>}

            </div>
        </div>
        </> 
        :
        <div>
            <Spinner text="Fetching Data" />
        </div>
        }
        </>
     );
}
 
export default withRouter(ViewRequests);
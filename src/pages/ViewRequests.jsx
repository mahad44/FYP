
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { fetchSentRequests, fetchRecievedRequests } from '../API calls/request';
import RequestCard from '../Components/RequestCard';
import Spinner from './../Components/Spinner';
import { cancelRequest } from './../API calls/request';


const ViewRequests = () => {

    var userProfile = JSON.parse(localStorage.getItem('studentProfile'));
    const userId = userProfile.groupId;
    const [requests,setRequests] = useState([]);
    const [recievedRequests, setRecievedRequests] = useState([]);
    const [responseRecieved, setResponseRecieved] = useState(false);
    const [sent,setSent] = useState(true);
    const [recieved,setRecieved] = useState(true);




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
    },[]);

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

    const toggle = () => {
        setSent(!sent);
        setRecieved(!recieved);
    }

    return ( 
        <>
        {
            responseRecieved ?
        <>

        <div className="container mt-5">
            <h1>
                Your Requests ...
            </h1>
            <button className="btn btn-primary">Sent</button>
            <button onClick={()=>toggle()} className="btn btn-primary">Recieved</button>


            <div className="mt-5" >

            <div className="row align-items w-75 m-2 center mb-3" style={{textAlign: "center"}}>
                <div className="col-3"><h5>Request Type</h5></div>
                <div className="col-3"><h5>Detail</h5></div>
                <div className="col-3"><h5>Actions</h5></div>
                <div className="col-3"><h5>Status</h5></div>
            </div>
            {responseRecieved && sent ?
            requests.map(req=> <RequestCard id={req._id} recieverId={req.recieverId} onCancel={remove} type={req.type} status={req.status} recieverName={req.recieverName} />
            ) :

            recievedRequests.map(req=> <RequestCard id={req._id} recieverId={req.recieverId} onCancel={remove} type={req.type} status={req.status} recieverName={req.recieverName} />
            )

            }
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
 
export default ViewRequests;
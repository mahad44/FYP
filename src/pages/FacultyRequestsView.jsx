
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { fetchSentRequests, fetchRecievedRequests } from '../API calls/request';
import RequestCard from '../Components/RequestCard';
import Spinner from './../Components/Spinner';
import { cancelRequest } from './../API calls/request';
import FacultyRequestCard from '../Components/FacultyRequestCard';


const FacultyRequestsView = ({history}) => {

    var userProfile = JSON.parse(localStorage.getItem('profile'));
    const userId = userProfile.groupId;
    const [requests,setRequests] = useState([]);
    const [responseRecieved, setResponseRecieved] = useState(false);




    useEffect(() => {
        fetchRecievedRequests(userProfile.userId)
        .then(response => {
            if(response.status!==200){
                alert('Unable to fetch sent requests')
            }
            else{
                setResponseRecieved(true);
                setRequests(response.data.data.recievedRequests);
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

    return ( 
        <>
        {
            responseRecieved ?
        <>

        <div className="container mt-5">
            <h1>
                Your Requests ...
            </h1>

            <div className="mt-5" >

            <div className="row align-items w-75 m-2 center mb-3" style={{textAlign: "center"}}>
                <div className="col-4"><h5>Detail</h5></div>
                <div className="col-4"><h5>Actions</h5></div>
                <div className="col-4"><h5>Status</h5></div>
            </div>
            {responseRecieved &&
            requests.map(req=> <FacultyRequestCard key={req._id} id={req._id} recieverId={req.recieverId} senderId={req.senderId} senderName={req.senderName} onCancel={remove} type="group" status={req.status} recieverName={req.recieverName} />) 
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
 
export default withRouter(FacultyRequestsView);
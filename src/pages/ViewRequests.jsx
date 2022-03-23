
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { fetchSentRequests } from '../API calls/request';
import RequestCard from '../Components/RequestCard';
import Spinner from './../Components/Spinner';

const ViewRequests = () => {

    const { userId } = useParams();
    const [requests,setRequests] = useState([]);
    const [responseRecieved, setResponseRecieved] = useState(false);


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
    },[]);


    return ( 
        <>
        {
            responseRecieved ? 
        <div className="container mt-5">
            <h1>
                Your Requests ...
            </h1>
            <div className="mt-5" >

            <div className="row align-items w-75 m-2 center mb-3" style={{textAlign: "center"}}>
                <div className="col-3"><h5>Request Type</h5></div>
                <div className="col-3"><h5>Detail</h5></div>
                <div className="col-3"><h5>Actions</h5></div>
                <div className="col-3"><h5>Status</h5></div>
            </div>
            {responseRecieved &&
            requests.map(req=> <RequestCard type={req.type} status={req.status} recieverName={req.recieverName} />
            )}
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
 
export default ViewRequests;
import "./css/mygroup.css";
import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import { withRouter } from "react-router-dom";
import { Form,Button } from "react-bootstrap";
import Input from "../Components/Input";
import {create, fetchGroup} from "../API calls/group";
import StudentGroup from './../Components/StudentGroup';

const GroupView = ({history}) => {

    const {groupId} = useParams();
    const [groupDetails,setGroupDetails] = useState({});
    var userProfile = JSON.parse(localStorage.getItem('profile'));

    useEffect(()=>{
        
        fetchGroup(groupId)
        .then(response=>{
            if(response.status!== 200){
                console.log(response)
            }
            else{
                // localStorage.setItem("groupDetails",JSON.stringify(response.data.data.group))
                setGroupDetails(response.data.data.group);
                console.log(response.data.data);
            }
        })
        .catch(err=>{
            alert("erro")
        })
    },[])

    return ( 
        <>
        <div className="container mt-5 ">
            <div>
                <h1 className="d-flex justify-content-center">
                    Join Them ?
                </h1>
                <StudentGroup details={groupDetails} />
            </div>
        </div>
        </>
     );
}
 
export default withRouter(GroupView);
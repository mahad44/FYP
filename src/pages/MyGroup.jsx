import "./css/mygroup.css";
import { useState, useEffect } from 'react';
import { withRouter } from "react-router-dom";
import { Form,Button } from "react-bootstrap";
import Input from "../Components/Input";
import {create, fetchGroup} from "../API calls/group";
import StudentGroup from './../Components/StudentGroup';

const MyGroup = ({history}) => {

    const [groupName,setGroupName] = useState("");
    const [groupDescription, setGroupDescription] = useState("");
    const [groupDetails,setGroupDetails] = useState({});
    var userProfile = JSON.parse(localStorage.getItem('profile'));

    useEffect(()=>{
        if( userProfile.groupId && userProfile.groupId !== null && userProfile.groupId !== ""){
            
            fetchGroup(userProfile.groupId)
            .then(response=>{
                if(response.status!== 200){
                    console.log(response)
                }
                else{
                    localStorage.setItem("groupDetails",JSON.stringify(response.data.data.group))
                    setGroupDetails(response.data.data.group);
                    console.log(response.data.data);
                }
            })
        }
    },[])

    

    const submit = async e => {
        e.preventDefault();

        let data = {
            name: groupName,
            description: groupDescription
        }

        create(data)
        .then(response => {
            // var user = JSON.parse(localStorage.getItem('user'));
            if(response.status !== 200 ){
                alert('Unable to create the group !')
            }
            else{
                // localStorage.setItem
                // user.grou
                var userProfile = JSON.parse(localStorage.getItem('profile'));
                userProfile.groupId = response.data.data.group._id;
                localStorage.setItem("profile",JSON.stringify(userProfile)) ;
                console.log(response.data.data);
                history.push("home");

            }
        })
        
    };


    return ( 
        <>
        <div className="container mt-5">
            {userProfile.groupId ==null || userProfile.groupId==="" ? 
            <div>
                <h1>
                    You do not have a group yet ...
                </h1>
                <div className=" rounded mt-4 border border-dark p-5 w-75" style={{backgroundColor: "#F6F6F6"}}>
                <Form onSubmit={submit}>
                    <Input
                    label="Group Name"
                    type="Text"
                    placeholder="Enter your group name"
                    val={groupName}
                    updateState={e => setGroupName(e.target.value)}
                    />

                    <Input
                    label="Description"
                    type="textarea"
                    val={groupDescription}
                    placeholder="Add group description."
                    updateState={e => setGroupDescription(e.target.value)}
                    />

                    <div className="row mt-4 mb-3">
                    <div className="col-md-2 offset-md0">
                        <Button
                        variant="primary"
                        type="submit"
                        style={{ width: "100%" }}
                        // onClick={()=>{setVariant('success')}}
                        disabled={
                            groupName === "" || groupDescription === ""
                            ? true
                            : false
                        }
                        >
                            Create group
                        </Button>
                    </div>
                    </div>
                </Form>
                </div>
            </div>
            : 
            <div>
                <h1>
                    Here is your group !
                </h1>
                <StudentGroup details={groupDetails} />
            </div>
            }
        </div>
        </>
     );
}
 
export default withRouter(MyGroup);
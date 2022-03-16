import "./css/mygroup.css";
import { useState } from 'react';
import { Form,Button } from "react-bootstrap";
import Input from "../Components/Input";

const MyGroup = () => {

    const [groupName,setGroupName] = useState("");
    const [groupDescription, setGroupDescription] = useState("");

    const submit = async e => {
        
    };

    return ( 
        <>
        <div className="container mt-5">
            {localStorage.getItem("groupId") ==null ? 
            // <div className="noGroupBox w-25 mt-5 rounded">
            //     <h2 style={{color: "white"}}>You do not have a group yet</h2>
            //     <button style={{marginTop: "5px",marginBottom: "5px", backgroundColor: "#2f4f4f"}} onClick={()=>window.location="./createGroup"} className="btn btn-dark">Create Group</button>
            // </div>
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
                Here is your group : 
            </div>
            }
        </div>
        </>
     );
}
 
export default MyGroup;
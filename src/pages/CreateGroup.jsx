import { useState } from "react";
import { Form,Button } from "react-bootstrap";
import Input from "../Components/Input";


const CreateGroup = () => {

    const[name,setName]=useState("");
    const [description,setDescription] = useState("");


    const submit = async e => {
        
      };

    return ( 
        <>
        <div className="container mt-5" >
            <h1>Group Form</h1>
        <Form onSubmit={submit}>
        <Input
        label="Group Name"
        type="Text"
        placeholder="Enter your group name"
        val={name}
        updateState={e => setName(e.target.value)}
        />

        <Input
        label="Description"
        type="textarea"
        val={description}
        placeholder="Add group description."
        updateState={e => setDescription(e.target.value)}
        />

        <div className="row mt-4 mb-3">
        <div className="col-md-2 offset-md0">
            <Button
            variant="primary"
            type="submit"
            style={{ width: "100%" }}
            // onClick={()=>{setVariant('success')}}
            disabled={
                name === "" || description === ""
                ? true
                : false
            }
            >
                Submit
            {/* {props.action || "Create"} */}
            </Button>
        </div>
        </div>
        </Form>
        </div>
        </>
     );
}
 
export default CreateGroup;
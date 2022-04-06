import { withRouter } from "react-router-dom";
import {useState} from 'react';
import {Modal,ModalHeader,ModalBody,Button,ModalFooter } from "reactstrap";

const RequestCard = (props) => {

    const {id, type,senderName,senderId, recieverName, status, history, onCancel, onAccept, recieverId} = props;
    const [boolean, setBoolean] = useState(false);
    var userProfile = JSON.parse(localStorage.getItem('profile'));


    function noRefCheck(){
        setBoolean(!boolean)
    }

    const closeModal = reqId =>{
        noRefCheck();
        onCancel(reqId);
    } 

    const cancel = () =>{
        noRefCheck();
    }

    return (
        <>
        <div className={type==="peer" ? "row p-2 align-items-center m-2 w-75 text-light bg-dark" : "row p-2 align-items-center m-2 w-75 border border-dark" } style={{borderRadius: "25px", textAlign: "center"}}>
            <div className="col-3">
                {type.charAt(0).toUpperCase() + type.slice(1)}
            </div>
            {userProfile.userId !== recieverId ? <div className="col-3">
                Sent to <strong>{recieverName}</strong>
            </div> : <div className="col-3">
                Recieved from <strong>{senderName}</strong>
            </div> }
            <div className="col-3">
                {status === "pending" && userProfile.userId === recieverId && <button onClick={()=>onAccept(id)} className="btn btn-success">Accept</button>}
                {status === "pending" && <button onClick={type==="peer" ?  userProfile.userId===recieverId ? ()=>history.push(`/groups/${senderId}`) : ()=>history.push(`/users/${recieverId}`) : ()=>history.push(`/faculty/${recieverId}`) } className="btn btn-primary">View Profile</button>}
                {status === "pending" && <button onClick={cancel} className="btn btn-danger">Cancel</button>}
                <Modal isOpen={boolean} toggle={function noRefCheck() {}}>
                <ModalHeader toggle={()=> noRefCheck()}>
                  Confirmation
                </ModalHeader>
                <ModalBody>
                  Are you sure you want to cancel this product?
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" onClick={()=> closeModal(id)}>
                    Remove
                  </Button>{" "}
                  <Button onClick={()=> noRefCheck()}>Cancel</Button>
                </ModalFooter>
                </Modal>
            </div>
            <div className="col-3">
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </div>
        </div>
        </> 
    );
}
 
export default withRouter(RequestCard);
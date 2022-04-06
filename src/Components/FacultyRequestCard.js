import { withRouter } from "react-router-dom";
import {useState} from 'react';
import {Modal,ModalHeader,ModalBody,Button,ModalFooter } from "reactstrap";

const RequestCard = (props) => {

    const {id, type, recieverName,senderName,senderId, status, history, onCancel, recieverId} = props;
    const [boolean, setBoolean] = useState(false);


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
        <div className="row p-2 align-items-center m-2 w-75 text-light bg-dark" style={{borderRadius: "25px", textAlign: "center"}}>
            <div className="col-4">
                Recieved From <strong>{senderName}</strong>
            </div>
            <div className="col-4">
                <button className="btn btn-primary">Accept</button>
                <button onClick={()=>history.push(`/groups/${senderId}`)} className="btn btn-secondary">View Group</button>
                <button onClick={cancel} className="btn btn-danger">Cancel</button>
                <Modal isOpen={boolean} toggle={function noRefCheck() {}}>
                <ModalHeader toggle={()=> noRefCheck()}>
                  Confirmation
                </ModalHeader>
                <ModalBody>
                  Are you sure you want to cancel this request?
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" onClick={()=> closeModal(id)}>
                    Remove
                  </Button>{" "}
                  <Button onClick={()=> noRefCheck()}>Cancel</Button>
                </ModalFooter>
                </Modal>
            </div>
            <div className="col-4">
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </div>
        </div>
        </> 
    );
}
 
export default withRouter(RequestCard);
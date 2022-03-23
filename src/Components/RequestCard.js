import { withRouter } from "react-router-dom";

const RequestCard = (props) => {

    const {type, recieverName, status, history} = props;

    return ( 
        <div className="row p-2 align-items-center m-2 w-75 text-light bg-dark" style={{borderRadius: "25px", textAlign: "center"}}>
            <div className="col-3">
                {type.charAt(0).toUpperCase() + type.slice(1)}
            </div>
            <div className="col-3">
                Sent to <strong>{recieverName}</strong>
            </div>
            <div className="col-3">
                <button className="btn btn-danger">Cancel</button>
                <button className="btn btn-primary">View Profile</button>
            </div>
            <div className="col-3">
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </div>

        </div>
    );
}
 
export default withRouter(RequestCard);
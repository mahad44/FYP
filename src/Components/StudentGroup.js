import "../Components/studentGroupStyles.css"


const StudentGroup = (props) => {
    return ( 
        <>
        <div className="d-flex justify-content-center">

        <div className="mt-5 border bg-dark text-light border-dark w-75 mainLayout mb-5 p-2" style={{borderRadius: "25px"}}>
            <div className="row p-3 m-2 ">
                <div className="d-flex justify-content-center">
                    <h1>{props.details.name}</h1>
                </div>
            </div>
            <div className="row p-3 m-2 ">
                <div className="col-6">
                    <div>
                        <h2>Description </h2>
                        <p className="lead"><strong>{props.details.description}</strong></p>
                    </div>
                </div>
                {localStorage.getItem("userType") === "faculty" &&<div className="col-6 d-flex justify-content-center align-items-center">
                    <div className="">
                        <button className="btn btn-light btn-lg ">Join Group</button>
                    </div>
                </div>}
            </div>
            <div className="row p-3 m-2 ">
                <div className="col-6">
                    <div>
                        <h2>Group Members</h2>
                        <p className="lead">
                        <ul className="lead"><strong>
                            <li>Mahad</li>
                            <li>Usman</li>
                            <li>Shahmir</li></strong>
                        </ul>
                        </p>
                    </div>
                </div>
            </div>
            {props.details.supervisorId  && 
            <div className="row p-3  m-2">
                <h2>
                    Supervisor
                </h2>
            </div>}
        </div>
        </div>
        </>
     );
}
 
export default StudentGroup;
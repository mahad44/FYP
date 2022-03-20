import "../Components/studentGroupStyles.css"


const StudentGroup = (props) => {
    return ( 
        <>
        <div className="mt-5 rounded border border-dark mainLayout mb-2 p-2">
            <div className="row p-3 m-2 ">
                <div className="d-flex justify-content-center">
                    <h1>{props.details.name}</h1>
                </div>
            </div>
            <div className="row p-3 m-2">
                <h2>Description </h2>
                <p className="lead"><strong>{props.details.description}</strong></p>
            </div>
            <div className="row p-3 m-2">
                <h2>
                    Group Members
                </h2>
                <p className="lead">

                <ul><strong>

                
                    <li>Mahad</li>
                    <li>Usman</li>
                    <li>Shahmir</li></strong>
                </ul>
                </p>
            </div>
            <div className="row p-3  m-2">
                <h2>
                    Supervisor
                </h2>
            </div>
            
        </div>
        </>
     );
}
 
export default StudentGroup;
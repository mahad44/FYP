import "./css/mygroup.css";

const MyGroup = () => {
    return ( 
        <>
        <div className="container mt-5">
            <h1 className="d-flex justify-content-center">My Group</h1>
            {localStorage.getItem("groupId") ==null ? 
            <div className="noGroupBox w-25 mt-5 rounded">
                <h2 style={{color: "white"}}>You do not have a group yet</h2>
                <button style={{marginTop: "5px",marginBottom: "5px", backgroundColor: "#2f4f4f"}} onClick={()=>window.location="./createGroup"} className="btn btn-dark">Create Group</button>
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
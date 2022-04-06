import { Link, withRouter } from "react-router-dom";
import FacultyNav from "./FacultyNav";
import StudentNav from "./StudentNav";
// import App from './../App';



const Navbar = () => {

    var user = JSON.parse(localStorage.getItem('user'));

    const userAccess = () => {
        if (localStorage.getItem("token")) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          localStorage.removeItem("profile");
          localStorage.removeItem("facultyProfile");
          localStorage.removeItem("studentProfile");
          localStorage.removeItem("groupDetails");

        //   localStorage.removeItem("categoryId");
        }
        window.location = "/login";
    };

    return ( 
        <>
            <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                <div className="container">
                <Link className="navbar-brand" to="/">
                    <strong>PMATS </strong>
                    <i className='fa-solid fa-user'></i>
                    {/* <img src="./userLogo.png" width="30" height="30" className="d-inline-block align-top" alt="" /> */}

                </Link>

                {localStorage.getItem("token") !==null && user.roleType==="student" &&
                <StudentNav userAccess={userAccess}/>}
                {localStorage.getItem("token") !==null && user.roleType==="faculty" &&
                <FacultyNav userAccess={userAccess}/>}
                </div>
            </nav>
        
        
        </>
     );
}
 
export default withRouter(Navbar);
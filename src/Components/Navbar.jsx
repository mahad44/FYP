import { Link, withRouter } from "react-router-dom";
import StudentNav from "./StudentNav";
// import App from './../App';



const Navbar = () => {

    var user = JSON.parse(localStorage.getItem('user'));

    const userAccess = () => {
        if (localStorage.getItem("token")) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          localStorage.removeItem("studentProfile");
          localStorage.removeItem("facultyProfile");
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
                {/* {localStorage.getItem("token")===null} */}
                {/* <button
                className="navbar-toggler"
                data-toggle="collapse"
                type="button"
                data-target="#toggleMobileMenu"
                aria-controls="toggleMobileMenu"
                aria-expanded="false"
                aria-label="Toggle Navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="toggleMobileMenu" >
                     Uncomment the below one to move navbar links to end
                    <ul className="navbar-nav ms-auto text-center"> 
                    
                    <ul className="navbar-nav text-center"  style={{marginRight: "30px"}}>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/mygroup">
                                My Group
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/faculty">
                                Faculty
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/request">
                                Requests
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/project">
                                Project
                            </NavLink>
                        </li>
                        <li>
                            <hr className="dropdown-divider" />
                        </li>
                    </ul>

                    <button
                        className="btn btn-dark btn-outline-light ms-auto"
                        onClick={userAccess}
                        >
                        Log out
                    </button>
                </div> */}

                </div>
            </nav>
        
        
        </>
     );
}
 
export default withRouter(Navbar);
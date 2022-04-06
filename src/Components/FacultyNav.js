import { NavLink, withRouter } from "react-router-dom";


const FacultyNav = props => {

  
  var user = JSON.parse(localStorage.getItem('user'));
  var userProfile = JSON.parse(localStorage.getItem('profile'));

  return (
    <>
        <button
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
            {/* Uncomment the below one to move navbar links to end
            <ul className="navbar-nav ms-auto text-center"> */}
            
            <ul className="navbar-nav text-center"  style={{marginRight: "30px"}}>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/mygroups">
                        My Groups
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/requests">
                        Requests
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/asdasda">
                        Coordinator
                    </NavLink>
                </li>
                <li>
                    <hr className="dropdown-divider" />
                </li>
            </ul>

            <button
                className="btn btn-dark btn-outline-light ms-auto"
                onClick={props.userAccess}
                >
                Log out
            </button>
        </div>
    </>
  );
};

export default withRouter(FacultyNav);

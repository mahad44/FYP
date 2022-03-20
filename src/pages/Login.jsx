import { useState } from "react";
import { Link } from "react-router-dom";
import { login } from "../API calls/users";
// import Error from "./Error";

const clearLocalMemory = () => {
    localStorage.removeItem("user_id");
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
  };
  
  const saveToLocalMemory = data => {
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("studentProfile", JSON.stringify(data.studentProfile));
    localStorage.setItem("token", data.token);
    localStorage.setItem("userType", data.userType);
  };

const Login = () => {
    const [erp, setErp] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    clearLocalMemory();

    const submitForm = async e => {
        e.preventDefault();
        const data = {
          erp: erp,
          password: password,
        };
    
        login(data)
          .then(response => {
            saveToLocalMemory(response.data.data);
            response.data.data.user.roleType === "student"
              ? (window.location = "/home")
              : (window.location = "/home");
          })
          .catch(err => {
            if (err.response.status === 401)
              alert("Login unsuccessful. You have entered invalid password.");
            else if (err.response.status === 404)
              alert("Login unsuccessful. No such user found.");
            else setError(true);
          });
    };

    return ( 
        <>
        <div className = "container-fluid">
            <div className="row ">
          <section
            className="col-lg-6 d-none d-sm-none d-md-none d-lg-block"
            style={{ backgroundColor: "black", height: "95vh" }}
          >
            <img 
              style={{height:"100%", maxWidth:"100%"}}
              src="https://media-exp1.licdn.com/dms/image/C4D1BAQHoOBUqrNm_8Q/company-background_10000/0/1637003704197?e=2159024400&v=beta&t=BPHFYnIA-uDoJ3rdpoyM772qiXYMj1zxGYiv5Lz_ouE"
              className="img-fluid rounded-start "
              alt="..."
            />
          </section>
          <div className="col-12 col-lg-6 mt-5 ">
            <h1>Welcome to PMATS</h1>
            <p>
              Need a project partner? Still looking for a supervisor? You are just at the right place. 
              <strong> Login now to give your project a kick-start!</strong>
            </p>

            <div className="card">
              <div className="card-body">
                <form onSubmit={submitForm}>
                  <div className="row">
                    <div className="form-group ">
                      <label className="form-label">
                        <strong>ERP</strong>
                      </label>
                      <input
                        onChange={e => setErp(e.target.value)}
                        type="text"
                        className="form-control"
                        placeholder="Enter your ERP here"
                        autoFocus
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group mt-3">
                      <label className="form-label">
                        <strong>Password</strong>
                      </label>
                      <input
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                        className="form-control"
                        placeholder="Enter your password here"
                      />
                    </div>
                  </div>
                  <div className="row mt-4">
                    <div className="col-md-2">
                      <button
                        type="submit"
                        className="btn btn-primary submitbutton  "
                        disabled={
                          erp === "" || password === "" ? true : false
                        }
                      >
                        Login
                      </button>
                    </div>

                    <p className="mt-5">
                      Wanna visit archive projects?{" "}
                      <Link to="/signup">Explore Archive</Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        </div>
        </>
     );
}
 
export default Login;
import { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { fetchStudents } from './../API calls/users';
import { Button } from 'react-bootstrap';
import Spinner from './../Components/Spinner';




const Peers = () => {

    // const [users,setUsers] = useState([]);
    const[studentList,setStudentList] = useState([]);
    const [responseRecieved, setResponseRecieved] = useState(false);
    var user = JSON.parse(localStorage.getItem('user'));


    useEffect(() => {
        fetchStudents()
          .then(response => {
            setResponseRecieved(true);
            // let tempUserList = response.data.data.users.filter(item=> item.erp!==user.erp);
            let tempStudentList = response.data.data.studentUsers.filter(item=> item.erp!==user.erp);
            // setUsers(tempUserList);
            setStudentList(tempStudentList);
            console.log(response.data.data);
          })
          .catch(err => {
            setResponseRecieved(true);
            // setError(true);
          });
    });

// Use the line below to include dependancy array
// }, []);


    return ( 
        <>
            <div className="container mt-5">

                {!responseRecieved ? <Spinner text="Fetching Data" /> :
                <h1>
                    Invite Your Friends !
                </h1>
                }   

                {
                    responseRecieved &&

                    <div className="row mt-5 rounded mb-2 bg-dark " style={{display: "flex",flexWrap: "wrap"}}>
                        {

                        studentList.map(std=>(
                            
                            <div className="col-12 col-sm-6 d-flex justify-content-center  col-lg-4 col-xl-4 mb-5 mt-2">
                                <Card bg="dark" text="light" border="light" style={{ width: '18rem', marginTop: "65px", marginBottom:"10px"}}>
                                <Card.Img style={{width: "100%", height: "10vw"}} variant="top" src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/640px-User_icon_2.svg.png" />
                                <Card.Body>
                                    <Card.Title>{std.username.toUpperCase()}</Card.Title>
                                    <Card.Text>
                                        A rising senior. Possesses great interest and talent interest in machine learning, web development & AI.
                                    </Card.Text>
                                    <Button variant="primary">Visit Profile</Button>
                                </Card.Body>
                                </Card>

                            </div>
    
    
                        ))
                        }
                        
                    </div>
                }

                
            </div>
        </>
     );
}
 
export default Peers;
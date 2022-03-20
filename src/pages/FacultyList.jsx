import { fetchFaculty } from "../API calls/users";
import { useEffect, useState } from 'react';
import FacultyCard from './../Components/FacultyCard';
import { withRouter } from 'react-router-dom';

const FacultyList = ({history}) => {


    const [users,setUsers] = useState([]);
    const [faculty,setFaculty] = useState([]);
    const [responseRecieved, setResponseRecieved] = useState(false);


    useEffect(() => {
        fetchFaculty()
          .then(response => {
            if(response.status!==200){
              alert("Unable to fetch faculty profiles")
            }
            setResponseRecieved(true);
            setUsers(response.data.data.users);
            setFaculty(response.data.data.facultyUsers);
            console.log(response.data.data);
          })
          .catch(err => {
            setResponseRecieved(true);
            // setError(true);
          });
    }, []);


    return ( 
    <>
    <div className="container mt-5 ml-1 mr-1">
        <h1>Here is a list of our esteemed faculty ..</h1>

        {
           responseRecieved && faculty.length !==0 && faculty.map(professor=>(
            <FacultyCard
            key={professor._id}
            name={professor.username}
            image={users.filter(user=> user._id === professor.userId).image}
            shortDescription = {professor.shortDescription}
            onButtonPress={() => history.push(`/faculty/${professor._id}`)}
            />
           )
          )
        }
        
    </div>
    </> );
}
 
export default withRouter(FacultyList);
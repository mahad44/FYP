import { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import Spinner from './../Components/Spinner';
import {withRouter} from 'react-router-dom';
import { fetchFacultyGroups } from './../API calls/group';



const FacultyGroupsView = () => {

    const [groups,setGroups] = useState([]);
    const [responseRecieved, setResponseRecieved] = useState(false);


    useEffect(() => {
        fetchFacultyGroups()
          .then(response => {
            if(response.status !== 200){
                alert("Problem fetching faculty groups")
            }
            else{
                setGroups(response.data.data.groups) 
                setResponseRecieved(true);
            }
            console.log(response.data.data);
          })
          .catch(err => {
              alert(err)
            setResponseRecieved(true);
            // setError(true);
          });
    },[]);


    return ( 
        <>  
        <div className="container mt-5">

        {!responseRecieved ? <Spinner text="Fetching Data" /> :
            <>
                <h1>
                    Your Groups
                </h1>

                {groups && groups.length === 0 && <h2 className='text-danger'>You have not accepted any groups yet</h2>}

                {groups && groups.length !== 0 && <h2 className='text-primary'>Here are your group cards</h2>}  
                
            
            </>


        }
        


        </div>
        </>
     );
}
 
export default FacultyGroupsView;
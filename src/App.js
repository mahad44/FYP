import './App.css';
import { Route, Switch, Redirect } from "react-router-dom";
import Home from './pages/Home';
import CreateGroup from './pages/CreateGroup';
import Login from './pages/Login';
import MyGroup from './pages/MyGroup';
import FacultyList from './pages/FacultyList';
import Navbar from './Components/Navbar';
import Peers from './pages/Peers';
import UserDetails from './pages/UserDetails';
import ViewRequests from './pages/ViewRequests';
import FacultyProfile from './pages/FacultyProfile';
import FacultyGroupsView from './pages/FacultyGroupsView';
import FacultyRequestsView from './pages/FacultyRequestsView';
import GroupView from './pages/GroupView';


function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route path="/login">
          <Login/>
        </Route>
        {<Route path="/home">
          <Home/>
        </Route>}
        <Route path="/mygroup">
          <MyGroup/>
        </Route>
        <Route path="/groups/:groupId">
          <GroupView/>
        </Route>
        <Route path="/createGroup">
          <CreateGroup/>
        </Route>
        <Route path="/faculty/:facultyId">
          <FacultyProfile/>
        </Route>
        <Route path="/faculty">
          <FacultyList/>
        </Route>
        <Route path="/peers">
          <Peers/>
        </Route>
        {localStorage.getItem("userType")==="student" ? 
        <Route path="/requests">
          <ViewRequests/>
        </Route> : 
        <Route path="/requests">
          <FacultyRequestsView />
        </Route> }
        {localStorage.getItem("userType")==="faculty" && <Route path="/mygroups">
          <FacultyGroupsView/>
        </Route>}
        <Route path="/users/:userId">
          <UserDetails/>
        </Route>
        {!localStorage.getItem("token") && <Route path="/">
          <Login/>
        </Route>}
        <Redirect push to="/home" />
      </Switch>
    </div>
  );
}

export default App;

import './App.css';
import { Route, Switch, Redirect } from "react-router-dom";
import Home from './pages/Home';
import CreateGroup from './pages/CreateGroup';
import Login from './pages/Login';
import MyGroup from './pages/MyGroup';
import FacultyList from './pages/FacultyList';
import Navbar from './Components/Navbar';
import Peers from './pages/Peers';


function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route path="/login">
          <Login/>
        </Route>
        <Route path="/home">
          <Home/>
        </Route>
        <Route path="/mygroup">
          <MyGroup/>
        </Route>
        <Route path="/createGroup">
          <CreateGroup/>
        </Route>
        <Route path="/faculty">
          <FacultyList/>
        </Route>
        <Route path="/peers">
          <Peers/>
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

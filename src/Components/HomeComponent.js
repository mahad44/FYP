import './Home.css';
import banner1 from './banner1.jpg';
import banner2 from './banner2.jpg';
import banner3 from './banner3.jpg';
import banner4 from './banner3.jpg';
import banner5 from './banner5.jpg';
import banner6 from './banner6.jpg';
import banner7 from './banner7.jpg';
import banner8 from './banner8.jpg';
import banner9 from './banner9.jpg';
import { NavLink, withRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';


function HomeComponent() {
  console.log(JSON.parse(localStorage.getItem("profile")).isProfileSet)
  console.log(localStorage.getItem("user"))

    return (
      <div class="display">
         <div class="row1">
        <div className="column column1">
        <div class="img-div">
        <img class="i4" src={banner4} alt="img1"/>
        
        <a  href="/mygroup">
        <h1 class="img1-text">My Groups</h1>
          </a>
        </div>
        <div class="img-div">
        <img class="i5" src={banner5} alt="img2"/>
        <h1 class="img2-text">Faculty</h1>
        </div>
        </div>
        <div className="column column2 nopadding">
        <div class="img-div">
       <img class="i1" src={banner2} alt="img3"/>
       <h1 class="img3-text">Projects</h1>
       </div>
       <div class="img-div">
        <img class="i2" src={banner1} alt="img4"/>
        <h1 class="img2-text">Centered</h1>
        </div>
        </div>
        <div className="column column3">
        <div class="img-div">
       <img class="i6" src={banner7} alt="img6"/>
       <h1 class="img6-text">Peers</h1>
       </div>
       <div class="img-div">
        <img class="i7" src={banner8} alt="img7"/>
        <h1 class="img7-text">Requests</h1>
        </div>
        <div class="img-div">
        <img class="i8" src={banner9} alt="img8"/>
        <h1 class="img8-text">Centered</h1>
        </div>
        </div>
        </div>
        </div>
    );
  }
  
  export default HomeComponent;
  
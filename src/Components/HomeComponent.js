import './Home.css';
import banner1 from './banner1.jpg';
import banner2 from './banner2.png';
import banner3 from './banner3.jpg';
import banner4 from './banner3.jpg';
import banner5 from './banner5.jpg';
import banner6 from './banner6.jpg';
import banner7 from './banner7.jpg';
import banner8 from './banner8.jpg';
import banner9 from './banner9.jpg';

import 'bootstrap/dist/css/bootstrap.css';


function HomeComponent() {
    return (
      <div class="display">
         <div className="row">
        <div className="column column1">
        <div class="first-img">
        <img class="i4" src={banner4} alt="img1"/>
        <h1 class="centered">Centered Text</h1>
        </div>
        <img class="i5" src={banner5} alt="img2"/>
        </div>
        <div className="column column2">
       <img class="i1" src={banner2} alt="img3"/>
        <img class="i2" src={banner1} alt="img4"/>
        <img class="i3" src={banner6} alt="img5"/>
        </div>
        <div className="column column2">
       <img class="i6" src={banner7} alt="img6"/>
        <img class="i7" src={banner8} alt="img7"/>
        <img class="i8" src={banner9} alt="img8"/>
        </div>
        </div>
        </div>
    );
  }
  
  export default HomeComponent;
  
import HomeComponent from './../Components/HomeComponent';

const Home = () => {

    var user = JSON.parse(localStorage.getItem('user'));
    // var profile = JSON.parse(localStorage.getItem('profile'));

    return ( 
        <>
        
            <HomeComponent/>
        </>
     );
}
 
export default Home;
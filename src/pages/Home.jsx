import HomeComponent from './../Components/HomeComponent';

const Home = () => {

    var user = JSON.parse(localStorage.getItem('user'));
    // var studentProfile = JSON.parse(localStorage.getItem('studentProfile'));

    return ( 
        <>
        
            <HomeComponent/>
        </>
     );
}
 
export default Home;
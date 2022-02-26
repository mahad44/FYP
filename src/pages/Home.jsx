const Home = () => {

    var user = JSON.parse(localStorage.getItem('user'));
    // var studentProfile = JSON.parse(localStorage.getItem('studentProfile'));

    return ( 
        <>
        <div className="container mt-5">
            <h1>Home Page - Hello {user.username}</h1>
        </div>
        </>
     );
}
 
export default Home;
import axios from "axios";

const token = localStorage.getItem("token");
const header = { headers: { Authorization: `Bearer ${token}` } };

//Creates a new request
export const createRequest = async data =>
    await axios.post(`http://localhost:5000/requests/createRequest`,data,header);


//Fetches sent requests for the user
export const fetchSentRequests = async userId =>
    await axios.get(`http://localhost:5000/requests/fetchSentRequests/${userId}`,header);



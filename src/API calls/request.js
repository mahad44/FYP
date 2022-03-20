import axios from "axios";

const token = localStorage.getItem("token");
const header = { headers: { Authorization: `Bearer ${token}` } };

//Creates a new group
export const createRequest = async data =>
    await axios.post(`http://localhost:5000/requests/createRequest`,data,header);




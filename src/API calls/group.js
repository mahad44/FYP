import axios from "axios";

const token = localStorage.getItem("token");
const header = { headers: { Authorization: `Bearer ${token}` } };

//Creates a new group
export const create = async data =>
    await axios.post(`http://localhost:5000/groups/create`,data,header);

//Creates a new group
export const fetchGroup = async groupId =>
    await axios.get(`http://localhost:5000/groups/fetchGroup/${groupId}`,header);




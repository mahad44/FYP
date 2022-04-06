import axios from "axios";

const token = localStorage.getItem("token");
const header = { headers: { Authorization: `Bearer ${token}` } };

//Creates a new group
export const create = async data =>
    await axios.post(`http://localhost:5000/groups/create`,data,header);

//Fetches the group for user based on user id sent as parameter
export const fetchGroup = async groupId =>
    await axios.get(`http://localhost:5000/groups/fetchGroup/${groupId}`,header);

//Fetches the multiple groups of a faculty member
export const fetchFacultyGroups = async () =>
    await axios.get(`http://localhost:5000/groups/fetchFacultyGroups`,header);


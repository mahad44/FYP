import axios from "axios";

const token = localStorage.getItem("token");
const header = { headers: { Authorization: `Bearer ${token}` } };

//logs in a user
export const login = async data =>
    await axios.post(`http://localhost:5000/users/login`, data);

//fetches the list of faculty
export const fetchFaculty = async data =>
    await axios.get(`http://localhost:5000/users/fetchFacultyList`, header);

//fetches the list of students
export const fetchStudents = async data =>
    await axios.get(`http://localhost:5000/users/fetchStudentList`, header);

//fetches the profile of user
export const fetchUser = async (data,userId) =>
    await axios.post(`http://localhost:5000/users/fetchUser/${userId}`,data, header);


export const updateStudents = async data =>
    await axios.post(`http://localhost:5000/users/updateStudentUser`,data, header);
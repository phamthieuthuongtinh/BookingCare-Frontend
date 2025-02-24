import axios from "../axios";


const handleLoginApi = (userEmail, userPassword) => {
    return axios.post('/api/login', { email: userEmail, password: userPassword });
};
const getAllUser = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`);
}
const createNewUserService = (data) => {
    return axios.post('/api/create-new-user', data);
}
export { handleLoginApi, getAllUser, createNewUserService }
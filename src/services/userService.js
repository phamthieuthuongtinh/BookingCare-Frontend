import axios from "../axios";


export const handleLoginApi = (userEmail, userPassword) => {
    return axios.post('api/login', { email: userEmail, password: userPassword });
};
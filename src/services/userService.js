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
const deleteUserService = (userId) => {
    return axios.delete('/api/delete-user', { data: { id: userId } });
}
const updateUserService = (inputData) => {
    return axios.put('/api/edit-user', inputData);
}
const editUserService = (inputData) => {
    return axios.put('/api/edit-user', inputData);
}
const getAllCodeService = (inputData) => {
    return axios.get(`/api/allcode?type=${inputData}`)
}
const getTopDoctorHomeService = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`)
}
const getAllDoctorService = () => {
    return axios.get('/api/get-all-doctors');
}
const saveDetailDoctorService = (inputData) => {
    return axios.post('/api/save-infor-doctors', inputData);
}
export {
    handleLoginApi, getAllUser,
    createNewUserService, deleteUserService,
    updateUserService, getAllCodeService,
    editUserService, getTopDoctorHomeService,
    getAllDoctorService, saveDetailDoctorService
}
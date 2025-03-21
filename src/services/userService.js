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

const getDetailInforDoctor = (id) => {
    return axios.get(`/api/get-detail-doctor-by-id?id=${id}`);
}
const saveBulkScheduleDoctor = (data) => {
    return axios.post(`/api/bulk-create-schedule`, data);
}
const getScheduleDoctorByDateService = (id, date) => {
    return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${id}&date=${date}`);
}
const getExtraInforDoctorByIdService = (id) => {
    return axios.get(`/api/get-extra-infor-doctor-by-id?doctorId=${id}`);
}
const getProfileDoctorByIdService = (id) => {
    return axios.get(`/api/get-profile-doctor-by-id?doctorId=${id}`);
}
const postPatientBookAppointment = (data) => {
    return axios.post(`/api/patient-book-appointment`, data);
}


const postVerifytBookAppointment = (data) => {
    return axios.post(`/api/verify-book-appointment`, data);
}

const createNewSpecialty = (data) => {
    return axios.post(`/api/create-specialty`, data);
}

const getAllSpecialty = () => {
    return axios.get(`/api/get-all-specialty`);
}
const getDetailSpecialtyById = (data) => {
    return axios.get(`/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`);
}

const createNewClinic = (data) => {
    return axios.post(`/api/create-clinic`, data);
}
const getAllClinic = () => {
    return axios.get(`/api/get-all-clinic`);
}
const getDetailClinicById = (data) => {
    return axios.get(`/api/get-detail-clinic-by-id?id=${data.id}`);
}


const getAllPatientForDoctor = (data) => {
    return axios.get(`api/get-list-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`);
}

const postSendRedemy = (data) => {
    return axios.post(`/api/send-redemy`, data);
}
export {
    handleLoginApi, getAllUser,
    createNewUserService, deleteUserService,
    updateUserService, getAllCodeService,
    editUserService, getTopDoctorHomeService,
    getAllDoctorService, saveDetailDoctorService,
    getDetailInforDoctor, saveBulkScheduleDoctor,
    getScheduleDoctorByDateService, getExtraInforDoctorByIdService,
    getProfileDoctorByIdService, postPatientBookAppointment,
    postVerifytBookAppointment, createNewSpecialty,
    getAllSpecialty, getDetailSpecialtyById, createNewClinic,
    getAllClinic, getDetailClinicById, getAllPatientForDoctor,
    postSendRedemy
}
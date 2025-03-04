import actionTypes from './actionTypes';
import {
    getAllCodeService, createNewUserService, getAllUser,
    deleteUserService, editUserService, getTopDoctorHomeService, getAllDoctorService,
    saveDetailDoctorService
} from '../../services/userService';
import { ToastContainer, toast } from 'react-toastify';
// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START
// })
export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_GENDER_START
            })
            let res = await getAllCodeService("GENDER")
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data));
            } else {
                dispatch(fetchGenderFailed());
            }
        } catch (error) {
            dispatch(fetchGenderFailed());
            console.log('fetchGenderStart error', error)
        }
    }

}
export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("POSITION")
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data));
            } else {
                dispatch(fetchPositionFailed());
            }
        } catch (error) {
            dispatch(fetchPositionFailed());
            console.log('fetchPositonStart error', error)
        }
    }

}
export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("ROLE")
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data));
            } else {
                dispatch(fetchRoleFailed());
            }
        } catch (error) {
            dispatch(fetchRoleFailed());
            console.log('fetchRoleFailed error', error)
        }
    }

}
export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUserService(data);
            // console.log('check craate user redux', res)
            if (res && res.errCode === 0) {
                toast.success("Create a new user success")
                dispatch(saveUserSuccess());
                dispatch(fetchAllUserStart());
            } else {
                dispatch(saveUserFailed());
            }
        } catch (error) {
            dispatch(saveUserFailed());
            console.log('saveUserFailed error', error)
        }
    }
}
export const fetchAllUserStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllUser("ALL")
            if (res && res.errCode === 0) {

                dispatch(fetchAllUserSuccess(res.users.reverse()));
            } else {
                dispatch(fetchAllUserFailed());
            }
        } catch (error) {
            toast.error("Fetch all users error")
            dispatch(fetchAllUserFailed());
            console.log('fetchAllUserFailed error', error)
        }
    }

}
export const deleteAUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserService(userId);
            // console.log('check craate user redux', res)
            if (res && res.errCode === 0) {
                toast.success("Delete a user succeed")
                dispatch(deleteUserSuccess());
                dispatch(fetchAllUserStart());
            } else {
                toast.error("Delete a user error!")
                dispatch(deleteUserFailed());
            }
        } catch (error) {
            toast.error("Delete a user error!")
            dispatch(deleteUserFailed());
            console.log('saveUserFailed error', error)
        }
    }
}
export const editAUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editUserService(data);
            // console.log('check craate user redux', res)
            if (res && res.errCode === 0) {
                toast.success("Update a user succeed")
                dispatch(editUserSuccess());
                dispatch(fetchAllUserStart());
            } else {
                toast.error("Update a user error!")
                dispatch(editUserFailed());
            }
        } catch (error) {
            toast.error("Update a user error!")
            dispatch(editUserFailed());
            console.log('Update error', error)
        }
    }
}
export const fectTopDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopDoctorHomeService('');
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
                    dataDoctors: res.data
                })
                // dispatch(fetchTopDoctorSuccess(res.users.reverse()));
            } else {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
                })
                // dispatch(fetchTopDoctorFailed());
            }
        } catch (error) {
            toast.error("Fetch all doctors error", error)
            dispatch(fetchTopDoctorFailed());
            console.log('fetchTopDoctorFailed error', error)
        }
    }
}
export const fetchAllDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDoctorService();
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
                    dataDoctors: res.data
                })
                // dispatch(fetchTopDoctorSuccess(res.users.reverse()));
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
                })
                // dispatch(fetchTopDoctorFailed());
            }
        } catch (error) {
            toast.error("Fetch all doctors error", error)
            dispatch({
                type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
            })
            console.log('fetchTopDoctorFailed error', error)
        }
    }
}
export const saveDetailDoctor = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveDetailDoctorService(data);
            if (res && res.errCode === 0) {
                toast.success("Save information doctor succeed!");
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
                })
                // dispatch(fetchTopDoctorSuccess(res.users.reverse()));
            } else {
                toast.error("Save information doctor failed!");
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
                })
                // dispatch(fetchTopDoctorFailed());
            }
        } catch (error) {
            toast.error("Save information doctor failed!");
            dispatch({
                type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
            })
        }
    }
}
export const fetchAllScheduleTime = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("TIME");
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.GET_ALLCODE_SCHEDULE_TIME_SUCCESS,
                    dataTime: res.data
                })
                // dispatch(fetchTopDoctorSuccess(res.users.reverse()));
            } else {
                dispatch({
                    type: actionTypes.GET_ALLCODE_SCHEDULE_TIME_FAILED,
                })
                // dispatch(fetchTopDoctorFailed());
            }
        } catch (error) {
            toast.error("Fetch all doctors error", error)
            dispatch({
                type: actionTypes.GET_ALLCODE_SCHEDULE_TIME_FAILED,
            })
            console.log('fetchTopDoctorFailed error', error)
        }
    }
}


export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS
})
export const saveUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED
})
export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})
export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})
export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})
export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED
})
export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})
export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
})
export const fetchAllUserSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    users: data
})
export const fetchAllUserFailed = () => ({
    type: actionTypes.FETCH_ALL_USERS_FAILED
})

export const deleteUserSuccess = (data) => ({
    type: actionTypes.DELETE_USER_SUCCESS,
})
export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED
})
export const editUserSuccess = (data) => ({
    type: actionTypes.EDIT_USER_SUCCESS,
})
export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED
})
export const fetchTopDoctorSuccess = (data) => ({
    type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
})
export const fetchTopDoctorFailed = () => ({
    type: actionTypes.FETCH_TOP_DOCTORS_FAILED
})
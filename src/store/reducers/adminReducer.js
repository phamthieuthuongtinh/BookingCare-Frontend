import actionTypes from '../actions/actionTypes';

const initialState = {
    genders: [],
    isLoadingGender: false,
    roles: [],
    positions: [],
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            state.isLoadingGender = true;
            console.log('fecth fire gender start', action)
            return {
                ...state,

            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            state.genders = action.data;
            state.isLoadingGender = false;

            console.log('fecth fire gender success', state)

            return {
                ...state,

            }
        case actionTypes.FETCH_GENDER_FAIDED:
            state.isLoadingGender = false;
            state.genders = [];
            console.log('fecth fire gender failed', action)

            return {
                ...state,

            }
        case actionTypes.FETCH_POSITION_SUCCESS:
            state.positions = action.data;
            return {
                ...state,

            }
        case actionTypes.FETCH_POSITION_FAIDED:
            state.positions = [];
            return {
                ...state,

            }
        case actionTypes.FETCH_ROLE_SUCCESS:
            state.roles = action.data;
            return {
                ...state,

            }
        case actionTypes.FETCH_ROLE_FAIDED:
            state.roles = [];
            return {
                ...state,

            }
        default:
            return state;
    }
}

export default adminReducer;
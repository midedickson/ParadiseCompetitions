import { AUTH_LOADING, AUTH_SUCCESS, AUTH_LOGOUT, AUTH_ERROR } from "./authTypes";

const initialState = {
    loading: false,
    error: null,
    success: false,
    user: null
}

const authReducer = (state = initialState, action) => {
    switch(action.type){
        case AUTH_LOADING:
            state = {
                ...state, 
                loading: true, 
                error: null
            }
        return state;
        case AUTH_SUCCESS:
            state = {
                ...state, 
                loading: false, 
                error: null, 
                success: true,
                user: action.payload
            }
        return state;
        case AUTH_ERROR:
            state = {
                ...state, 
                loading: false, 
                error: action.payload, 
                success: false,
                user: null
            }
        return state;
        case AUTH_LOGOUT:
            state = {
                token: null,
                loading: false,
                error: null,
                success: true
            }
        return state
        default:
            return state
    }
}

export default authReducer;
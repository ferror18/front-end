import {
    CREATE_USER_START,
    CREATE_USER_SUCCESS,
    CREATE_USER_FAILED,

    LOGIN_USER_START,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILED,

} from "../actions/userActions";

const intialState = {
    isFetching: false,
    user: {},
    username: '',
    password: '',
    error: null,
}

export const userReducer = (state = intialState, action) => {
    switch (action.type) {

        // user register
        case CREATE_USER_START:
            return {
                ...state,
                isFetching: true,
            }
        case CREATE_USER_SUCCESS:
            return {
                ...state,
                username: action.payload.username,
                password: action.payload.password,
                error: false,
            }
        case CREATE_USER_FAILED:
            return {
                ...state,
                error: action.payload.Error,
            }

        // user login
        case LOGIN_USER_START:
            return {
                ...state,
                isFetching: true,
            }
        case LOGIN_USER_SUCCESS:
            return {
                ...state,
                user: action.payload,
                error: false,
            }
        case LOGIN_USER_FAILED:
            return {
                ...state,
                error: action.payload.Error,
            }
        default:
            return state
    }
};
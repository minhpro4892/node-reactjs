import { userConstants } from '../constants/user';
import { loadUserProfile } from "../utils/apiUtils";
const initialState = {
    user: null,
    password: null,
    loggingIn: false,
    loggingOut: false,
    loginError: null,
    logoutError: null,
    token: '',
};

function initializeState() {
    const userProfile = loadUserProfile();
    return Object.assign({}, initialState, userProfile);
}

export default  function auth(state = initializeState(), action = {}) {
    switch (action.type) {
        case userConstants.LOGIN_REQUEST:
            return Object.assign({}, state, { loggingIn: true });
        case userConstants.LOGIN_SUCCESS:
            return Object.assign({}, state, {
                loggingIn: false,
                user: action.user,
                token: action.token
            });
        case userConstants.LOGIN_FAILURE:
            return {
                ...state,
                loggingIn: false,
                user: null,
                role: null,
                loginError: action.error
            };
        case userConstants.LOGOUT_REQUEST:
            return {
                ...state,
                loggingOut: true,
                user: null
            }
        case userConstants.LOGOUT_FAILURE:
            return {
                ...state,
                loggingOut: false,
                logoutError: action.error
            }
        case userConstants.LOGOUT_SUCCESS:
            window.location.href = '/login'
            return initialState;
        default:
            return state;
    }
}
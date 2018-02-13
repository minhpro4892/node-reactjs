import { userConstants } from './../constants/user';;
import {
    userLoginApi,
    userLogoutApi
} from '../constants/ApiConfigs'
import {
    callApi,
    saveUserToLocal,
    removeUserProfile,
    UrlBuilder
} from "../utils/apiUtils";


function loginRequest(user) {
    return {
        type: userConstants.LOGIN_REQUEST,
        user
    };
}

function loginSuccess(payload) {
    saveUserToLocal(payload.res.user);
    return {
        type: userConstants.LOGIN_SUCCESS,
        user: payload.res.user,
        token: payload.res.token,
        fleet: []
    };
}

function loginFailure(error) {
    return {
        type: userConstants.LOGIN_FAILURE,
        error
    };
}

export function login(username, password, remember) {
    const config = {
        method: "post",
        body: JSON.stringify({
            username,
            password,
            remember
        })
    };

    return callApi(
        userLoginApi,
        config,
        loginRequest(username),
        loginSuccess,
        loginFailure,
        true
    );
}

function logoutRequest(user) {
    return {
        type: userConstants.LOGOUT_REQUEST,
        user
    };
}

function logoutSuccess(paylad) {
    removeUserProfile()
    return {
        type: userConstants.LOGOUT_SUCCESS,
        user: null
    };
}

function logoutFailure(error) {
    return {
        type: userConstants.LOGOUT_FAILURE,
        error
    };
}

export function logout(user) {
    const config = {
        method: "post",
    }
    return callApi(
        userLogoutApi,
        config,
        logoutRequest,
        logoutSuccess,
        logoutFailure
    );
}
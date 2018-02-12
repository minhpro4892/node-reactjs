import { userConstants } from './../constants/user';;
import {
    userLoginApi
} from '../constants/ApiConfigs'
import {
    callApi,
    saveUserToLocal,
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
        token: payload.token,
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
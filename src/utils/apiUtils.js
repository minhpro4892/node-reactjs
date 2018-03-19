
import "isomorphic-fetch";
const uuidv4 = require('uuid/v4');

export function checkStatus(response, config) {
    if (!response.ok) {
        const error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
    if (config.fileName) {
        return response.blob();
    }
    return response;
}

export function parseJSON(response) {
    return response.json();
}
/**
 * A utility to call a restful service.
 *
 * @param url The restful service end point.
 * @param config The config object of the call. Can be null.
 * @param request The request action.
 * @param onRequestSuccess The callback function to create request success action.
 *                 The function expects response json payload as its argument.
 * @param onRequestFailure The callback function to create request failure action.
 *                 The function expects error as its argument.
 */
export function callApi(
    url,
    config,
    request,
    onRequestSuccess,
    onRequestFailure,
    showLoading
) {
    const user = loadUserProfile();
    let myHeaders = new Headers();
    myHeaders.append('x-request-id', uuidv4({ msecs: new Date().getTime() }))
    if (config.isFormData) {
        myHeaders.append("Accept", "application/json");
    } else {
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Content-Type", "application/json");
    }
    if (user) {
        myHeaders.append("Authorization", user.token);
    }
    config.headers = myHeaders;
    return dispatch => {
        if (request) {
            dispatch(request);
        }
        return fetch(url, config)
            .then(response => {
                return checkStatus(response, config);
            })
            .then(response => {
                return parseJSON(response);
            })
            .then(json => {
                if (json.error) {
                    if (onRequestFailure) {
                        dispatch(onRequestFailure(json.error))
                    }
                } else {
                    json.ok = true;
                    if (onRequestSuccess) {
                        dispatch(onRequestSuccess(json));
                    }
                }
                return json;
            })
            .catch(error => {
                const response = error.response;
                if (response === undefined) {
                    if (onRequestFailure) {
                        dispatch(onRequestFailure(error));
                    }
                } else {
                    error.status = response.status;
                    error.statusText = response.statusText;
                    response.json().then(json => {
                        error.message = json;
                        if (onRequestFailure) {
                            dispatch(onRequestFailure(error));
                        }
                    });
                }
                error.ok = false;
                return error;
            });
    };
}

export function saveUserToLocal(data) {
    data = JSON.stringify(data);
    localStorage.setItem('user', data);
}

export function UrlBuilder(url, options) {
    let esc = encodeURIComponent;
    let query = Object.keys(options)
        .map(k => esc(k) + '=' + esc(options[k]))
        .join('&');
    url += '?' + query;
    return url;
}

export function removeUserProfile() {
    localStorage.removeItem('user');
}

export function loadUserProfile() {
    let user = localStorage.getItem('user');
    if (!user) return null;
    user = JSON.parse(user);
    return user;
}
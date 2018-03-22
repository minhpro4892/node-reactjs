
import {
    userFindApi,
    articleFindApi
} from '../constants/ApiConfigs.js'

import {
    callApi,
} from "../utils/apiUtils.js";

export const GET_USER_REQUEST = "GET_USER_REQUEST";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAILURE = "GET_USER_FAILURE";
export const GET_ARTICLE_REQUEST = "GET_ARTICLE_REQUEST";
export const GET_ARTICLE_SUCCESS = "GET_ARTICLE_SUCCESS";
export const GET_ARTICLE_FAILURE = "GET_ARTICLE_FAILURE";

function getUserRequest() {
    return {
        type: GET_USER_REQUEST
    };
}

function getUserSuccess(data) {
    return {
        type: GET_USER_SUCCESS,
        data: data.res.list
    };
}

function getUserFailure(error) {
    return {
        type: GET_USER_FAILURE,
        error
    };
}

export function getUser(option = {}) {
    const config = {
        method: "get",
    };

    return callApi(
        userFindApi,
        config,
        getUserRequest,
        getUserSuccess,
        getUserFailure,
        true
    );
}

function getArticleRequest() {
    return {
        type: GET_ARTICLE_REQUEST
    };
}

function getArticleSuccess(data) {
    return {
        type: GET_ARTICLE_SUCCESS,
        data: data.res.list
    };
}

function getArticleFailure(error) {
    return {
        type: GET_ARTICLE_FAILURE,
        error
    };
}

export function getArticle(option = {}) {
    const config = {
        method: "get",
    };

    return callApi(
        articleFindApi,
        config,
        getArticleRequest,
        getArticleSuccess,
        getArticleFailure,
        true
    );
}
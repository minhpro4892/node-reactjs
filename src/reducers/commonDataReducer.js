import {
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAILURE,
    GET_ARTICLE_REQUEST,
    GET_ARTICLE_SUCCESS,
    GET_ARTICLE_FAILURE
} from "../actions/commonAction";

function initializeState() {
    return {
        userList: [],
        articleList: []
    }
}

export default function auth(state = initializeState(), action = {}) {
    switch (action.type) {
        case GET_USER_REQUEST: 
            return state;
        case GET_USER_SUCCESS: 
            return {
                ...state,
                userList: action.data
            }
        case GET_USER_FAILURE: 
            return state;
        case GET_ARTICLE_REQUEST:
            return state;
        case GET_ARTICLE_SUCCESS:
            return {
                ...state,
                articleList: action.data
            }
        case GET_ARTICLE_FAILURE:
            return state;
        default:
            return state;

    }
}
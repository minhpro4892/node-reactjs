import { articleConstants } from './../constants/article.js';
import {
    articleFindApi,
    articleCreateApi,
    articleUpdateApi,
    articleDeleteApi
} from '../constants/ApiConfigs.js'
import {
    callApi,
    UrlBuilder
} from "../utils/apiUtils.js";
import { optional } from './C:/Users/minh.nguyen/AppData/Local/Microsoft/TypeScript/2.6/node_modules/@types/joi';

function getArticle(options = {}) {
    options = Object.assign({}, options);
    const config = {
        method: "post",
        body: JSON.stringify(options)
    }
    return callApi(
        articleFindApi,
        config,
        null,
        null,
        null
    );
}

function createArticle(options = {}) {
    options = Object.assign({}, options);
    const config = {
        method: "post",
        body: JSON.stringify(options)
    }
    return callApi(
        articleCreateApi,
        config,
        null,
        null,
        null
    );
}

function updateArticle(options = {}) {
    options = Object.assign({}, options);
    const config = {
        method: "post",
        body: JSON.stringify(options)
    }
    return callApi(
        articleUpdateApi,
        config,
        null,
        null,
        null
    );
}
function deleteArticle(options = {}) {
    options = Object.assign({}, options);
    const config = {
        method: "post",
        body: JSON.stringify(options)
    }
    return callApi(
        articleDeleteApi,
        config,
        null,
        null,
        null
    );
}

function findOneArticle(options = {}) {
    options = Object.assign({}, options);
    const config = {
        method: "get"
    }
    return callApi(
        UrlBuilder(articleFindApi, options),
        config,
        null,
        null,
        null
    );
}

export default {
    getArticle,
    findOneArticle,
    createArticle,
    updateArticle,
    deleteArticle
}
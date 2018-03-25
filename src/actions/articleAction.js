import { articleConstants } from './../constants/article.js';
import {
    articleFindApi,
    articleCreateApi,
    articleUpdateApi,
    articleDeleteApi,
    articleFindOneApi
} from '../constants/ApiConfigs.js'
import {
    callApi,
    UrlBuilder
} from "../utils/apiUtils.js";

export function getArticle(options = {}) {
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

export function createArticle(options = {}) {
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

export function updateArticle(options = {}) {
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

export function getOneArticle(options = {}) {
    options = Object.assign({}, options);
    const config = {
        method: "get"
    }
    return callApi(
        UrlBuilder(articleFindOneApi, options),
        config,
        null,
        null,
        null
    );
}
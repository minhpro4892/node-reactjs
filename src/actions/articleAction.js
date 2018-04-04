import { articleConstants } from './../constants/article.js';
import {
    articleFindApi,
    articleCreateApi,
    articleUpdateApi,
    articleDeleteApi,
    articleFindOneApi,
    articleExportApi
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
        false
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
        false
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
        false
    );
}

export function deleteArticle(options = {}) {
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
        false
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
        false
    );
}

export function exportArticleToCSV(options = {}) {
    options = Object.assign({}, options);
    const config = {
        credentials: "same-origin",
        headers: {"Content-Type": "application/json"},
        method: "post",
        body: JSON.stringify(options),
        fileName: "Article.xlsx"
    }
    return callApi (
        articleExportApi,
        config,
        null,
        null,
        false
    )
}
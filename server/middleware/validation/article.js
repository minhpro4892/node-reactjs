const Joi = require("joi");
module.exports = {
    "/api/article/find": Joi.object().keys({
        limit: Joi.number().min(5).max(50),
        page: Joi.number().min(0)
    }),
    "/api/article/create": Joi.object().keys({
        title: Joi.string().required,
        content: Joi.string().allow('', null).trim()
    }),
    "/api/article/update": Joi.object().keys({
        articleId: Joi.string().required,
        title: Joi.string().allow('', null).trim(),
        content: Joi.string().allow('', null).trim()
    }),
    "/api/article/delete": Joi.object().keys({
        articleId: Joi.string().required
    })
}
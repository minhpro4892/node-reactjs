const Joi = require('joi');

module.exports = {
    //------------------User------------------------//
    "/api/user/create": Joi.object().key({
        username: Joi.string().alphanum().min(3).max(30).required(),
        phoneNumber: Joi.string().allow('', null).trim(),
        email: Joi.string().email().required(),
        birthyear: Joi.number().integer().min(1900).max(2150),
        roleName: Joi.boolean().required(),
        isActive: Joi.boolean().required(),
        address: Joi.string().allow('', null).trim()
    }),
    "/api/user/find": Joi.object().key({
        limit: Joi.number().integer().min(5).max(50),
        page: Joi.number().integer().min(0)
    }),
    "/api/user/update": Joi.object().key({
        userId: Joi.string().required(),
        username: Joi.string.allow('', null).trim(),
        phoneNumber: Joi.string().allow('', null).trim(),
        email: Joi.string().email(),
        roleName: Joi.boolean(),
        isActive: Joi.boolean()
    }),
    "/api/user/delete": Joi.object().key({
        userId: Joi.string().required()
    }),
    "/api/user/resetPassword": Joi.object().key({
        userId: Joi.string().required()
    }),
    "/api/user/changePassword": Joi.object().key({
        oldPassword: Joi.string().required(),
        newPassword: Joi.string().required()
    }),
    "/api/user/login": Joi.object().key({
        username: Joi.string().alphanum().min(3).max(30).required(),
        password: Joi.string().required(),
        rememberMe: Joi.boolean()
    })
}
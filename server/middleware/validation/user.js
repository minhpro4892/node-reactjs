const Joi = require('joi');

module.exports = {
    //------------------User------------------------//
    "/api/user/create": Joi.object().keys({
        username: Joi.string().required().lowercase(),
        phoneNumber: Joi.string().allow('', null).trim(),
        email: Joi.string().email().required(),
        birthyear: Joi.number().integer().min(1900).max(2150),
        roleName: Joi.boolean().required(),
        isActive: Joi.boolean().required(),
        address: Joi.string().allow('', null).trim()
    }),
    "/api/user/find": Joi.object().keys({
        limit: Joi.number().integer().min(5).max(50),
        page: Joi.number().integer().min(0)
    }),
    "/api/user/update": Joi.object().keys({
        userId: Joi.string().required(),
        username: Joi.string().allow('', null).trim(),
        phoneNumber: Joi.string().allow('', null).trim(),
        email: Joi.string().email(),
        roleName: Joi.boolean(),
        isActive: Joi.boolean()
    }),
    "/api/user/delete": Joi.object().keys({
        userId: Joi.string().required()
    }),
    "/api/user/resetPassword": Joi.object().keys({
        userId: Joi.string().required()
    }),
    "/api/user/changePassword": Joi.object().keys({
        oldPassword: Joi.string().required(),
        newPassword: Joi.string().required()
    }),
    "/api/user/login": Joi.object().keys({
        username: Joi.string().required().lowercase(),
        password: Joi.string().required(),
        rememberMe: Joi.boolean()
    })
}
function define(name, value) {
    Object.defineProperty(exports, name, {
        value: value,
        enumerable: true
    });
}

//===============VALIDATION==============
define("VALIDATION_ERROR", 400000);
define("AUTHORIZATION_ERROR", 400001);
define("MODULE_PERMISSION_DENIED", 400003);
define("FILE_CONTENT_INVALID", 400005);



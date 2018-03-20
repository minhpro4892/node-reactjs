var user = require("./user");
var article = require("./article");

module.exports = function (app) {
    user(app);
    article(app);
}
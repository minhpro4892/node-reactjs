var user = require("./user");
var article = require("./article");
var notification = require("./notification");

module.exports = function (app) {
    user(app);
    article(app);
    notification(app);
}
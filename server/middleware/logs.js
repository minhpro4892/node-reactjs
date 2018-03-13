var LogsCtrl = require("./../controller/logs");
var _ = require('lodash');

var urlToLogsMapping = {
  '/api/user/login': {
    body: {
      module: "Login",
      action: "Log in",
      description: "Logged in"
    }
  },
  '/api/user/logout': {
    before: true,
    body: {
      module: "Logout",
      action: "Log out",
      description: "Logged out"
    }
  },
  '/api/user/create': {
    body: {
      module: "User",
      action: "Create",
      description: {
        templateStr: "Created user: '${userName}'",
        params: {
          userName: 'body.userName'
        }
      }
    }
  },
  '/api/user/update': {
    body: {
      module: "User",
      action: "Update",
      description: {
        templateStr: "Updated user: '${userName}'",
        params: {
          userName: "locals.response.userName"
        }
      }
    }
  }
}

exports.save = function (req, res, next) {
  var user = _.get(req, ['session', 'user'], null);
  if (!user) return next();
  var mapping = urlToLogsMapping[req.route.path.toLowerCase()];
  if (!mapping) return next();
  var body = _.cloneDeep(mapping.body);
  body = _.mapValues(body, function (value, key) {
    if (_.isObject(value)) {
      var params = _.mapValues(value.params, function (v, k) {
        if (_.isFunction(v)) return v;
        return _.get(req, v, _.get(res, v));
      });
      return _.template(value.templateStr)(params);
    }
    return value;
  })
  new LogsCtrl({ user }).create(body, req.requestId);
  mapping.before && next();
}
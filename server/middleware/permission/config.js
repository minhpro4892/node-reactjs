module.exports = {
    "permissionDefault": {
        name: "isUser"
    },
    "/api/user/login": false,
    '/api/user/logout': false,
    '/api/user/forgotpassword': false,
    '/api/user/updatepassword': false,
    '/api/user/checktoken': false,
    '/api/user/changepassword': {
      name: "isUser"
    },
    '/api/user/resetpassword': {
      name: "isFleetUser",
      modules: {
        moduleKey: "Setting",
        moduleName: "User",
        action: "Actions"
      }
    },
    '/api/user/find': {
      name: "isFleetUser",
      modules: {
        moduleKey: "Setting",
        moduleName: "User",
        action: "View"
      }
    },
    '/api/user/findOne': {
      name: "isFleetUser",
      modules: {
        moduleKey: "Setting",
        moduleName: "User",
        action: "View"
      }
    },
    '/api/user/create': {
      name: "isFleetUser",
      modules: {
        moduleKey: "Setting",
        moduleName: "User",
        action: "Actions"
      }
    },
    '/api/user/update': {
      name: "isFleetUser",
      modules: {
        moduleKey: "Setting",
        moduleName: "User",
        action: "Actions"
      }
    },
    '/api/user/active': {
      name: "isFleetUser",
      modules: {
        moduleKey: "Setting",
        moduleName: "User",
        action: "Actions"
      }
    },
    '/api/user/delete': {
      name: "isFleetUser",
      modules: {
        moduleKey: "Setting",
        moduleName: "User",
        action: "Actions"
      }
    },
    "/api/article/find": false,
    "/api/article/create": false,
    "/api/article/update": false,
    "/api/article/delete": false
}
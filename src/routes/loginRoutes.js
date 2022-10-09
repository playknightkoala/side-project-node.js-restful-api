module.exports = (app) => {
    const loginControllers = require("../controllers/loginControllers");

    app.route("/login").post(loginControllers.login);
};

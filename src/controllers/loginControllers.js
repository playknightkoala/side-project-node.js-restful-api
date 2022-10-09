const loginService = require("../service/loginService");
exports.login = async (request, response) => {
  response.json(await loginService.login(request));
};

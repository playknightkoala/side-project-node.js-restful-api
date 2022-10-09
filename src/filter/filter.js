const responseDTO = require("../dto/responseDTO");
const processJWT = require("../unit/processJWT");
const unit = require("../unit/unit");

module.exports = async (request, response, next) => {
  if ((request.method !== "POST" && request.url !== "/members") && request.url !== "/login") {
    if (request.header("authorization")) {
      const authorization = request.header("authorization").split("Bearer ")[1];
      let isValid = false;
      await processJWT
        .parseJWT(authorization)
        .then((payload) => {
          const content = payload.payload;
          isValid = !unit.isEmpty(content.account) && !unit.isEmpty(content.accountName);
        })
        .catch(() => {
          isValid = false;
        });
      if (isValid) {
        return next();
      }
    }
    return next(JSON.stringify(responseDTO.generalResponse(false, "發生嚴重錯誤！")));
  }
  return next();
};

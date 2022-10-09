const memberDAO = require("../dao/memberDAO");
const unit = require("../unit/unit");
const responseDTO = require("../dto/responseDTO");
const processJWT = require("../unit/processJWT");

exports.login = async (request) => {
  const loginInfoBody = request.body;
  if (!unit.isEmpty(loginInfoBody)) {
    const response = await memberDAO.queryMemberByAccount([loginInfoBody.account]);
    if (response.status && response.response.length !== 0) {
      const memberInfo = response.response[0];
      if (unit.passwordToMD5Hash(loginInfoBody.password) === memberInfo.password) {
        return responseDTO.generalResponse(
          true,
          processJWT.generalJWT({
            account: memberInfo.account,
            accountName: memberInfo.account_name,
            email: memberInfo.email,
          })
        );
      }
    }
    return responseDTO.generalResponse(false, "帳號或密碼錯誤！請重新輸入！");
  }
  return responseDTO.generalResponse(false, "發生嚴重錯誤！");
};

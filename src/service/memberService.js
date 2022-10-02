const memberDAO = require("../dao/memberDAO");
const processJWT = require("../unit/processJWT");
const unit = require("../unit/unit");
const responseDTO = require("../dto/responseDTO");

exports.queryMember = async () => {
    return await memberDAO.queryAllMember();
}

exports.login = async (loginInfo) => {
    if (loginInfo.body) {
        const loginInfoBody = loginInfo.body;
        const response = await memberDAO.login([loginInfoBody.account]);
        if (response.status && response.response.length !== 0) {
            const memberInfo = response.response[0];
            if (unit.passwordToMD5Hash(loginInfoBody.password) === memberInfo.password) {
                return responseDTO.generalResponse(true, processJWT.generalJWT({
                    account: memberInfo.account,
                    accountName: memberInfo.account_name,
                    email: memberInfo.email
                }))
            }
        }
        return responseDTO.generalResponse(false, "帳號密碼錯誤！請重新輸入！")
    }
    return responseDTO.generalResponse(false, "發生嚴重錯誤！")
}

exports.createMember = (userInfo) => {
    return unit.passwordToMD5Hash(userInfo.password);
}
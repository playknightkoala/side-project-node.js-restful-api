const memberDAO = require("../dao/memberDAO");
const unit = require("../unit/unit");
const responseDTO = require("../dto/responseDTO");
const processJWT = require("../unit/processJWT");

exports.createMember = async (request) => {
  const userInfo = request.body;

  if (unit.isEmpty(userInfo)) {
    return responseDTO.generalResponse(false, "發生嚴重錯誤！");
  }
  if (
    unit.isEmpty(userInfo.account) ||
    unit.isEmpty(userInfo.accountName) ||
    unit.isEmpty(userInfo.password) ||
    unit.isEmpty(userInfo.email)
  ) {
    return responseDTO.generalResponse(false, "發生嚴重錯誤！");
  }

  const queryMemberByAccountResponse = await memberDAO.queryMemberByAccount([userInfo.account]);
  if (queryMemberByAccountResponse.status && queryMemberByAccountResponse.response.length !== 0) {
    return responseDTO.generalResponse(false, "帳號已重複！");
  }

  const password = unit.passwordToMD5Hash(userInfo.password);
  const createMemberResponse = await memberDAO.createMember([
    userInfo.account,
    password,
    userInfo.accountName,
    userInfo.email,
  ]);
  if (createMemberResponse.status) {
    return responseDTO.generalResponse(true, "創建帳號成功！");
  }

  return responseDTO.generalResponse(false, "發生嚴重錯誤！");
};

exports.readMember = async () => {
  return await memberDAO.queryAllMember();
};

exports.updateMember = async (request) => {
  const userInfo = request.body;
  const account = request.params.account;
  const setStatement = [];
  const userInfoStatement = [];
  const tokenInfo = await getTokenInfo(request);

  if (unit.isEmpty(userInfo) || unit.isEmpty(account) || tokenInfo.account !== account) {
    return responseDTO.generalResponse(false, "發生嚴重錯誤！");
  }

  const queryMemberByAccountResponse = await memberDAO.queryMemberByAccount([account]);
  if (queryMemberByAccountResponse.status && queryMemberByAccountResponse.response.length === 0) {
    return responseDTO.generalResponse(false, "發生嚴重錯誤！");
  }
  const memberInfo = queryMemberByAccountResponse.response[0];

  if (!unit.isEmpty(userInfo.password) && memberInfo.password !== unit.passwordToMD5Hash(userInfo.password)) {
    userInfoStatement.push(unit.passwordToMD5Hash(userInfo.password));
    setStatement.push("password=?");
  }
  if (!unit.isEmpty(userInfo.accountName) && memberInfo.account_name !== userInfo.password) {
    userInfoStatement.push(userInfo.accountName);
    setStatement.push("account_name=?");
  }
  if (!unit.isEmpty(userInfo.email) && memberInfo.email !== userInfo.email) {
    userInfoStatement.push(userInfo.email);
    setStatement.push("email=?");
  }
  if (unit.isEmpty(userInfoStatement) || unit.isEmpty(setStatement)) {
    return responseDTO.generalResponse(false, "發生嚴重錯誤！");
  }

  userInfoStatement.push(account);
  const updateMemberResponse = await memberDAO.updateMember(setStatement, userInfoStatement);
  if (updateMemberResponse.status) {
    return responseDTO.generalResponse(true, "更新帳號成功！");
  }

  return responseDTO.generalResponse(false, "發生嚴重錯誤！");
};

exports.deleteMember = async (request) => {
  const account = request.params.account;
  if (unit.isEmpty(account)) {
    return responseDTO.generalResponse(false, "發生嚴重錯誤！");
  }

  const deleteMemberResponse = await memberDAO.deleteMember([account]);
  if (deleteMemberResponse.status) {
    return responseDTO.generalResponse(true, "刪除帳號成功！");
  }

  return responseDTO.generalResponse(false, "發生嚴重錯誤！");
};

async function getTokenInfo(request) {
  const authorization = request.header("authorization").split("Bearer ")[1];
  let content = null;
  await processJWT.parseJWT(authorization).then((payload) => {
    content = payload.payload;
  });
  return content;
}

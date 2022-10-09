const connectDB = require("../unit/database/connectDB");

exports.queryMemberByAccount = async (account) => {
  return await connectDB.query("SELECT * FROM service_account WHERE account = ?", account);
};

exports.queryAllMember = async () => {
  return await connectDB.query("SELECT * FROM service_account");
};

exports.createMember = async (userInfo) => {
  return await connectDB.query(
    "INSERT INTO service_account (account, password, account_name, email) VALUE ( ?, ?, ?, ?)",
    userInfo
  );
};

exports.updateMember = async (setStatement, userInfoStatement) => {
  return await connectDB.query(
    `UPDATE service_account SET ${setStatement.join(",")} WHERE account = ?`,
    userInfoStatement
  );
};

exports.deleteMember = async (userInfo) => {
  return await connectDB.query("DELETE FROM service_account WHERE account = ?", userInfo);
};

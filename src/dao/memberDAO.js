const connectDB = require("../unit/database/connectDB");

exports.login = async (account) => {
  return await connectDB.query("SELECT * FROM service_account WHERE account = ?", account);
};

exports.queryAllMember = async () => {
  return await connectDB.query("SELECT * FROM service_account");
};

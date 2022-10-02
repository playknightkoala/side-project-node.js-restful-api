const connectDB = require("../unit/database/connectDB");
const processJWT = require("../unit/processJWT");
const unit = require("../unit/unit");

exports.queryMember = async () => {
    const processJWT = require("../unit/processJWT");
    return processJWT.generalJWT({user: "abc"});
    // return connectDB.query("SELECT * FROM service_account WHERE id = ?", [1])
}

exports.createMember = (userInfo) => {
    return unit.passwordToMD5Hash(userInfo.password);
}